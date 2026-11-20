import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const HTML_LANG = { pt: "pt-BR", en: "en", ja: "ja" };

const DEFAULT_LANGUAGE = "en";

function detectInitialLanguage() {
  try {
    const stored = localStorage.getItem("lang");
    if (stored && translations[stored]) return stored;
  } catch {
    // ignore (private browsing, etc.)
  }
  return DEFAULT_LANGUAGE;
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
