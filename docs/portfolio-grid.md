# Portfolio Grid — `src/components/PortfolioGrid.jsx`

Seção `#portfolio` que renderiza os projetos e controla o estado do modal ativo.

## Responsabilidade

- Mantém `activeProject` (`useState`) — projeto atualmente aberto no modal, ou `null`
- Itera `projects` (de `src/data/projects.js`) renderizando um `ProjectCard` por item
- Renderiza um único `ProjectModal`, passando `project={activeProject}`

## Layout

- Grid responsivo: 1 coluna (mobile) → 2 colunas (`sm`) → 3 colunas (`lg`)
- `gap-6` entre cards

---

# ProjectCard — `src/components/ProjectCard.jsx`

Card individual, clicável (`<button>` para acessibilidade/teclado).

## Props

| Prop | Tipo | Descrição |
|---|---|---|
| `project` | objeto do shape de `data-projects.md` | dados do projeto |
| `onOpen` | `(project) => void` | callback para abrir o modal (chamado com o `project`) |

## Conteúdo e interação

- Thumbnail placeholder (gradiente + ícone 🖼️) — **substituir por imagem real do projeto**
- Título + tagline
- Até 3 tags de tecnologia + contador `+N` se houver mais
- Microinteração "Ver detalhes →" que aparece no hover
- Hover: `-translate-y-1`, sombra neon (`shadow-[0_0_40px_-10px_var(--color-accent)]`), zoom leve na thumbnail
