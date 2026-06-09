import { useState, useEffect } from "react";
import i18n from "../i18n";

/** Returns the current i18n language and re-renders when it changes. */
export function useLang(): string {
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    const handler = (lng: string) => setLang(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);
  return lang;
}
