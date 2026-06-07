import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useRegion } from "../../hooks/useRegion";

const navLinks = [
  { label: "Servicios", href: "#services" },
  { label: "Ejemplos", href: "#portfolio" },
  { label: "Planes", href: "#pricing" },
  { label: "Proceso", href: "#process" },
  { label: "Contacto", href: "#contact" },
];

const SECTIONS = ["services", "portfolio", "pricing", "process", "contact"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollY = useMotionValue(0);
  const region = useRegion();
  const isCO = region === "CO";
  const switchHref = isCO ? "/en/" : "/";
  const currentFlag = isCO ? "🇨🇴" : "🇪🇸";
  const currentLabel = isCO ? "Colombia" : "España";
  const switchFlag = isCO ? "🇪🇸" : "🇨🇴";
  const switchLabel = isCO ? "España" : "Colombia";

  /* Smooth backdrop */
  const blurAmount = useTransform(scrollY, [0, 80], [0, 20]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.93]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  /* Sync scrollY */
  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`).get
            ? undefined
            : undefined,
        }}
        className="fixed top-0 left-0 right-0 z-50"
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Backdrop motion layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) => `rgba(9,9,11,${v})`
            ) as any,
            borderBottom: useTransform(
              borderOpacity,
              (v) => `1px solid rgba(255,255,255,${v})`
            ) as any,
            backdropFilter: useTransform(
              blurAmount,
              (v) => `blur(${v}px)`
            ) as any,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label="Nexus Studio — Inicio"
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }}
                whileHover={{
                  boxShadow: "0 0 22px rgba(99,102,241,0.7), 0 4px 12px rgba(99,102,241,0.4)",
                  scale: 1.08,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "12px",
                    color: "#fff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  NS
                </span>
              </motion.div>
              <motion.span
                className="hidden sm:block"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
                whileHover={{ color: "#a78bfa" }}
                transition={{ duration: 0.2 }}
              >
                Nexus Studio
              </motion.span>
            </a>

            {/* Desktop nav links con underline animado */}
            <nav className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="relative px-3.5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                      background: "transparent",
                      border: "none",
                    }}
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
                        style={{
                          position: "absolute",
                          bottom: 4,
                          left: "20%",
                          right: "20%",
                          height: 2,
                          borderRadius: 1,
                          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                          boxShadow: "0 0 6px rgba(99,102,241,0.5)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Region / Language switcher — desktop */}
            <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                {currentFlag} {currentLabel}
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 4px", fontSize: 11 }}>|</span>
              <a
                href={switchHref}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(167,139,250,0.75)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(167,139,250,0.75)"; }}
                aria-label={`Cambiar a versión ${switchLabel}`}
              >
                {switchFlag} {switchLabel}
              </a>
            </div>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg inline-flex items-center gap-2"
                style={{
                  background: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.2)",
                  color: "#4ade80",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
                whileHover={{ background: "rgba(37,211,102,0.2)", borderColor: "rgba(37,211,102,0.4)" }}
                transition={{ duration: 0.15 }}
                aria-label="Contactar por WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                </svg>
                WhatsApp
              </motion.a>
              <motion.button
                onClick={() => handleNav("#contact")}
                className="px-4 py-2 rounded-lg cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(99,102,241,0.55)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                Cotizar Proyecto
              </motion.button>
            </div>

            {/* Mobile hamburger animado */}
            <motion.button
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: "rgba(255,255,255,0.7)", background: "none", border: "none" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — slide desde arriba con cascade */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
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
            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden"
              style={{
                background: "rgba(9,9,11,0.98)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
                {/* Region switcher — mobile */}
                <motion.a
                  href={switchHref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02, duration: 0.3 }}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-1"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", textDecoration: "none" }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                    {currentFlag} {currentLabel}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#a78bfa" }}>
                    Cambiar a {switchFlag} {switchLabel} →
                  </span>
                </motion.a>

                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 + 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNav(link.href)}
                    className="text-left px-4 py-3 rounded-xl cursor-pointer"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: activeSection === link.href ? "#a78bfa" : "rgba(255,255,255,0.65)",
                      background: activeSection === link.href ? "rgba(99,102,241,0.1)" : "none",
                      border: "none",
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.35 }}
                  className="pt-3 mt-2 flex flex-col gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <a
                    href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(37,211,102,0.12)",
                      border: "1px solid rgba(37,211,102,0.2)",
                      color: "#4ade80",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => handleNav("#contact")}
                    className="w-full px-4 py-3 rounded-xl cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      border: "none",
                    }}
                  >
                    Cotizar Proyecto
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
