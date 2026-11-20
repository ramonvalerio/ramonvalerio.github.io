# ADR 0005 — Contact Delivery: mailto → Web3Forms → Supabase Double Opt-In

## Status
Accepted (supersedes two earlier iterations)

## Context
With no backend (ADR-0001), sending the contact form's content required an external
mechanism. Three approaches were tried in sequence:

1. **`mailto:` link**: zero setup, but opens the *visitor's* email client and
   requires them to manually hit send — poor completion rate, and it's really "the
   visitor emails you" rather than "the form sends an email".
2. **Web3Forms (direct submit)**: a free forms-as-a-service API; the client posts
   JSON including an `access_key`, and Web3Forms relays it to the owner's inbox.
   Simple, but two problems surfaced:
   - Their Cloudflare Turnstile integration is a paid Pro feature requiring a secret
     key configured in *their* dashboard — sending our own
     `cf-turnstile-response` field without that setup caused submissions to be
     silently rejected on the free plan.
   - Even once fixed, Web3Forms always notifies the form owner **immediately** on
     every submission — there is no way to hold a submission pending confirmation,
     which was needed to address anonymous-abuse concerns (see below).
3. **Supabase Edge Functions + Postgres + Resend (current)**: a minimal
   purpose-built backend, described in Spec 005.

## Decision
Adopt the double opt-in flow: `submit-contact` (Edge Function) stores the message as
`pending` and emails a confirmation link to the *submitter*; `confirm-contact`
(Edge Function) only emails Ramon after that link is clicked. Supabase was chosen
over plain Cloudflare Workers / Vercel / Netlify Functions specifically because the
flow requires **persisted state between two separate HTTP calls** (submit, then
confirm, potentially hours apart) — Supabase bundles a free Postgres database with
its Edge Functions, avoiding the need to wire up a separate KV/D1 store.

### Amendment (2026-11): abuse limits
A review found that double opt-in protects the owner's inbox but not third parties:
anyone could type another person's address repeatedly and make this domain send them
confirmation emails, with no server-side limit (the 60s cooldown lived only in
`localStorage`), hurting domain reputation and exhausting the Resend quota. Changes:
- Turnstile now **fails closed**: a missing `TURNSTILE_SECRET_KEY` rejects submissions
  instead of silently skipping verification; the verified hostname is also checked.
- Server-side rate limits in `submit-contact`: 2/hour per sender email, 5/hour per
  client IP (new `ip` column), 50/day globally — kept below the Resend free quota.
- Server-side validation: trimmed, single-line name ≤100, email ≤254 with format
  check, message ≤5000 (also enforced by a table check constraint).
- CORS limited to the site origin (and local dev); errors return generic codes
  (`invalid_input`, `verification_failed`, `rate_limited`, `server_error`) instead of
  internal messages.
- Confirmation requires a click: the email links to `ramonvalerio.com/?confirm=<token>`,
  where the site shows a "Confirm and send" modal (`ConfirmMessage.jsx`) that POSTs to
  `confirm-contact`; a direct GET on the function only redirects there. Email security
  scanners that prefetch links therefore cannot confirm messages. The page lives on
  the site because Supabase serves Edge Function HTML as sandboxed `text/plain` on
  its own domain, so the earlier HTML confirmation page never rendered as a page.
  The claim is atomic (`pending` → `confirming` → `confirmed`), so concurrent clicks
  send one owner email; a failed send returns the row to `pending` for retry.
- The table had no privileges granted to `service_role` (this project does not grant
  them by default), so every insert failed with `42501 permission denied`: the form
  had never delivered a message. Migration `20261121` grants them to `service_role`
  only, and adds `public.keepalive()` for the scheduled keep-alive workflow, since
  free projects pause after about a week without activity.
- Unconfirmed rows older than 7 days are deleted opportunistically on submit.

## Consequences
- A message only ever reaches Ramon's inbox after the sender demonstrates control of
  the email address they typed, which meaningfully reduces (but does not eliminate)
  anonymous-abuse risk — it does not verify *who* the person is, only that the
  claimed email is reachable by them. Explicitly accepted as "good enough without a
  login requirement", per discussion.
- Introduces real operational dependencies: a Supabase project (database + two Edge
  Functions), a Resend account with a **verified sending domain**
  (`ramonvalerio.com`, via DNS records in Route 53 — see ADR-0007), and a Cloudflare
  Turnstile widget. All credentials are stored as platform secrets (GitHub Actions
  secrets for the Vite build, Supabase project secrets for the Edge Functions) —
  never committed to the repo (`.env.local` is gitignored; `.env.example` documents
  the required variable names only).
- Pending messages older than 24h are marked `expired` on confirm-attempt rather than
  silently accepted, to avoid an arbitrarily old link resurrecting a stale message.
- Web3Forms integration code and its GitHub secret were left in place initially
  during the migration but the contact form now exclusively calls Supabase; Web3Forms
  is effectively decommissioned for this feature.
