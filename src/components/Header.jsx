import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-white/10 px-6 py-3 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <nav className="flex items-center gap-5 sm:gap-7">
          <a
            href="#top"
            className="text-sm font-medium text-white/80 transition hover:text-white sm:text-base"
          >
            {t.navProfile}
          </a>
          <a
            href="#portfolio"
            className="text-sm font-medium text-white/80 transition hover:text-white sm:text-base"
          >
            {t.navProjects}
          </a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
