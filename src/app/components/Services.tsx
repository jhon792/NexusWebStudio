import { motion } from "motion/react";
import { Globe, Building2, ShoppingBag, Code2, Wrench, Search } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Landing Page de Alto Impacto",
    description:
      "Una sola página diseñada para convertir: el visitante entra, entiende lo que ofreces y te contacta. Perfecta para captar clientes desde Google Ads o redes sociales.",
    benefit: "Clientes desde el primer día",
    accent: "#818cf8",
  },
  {
    icon: Building2,
    title: "Sitio Corporativo Profesional",
    description:
      "Tu empresa en internet con todo lo que genera confianza: servicios claros, equipo, casos de éxito y formulario de contacto. El cliente llega y ya quiere trabajar contigo.",
    benefit: "Credibilidad que cierra ventas",
    accent: "#60a5fa",
  },
  {
    icon: ShoppingBag,
    title: "Tienda Virtual con Pagos Colombianos",
    description:
      "Vende tus productos online con PSE, Nequi y tarjetas. Catálogo, carrito y panel de administración incluidos. Tu tienda nunca cierra.",
    benefit: "Ventas mientras duermes",
    accent: "#34d399",
  },
  {
    icon: Code2,
    title: "Sistema de Citas y Reservas",
    description:
      "Tus clientes agendan online sin necesidad de llamarte. Para clínicas, consultorios, salones y servicios por turnos. Reduce el trabajo administrativo hasta un 80%.",
    benefit: "Sin llamadas, sin ausencias",
    accent: "#f59e0b",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Soporte Continuo",
    description:
      "Tu sitio siempre actualizado, seguro y funcionando. Actualizamos contenido, monitoreamos caídas y respondemos en menos de 24 horas.",
    benefit: "Tranquilidad sin preocupaciones",
    accent: "#c084fc",
  },
  {
    icon: Search,
    title: "Posicionamiento en Google",
    description:
      "Configuramos tu sitio para que aparezca cuando alguien busca tu servicio en tu ciudad. SEO local + Google Maps + Core Web Vitals. Clientes sin pagar publicidad.",
    benefit: "Clientes orgánicos cada mes",
    accent: "#fb7185",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24" style={{ background: "#09090b" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
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
              Nuestros Servicios
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#fff",
                maxWidth: "520px",
              }}
            >
              La web que necesita{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                tu tipo de negocio
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                maxWidth: "340px",
              }}
            >
              No vendemos plantillas. Construimos cada sitio para que funcione en tu sector específico.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% -20%, ${s.accent}14, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}28` }}
                >
                  <s.icon size={20} style={{ color: s.accent }} />
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
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "16px",
                  }}
                >
                  {s.description}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: `${s.accent}12`,
                    border: `1px solid ${s.accent}22`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: s.accent,
                    }}
                  >
                    {s.benefit}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 rounded-xl cursor-pointer transition-all duration-200 inline-flex items-center gap-2 group"
            style={{
              background: "#fff",
              color: "#09090b",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Ver qué plan incluye cada servicio
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
