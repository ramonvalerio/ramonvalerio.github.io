export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/5 px-6 py-16 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-semibold text-white">
            Vamos construir algo{" "}
            <span className="text-gradient">excelente</span>?
          </h3>
          <p className="mt-2 text-white/60">
            Aberto a oportunidades, colaborações e novos desafios.
          </p>
        </div>

        <a
          href="mailto:contato@ramonvalerio.com"
          className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
        >
          contato@ramonvalerio.com
        </a>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-xs text-white/30">
        © {new Date().getFullYear()} Ramon Valerio. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
