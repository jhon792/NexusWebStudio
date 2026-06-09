import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useRegion } from "../../hooks/useRegion";
import i18n from "../../i18n";

const navLinksCO = [
  { label: "Servicios", href: "#services" },
  { label: "Ejemplos", href: "#portfolio" },
  { label: "Precios", href: "#pricing" },
  { label: "Proceso", href: "#process" },
  { label: "Contacto", href: "#contact" },
];

const NAV_LINKS_ES: Record<string, { label: string; href: string }[]> = {
  ES: [
    { label: "Servicios", href: "#services" },
    { label: "Ejemplos", href: "#portfolio" },
    { label: "Precios", href: "#pricing" },
    { label: "Proceso", href: "#process" },
    { label: "Contacto", href: "#contact" },
  ],
  EN: [
    { label: "Services", href: "#services" },
    { label: "Examples", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  FR: [
    { label: "Services", href: "#services" },
    { label: "Exemples", href: "#portfolio" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Processus", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  IT: [
    { label: "Servizi", href: "#services" },
    { label: "Esempi", href: "#portfolio" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Processo", href: "#process" },
    { label: "Contatto", href: "#contact" },
  ],
};

const CTA_LABEL: Record<string, string> = {
  ES: "Cotizar",
  EN: "Get a Quote",
  FR: "Devis",
  IT: "Preventivo",
};

const PREMIUM_LABEL: Record<string, string> = {
  ES: "Premium",
  EN: "Premium",
  FR: "Premium",
  IT: "Premium",
};

const SECTIONS = ["services", "portfolio", "pricing", "process", "contact"];

/* Language options per region */
const LANGS_CO = [
  { code: "es-CO", label: "ES", flag: "🇨🇴", href: null },
  { code: "en", label: "EN", flag: "🇺🇸", href: null },
];

const LANGS_ES = [
  { code: "es-ES", label: "Español", flag: "🇪🇸", href: "/en/" },
  { code: "en", label: "English", flag: "🇬🇧", href: "/en/en/" },
  { code: "fr", label: "Français", flag: "🇫🇷", href: "/en/fr/" },
  { code: "it", label: "Italiano", flag: "🇮🇹", href: "/en/it/" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollY = useMotionValue(0);
  const region = useRegion();
  const isCO = region === "CO";
  /* Bloque España cubre ES, EN (inglés en España), FR e IT */
  const isSpainContext = !isCO;

  /* Colombia: active lang via i18n */
  const [activeLangCO, setActiveLangCO] = useState<"es-CO" | "en">(() =>
    i18n.language?.startsWith("en") ? "en" : "es-CO"
  );

  /* Spain: active lang via pathname */
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/en/";
  const activeHrefES = currentPath.startsWith("/en/it") ? "/en/it/"
                     : currentPath.startsWith("/en/fr") ? "/en/fr/"
                     : currentPath.startsWith("/en/en") ? "/en/en/"
                     : "/en/";

  const switchToEN = () => window.location.href = isCO ? "/en/" : "/";

  const blurAmount = useTransform(scrollY, [0, 80], [0, 20]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.93]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/" + href;
  };

  const handleLangCO = (code: "es-CO" | "en") => {
    setActiveLangCO(code);
    i18n.changeLanguage(code);
  };

  const isCOEn = isCO && activeLangCO === "en";
  const navLinks = isCO ? (isCOEn ? NAV_LINKS_ES.EN : navLinksCO) : (NAV_LINKS_ES[region] ?? NAV_LINKS_ES.ES);
  const ctaLabel = isCO ? (isCOEn ? CTA_LABEL.EN : "Cotizar") : (CTA_LABEL[region] ?? CTA_LABEL.ES);
  const premiumLabel = isCO ? PREMIUM_LABEL.ES : (PREMIUM_LABEL[region] ?? PREMIUM_LABEL.ES);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        role="navigation"
        aria-label="Navegación principal"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: useTransform(bgOpacity, (v) => `rgba(9,9,11,${v})`) as any,
            borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`) as any,
            backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`) as any,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href={isCO ? "/" : "/en/"}
              className="flex items-center gap-2.5 group no-min"
              style={{ minHeight: "unset", minWidth: "unset" }}
              onClick={(e) => {
                const target = isCO ? "/" : "/en/";
                if (window.location.pathname === target) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label="Nexus Studio — Inicio"
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}
                whileHover={{ boxShadow: "0 0 22px rgba(99,102,241,0.7), 0 4px 12px rgba(99,102,241,0.4)", scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "12px", color: "#fff", letterSpacing: "-0.02em" }}>NS</span>
              </motion.div>
              <motion.span
                className="hidden sm:block"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", color: "#fff", letterSpacing: "-0.01em" }}
                whileHover={{ color: "#a78bfa" }}
                transition={{ duration: 0.2 }}
              >
                Nexus Studio
              </motion.span>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-0.5 relative" aria-label="Secciones de la página">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="relative px-3.5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "14px", color: isActive ? "#fff" : "rgba(255,255,255,0.6)", background: "transparent", border: "none", minHeight: "36px" }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        style={{ position: "absolute", bottom: 4, left: "20%", right: "20%", height: 2, borderRadius: 1, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", boxShadow: "0 0 6px rgba(99,102,241,0.5)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Enlace landing Premium (Nexus) */}
              <motion.a
                href="/nexus"
                className="relative ml-1 px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#d4af37",
                  textDecoration: "none",
                  minHeight: "36px",
                }}
                whileHover={{ background: "rgba(212,175,55,0.1)" as any }}
                transition={{ duration: 0.15 }}
                aria-label="Ver propuesta Premium"
              >
                <span aria-hidden="true">✦</span>
                {premiumLabel}
              </motion.a>
            </nav>

            {/* Language switcher — desktop */}
            <div className="hidden lg:flex items-center" aria-label="Selector de idioma">
              {isCO ? (
                /* Colombia: ES / EN toggle */
                <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  {LANGS_CO.map((l, idx) => (
                    <span key={l.code} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleLangCO(l.code as "es-CO" | "en")}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: activeLangCO === l.code ? 700 : 500,
                          color: activeLangCO === l.code ? "#fff" : "rgba(255,255,255,0.5)",
                          background: activeLangCO === l.code ? "rgba(99,102,241,0.25)" : "transparent",
                          border: "none",
                          padding: "3px 8px",
                          borderRadius: 999,
                          cursor: "pointer",
                          minHeight: "28px",
                        }}
                        aria-pressed={activeLangCO === l.code}
                        aria-label={`Cambiar idioma a ${l.label}`}
                      >
                        {l.flag} {l.label}
                      </button>
                      {idx < LANGS_CO.length - 1 && (
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: "0 2px" }}>|</span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                /* España: 4 idiomas */
                <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  {LANGS_ES.map((l) => {
                    const isActiveLang = activeHrefES === l.href;
                    return (
                      <a
                        key={l.code}
                        href={l.href!}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          fontWeight: isActiveLang ? 700 : 500,
                          color: isActiveLang ? "#fff" : "rgba(255,255,255,0.45)",
                          background: isActiveLang ? "rgba(99,102,241,0.25)" : "transparent",
                          padding: "3px 7px",
                          borderRadius: 999,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 3,
                          minHeight: "26px",
                          whiteSpace: "nowrap",
                        }}
                        aria-current={isActiveLang ? "page" : undefined}
                        aria-label={`Cambiar idioma a ${l.label}`}
                      >
                        {l.flag} {l.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Region switcher — desktop (solo visible en lg) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={isCO ? "/en/" : "/"}
                className="no-min"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "rgba(167,139,250,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, minHeight: "unset", minWidth: "unset" }}
                aria-label={`Cambiar a versión ${isCO ? "España" : "Colombia"}`}
              >
                {isCO ? "🇪🇸 España" : "🇨🇴 Colombia"} →
              </a>
            </div>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-2">
              <motion.a
                href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg inline-flex items-center gap-2"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.2)", color: "#4ade80", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", textDecoration: "none", minHeight: "36px" }}
                whileHover={{ background: "rgba(37,211,102,0.2)", borderColor: "rgba(37,211,102,0.4)" }}
                transition={{ duration: 0.15 }}
                aria-label="Contactar por WhatsApp"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                </svg>
                WhatsApp
              </motion.a>
              <motion.button
                type="button"
                onClick={() => handleNav("#contact")}
                className="px-4 py-2 rounded-lg cursor-pointer"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", border: "none", boxShadow: "0 4px 14px rgba(99,102,241,0.35)", minHeight: "36px" }}
                whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(99,102,241,0.55)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                aria-label="Cotizar proyecto"
              >
                {ctaLabel}
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              type="button"
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: "rgba(255,255,255,0.7)", background: "none", border: "none", minHeight: "44px", minWidth: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden"
              style={{ background: "rgba(9,9,11,0.98)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              role="dialog"
              aria-label="Menú de navegación"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">

                {/* Language switcher mobile */}
                <div className="mb-2 p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.35)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Idioma
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {isCO ? (
                      LANGS_CO.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => handleLangCO(l.code as "es-CO" | "en")}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            padding: "6px 14px",
                            borderRadius: 999,
                            background: activeLangCO === l.code ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.06)",
                            border: activeLangCO === l.code ? "1px solid rgba(129,140,248,0.5)" : "1px solid rgba(255,255,255,0.1)",
                            color: activeLangCO === l.code ? "#fff" : "rgba(255,255,255,0.55)",
                            cursor: "pointer",
                            minHeight: "36px",
                          }}
                          aria-pressed={activeLangCO === l.code}
                        >
                          {l.flag} {l.label}
                        </button>
                      ))
                    ) : (
                      LANGS_ES.map((l) => {
                        const isActiveLang = activeHrefES === l.href;
                        return (
                          <a
                            key={l.code}
                            href={l.href!}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 13,
                              fontWeight: 600,
                              padding: "6px 12px",
                              borderRadius: 999,
                              background: isActiveLang ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.06)",
                              border: isActiveLang ? "1px solid rgba(129,140,248,0.5)" : "1px solid rgba(255,255,255,0.1)",
                              color: isActiveLang ? "#fff" : "rgba(255,255,255,0.55)",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              minHeight: "36px",
                              whiteSpace: "nowrap",
                            }}
                            aria-current={isActiveLang ? "page" : undefined}
                          >
                            {l.flag} {l.label}
                          </a>
                        );
                      })
                    )}
                  </div>
                  <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <a
                      href={isCO ? "/en/" : "/"}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(167,139,250,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, minHeight: "unset", minWidth: "unset" }}
                    >
                      {isCO ? "🇪🇸 Ver versión España" : "🇨🇴 Ver versión Colombia"} →
                    </a>
                  </div>
                </div>

                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNav(link.href)}
                    className="text-left px-4 py-3 rounded-xl cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "15px", color: activeSection === link.href ? "#a78bfa" : "rgba(255,255,255,0.65)", background: activeSection === link.href ? "rgba(99,102,241,0.1)" : "none", border: "none", minHeight: "48px" }}
                    aria-current={activeSection === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* Enlace landing Premium (Nexus) — móvil */}
                <motion.a
                  href="/nexus"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMobileOpen(false)}
                  className="text-left px-4 py-3 rounded-xl flex items-center gap-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#d4af37",
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.18)",
                    textDecoration: "none",
                    minHeight: "48px",
                  }}
                  aria-label="Ver propuesta Premium"
                >
                  <span aria-hidden="true">✦</span> {premiumLabel}
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className="pt-3 mt-1 flex flex-col gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <a
                    href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.2)", color: "#4ade80", fontFamily: "Inter, sans-serif", fontWeight: 500, textDecoration: "none", minHeight: "48px" }}
                    aria-label="Contactar por WhatsApp"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => handleNav("#contact")}
                    className="w-full px-4 py-3 rounded-xl cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 600, border: "none", minHeight: "48px" }}
                    aria-label="Cotizar proyecto"
                  >
                    {ctaLabel}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
