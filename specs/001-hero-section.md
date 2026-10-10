# Spec 001 — Hero Section

## Status
Implemented

## Summary
The landing section (`src/components/Hero.jsx`, `id="perfil"`) presents Ramon Valerio's
name, role, bio, a professional video, and primary CTAs ("Ver projetos", "Entrar em
contato").

## Requirements
- Full-bleed background video (`/videos/ramonvalerio_video.mp4`), `object-cover`,
  cropped toward the top so the subject's face stays framed regardless of viewport
  height.
- Editorial two-column grid on large screens: headline + bio + CTAs on the left,
  a styled video panel (HUD-style corner brackets, REC indicator, timecode) on the
  right.
- Bio copy emphasizes 16+ years of experience, legacy modernization, and the
  DDD/ADR/SDD + applied-AI approach.
- Primary CTA ("Ver projetos") uses the shared `TechButton` red HUD style; secondary
  CTA ("Entrar em contato") uses a plain outlined button.
- Section must not be covered by the fixed `Header`; vertical offset is driven by the
  `--header-h` CSS variable set by `Header.jsx` via `ResizeObserver`.

## Non-goals
- No autoplay-with-sound (video is muted/looped, decorative).
- No parallax/scroll-triggered animation beyond the static framing.

## Related
- ADR-0001 (static React/Vite site)
- ADR-0002 (fixed header/footer height variables)
