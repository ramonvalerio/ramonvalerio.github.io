export default function Hero() {
  return (
    <section className="noise-grid relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/5 px-6 pt-24 pb-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            Disponível para novos projetos
          </p>

          <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ramon Valerio
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-snug text-white/70 sm:text-2xl">
            Engenheiro de software que transforma{" "}
            <span className="text-gradient font-medium">ideias complexas</span> em
            produtos digitais rápidos, elegantes e escaláveis.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
            >
              Ver projetos
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              Entrar em contato
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-[320px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--color-accent)]/30 via-[var(--color-accent-2)]/20 to-[var(--color-accent-3)]/20 blur-2xl" />
            <div className="glass relative flex h-full w-full items-center justify-center rounded-[2rem] text-center">
              <div className="px-6">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 text-2xl">
                  📷
                </div>
                <p className="text-sm font-medium text-white/60">
                  Foto de perfil
                </p>
                <p className="mt-1 text-xs text-white/35">
                  substituir por imagem final
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
