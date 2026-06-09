import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNexus, NexusLangSwitcher } from "./NexusLangContext";
import "./NexusTopBar.css";

const SECTIONS = [
  { key: "sectors", href: "#nx-portfolio" },
  { key: "services", href: "#nx-services" },
  { key: "pricing", href: "#nx-pricing" },
  { key: "faq", href: "#nx-faq" },
] as const;

export function NexusTopBar() {
  const { t, region } = useNexus();
  const nav = t.nav;
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
  const toTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const label = (key: string) => nav[key as keyof typeof nav];

  return (
    <header className={`nx nx-topbar ${solid ? "nx-topbar--solid" : ""}`}>
      <div className="nx-topbar__inner">
        <button type="button" className="nx-topbar__brand" onClick={toTop} aria-label="Nexus Studio — Inicio">
          <span className="nx-topbar__logo">NS</span>
          <span className="nx-topbar__name">Nexus Studio</span>
        </button>

        <nav className="nx-topbar__nav" aria-label="Secciones">
          {SECTIONS.map((s) => (
            <button key={s.key} type="button" className="nx-topbar__link" onClick={() => scrollTo(s.href)}>
              {label(s.key)}
            </button>
          ))}
        </nav>

        <div className="nx-topbar__right">
          <span className="nx-topbar__region" title="Región detectada por IP">
            {region === "CO" ? "🇨🇴 COP" : "🇪🇺 EUR"}
          </span>
          <NexusLangSwitcher />
          <button type="button" className="nx-topbar__cta" onClick={() => scrollTo("#nx-funnel")}>
            {nav.cta}
          </button>
          <button
            type="button"
            className="nx-topbar__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nx-topbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nx-topbar__mobile-inner">
              {SECTIONS.map((s) => (
                <button key={s.key} type="button" className="nx-topbar__mlink" onClick={() => scrollTo(s.href)}>
                  {label(s.key)}
                </button>
              ))}
              <button type="button" className="nx-topbar__mcta" onClick={() => scrollTo("#nx-funnel")}>
                {nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NexusTopBar;
