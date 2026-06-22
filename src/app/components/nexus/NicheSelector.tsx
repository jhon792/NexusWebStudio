import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./NicheSelector.css";

/** useLayoutEffect en cliente, useEffect en servidor (evita el warning SSR). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Ejemplo real en vivo por sector (mismo enlace para todos los idiomas) */
const DEMO_URLS: Record<string, string> = {
  estetica: "https://clinica-estetica-delta-three.vercel.app/",
  odontologia: "https://clinica-odontologica-ashy.vercel.app/",
  abogados: "https://despacho11.vercel.app/",
};

/* Captura (imagen) de cada sitio para la vista previa de la tarjeta.
   WebP optimizado (≈900px, q78): ~60% más liviano que el JPG original. */
const DEMO_SHOTS: Record<string, string> = {
  estetica: "/previews/estetica.webp",
  odontologia: "/previews/odontologia.webp",
  abogados: "/previews/abogados.webp",
};

/* Etiqueta del botón "Ver" según idioma */
const VIEW_LABEL: Record<string, string> = {
  es: "Ver ejemplo",
  en: "View example",
  fr: "Voir l'exemple",
  it: "Vedi esempio",
};

export function NicheSelector() {
  const { t, lang } = useNexus();
  const data = t.niche;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const niche = data.items[active];

  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useIsoLayoutEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelectorAll<HTMLButtonElement>(".nx-niche__tab")[active];
    if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active, data]);

  const select = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  /* El título lleva la palabra clave resaltada (titleEm) en cursiva dorada */
  const renderTitle = () => {
    const parts = data.title.split(data.titleEm);
    if (parts.length < 2) return data.title;
    return (
      <>
        {parts[0]}
        <em>{data.titleEm}</em>
        {parts.slice(1).join(data.titleEm)}
      </>
    );
  };

  return (
    <section className="nx nx-niche" id="nx-portfolio" aria-label="Soluciones por sector">
      <div className="nx-niche__head">
        <h2 className="nx-niche__title">{renderTitle()}</h2>
        <p className="nx-niche__lead">{data.lead}</p>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto 2.8rem" }}>
        <div className="nx-niche__tabs" role="tablist" ref={tabsRef} aria-label="Seleccionar sector">
          <motion.span
            className="nx-niche__pill"
            aria-hidden="true"
            animate={{ left: pill.left, width: pill.width }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
          {data.items.map((n, i) => (
            <button
              key={n.id}
              role="tab"
              id={`nx-tab-${n.id}`}
              aria-selected={active === i}
              aria-controls={`nx-panel-${n.id}`}
              className="nx-niche__tab"
              onClick={() => select(i)}
            >
              {n.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="nx-niche__stage">
        <div className="nx-niche__panel" role="tabpanel" id={`nx-panel-${niche.id}`} aria-labelledby={`nx-tab-${niche.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={niche.id + active}
              initial={{ opacity: 0, x: dir * 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -26 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="nx-niche__kicker">{niche.kicker}</span>
              <h3 className="nx-niche__h3">{niche.title}</h3>
              <p className="nx-niche__text">{niche.text}</p>

              <ul className="nx-niche__points">
                {niche.points.map((p) => (
                  <li key={p} className="nx-niche__point">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="nx-niche__metrics">
                {niche.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="nx-niche__metric-num">{m.num}</div>
                    <div className="nx-niche__metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="nx-niche__viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={niche.id + active}
              className="nx-niche__mock"
              initial={{ opacity: 0, x: 36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -36, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Barra tipo navegador */}
              <div className="nx-niche__bar">
                <span className="nx-niche__dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="nx-niche__url">
                  {DEMO_URLS[niche.id].replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
                <a
                  className="nx-niche__view"
                  href={DEMO_URLS[niche.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${VIEW_LABEL[lang] ?? VIEW_LABEL.es} — ${niche.tab}`}
                >
                  {VIEW_LABEL[lang] ?? VIEW_LABEL.es}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>

              {/* Vista previa del sitio real (imagen / captura) */}
              <div className="nx-niche__frame">
                <img
                  className="nx-niche__shot"
                  src={DEMO_SHOTS[niche.id]}
                  alt={`Vista previa del sitio — ${niche.tab}`}
                  width={900}
                  height={632}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <a
                  className="nx-niche__frame-link"
                  href={DEMO_URLS[niche.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${VIEW_LABEL[lang] ?? VIEW_LABEL.es} — ${niche.tab}`}
                />
              </div>

              <div className="nx-niche__mock-chip">
                <span className="nx-niche__mock-chip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z" />
                  </svg>
                </span>
                {niche.chip}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default NicheSelector;
