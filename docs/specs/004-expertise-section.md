# Spec 004 — Expertise Section

## Status
Implemented

## Summary
`src/components/Expertise.jsx` (`id="expertise"`) is a static editorial grid listing
four areas of technical focus.

## Requirements
- Section label follows the `NN — SECTION NAME` convention used across the site
  ("02 — Expertise"), establishing numbering consistency with Contact's
  "03 — Contato".
- Left column: eyebrow label + headline (`expertiseTitle`).
- Right column: 2×2 grid of items from `expertiseItems` (i18n array), each with an
  index number, title, and short description, separated by hairline borders.
- Content (titles/descriptions) is fully translated per language (PT/EN/JA) via
  `translations.js`.

## Non-goals
- No icons/illustrations per item — intentionally text-only/editorial.

## Related
- Spec 006 (i18n)
