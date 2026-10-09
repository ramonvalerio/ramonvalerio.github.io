# ProjectModal — `src/components/ProjectModal.jsx`

Modal sobreposto exibido ao clicar em um card de projeto.

## Props

| Prop | Tipo | Descrição |
|---|---|---|
| `project` | objeto do projeto ou `null` | quando `null`, o componente retorna `null` (não renderiza nada) |
| `onClose` | `() => void` | fecha o modal |

## Comportamento

- Fecha com: clique no overlay, clique no botão ✕, ou tecla `Escape`
- Clique dentro do card do modal **não** propaga para o overlay (`stopPropagation`)
- Bloqueia o scroll do `body` enquanto aberto (`overflow: hidden`), restaura ao fechar
- Acessibilidade: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para o título

## Conteúdo (ordem)

1. `MediaCarousel` (banner/screenshots/vídeo)
2. Título + tagline (cor de destaque)
3. Descrição detalhada
4. Lista de tecnologias (tags)
5. CTAs: "Ver projeto" (`project.links.live`) e "Código-fonte" (`project.links.repo`)

---

# MediaCarousel — `src/components/MediaCarousel.jsx`

Carrossel interno do modal, alterna entre os itens de `project.media`.

## Props

| Prop | Tipo | Descrição |
|---|---|---|
| `media` | array de `{ type, label }` | `type` ∈ `"banner" \| "screenshot" \| "video"` |

## Comportamento

- `index` controlado via `useState`, navegação circular (`goTo` usa módulo)
- Setas `‹` `›` aparecem apenas se `media.length > 1`
- Indicadores (dots) clicáveis abaixo do carrossel; o dot ativo é mais largo e usa a cor de destaque
- Área de mídia é um placeholder estilizado (ícone ▶ para vídeo, 🖼️ para imagem) com o `label` do item — **substituir por `<img>`/`<video>` reais** mantendo a mesma estrutura de `media[]`
