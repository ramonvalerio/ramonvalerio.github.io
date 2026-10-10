# ADR 0004 — Portfolio Carousel: From 3D Cube to Layered Cards

## Status
Accepted (supersedes two earlier iterations)

## Context
The portfolio carousel went through three distinct implementations in response to
iterative feedback:

1. **Rotating ring** (coverflow-style): each card fixed at `rotateY(i·angle)
   translateZ(radius)` around a ring pivoted back by `translateZ(-radius)`, with only
   the ring itself rotating. Worked, but a request to match a specific reference
   ("rotating 3D cube with auto-rotate") prompted a rebuild.
2. **True 3D cube**: four faces (front/right/back/left) of a literal
   `transform-style: preserve-3d` cube, auto-rotating every 5s and pausing on hover,
   modeled on a specific reference implementation. This satisfied the "cube" request
   but was later found to fight with the fixed-size-card requirement and read as
   visually heavier than desired, and the auto-rotation itself was asked to be
   removed (users found unsolicited movement distracting).
3. **Layered cards** (current): a flat "preactive / active / proactive" stack —
   each card absolutely positioned with `translateX` + `scale` + `opacity` based on
   its signed distance from the active index, snapping with a bouncy
   `cubic-bezier(0.17, 0.67, 0.55, 1.43)` easing. Modeled conceptually on a classic
   CSS/JS "perspective carousel" pattern, reimplemented from scratch for this
   project's component structure, styling, and data.

## Decision
Keep the layered-card ("preactive/active/proactive") approach as the carousel
mechanism going forward. It was chosen over the 3D cube because:
- It composes more simply with the fixed-height card requirement (Spec 003) — no
  need to reconcile `perspective`/`translateZ` math with a responsive square cube
  size.
- It reads as calmer/less gimmicky for a professional portfolio once auto-rotation
  was removed.
- It is easier to extend to >2 projects without the "only 2 real faces, cycle the
  other two" workaround the cube needed.

## Consequences
- The `faceClass`/cube-specific state (`pos`, `ANGLE_STEP`, `RING_RADIUS`,
  `cubeSize` + its `ResizeObserver`) was fully removed; any future revisit of a 3D
  effect should be a deliberate new ADR, not a silent reintroduction.
- Drag/swipe is a simple threshold-on-release gesture (not live 1:1 tracking) in the
  current version — a trade-off accepted because the bounce-easing transition doesn't
  compose well with continuous finger-tracked transforms.
