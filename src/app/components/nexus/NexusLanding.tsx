import { HeroNexus } from "./HeroNexus";
import { NicheSelector } from "./NicheSelector";
import { ConversionFunnel } from "./ConversionFunnel";
import { TrustGuarantees } from "./TrustGuarantees";
import { NexusServices } from "./NexusServices";
import { NexusSeo } from "./NexusSeo";
import { NexusPricing } from "./NexusPricing";
import { NexusTestimonials } from "./NexusTestimonials";
import { FaqSchema } from "./FaqSchema";
import { NexusFooter } from "./NexusFooter";
import { NexusTopBar } from "./NexusTopBar";
import { NexusLangProvider, type NexusRegion } from "./NexusLangContext";
import { NexusBusinessSchema } from "./NexusBusinessSchema";
import { useLang } from "../../../hooks/useLang";
import { usePageSEO } from "../../../hooks/usePageSEO";
import "./nexus-theme.css";

const ORIGIN = "https://www.nexsustudio.site";

/* Clúster hreflang bidireccional: ambas URLs (/ y /es) declaran todas las
   variantes, incluida ella misma — requisito de Google. */
const HREFLANG_CLUSTER = [
  { hreflang: "es-CO", href: `${ORIGIN}/` },
  { hreflang: "es-ES", href: `${ORIGIN}/es` },
  { hreflang: "x-default", href: `${ORIGIN}/` },
];

/* Meta por región. /es (EU) deja de heredar el canonical de Colombia. */
const SEO_BY_REGION = {
  EU: {
    title: "Diseño Web Profesional en España | Páginas Web desde 390 € | Nexus Studio",
    description:
      "Diseño y desarrollo web profesional en España. Páginas web desde 390 €, SEO incluido y entrega rápida. Webs que convierten visitantes en clientes. Pide presupuesto gratis.",
    canonical: `${ORIGIN}/es`,
    ogLocale: "es_ES",
    htmlLang: "es-ES",
  },
  CO: {
    title: "Diseño Web Profesional en Colombia | Bogotá, Medellín, Villavicencio | Nexus Studio",
    description:
      "Nexus Studio: diseño y desarrollo web profesional en Colombia. Páginas web desde $590.000 COP, entrega en 10 días. Cotiza gratis por WhatsApp.",
    canonical: `${ORIGIN}/`,
    ogLocale: "es_CO",
    htmlLang: "es-CO",
  },
} as const;

/**
 * Landing premium completa — mismo diseño para Colombia y España.
 * - region="CO" → COP, idiomas ES/EN.
 * - region="EU" → EUR, idiomas ES/EN/FR/IT.
 * - sin region  → se detecta por IP (página unificada /nexus).
 */
export function NexusLanding({ region }: { region?: NexusRegion } = {}) {
  const siteLang = useLang();

  /* La región se pasa explícita en /es (EU) y / (CO). El alias /nexus (region
     indefinida) consolida hacia el canonical de Colombia. */
  const effectiveRegion: NexusRegion = region === "EU" ? "EU" : "CO";
  const seo = SEO_BY_REGION[effectiveRegion];
  usePageSEO({ ...seo, alternates: HREFLANG_CLUSTER });

  return (
    <NexusLangProvider initialLang={siteLang} forceRegion={region}>
      <div className="nx" style={{ background: "var(--nx-bg)" }}>
        <NexusBusinessSchema region={effectiveRegion} />
        <NexusTopBar />
        <main>
        <HeroNexus />
        <NicheSelector />
        <TrustGuarantees />
        <NexusServices />
        <NexusSeo />
        <NexusPricing />
        <NexusTestimonials />
        <FaqSchema />
        <ConversionFunnel />
        </main>
        <NexusFooter />
      </div>
    </NexusLangProvider>
  );
}

export default NexusLanding;
