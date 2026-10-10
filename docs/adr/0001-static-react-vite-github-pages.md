# ADR 0001 — Static React/Vite Site on GitHub Pages

## Status
Accepted

## Context
A personal portfolio site needs to be cheap to host, fast to load globally, and
simple to deploy, with no server-side state beyond a contact form.

## Decision
Build the site as a static React (Vite + Tailwind) single-page app, hosted on GitHub
Pages under the custom domain `ramonvalerio.com`, deployed automatically via a GitHub
Actions workflow (`.github/workflows/deploy.yml`) on every push to `master`
(`npm ci && npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`).

## Consequences
- Zero hosting cost, CDN-backed delivery, trivial rollback (git revert).
- No server-side code can run as part of page delivery — any feature that needs a
  backend (e.g., the contact form) must call an external service via `fetch()`
  rather than relying on a same-origin API route (see ADR-0005).
- Environment-specific secrets (API keys) must be injected at **build time** via
  Vite's `import.meta.env.VITE_*` mechanism, sourced from GitHub Actions repository
  secrets — they end up in the compiled client bundle, so only values safe for public
  exposure (publishable/anon keys, site keys) may be used this way. Anything truly
  secret (service-role keys, API secrets) must live server-side only (see ADR-0005).
