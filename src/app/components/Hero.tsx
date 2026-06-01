import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PlanetHero } from "./PlanetHero";

const WA = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio.";

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
  </svg>
);

const trustItems = [
  "Diseño Profesional",
  "Optimización para Google",
  "Compatible con Celulares",
  "Integración con WhatsApp",
  "Certificado SSL",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function WebsiteMockup() {
  return (
    <div className="relative w-full max-w-lg" style={{ filter: "drop-shadow(0 40px 100px rgba(99,102,241,0.2))" }}>
      {/* Main browser frame */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div
            className="flex-1 rounded-lg px-3 py-1.5 flex items-center gap-2"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              clinica-estetica-premium.com
            </span>
          </div>
        </div>

        {/* Website preview */}
        <div className="relative overflow-hidden" style={{ height: "240px", background: "linear-gradient(160deg, #0d0d14 0%, #0a0a12 100%)" }}>
          {/* Nav mock */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="h-2 w-16 rounded" style={{ background: "rgba(139,92,246,0.8)" }} />
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-1.5 w-8 rounded" style={{ background: "rgba(255,255,255,0.15)" }} />
              ))}
            </div>
            <div className="h-6 w-16 rounded-lg" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} />
          </div>

          {/* Hero mock */}
          <div className="px-4 pt-4 pb-2">
            <div className="h-1.5 w-20 rounded-full mb-2" style={{ background: "rgba(139,92,246,0.5)" }} />
            <div className="h-3.5 w-52 rounded mb-1.5" style={{ background: "rgba(255,255,255,0.85)" }} />
            <div className="h-3 w-44 rounded mb-1" style={{ background: "rgba(255,255,255,0.35)" }} />
            <div className="h-3 w-36 rounded mb-4" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="flex gap-2 mb-5">
              <div className="h-7 w-28 rounded-xl" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }} />
              <div className="h-7 w-24 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { color: "#6366f1" },
                { color: "#8b5cf6" },
                { color: "#a855f7" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-2.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="h-4 w-4 rounded-lg mb-2" style={{ background: `${card.color}30` }} />
                  <div className="h-2 w-full rounded mb-1" style={{ background: "rgba(255,255,255,0.2)" }} />
                  <div className="h-1.5 w-2/3 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating phone */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-6 -right-8"
        style={{
          width: "90px",
          background: "rgba(15,15,20,0.98)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          padding: "8px 6px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
        }}
      >
        <div className="h-1.5 w-10 rounded-full mx-auto mb-2" style={{ background: "rgba(255,255,255,0.12)" }} />
        <div className="overflow-hidden rounded-xl" style={{ height: "150px", background: "#09090b" }}>
          <div className="p-2">
            <div className="h-1.5 w-8 rounded mb-1.5" style={{ background: "rgba(139,92,246,0.6)" }} />
            <div className="h-2.5 w-full rounded mb-1" style={{ background: "rgba(255,255,255,0.75)" }} />
            <div className="h-2 w-3/4 rounded mb-3" style={{ background: "rgba(255,255,255,0.25)" }} />
            <div className="h-6 w-full rounded-xl mb-2" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }} />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-9 w-full rounded-xl mb-1.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              />
            ))}
          </div>
        </div>
        <div className="h-1 w-7 rounded-full mx-auto mt-2" style={{ background: "rgba(255,255,255,0.12)" }} />
      </motion.div>

      {/* Floating WhatsApp notification */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 -left-8 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
        style={{
          background: "rgba(12,12,18,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          minWidth: "185px",
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(37,211,102,0.15)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#fff" }}>
            Nuevo cliente via web
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
            Solicita cotización · ahora
          </div>
        </div>
      </motion.div>

      {/* Performance badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-5 -right-6 rounded-2xl p-3"
        style={{
          background: "rgba(12,12,18,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
          Performance
        </div>
        <div className="flex items-end gap-1 mb-2">
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff", letterSpacing: "-0.03em" }}>
            98
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "3px" }}>
            /100
          </span>
        </div>
        <div className="flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{ width: "12px", background: i < 9 ? "#22c55e" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden" style={{ background: "#09090b" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.25)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Disponible para nuevos proyectos
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#fff",
                marginBottom: "24px",
              }}
            >
              Tu negocio merece una{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                página web
              </span>
              <br />que genere confianza.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "1.1rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "36px",
                maxWidth: "500px",
              }}
            >
              Diseñamos páginas web modernas, rápidas y optimizadas para ayudar a negocios y empresas a fortalecer su presencia digital y atraer nuevos clientes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 group cursor-pointer"
                style={{
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                Solicitar Cotización Gratuita
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center gap-2 cursor-pointer transition-all duration-200"
                style={{
                  padding: "14px 24px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Ver Ejemplos de Diseño
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle
                      size={14}
                      style={{ color: "#818cf8", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <PlanetHero />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
