# ADR 0007 — Resend with a Verified `ramonvalerio.com` Domain

## Status
Accepted

## Context
The double opt-in flow (ADR-0005) needs to send transactional email to an
**arbitrary** address (the form submitter), not just back to the project owner.
Resend's free/unverified mode only allows sending from `onboarding@resend.dev` to the
account owner's own verified address — it cannot email third parties until a sending
domain is verified.

## Decision
Verify `ramonvalerio.com` with Resend by adding the DNS records Resend generates
(DKIM `TXT` on `resend._domainkey`, SPF-enabling `CNAME`s on `rsend`/`send`, and an
optional `DMARC` `TXT` on `_dmarc`) to the domain's existing DNS zone in **AWS Route
53** (where the domain's other records, including the GitHub Pages `CNAME`/`A`
records, already live). Both Edge Functions send as
`Ramon Valerio <contato@ramonvalerio.com>` once verified.

## Consequences
- Unlocks sending to any recipient, which is required for the confirmation email
  step of ADR-0005.
- Domain verification is an account-level, one-time setup step tied to the DNS
  provider in use (Route 53 here) — if the domain's registrar/DNS host ever changes,
  these records must be migrated along with the rest of the zone.
- `contato@ramonvalerio.com` is a send-only address for this integration (Resend's
  "Enable Receiving" was left off) — it is not a monitored inbox.
