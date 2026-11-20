const TONES = {
  red: {
    shell:
      "border-red-500/60 bg-red-500/10 text-red-400 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)] hover:bg-red-500 hover:text-black hover:shadow-[0_0_25px_-2px_rgba(239,68,68,0.9)] disabled:hover:bg-red-500/10 disabled:hover:text-red-400",
    corner: "border-red-400",
  },
  blue: {
    shell:
      "border-sky-400/70 bg-sky-400/10 text-sky-300 shadow-[0_0_15px_-3px_rgba(56,189,248,0.65)] hover:bg-sky-400 hover:text-black hover:shadow-[0_0_25px_-2px_rgba(56,189,248,0.9)] disabled:hover:bg-sky-400/10 disabled:hover:text-sky-300",
    corner: "border-sky-300",
  },
};

export default function TechButton({
  as: Component = "button",
  tone = "red",
  className = "",
  children,
  ...props
}) {
  const colors = TONES[tone] ?? TONES.red;
  return (
    <Component
      className={`group relative overflow-hidden border px-6 py-2.5 text-center text-sm font-medium tracking-wide uppercase transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:text-base ${colors.shell} ${className}`}
      {...props}
    >
      <span className={`absolute top-0 left-0 h-2 w-2 border-t border-l ${colors.corner}`} />
      <span className={`absolute top-0 right-0 h-2 w-2 border-t border-r ${colors.corner}`} />
      <span className={`absolute bottom-0 left-0 h-2 w-2 border-b border-l ${colors.corner}`} />
      <span className={`absolute right-0 bottom-0 h-2 w-2 border-r border-b ${colors.corner}`} />
      {children}
    </Component>
  );
}
