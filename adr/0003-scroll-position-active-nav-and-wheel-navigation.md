# ADR 0003 — Scroll-Position Active Nav + Wheel-Based Section Jumping

## Status
Accepted

## Context
Two related navigation problems surfaced during development:

1. **Active nav highlighting**: the nav initially used `IntersectionObserver` with
   `threshold` + "pick the entry with the highest `intersectionRatio`" to decide
   which section was "active". This broke twice:
   - When the Hero section was briefly made `position: sticky`, it stayed
     geometrically "fully visible" forever, permanently winning the ratio comparison.
   - After switching Hero back to normal flow, a different bug appeared: the tiny
     `id="contact"` spacer (sized to the footer's height, a few dozen pixels) reached
     a *high* intersection ratio as soon as the user scrolled even slightly into it,
     outranking the much taller Expertise section and marking "Contato" active while
     the user was still reading Expertise.
2. **Discrete section navigation**: the request was for mouse-wheel scrolling to jump
   whole sections at a time (like a slide deck) rather than free-scrolling.

## Decision
- Replace ratio-based `IntersectionObserver` with a direct scroll-position
  comparison: on every `scroll` event of `#scroll-root`, compute a `triggerLine`
  (`scrollTop + clientHeight * 0.35`) and pick the **last** section whose
  `offsetTop` is at or before that line. This is independent of each section's
  height, so a short spacer can never "out-rank" a tall section.
- Implement wheel-based section jumping in `App.jsx`: a `wheel` listener on
  `#scroll-root` accumulates `deltaY` until a small threshold, then
  `scrollTo({ top: <nearest section>.offsetTop, behavior: "smooth" })`s to the
  next/previous section, with a ~900ms lock to absorb one trackpad/wheel gesture as a
  single step. Elements marked `data-scrollable` (the project detail modal, the
  carousel card's own overflow body) are excluded via `event.target.closest(...)`
  so nested scrolling isn't hijacked.

## Consequences
- Both the nav highlight and the wheel-jump logic depend on every "section" having a
  real `id` in normal document flow (not on a `position: fixed`/`sticky` element) —
  this is why the Contact section's `id` lives on a plain spacer `<div>`, not on the
  fixed `<Footer>` (see ADR-0002).
- The wheel handler calls `event.preventDefault()`, which means any future
  full-bleed scrollable content inside a section (other than explicitly
  `data-scrollable` regions) will need to be tagged the same way or it will fight the
  section-jump behavior.
