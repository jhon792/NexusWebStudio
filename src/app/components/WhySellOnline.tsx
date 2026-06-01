import { motion } from "motion/react";
import { Shield, TrendingUp, Clock, Globe, MessageSquare, Star } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Más confianza",
    description:
      "Un sitio web profesional transmite seriedad y autoridad. Tus clientes te perciben como una empresa establecida antes incluso de contactarte.",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.12)",
  },
  {
    icon: Star,
    title: "Mejor imagen profesional",
    description:
      "Tu negocio se diferencia visualmente de la competencia con un diseño moderno, elegante y alineado con tu identidad de marca.",
    accent: "#c084fc",
    glow: "rgba(192,132,252,0.12)",
  },
  {
    icon: Globe,
    title: "Mayor visibilidad",
    description:
      "Aparece en Google cuando alguien busca tus servicios en tu ciudad. Las personas que te buscan activamente son tus mejores prospectos.",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.12)",
  },
  {
    icon: MessageSquare,
    title: "Canal directo de contacto",
    description:
      "Integra WhatsApp, formularios y mapas para que tus clientes puedan comunicarse contigo con un solo clic, en cualquier momento.",
    accent: "#25D366",
    glow: "rgba(37,211,102,0.12)",
  },
  {
    icon: Clock,
    title: "Disponibilidad permanente",
    description:
      "Tu sitio web presenta tus servicios, horarios y precios las 24 horas. Captas clientes incluso cuando tu negocio está cerrado.",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    icon: TrendingUp,
    title: "Presencia digital sólida",
    description:
      "Construye una base digital que respalda tus redes sociales y campañas publicitarias, multiplicando el impacto de tu marketing.",
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.12)",
  },
];

export function WhySellOnline() {
  return (
    <section
      id="benefits"
      className="py-24"
      style={{ background: "#0d0d18" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Beneficios
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            ¿Qué puede aportar una página web{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              a tu negocio?
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Una inversión que trabaja para ti todos los días del año, sin descanso.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${b.glow}, transparent 70%)` }}
              />

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${b.accent}18`, border: `1px solid ${b.accent}28` }}
                >
                  <b.icon size={20} style={{ color: b.accent }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
