import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import { DashboardMockup } from "./DashboardMockup";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50/60 to-white pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 0%, rgba(99,102,241,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 100%, rgba(20,20,20,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div className="flex flex-col">
            {/* Available badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className="text-zinc-600 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Disponible para nuevos proyectos
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <h1
                className="text-zinc-900 mb-6"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                Sitios web que convierten
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #18181b 0%, #3f3f46 50%, #18181b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  visitantes
                </span>{" "}
                en{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  clientes.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-zinc-500 mb-8 max-w-lg"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              Desarrollo sitios web profesionales y aplicaciones a medida para empresas que quieren destacar, crecer y vender más en Internet — no solo tener presencia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mb-12"
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all duration-200 cursor-pointer group"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
              >
                <Calendar size={16} />
                Agendar Consulta Gratuita
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="https://wa.me/573123198706"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
                </svg>
                Hablar por WhatsApp
              </a>
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
              >
                Ver Portafolio
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["M", "A", "L", "D", "R"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs text-white"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      background: ["#18181b", "#3f3f46", "#6366f1", "#8b5cf6", "#a78bfa"][i],
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-zinc-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  Más de{" "}
                  <span className="text-zinc-900" style={{ fontWeight: 600 }}>
                    40 clientes satisfechos
                  </span>{" "}
                  en todo el mundo
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center relative px-8"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
