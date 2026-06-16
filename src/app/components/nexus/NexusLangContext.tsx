import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";
import { NEXUS_DICT, NEXUS_LANGS, type NexusDict, type NexusLang } from "./nexus-i18n";
import { detectCountry, readCachedCountry, regionForCountry } from "./nexus-geo";

/* ── Región y moneda ──────────────────────────────────────── */
export type NexusRegion = "CO" | "EU";

export interface NexusCurrency {
  code: string;          // "COP" | "EUR"
  symbol: string;        // "$" | "€"
  position: "before" | "after";
  locale: string;        // formato numérico
  amounts: Record<string, { value: number | null; label: string | null }>;
}

const CURRENCY: Record<NexusRegion, NexusCurrency> = {
  CO: {
    code: "COP",
    symbol: "$",
    position: "before",
    locale: "es-CO",
    amounts: {
      esencial: { value: 590000, label: null },
      autoridad: { value: 2000000, label: null },
      dominio: { value: null, label: "Desde 3.400.000" },
    },
  },
  EU: {
    code: "EUR",
    symbol: "€",
    position: "after",
    locale: "es-ES",
    amounts: {
      esencial: { value: 390, label: null },
      autoridad: { value: 790, label: null },
      dominio: { value: 1490, label: null },
    },
  },
};

/* Idiomas disponibles por región */
const LANGS_BY_REGION: Record<NexusRegion, NexusLang[]> = {
  CO: ["es", "en"],          // Colombia: solo ES / EN
  EU: ["es", "en", "fr", "it"], // Fuera de Colombia: 4 idiomas
};

interface NexusLangCtx {
  lang: NexusLang;
  setLang: (l: NexusLang) => void;
  t: NexusDict;
  region: NexusRegion;
  currency: NexusCurrency;
  availableLangs: NexusLang[];
}

const Ctx = createContext<NexusLangCtx | null>(null);

function normalize(raw?: string): NexusLang {
  const code = (raw ?? "es").slice(0, 2).toLowerCase();
  return (["es", "en", "fr", "it"].includes(code) ? code : "es") as NexusLang;
}

/** Permite forzar la región para pruebas: /nexus?region=EU  (o ?region=CO). */
function readQueryRegion(): NexusRegion | null {
  try {
    const v = new URLSearchParams(window.location.search).get("region")?.toUpperCase();
    return v === "CO" || v === "EU" ? v : null;
  } catch {
    return null;
  }
}

interface ProviderProps {
  children: ReactNode;
  /** Idioma inicial (p. ej. el del sitio vía useLang()). */
  initialLang?: string;
  /** Fuerza la región (útil para pruebas: "CO" | "EU"). Si se omite, se detecta por IP. */
  forceRegion?: NexusRegion;
}

export function NexusLangProvider({ children, initialLang, forceRegion }: ProviderProps) {
  const [lang, setLang] = useState<NexusLang>(() => normalize(initialLang));
  const [region, setRegion] = useState<NexusRegion>(() => {
    if (forceRegion) return forceRegion;
    const q = readQueryRegion();
    if (q) return q;
    const cached = readCachedCountry();
    return cached ? regionForCountry(cached) : "CO";
  });

  /* Detección por IP al montar (solo cuando no se fuerza la región ni hay
     override por query). Se reconsulta en cada carga → una VPN se refleja al
     recargar. */
  useEffect(() => {
    if (forceRegion) return;
    if (readQueryRegion()) return; // el ?region= manda y desactiva la detección
    let alive = true;
    detectCountry().then((country) => {
      if (!alive || !country) return;
      setRegion(regionForCountry(country));
    });
    return () => { alive = false; };
  }, [forceRegion]);

  const availableLangs = LANGS_BY_REGION[region];

  /* Si la región solo admite ES/EN y el idioma actual no está disponible
     (p. ej. quedó en FR/IT), se vuelve a español automáticamente. */
  useEffect(() => {
    if (!availableLangs.includes(lang)) setLang("es");
  }, [availableLangs, lang]);

  const value = useMemo<NexusLangCtx>(
    () => ({
      lang,
      setLang,
      t: NEXUS_DICT[lang],
      region,
      currency: CURRENCY[region],
      availableLangs,
    }),
    [lang, region, availableLangs]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNexus(): NexusLangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNexus debe usarse dentro de <NexusLangProvider>");
  return ctx;
}

/* ── Selector de idioma (banderas según región) ────────────── */
import "./NexusLangSwitcher.css";

export function NexusLangSwitcher({ floating = false }: { floating?: boolean }) {
  const { lang, setLang, availableLangs } = useNexus();
  const langs = NEXUS_LANGS.filter((l) => availableLangs.includes(l.code));
  return (
    <div
      className={`nx nx-lang ${floating ? "nx-lang--floating" : ""}`}
      role="group"
      aria-label="Seleccionar idioma"
    >
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`nx-lang__btn ${lang === l.code ? "nx-lang__btn--on" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={`Cambiar idioma a ${l.label}`}
        >
          <span aria-hidden="true">{l.flag}</span>
          <span className="nx-lang__code">{l.label}</span>
        </button>
      ))}
    </div>
  );
}
