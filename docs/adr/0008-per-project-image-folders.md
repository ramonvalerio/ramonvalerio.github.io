# ADR 0008 — Per-Project Image Folders

## Status
Accepted

## Context
Project images (logo, background, modal background) were originally stored as flat
files in `public/images/projects/` with inconsistent, ad-hoc names (`logo.png`,
`bg_top.jpg`, `bg_emu.jpg`, `logo_veeceo.png`), making it unclear which file belonged
to which project and hard to scale as more projects are added.

## Decision
Organize project images into one subfolder per project, with consistent filenames
across projects: `public/images/projects/<project-id>/logo.png`,
`.../background.jpg`, `.../modal-background.jpg` (only where a project actually uses
a third/modal-specific image). `src/data/projects.js` references the new paths.

## Consequences
- Adding a new project means creating one new folder with the same filename
  convention, rather than inventing new flat names and risking collisions.
- Old flat-file paths were moved with `git mv` to preserve file history rather than
  delete-and-recreate.
