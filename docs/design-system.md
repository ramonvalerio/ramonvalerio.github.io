# Design System — Dark Mode Premium

Definido em `src/index.css` via Tailwind v4 `@theme`.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#050507` | fundo base da página |
| `--color-surface` | `#0b0b0f` | fundo de seções/modal |
| `--color-surface-2` | `#13131a` | fundo de mídia placeholder |
| `--color-surface-3` | `#1b1b24` | fundo de mídia placeholder (gradiente) |
| `--color-border` | `#2a2a35` | bordas sutis, hover de scrollbar |
| `--color-accent` | `#7cf2d6` (ciano) | destaques, bullets, foco |
| `--color-accent-2` | `#b48cff` (violeta) | gradientes de texto/glow |
| `--color-accent-3` | `#ff7ad1` (rosa) | gradientes de glow |

## Tipografia

- **Display** (`--font-display`): Space Grotesk — usado em `h1`–`h4`
- **Sans** (`--font-sans`): Inter — corpo de texto
- Carregadas via Google Fonts no `index.html` (`preconnect` + `link`)

## Utilitários globais

- `.text-gradient` — texto com gradiente ciano → violeta (`background-clip: text`)
- `.glass` — efeito glassmorphism (fundo translúcido + `backdrop-filter: blur`) usado em cards e modal
- `.noise-grid` — gradientes radiais sutis de fundo (usado no Hero)
- Scrollbar customizada (fina, escura, hover sutil)

## Princípios de layout

- Mobile-first, breakpoints Tailwind padrão (`sm`, `lg`)
- Espaçamento generoso: seções com `py-16`–`py-24`, `px-6`–`px-16`
- Contraste alto: texto branco/quase-branco sobre fundo grafite/preto
