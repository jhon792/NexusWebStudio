import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PlanetHero } from "./PlanetHero";

const WA = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio.";

const trustItems = [
  "+40 negocios atendidos",
  "Entrega en 3 a 15 días",
  "Resultados verificables",
  "Soporte post-entrega",
  "Sin costos ocultos",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden"
      style={{ background: "#06040f" }}
    >
      {/* ── Fondo deep space ────────────────────────────────────────────── */}

      {/* Grid dual-escala */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
          "linear-gradient(rgba(139,92,246,0.018) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(139,92,246,0.018) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "60px 60px, 60px 60px, 240px 240px, 240px 240px",
      }} />

      {/* Nebulosa principal — top center (fuente de la luz del planeta) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 65% at 72% -5%, rgba(88,28,135,0.24) 0%, rgba(99,102,241,0.12) 45%, transparent 68%)",
      }} />

      {/* Nebulosa violeta — top-left (da profundidad al texto) */}
      <div className="absolute pointer-events-none" style={{
        top: "-15%", left: "-10%", width: "65%", height: "80%",
        background: "radial-gradient(ellipse 75% 65% at 45% 45%, rgba(76,29,149,0.18) 0%, rgba(109,40,217,0.06) 55%, transparent 75%)",
        filter: "blur(55px)",
      }} />

      {/* Nebulosa azul — right (envuelve el planeta) */}
      <div className="absolute pointer-events-none" style={{
        top: "5%", right: "-15%", width: "70%", height: "90%",
        background: "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(37,99,235,0.16) 0%, rgba(59,130,246,0.07) 55%, transparent 78%)",
        filter: "blur(60px)",
      }} />

      {/* Nebulosa bottom — profundidad inferior */}
      <div className="absolute pointer-events-none" style={{
        bottom: "-20%", left: "15%", width: "70%", height: "60%",
        background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(126,34,206,0.12) 0%, transparent 70%)",
        filter: "blur(65px)",
      }} />

      {/* Resplandor ambiental — centro general */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 120% 70% at 65% 50%, rgba(49,46,129,0.10) 0%, transparent 60%)",
      }} />

      {/* ── Contenido ────────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Columna izquierda: copy ─────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{
                background: "rgba(99,102,241,0.10)",
                border: "1px solid rgba(99,102,241,0.28)",
              }}>
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span style={{
                  fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
                  color: "rgba(255,255,255,0.72)",
                }}>
                  Solo quedan 2 cupos disponibles en junio
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                lineHeight: 1.07,
                letterSpacing: "-0.036em",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              Diseño web que{" "}
              <span style={{
                background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #c084fc 80%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                genera clientes
              </span>
              <br />para tu negocio
              <br />en Colombia.
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontFamily: "Inter, sans-serif", fontWeight: 400,
                fontSize: "1.1rem", lineHeight: 1.78,
                color: "rgba(255,255,255,0.48)",
                marginBottom: 24, maxWidth: 500,
              }}
            >
              Somos Nexus Studio — diseñamos webs para clínicas, restaurantes,
              abogados y pymes en Villavicencio, Bogotá y Medellín que necesitan
              resultados reales, no solo un sitio bonito. +40 negocios ya confían en nosotros.
            </motion.p>

            {/* Ciudades que atendemos */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                color: "rgba(255,255,255,0.32)", flexShrink: 0,
              }}>
                Atendemos en:
              </span>
              {[
                { label: "Villavicencio", href: "/villavicencio" },
                { label: "Bogotá", href: "/bogota" },
                { label: "Medellín", href: "/medellin" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "4px 12px", borderRadius: 999,
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.22)",
                    fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12,
                    color: "rgba(199,193,255,0.75)",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  {label}
                </a>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 cursor-pointer"
                style={{
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  borderRadius: 14,
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
                  color: "#fff",
                  textDecoration: "none",
                  boxShadow: "0 8px 36px rgba(99,102,241,0.38), 0 2px 8px rgba(99,102,241,0.20)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 44px rgba(99,102,241,0.55), 0 2px 8px rgba(99,102,241,0.25)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 17.605 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                </svg>
                Cotizar gratis — WhatsApp
              </motion.a>

              <motion.button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center gap-2 cursor-pointer"
                style={{
                  padding: "14px 24px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  borderRadius: 14,
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
                  color: "rgba(255,255,255,0.80)",
                }}
                whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.22)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Ver ejemplos de diseño
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={14} style={{ color: "#818cf8", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13,
                    color: "rgba(255,255,255,0.52)",
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Columna derecha: Planeta ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
            style={{ overflow: "visible" }}
          >
            <PlanetHero />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
