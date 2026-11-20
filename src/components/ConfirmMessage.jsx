import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import TechButton from "./TechButton";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Server status → translation key for the result message.
const RESULT_KEYS = {
  confirmed: "confirmDone",
  already: "confirmAlready",
  expired: "confirmExpired",
  invalid: "confirmInvalid",
};

// Second step of the contact form's double opt-in. The confirmation email links
// to ramonvalerio.com/?confirm=<token>; the message is only sent when the visitor
// clicks the button here, so email scanners that open links cannot confirm it.
export default function ConfirmMessage() {
  const { t } = useLanguage();
  const [token, setToken] = useState(null);
  const [state, setState] = useState("ready"); // ready | sending | done

  const [resultKey, setResultKey] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("confirm");
    if (value && UUID_PATTERN.test(value)) setToken(value);
  }, []);

  if (!token) return null;

  const close = () => {
    // drop ?confirm from the address bar so a reload does not reopen this
    const url = new URL(window.location.href);
    url.searchParams.delete("confirm");
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    setToken(null);
  };

  const confirm = async () => {
    setState("sending");
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/confirm-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ token }),
      });
      const result = await response.json().catch(() => ({}));
      setResultKey(RESULT_KEYS[result.status] ?? "confirmError");
    } catch {
      setResultKey("confirmError");
    }
    setState("done");
  };

  const succeeded = resultKey === "confirmDone" || resultKey === "confirmAlready";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-message-title"
      data-scrollable
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-surface)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
        <h2 id="confirm-message-title" className="text-2xl font-semibold text-white">
          {state === "done" ? (succeeded ? t.confirmDoneTitle : t.confirmFailedTitle) : t.confirmTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/60" aria-live="polite">
          {state === "done" ? t[resultKey] : t.confirmText}
        </p>
        <div className="mt-7 flex justify-center gap-3">
          {state === "done" ? (
            <TechButton type="button" tone="blue" onClick={close}>
              {t.close}
            </TechButton>
          ) : (
            <TechButton type="button" onClick={confirm} disabled={state === "sending"}>
              {state === "sending" ? t.contactFormSending : t.confirmButton}
            </TechButton>
          )}
        </div>
      </div>
    </div>
  );
}
