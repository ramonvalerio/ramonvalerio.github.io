import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const HTML_LANG = { pt: "pt-BR", en: "en", ja: "ja" };

const BRAZIL_TIMEZONES = new Set([
  "America/Sao_Paulo",
  "America/Fortaleza",
  "America/Recife",
  "America/Araguaina",
  "America/Maceio",
  "America/Bahia",
  "America/Belem",
  "America/Manaus",
  "America/Cuiaba",
  "America/Campo_Grande",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Rio_Branco",
  "America/Noronha",
]);

function detectCountryLanguage() {
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    // ignore (unsupported environment)
  }

  const locale = navigator.language || "";
  const country = locale.split("-")[1]?.toUpperCase();

  if (country === "BR" || BRAZIL_TIMEZONES.has(timeZone)) return "pt";
  if (country === "JP" || timeZone === "Asia/Tokyo") return "ja";
  return "en";
}

function detectInitialLanguage() {
  try {
    const stored = localStorage.getItem("lang");
    if (stored && translations[stored]) return stored;
  } catch {
    // ignore (private browsing, etc.)
  }
  return detectCountryLanguage();
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = HTML_LANG[lang] ?? lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
