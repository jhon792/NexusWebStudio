import { motion } from "motion/react";
import { Globe, Building2, ShoppingBag, Code2, Wrench, Search } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Landing Pages",
    description:
      "Una página enfocada en convertir visitantes en clientes. Perfecta para promocionar un servicio específico, captar leads y generar contactos desde el primer día.",
    benefit: "Ideal para campañas y negocios que arrancan",
    accent: "#818cf8",
  },
  {
    icon: Building2,
    title: "Páginas Corporativas",
    description:
      "Sitio web completo que presenta tu empresa de forma profesional: quiénes somos, servicios, equipo y contacto. Genera confianza y respalda tu marca.",
    benefit: "Para empresas que quieren posicionarse",
    accent: "#60a5fa",
  },
  {
    icon: ShoppingBag,
    title: "Tiendas Virtuales",
    description:
      "Vende tus productos online las 24 horas. Catálogo, carrito de compras, integración con pasarelas de pago colombianas y panel de administración incluido.",
    benefit: "Vende sin límite de horario ni ubicación",
    accent: "#34d399",
  },
  {
    icon: Code2,
    title: "Sistemas Web Personalizados",
    description:
      "Aplicaciones web a medida para necesidades específicas de tu negocio: agendas online, portales de clientes, formularios avanzados e integraciones especiales.",
    benefit: "Soluciones únicas para tu operación",
    accent: "#f59e0b",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Web",
    description:
      "Tu sitio actualizado, seguro y funcionando al 100%. Actualizaciones de contenido, copias de seguridad, monitoreo de seguridad y soporte técnico continuo.",
    benefit: "Tranquilidad y continuidad garantizada",
    accent: "#c084fc",
  },
  {
    icon: Search,
    title: "Optimización SEO Básica",
    description:
      "Configuración técnica para que Google pueda encontrar e indexar tu sitio: meta etiquetas, velocidad, sitemap, estructura semántica y Core Web Vitals.",
    benefit: "Más visibilidad orgánica sin publicidad",
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
              Todo lo que tu negocio necesita para{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                crecer en Internet
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
              Cada servicio está diseñado con un objetivo claro: que tu negocio genere más clientes y transmita más confianza.
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
            className="px-7 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: "#fff",
              color: "#09090b",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Ver planes y precios
          </button>
          <a
            href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20un%20servicio."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
