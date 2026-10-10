# ADR 0002 — Fixed Header/Footer with CSS-Variable-Driven Offsets

## Status
Accepted

## Context
Both the header and footer needed to stay permanently visible (`position: fixed`)
while page content scrolls underneath. Early iterations hardcoded pixel offsets
(padding/margins) for sections to avoid being covered, which broke whenever header or
footer content changed height (language switch, responsive breakpoint, font
loading).

## Decision
Each fixed chrome element measures its own rendered height with a `ResizeObserver`
and publishes it as a CSS custom property on `document.documentElement`
(`--header-h`, `--subheader-h` during an intermediate design, `--footer-h`). Sections
that must clear that chrome reference the variable in inline styles, e.g.
`paddingTop: "calc(var(--header-h, 0px) + 1.5rem)"`, with a `0px` fallback so layout
never breaks before the observer's first measurement.

## Consequences
- Layout stays correct automatically across language changes, font swaps, and
  responsive breakpoints, with no manual pixel tuning.
- Requires every new fixed element to follow the same measure-and-publish pattern,
  and every section needing clearance to opt in explicitly — it is not automatic for
  new components.
- The footer's own `id="contact"` was later moved to a separate invisible spacer
  `<div>` sized by `--footer-h` (see `App.jsx`), because a fixed element's bounding
  box doesn't move as the user scrolls, which defeats both anchor-scroll targeting and
  scroll-position-based active-nav detection (ADR-0003) if the `id` lives on the fixed
  element itself.
