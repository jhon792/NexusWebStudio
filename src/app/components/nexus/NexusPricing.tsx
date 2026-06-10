import { motion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import { PLAN_FEATURES, PLAN_NOT_INCLUDED, PLAN_NOT_INCLUDED_TITLE } from "./nexus-plan-features";
import "./NexusPricing.css";

/* Plan destacado (no depende de la moneda) */
const FEATURED: Record<string, boolean> = { esencial: false, autoridad: true, dominio: false };

/* Banderas de los idiomas que incluye la web entregada (universales). */
const PLAN_FLAGS: Record<string, string[]> = {
  esencial: ["🇪🇸"],
  autoridad: ["🇪🇸", "🇬🇧", "🇫🇷"],
  dominio: ["🇪🇸", "🇬🇧", "🇫🇷", "🇮🇹", "🇩🇪"],
};

interface NexusPricingProps {
  onSelect?: (planId: string) => void;
}

export function NexusPricing({ onSelect }: NexusPricingProps) {
  const { t, currency, region, lang } = useNexus();
  const p = t.pricing;

  /* Mismas características para Colombia y España (solo cambia el precio). */
  const featuresFor = (planId: string, fallback: string[]) =>
    PLAN_FEATURES[lang]?.[planId] ?? fallback;
  const notIncludedFor = (planId: string) => PLAN_NOT_INCLUDED[lang]?.[planId] ?? [];

  const go = (planId: string) => {
    if (onSelect) return onSelect(planId);
    document.querySelector("#nx-funnel")?.scrollIntoView({ behavior: "smooth" });
  };

  /* Nota con la moneda correcta (el diccionario trae "COP"; fuera de CO → "EUR") */
  const noteFor = (note: string) => (region === "CO" ? note : note.replace("COP", "EUR"));

  /* Renderiza el importe respetando símbolo y posición de la moneda */
  const renderAmount = (planId: string) => {
    const a = currency.amounts[planId] ?? { value: null, label: null };
    if (a.value === null) {
      return (
        <span className="nx-price__num">
          {currency.position === "before" ? currency.symbol : ""}
          {a.label}
          {currency.position === "after" ? ` ${currency.symbol}` : ""}
        </span>
      );
    }
    const num = a.value.toLocaleString(currency.locale);
    return (
      <>
        {currency.position === "before" && <span className="nx-price__currency">{currency.symbol}</span>}
        <span className="nx-price__num">{num}</span>
        {currency.position === "after" && <span className="nx-price__currency">&nbsp;{currency.symbol}</span>}
      </>
    );
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Diseño web y SEO para profesionales",
    provider: { "@type": "Organization", name: "Nexus Studio" },
    areaServed: region === "CO" ? "CO" : "ES",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: p.title,
      itemListElement: p.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        priceCurrency: currency.code,
        price: currency.amounts[plan.id]?.value ?? (region === "CO" ? 2500000 : 1490),
        description: plan.for,
        category: "WebsiteDesign",
      })),
    },
  };

  return (
    <section className="nx nx-price" id="nx-pricing" aria-labelledby="nx-pricing-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="nx-price__head">
        <span className="nx-price__eyebrow">{p.eyebrow}</span>
        <h2 className="nx-price__title" id="nx-pricing-title">{p.title}</h2>
        <p className="nx-price__sub">{p.sub}</p>
      </div>

      <div className="nx-price__grid">
        {p.plans.map((plan, i) => {
          const featured = FEATURED[plan.id] ?? false;
          return (
            <motion.article
              key={plan.id}
              className={`nx-price__card ${featured ? "nx-price__card--featured" : ""}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {plan.badge && <span className="nx-price__badge">{plan.badge}</span>}

              <h3 className="nx-price__plan">{plan.name}</h3>
              <p className="nx-price__for">{plan.for}</p>

              <div className="nx-price__amount">{renderAmount(plan.id)}</div>
              <p className="nx-price__note">{noteFor(plan.note)}</p>

              {/* Los idiomas son gancho de venta en Europa; en Colombia sobran. */}
              {region !== "CO" && p.langs[plan.id] && (
                <div className="nx-price__langs">
                  <span className="nx-price__flags" aria-hidden="true">
                    {(PLAN_FLAGS[plan.id] ?? []).map((flag, idx) => (
                      <span key={idx} className="nx-price__flag">{flag}</span>
                    ))}
                  </span>
                  <span className="nx-price__langs-text">{p.langs[plan.id]}</span>
                </div>
              )}

              <div className="nx-price__divider" />

              <ul className="nx-price__features">
                {featuresFor(plan.id, plan.features).map((f) => (
                  <li className="nx-price__feature" key={f}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {notIncludedFor(plan.id).length > 0 && (
                <div className="nx-price__excluded">
                  <div className="nx-price__excluded-title">{PLAN_NOT_INCLUDED_TITLE[lang]}</div>
                  <ul className="nx-price__features">
                    {notIncludedFor(plan.id).map((f) => (
                      <li className="nx-price__exfeature" key={f}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                onClick={() => go(plan.id)}
                className={`nx-price__cta ${featured ? "nx-price__cta--gold" : ""}`}
              >
                {plan.cta}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            </motion.article>
          );
        })}
      </div>

      <div className="nx-price__foot">
        {p.trust.map((tx) => (
          <span key={tx}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {tx}
          </span>
        ))}
      </div>
    </section>
  );
}

export default NexusPricing;
