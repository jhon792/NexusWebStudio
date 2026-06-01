import { motion } from "motion/react";
import { TrendingUp, Users, Clock, Globe, ShieldCheck, Search } from "lucide-react";

const stats = [
  { value: "97%", label: "de los consumidores buscan en Google antes de comprar" },
  { value: "3.5x", label: "más clientes generan las empresas con presencia digital" },
  { value: "24/7", label: "trabaja tu sitio web, sin descanso ni días festivos" },
  { value: "75%", label: "de usuarios juzgan tu credibilidad por tu sitio web" },
];

const reasons = [
  {
    icon: Search,
    title: "Tus clientes te buscan en Google",
    description: "El 97% de los consumidores utilizan internet para buscar productos y servicios antes de tomar una decisión de compra. Si no estás en Google, no existes para ellos.",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    icon: ShieldCheck,
    title: "Genera confianza y credibilidad",
    description: "Un sitio web profesional transmite autoridad y seriedad. El 75% de las personas juzga la credibilidad de una empresa basándose en el diseño de su página web.",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    icon: TrendingUp,
    title: "Más oportunidades de venta",
    description: "Las empresas con presencia digital sólida generan hasta 3.5 veces más oportunidades de negocio que aquellas sin sitio web o con uno desactualizado.",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    icon: Clock,
    title: "Vende las 24 horas del día",
    description: "A diferencia de una tienda física, tu sitio web trabaja mientras duermes. Capta clientes, responde preguntas y genera ventas sin límite de horario.",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    icon: Globe,
    title: "Clientes locales e internacionales",
    description: "Internet rompe las barreras geográficas. Con un buen sitio web puedes llegar a clientes en tu ciudad, en todo el país e incluso en otros países.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    icon: Users,
    title: "Captación automática de clientes",
    description: "Con formularios inteligentes, botón de WhatsApp y estrategias SEO, tu sitio web actúa como un vendedor digital disponible los 365 días del año.",
    color: "#ef4444",
    bg: "#fef2f2",
  },
];

export function WhySellOnline() {
  return (
    <section id="why-online" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-6">
            <span className="text-zinc-500 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              ¿Por qué necesito un sitio web?
            </span>
          </div>
          <h2
            className="text-zinc-900 mb-4 max-w-3xl mx-auto"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            ¿Por qué las empresas venden más
            <br />cuando tienen presencia en Internet?
          </h2>
          <p
            className="text-zinc-400 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            No tener un sitio web profesional es dejarle el mercado a tu competencia. Aquí te explicamos por qué.
          </p>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-zinc-950 rounded-2xl p-6 text-center"
            >
              <div
                className="text-white mb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "2.25rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-zinc-400 text-sm"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-zinc-50 rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: reason.bg, border: `1px solid ${reason.color}20` }}
              >
                <reason.icon size={20} style={{ color: reason.color }} />
              </div>
              <h3
                className="text-zinc-900 mb-3"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
              >
                {reason.title}
              </h3>
              <p
                className="text-zinc-500"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.65 }}
              >
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-zinc-900 rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-10"
            style={{ background: "radial-gradient(circle at 80% 20%, #6366f1, transparent 60%)" }}
          />
          <div className="relative">
            <div
              className="text-white mb-2"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "22px" }}
            >
              ¿Tu empresa aún no tiene presencia digital?
            </div>
            <div
              className="text-zinc-400"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
            >
              Cada día sin sitio web es un día regalándole clientes a tu competencia.
            </div>
          </div>
          <div className="relative flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3.5 bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              Solicitar Cotización
            </button>
            <a
              href="https://wa.me/573123198706"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
