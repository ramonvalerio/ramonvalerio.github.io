import { languages } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-[var(--color-surface)] p-1">
      {languages.map(({ code, label }) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={`flex h-9 min-w-9 flex-shrink-0 items-center justify-center rounded-lg px-2 text-[11px] font-semibold uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
              isActive
                ? "bg-[var(--color-surface-3)] text-[var(--color-accent)]"
                : "text-white/40 hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
