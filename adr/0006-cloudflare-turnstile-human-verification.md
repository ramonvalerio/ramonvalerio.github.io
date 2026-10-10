# ADR 0006 — Cloudflare Turnstile for Human Verification

## Status
Accepted

## Context
The contact form needs to discourage automated/bot abuse without imposing a
traditional "pick all the traffic lights" CAPTCHA on legitimate visitors
(recruiters, clients).

## Decision
Use Cloudflare Turnstile in **Managed** mode: it decides per-visitor whether a
non-interactive check, an invisible check, or an additional challenge is shown,
based on Cloudflare's own risk signals. The widget is created once in the Cloudflare
dashboard (bound to the `ramonvalerio.com` and `localhost` hostnames) and rendered
client-side via the Turnstile script, loaded lazily by `Contact.jsx`. The resulting
token is sent to the `submit-contact` Edge Function and verified server-side against
Cloudflare's `siteverify` endpoint using the widget's secret key — the client-side
presence of a token is never trusted on its own.

## Consequences
- Blocks scripted/bot submissions effectively; does **not** prevent a real human from
  manually re-submitting (that's handled separately by the client-side cooldown,
  Spec 005) or from typing someone else's email address (addressed by the double
  opt-in flow, ADR-0005).
- Requires the widget's allowed-hostnames list to be kept in sync with every domain
  the site is actually served from — this caused a real incident where the widget
  was configured only for `ramonvalerio.github.io` while production traffic was on
  `ramonvalerio.com`, making Turnstile fail to render ("Não foi possível conectar ao
  site") until the custom domain was added to the widget's hostname list.
- Free tier, no payment dependency, consistent with the project's zero-cost hosting
  posture (ADR-0001).
