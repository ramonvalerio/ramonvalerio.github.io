import { languages } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="glass flex items-center gap-1 rounded-full p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={label}
          title={label}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition ${
            lang === code
              ? "bg-white text-black"
              : "text-white/60 hover:text-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
