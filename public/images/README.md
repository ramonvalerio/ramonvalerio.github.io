# Imagens do site

Arquivos aqui são servidos como arquivos estáticos a partir da raiz (`/images/...`), sem passar pelo bundler.

## Estrutura

- `profile/` — foto de perfil usada no Hero (`src/components/Hero.jsx`)
- `projects/` — banners, screenshots e thumbnails dos projetos (`src/data/projects.js`, `src/components/ProjectCard.jsx`, `src/components/MediaCarousel.jsx`)

## Como usar

Referencie pelo caminho absoluto a partir da pasta `public`, por exemplo:

```jsx
<img src="/images/profile/ramon.jpg" alt="Ramon Valerio" />
```

```js
// src/data/projects.js
media: [
  { type: "banner", label: "Visão geral", src: "/images/projects/nimbus/banner.jpg" },
]
```

## Formato recomendado

- `.jpg`/`.webp` para fotos, `.svg`/`.png` para ícones/logos
- Banners e screenshots em 16:9 (combina com o `aspect-video` usado no carrossel e nos cards)
