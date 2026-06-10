import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esCOCommon from "./locales/es-CO/common.json";
import esCOPricing from "./locales/es-CO/pricing.json";
import esESCommon from "./locales/es-ES/common.json";
import esESPricing from "./locales/es-ES/pricing.json";
import enCommon from "./locales/en/common.json";
import enPricing from "./locales/en/pricing.json";

export type AppLanguage = "es-CO" | "es-ES" | "en" | "fr" | "it";

export function getLangFromPath(pathname: string): AppLanguage {
  if (pathname.startsWith("/en/en")) return "en";
  if (pathname.startsWith("/en/fr")) return "fr";
  if (pathname.startsWith("/en/it")) return "it";
  if (pathname.startsWith("/en"))   return "es-ES";
  return "es-CO";
}

i18n.use(initReactI18next).init({
  resources: {
    "es-CO": { common: esCOCommon, pricing: esCOPricing },
    "es-ES": { common: esESCommon, pricing: esESPricing },
    en:      { common: enCommon,   pricing: enPricing },
    /* FR e IT usan es-ES como base hasta que existan traducciones propias */
    fr:      { common: esESCommon, pricing: esESPricing },
    it:      { common: esESCommon, pricing: esESPricing },
  },
  // Guarda SSR: en el prerender (Node) no existe `window`. Por defecto es-CO;
  // el cliente ajusta el idioma por ruta vía LanguageSync al hidratar.
  lng: getLangFromPath(typeof window !== "undefined" ? window.location.pathname : "/"),
  fallbackLng: "es-CO",
  ns: ["common", "pricing"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
