import { motion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./NexusServices.css";

/* Iconos por servicio (orden estable, no traducible) */
const ICONS: React.ReactNode[] = [
  <path key="i0" d="M3 9h18M9 21V9M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />,
  <path key="i1" d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.3-4.3" />,
  <path key="i2" d="M4 5h16M4 12h10M4 19h7M17 14l4 4-4 4" />,
  <path key="i3" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
  <path key="i4" d="M3 3v18h18M7 14l3-3 3 3 5-6" />,
  <path key="i5" d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3ZM9.5 12l2 2 4-4" />,
];

export function NexusServices() {
  const { t } = useNexus();
  const s = t.services;

  const go = () =>
    document.querySelector("#nx-pricing")?.scrollIntoView({ behavior: "smooth" });

  /* JSON-LD: lista de servicios para SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: s.title,
    itemListElement: s.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: item.title, description: item.text },
    })),
  };

  return (
    <section className="nx nx-serv" id="nx-services" aria-labelledby="nx-services-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="nx-serv__head">
        <span className="nx-serv__eyebrow">{s.eyebrow}</span>
        <h2 className="nx-serv__title" id="nx-services-title">{s.title}</h2>
        <p className="nx-serv__sub">{s.sub}</p>
      </div>

      <div className="nx-serv__grid">
        {s.items.map((item, i) => (
          <motion.article
            key={item.title}
            className="nx-serv__card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nx-serv__num">{String(i + 1).padStart(2, "0")}</div>
            <div className="nx-serv__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[i] ?? ICONS[0]}
              </svg>
            </div>
            <h3 className="nx-serv__name">{item.title}</h3>
            <p className="nx-serv__text">{item.text}</p>
            <ul className="nx-serv__points">
              {item.points.map((p) => (
                <li className="nx-serv__point" key={p}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="nx-serv__cta-wrap">
        <button type="button" className="nx-serv__cta" onClick={go}>
          {s.cta}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default NexusServices;
