import { languages } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/[0.03] p-0.5 backdrop-blur-md">
      {languages.map(({ code, label, countryCode }) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={`group flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] ${
              isActive ? "ring-1 ring-cyan-400/50" : ""
            }`}
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/${countryCode}.svg`}
              alt={label}
              className={`h-6 w-6 rounded-full object-cover transition-all duration-150 sm:h-[26px] sm:w-[26px] ${
                isActive
                  ? "opacity-100 saturate-100"
                  : "opacity-60 saturate-50 group-hover:opacity-100 group-hover:saturate-100 group-focus-visible:opacity-100 group-focus-visible:saturate-100"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
