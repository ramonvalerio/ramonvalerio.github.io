# Spec 005 — Contact Form (Double Opt-In)

## Status
Implemented

## Summary
`src/components/Contact.jsx` (`id="contact"`) lets visitors send Ramon a message
without a traditional backend, using Supabase Edge Functions as the server-side piece,
Resend for transactional email, and Cloudflare Turnstile for bot mitigation.

## Requirements
- Fields: Name, Email, Message — all required, client-validated.
- **Human verification**: Cloudflare Turnstile widget (managed mode) must resolve
  before the submit button is enabled; the token is verified server-side in the
  `submit-contact` Edge Function via Cloudflare's `siteverify` API
  (`TURNSTILE_SECRET_KEY`), not trusted client-side.
- **Double opt-in delivery** (see ADR-0005 for the reasoning):
  1. Submission → `submit-contact` function inserts a `pending` row into
     `public.pending_messages` (Postgres) with a random `token`, then emails the
     *submitter* a confirmation link via Resend
     (`https://<project>.supabase.co/functions/v1/confirm-contact?token=...`).
  2. Submitter clicks the link → `confirm-contact` function looks up the token,
     marks the row `confirmed` (rejecting already-confirmed or >24h-old tokens), and
     *only then* emails Ramon (`ramonvalerios@gmail.com`) the final message via
     Resend, with the submitter's address set as `reply-to`.
  - A message therefore never reaches Ramon's inbox unless the sender proved control
    of the email address they typed.
- **Client-side cooldown**: after a successful submission, the submit button is
  disabled for 60s (tracked in `localStorage`, survives reloads), with a visible
  countdown, to discourage casual repeat spam from the same visitor/browser.
- Sender identity for all emails: `Ramon Valerio <contato@ramonvalerio.com>` (requires
  the verified domain — see ADR-0006).
- UI surfaces the real error message returned by the Edge Function on failure
  (`console.error` + on-screen detail) instead of a generic "try again".
- Form degrades gracefully (disabled, with an inline notice) if
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` are not configured at build
  time.

## Data model
`public.pending_messages` (RLS enabled, no public policies — only the Edge Functions'
`service_role` key can read/write):
- `id uuid pk`, `token uuid unique`, `name text`, `email text`, `message text`,
  `status text check (pending|confirmed|expired)`, `created_at`, `confirmed_at`.

## Non-goals
- No message history/inbox UI for Ramon — confirmed messages are delivered purely by
  email; the database is bookkeeping, not a CRM.
- No true verification of the sender's real-world identity, only of control over the
  email address claimed (see ADR-0005's limitations section).

## Related
- ADR-0005 (contact delivery strategy evolution: mailto → Web3Forms → Supabase
  double opt-in)
- ADR-0006 (Cloudflare Turnstile for human verification)
- ADR-0007 (Resend + custom domain verification for outbound email)
