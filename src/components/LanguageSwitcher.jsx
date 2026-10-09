import { languages } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="glass flex items-center gap-1.5 rounded-full p-1">
      {languages.map(({ code, label, countryCode }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={label}
          title={label}
          className={`h-7 w-7 flex-shrink-0 overflow-hidden rounded-full transition sm:h-8 sm:w-8 ${
            lang === code
              ? "ring-2 ring-white"
              : "opacity-50 hover:opacity-90"
          }`}
        >
          <img
            src={`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/${countryCode}.svg`}
            alt={label}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
