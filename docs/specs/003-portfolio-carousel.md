# Spec 003 — Portfolio Carousel

## Status
Implemented

## Summary
`src/components/PortfolioGrid.jsx` (`id="portfolio"`) cycles through project cards
(currently ShmupX and Veeceo, plus temporary demo cards) using a "preactive / active /
proactive" layered-card carousel.

## Requirements
- Each card has a fixed-height panel split into a **header/banner** (fixed height,
  shows the project logo or a text fallback) and a scrollable **body** (title, role,
  tagline, dates/status, tech chips, and a "Ver detalhes" button pinned to the
  bottom-right via `mt-auto`).
- Only the active card is fully visible (`scale(1) opacity:1`); the immediate
  neighbor(s) peek at reduced scale/opacity to each side; everything further away is
  invisible and non-interactive.
- Card-to-card transitions animate `transform`/`opacity` with a bouncy
  `cubic-bezier(0.17, 0.67, 0.55, 1.43)` easing.
- Navigation: angular "pentagon" chevron buttons (not circles) positioned outside the
  card via `clip-path`, pagination dots, and swipe/drag (mouse + touch) with a
  pixel-distance threshold.
- The section's background image crossfades between projects (`opacity` transition on
  stacked `<div>`s keyed by project id) rather than hard-cutting.
- **No auto-rotation** — the carousel only advances on explicit user interaction
  (button, dot, drag, or clicking a peeking neighbor card).
- `data-scrollable` escape hatch lets nested scrollable regions (card body overflow,
  the project detail modal) opt out of the page-level wheel-based section navigation
  (see Spec 002 / ADR-0003).

## Non-goals
- No true 3D perspective/cube rotation (an earlier iteration explored a CSS 3D cube
  and a rotating-ring design; both were superseded by this flatter layered-card
  approach per user preference).

## Related
- ADR-0004 (carousel approach evolution)
