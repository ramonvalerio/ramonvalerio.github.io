# Hero — `src/components/Hero.jsx`

Seção de apresentação imersiva, primeiro elemento visível (`min-h-[92vh]`).

## Props

Nenhuma — conteúdo estático (nome, frase de efeito, CTAs). Para tornar dinâmico, extrair para `src/data/profile.js` no futuro.

## Conteúdo

- Badge de status ("Disponível para novos projetos") com indicador animado
- `h1`: nome "Ramon Valerio" em destaque (`text-5xl`–`text-7xl`)
- Frase de efeito com trecho em `.text-gradient`
- Dois CTAs: `#portfolio` (scroll suave) e `#contact`
- Placeholder estilizado de foto de perfil (glass card com ícone 📷) — **substituir por `<img>` real**

## Layout

- Grid de 2 colunas em `lg+` (`1.2fr` texto / `0.8fr` foto), coluna única em mobile
- Fundo com `.noise-grid` (gradientes radiais ciano/violeta/rosa)
- Glow do placeholder de foto via `blur-2xl` posicionado atrás do card de vidro

## Pontos de substituição

1. Placeholder de foto → imagem real de alta qualidade (manter `aspect-square`, `rounded-[2rem]`)
2. Texto da frase de efeito, se desejar outro posicionamento profissional
3. `href="mailto:..."` do CTA secundário, se o contato mudar
