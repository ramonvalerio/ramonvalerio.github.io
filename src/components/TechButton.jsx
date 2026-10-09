export default function TechButton({
  as: Component = "button",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`group relative overflow-hidden border border-red-500/60 bg-red-500/10 px-6 py-2.5 text-center text-sm font-medium tracking-wide text-red-400 uppercase shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)] transition-all hover:bg-red-500 hover:text-black hover:shadow-[0_0_25px_-2px_rgba(239,68,68,0.9)] sm:text-base ${className}`}
      {...props}
    >
      <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-red-400" />
      <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-red-400" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-red-400" />
      <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-red-400" />
      {children}
    </Component>
  );
}
