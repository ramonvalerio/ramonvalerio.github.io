# Dados de Projetos — `src/data/projects.js`

Fonte única de conteúdo consumida por `PortfolioGrid`, `ProjectCard` e `ProjectModal`. Contém 3 projetos fictícios de exemplo — substituir pelos projetos reais mantendo o shape abaixo.

## Shape de um projeto

```js
{
  id: "slug-unico",          // string, usado como key
  title: "Nome do Projeto",
  tagline: "Frase curta de uma linha",
  description: "Parágrafo detalhado do projeto.",
  tech: ["React", "Node.js", "..."],   // array de strings
  media: [
    { type: "banner",     label: "Descrição do banner" },
    { type: "screenshot", label: "Descrição da tela" },
    { type: "video",      label: "Descrição do vídeo demo" },
  ],
  links: {
    live: "https://...",   // ou "#" se não houver
    repo: "https://...",
  },
}
```

## Regras

- `media[].type` deve ser `"banner" | "screenshot" | "video"` (controla o ícone/label exibido no `MediaCarousel`)
- `tech` sem limite de itens — o `ProjectCard` mostra só os 3 primeiros + contador; o `ProjectModal` mostra todos
- Ao integrar imagens/vídeos reais, trocar os placeholders de `MediaCarousel` por `<img src={item.src}>` / `<video src={item.src}>`, adicionando um campo `src` a cada item de `media`
