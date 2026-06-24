import { useParams, useLocation, Navigate } from "react-router";
import { NexusLangProvider } from "../components/nexus/NexusLangContext";
import { NexusTopBar } from "../components/nexus/NexusTopBar";
import { NexusServices } from "../components/nexus/NexusServices";
import { NexusPricing } from "../components/nexus/NexusPricing";
import { NexusTestimonials } from "../components/nexus/NexusTestimonials";
import { ConversionFunnel } from "../components/nexus/ConversionFunnel";
import { NexusFooter } from "../components/nexus/NexusFooter";
import { useLang } from "../../hooks/useLang";
import { usePageSEO } from "../../hooks/usePageSEO";
import { findSector, sectorPath, type Sector, type SectorRegion } from "../../data/sectores";
import "../components/nexus/nexus-theme.css";
import "./SectorPage.css";

const ORIGIN = "https://www.nexsustudio.site";

const scrollTo = (id: string) =>
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

/* Schema por página: Service (con areaServed) + FAQPage (preguntas únicas). */
function SectorSchema({ sector }: { sector: Sector }) {
  const url = ORIGIN + sectorPath(sector);
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Diseño web para ${sector.professionTitle}`,
    name: sector.h1,
    description: sector.description,
    url,
    provider: { "@type": "Organization", name: "Nexus Studio", url: ORIGIN },
    areaServed: { "@type": "Country", name: sector.region === "EU" ? "Spain" : "Colombia" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

function SectorHero({ sector }: { sector: Sector }) {
  return (
    <section className="sec-hero">
      <div className="sec-hero__wrap">
        <span className="sec-hero__eyebrow">{sector.eyebrow}</span>
        <h1 className="sec-hero__title">{sector.h1}</h1>
        <p className="sec-hero__intro">{sector.intro}</p>
        <div className="sec-hero__actions">
          <button type="button" className="sec-btn sec-btn--gold" onClick={() => scrollTo("#nx-funnel")}>
            Solicitar propuesta
          </button>
          <button type="button" className="sec-btn sec-btn--ghost" onClick={() => scrollTo("#nx-pricing")}>
            Ver precios
          </button>
        </div>
      </div>
    </section>
  );
}

function SectorBenefits({ sector }: { sector: Sector }) {
  return (
    <section className="sec-benefits" aria-label={`Ventajas de una web para ${sector.professionTitle}`}>
      <div className="sec-benefits__grid">
        {sector.benefits.map((b) => (
          <article key={b.title} className="sec-card">
            <h2 className="sec-card__title">{b.title}</h2>
            <p className="sec-card__text">{b.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectorFaq({ sector }: { sector: Sector }) {
  return (
    <section className="sec-faq" aria-label="Preguntas frecuentes">
      <div className="sec-faq__wrap">
        <h2 className="sec-faq__title">Preguntas frecuentes</h2>
        {sector.faq.map((f, i) => (
          <details className="sec-faq__item" key={f.q} {...(i === 0 ? { open: true } : {})}>
            <summary className="sec-faq__q">{f.q}</summary>
            <p className="sec-faq__a">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function SectorPage() {
  const { slug = "" } = useParams();
  const { pathname } = useLocation();
  const region: SectorRegion = pathname.startsWith("/es/") ? "EU" : "CO";
  const sector = findSector(region, slug);
  const siteLang = useLang();

  // hreflang solo cuando la misma profesión existe en CO y ES (variantes regionales).
  const hasCO = findSector("CO", slug);
  const hasES = findSector("EU", slug);
  const alternates =
    hasCO && hasES
      ? [
          { hreflang: "es-CO", href: `${ORIGIN}/sectores/${slug}` },
          { hreflang: "es-ES", href: `${ORIGIN}/es/sectores/${slug}` },
          { hreflang: "x-default", href: `${ORIGIN}/sectores/${slug}` },
        ]
      : undefined;

  usePageSEO({
    title: sector?.title ?? "Sector | Nexus Studio",
    description: sector?.description ?? "",
    canonical: sector ? ORIGIN + sectorPath(sector) : `${ORIGIN}${pathname}`,
    htmlLang: region === "EU" ? "es-ES" : "es-CO",
    ogLocale: region === "EU" ? "es_ES" : "es_CO",
    alternates,
  });

  // Slug inexistente → a la home de su región (no se prerenderiza nada inválido).
  if (!sector) return <Navigate to={region === "EU" ? "/es" : "/"} replace />;

  return (
    <NexusLangProvider initialLang={siteLang} forceRegion={region}>
      <SectorSchema sector={sector} />
      <div className="nx" style={{ background: "var(--nx-bg)" }}>
        <NexusTopBar />
        <main>
          <SectorHero sector={sector} />
          <SectorBenefits sector={sector} />
          <NexusServices />
          <NexusPricing />
          <NexusTestimonials />
          <SectorFaq sector={sector} />
          <ConversionFunnel />
        </main>
        <NexusFooter />
      </div>
    </NexusLangProvider>
  );
}
