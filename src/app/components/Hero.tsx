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
                marginBottom: 36, maxWidth: 500,
              }}
            >
              Somos Nexus Studio — diseñamos webs para clínicas, restaurantes,
              abogados y pymes en Colombia que necesitan resultados reales,
              no solo un sitio bonito. +40 negocios ya confían en nosotros.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center gap-2.5 group cursor-pointer"
                style={{
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  borderRadius: 14,
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
                  color: "#fff",
                  boxShadow: "0 8px 36px rgba(99,102,241,0.38), 0 2px 8px rgba(99,102,241,0.20)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 44px rgba(99,102,241,0.55), 0 2px 8px rgba(99,102,241,0.25)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                Ver ejemplos reales de trabajo
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <motion.a
                href="https://wa.me/573123198706?text=Hola%2C%20quiero%20el%20diagn%C3%B3stico%20gratuito%20de%20mi%20p%C3%A1gina%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 cursor-pointer"
                style={{
                  padding: "14px 24px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  borderRadius: 14,
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                }}
                whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.22)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Diagnóstico web gratis (5 min)
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
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
