import { useState } from "react";

const TYPE_LABEL = {
  banner: "Banner",
  screenshot: "Captura de tela",
  video: "Vídeo demonstrativo",
};

export default function MediaCarousel({ media }) {
  const [index, setIndex] = useState(0);
  const current = media[index];

  const goTo = (i) => setIndex((i + media.length) % media.length);

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface-3)]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
          {current.type === "video" ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl">
              ▶
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl">
              🖼️
            </div>
          )}
          <div>
            <p className="text-xs font-medium tracking-wide text-white/40 uppercase">
              {TYPE_LABEL[current.type]}
            </p>
            <p className="mt-1 text-sm font-medium text-white/70">{current.label}</p>
          </div>
        </div>

        {media.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Mídia anterior"
              onClick={() => goTo(index - 1)}
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/80 transition hover:bg-black/60"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próxima mídia"
              onClick={() => goTo(index + 1)}
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/80 transition hover:bg-black/60"
            >
              ›
            </button>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {media.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para ${item.label}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
