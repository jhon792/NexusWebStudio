import { useNexus } from "./NexusLangContext";
import "./FaqSchema.css";

interface FaqSchemaProps {
  /** Si true, inyecta el JSON-LD de FAQPage para rich results de Google. */
  injectSchema?: boolean;
}

export function FaqSchema({ injectSchema = true }: FaqSchemaProps) {
  const { t } = useNexus();
  const f = t.faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="nx nx-faq" id="nx-faq" aria-label="Preguntas frecuentes">
      {injectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="nx-faq__wrap">
        <div className="nx-faq__head">
          <span className="nx-faq__eyebrow">{f.eyebrow}</span>
          <h2 className="nx-faq__title">{f.title}</h2>
        </div>

        <div className="nx-faq__list">
          {f.items.map((item, i) => (
            <details className="nx-faq__item" key={item.q} {...(i === 0 ? { open: true } : {})}>
              <summary className="nx-faq__q">
                {item.q}
                <span className="nx-faq__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="nx-faq__body">
                <div className="nx-faq__body-inner">
                  <p className="nx-faq__a">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>

        <p className="nx-faq__foot">
          {f.foot} <a href="#nx-funnel">{f.footLink}</a>
        </p>
      </div>
    </section>
  );
}

export default FaqSchema;
