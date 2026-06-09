import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import heroImg from "../../../image/hero.webp";
import "./HeroNexus.css";

const ROTATE_MS = 2600;

interface HeroNexusProps {
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
}

export function HeroNexus({ onPrimaryCta, onSecondaryCta }: HeroNexusProps) {
  const { t } = useNexus();
  const h = t.hero;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  /* Loop del nicho objetivo */
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % h.niches.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [reduce, h.niches.length]);

  /* Reinicia el índice al cambiar de idioma para no salir de rango */
  useEffect(() => setIndex(0), [h.niches]);

  const goPrimary = useCallback(() => {
    if (onPrimaryCta) return onPrimaryCta();
    document.querySelector("#nx-funnel")?.scrollIntoView({ behavior: "smooth" });
  }, [onPrimaryCta]);

  const goSecondary = useCallback(() => {
    if (onSecondaryCta) return onSecondaryCta();
    document.querySelector("#nx-portfolio")?.scrollIntoView({ behavior: "smooth" });
  }, [onSecondaryCta]);

  const niche = h.niches[index] ?? h.niches[0];

  return (
    <section className="nx nx-hero" aria-label="Nexus Studio">
      <div className="nx-hero__grid">
        <div className="nx-hero__copy">
          <motion.span
            className="nx-hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="nx-hero__eyebrow-dot" />
            {h.eyebrow}
          </motion.span>

          <motion.h1
            className="nx-hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="nx-hero__title-lead">{h.titleLead}</span>{" "}
            <span className="nx-hero__rotator" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={niche}
                  className="nx-hero__niche"
                  initial={{ opacity: 0, y: "0.35em", filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-0.35em", filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {niche}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="nx-hero__subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            className="nx-hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticCta onClick={goPrimary}>{h.ctaPrimary}</MagneticCta>

            <button type="button" className="nx-cta--ghost" onClick={goSecondary}>
              {h.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="nx-hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <div className="nx-hero__avatars" aria-hidden="true">
              {[
                { l: "E", c: "#0b2240" },
                { l: "O", c: "#16365c" },
                { l: "A", c: "#d4af37" },
              ].map((a) => (
                <span key={a.l} className="nx-hero__avatar" style={{ background: a.c }}>
                  {a.l}
                </span>
              ))}
            </div>
            <span>{h.trust}</span>
          </motion.div>
        </div>

        <motion.div
          className="nx-hero__visual"
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 1.4 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="nx-hero__card">
            <div className="nx-hero__card-bar" aria-hidden="true">
              <span /><span /><span />
            </div>
            <img
              className="nx-hero__img"
              src={heroImg}
              alt={h.eyebrow}
              width={420}
              loading="eager"
              decoding="async"
            />
          </div>

          <motion.div
            className="nx-hero__float"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="nx-hero__float-num">+38%</span>
            <span className="nx-hero__float-label">{h.float}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticCta({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button ref={ref} type="button" className="nx-cta" onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}>
      {!reduce && <span className="nx-cta__pulse" aria-hidden="true" />}
      {children}
      <span className="nx-cta__arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}

export default HeroNexus;
