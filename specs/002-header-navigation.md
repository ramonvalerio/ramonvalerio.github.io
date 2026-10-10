# Spec 002 — Header & Navigation

## Status
Implemented

## Summary
A single fixed header (`src/components/Header.jsx`) combines identity (photo + name +
role), primary navigation (Perfil / Trabalho / Expertise / Contato), and the language
switcher.

## Requirements
- `position: fixed` top bar, `bg-[var(--color-ink)]/95` + `backdrop-blur-xl`, so it
  reads consistently over any section scrolled beneath it.
- Measures its own rendered height via `ResizeObserver` and publishes it as the
  `--header-h` CSS custom property on `<html>`, so every section below can reserve
  the correct offset without hardcoding pixel values.
- Nav items use a "tech/HUD" active-state treatment: accent color, `[ LABEL ]`
  bracket glyphs, and a glowing underline — applied only to the current section.
- Active section is derived from scroll position (see ADR-0003 for why
  IntersectionObserver was replaced), comparing `scroll-root`'s `scrollTop` against
  each section's `offsetTop`, not ratio-based intersection.
- Sections tracked: `perfil`, `portfolio`, `expertise`, `contact` (the last is an
  invisible anchor spacer in front of the fixed `Footer`, not the footer itself).

## Non-goals
- No hamburger/mobile drawer menu (nav links are hidden below `md:`; mobile relies on
  scrolling/wheel navigation instead).

## Related
- ADR-0002 (fixed header/footer height variables)
- ADR-0003 (scroll-position-based active nav instead of IntersectionObserver)
