import { motion } from "motion/react";
import { Globe, ShoppingBag, Code2, Puzzle, Search, Wrench, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web Profesional",
    description: "Sitios web modernos construidos con HTML5, CSS3, JavaScript, PHP, React y Node.js. Cada proyecto es único, personalizado y optimizado para convertir visitantes en clientes.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP"],
    accent: "#6366f1",
    accentBg: "#eef2ff",
  },
  {
    icon: ShoppingBag,
    title: "Tiendas Online (E-commerce)",
    description: "Tiendas online completas con catálogo de productos, carrito de compras, pasarelas de pago y panel de administración para vender 24/7 sin limitaciones geográficas.",
    tags: ["React", "Node.js", "Stripe", "PayPal"],
    accent: "#10b981",
    accentBg: "#ecfdf5",
  },
  {
    icon: Search,
    title: "SEO Técnico & Posicionamiento",
    description: "Optimización técnica completa para que Google encuentre y posicione tu sitio: velocidad, estructura semántica, meta etiquetas, sitemap y Core Web Vitals.",
    tags: ["SEO On-Page", "Core Web Vitals", "Lighthouse 95+"],
    accent: "#f59e0b",
    accentBg: "#fffbeb",
  },
  {
    icon: Code2,
    title: "Aplicaciones Web a Medida",
    description: "Sistemas y aplicaciones web personalizados: SaaS, portales internos, dashboards y herramientas de gestión construidas con tecnologías modernas y escalables.",
    tags: ["React", "Node.js", "APIs REST", "Bases de Datos"],
    accent: "#3b82f6",
    accentBg: "#eff6ff",
  },
  {
    icon: Puzzle,
    title: "APIs & Bases de Datos",
    description: "Desarrollo de APIs RESTful, integración con servicios de terceros y diseño de bases de datos relacionales y no relacionales para potenciar tus productos digitales.",
    tags: ["Node.js", "MySQL", "MongoDB", "PostgreSQL"],
    accent: "#8b5cf6",
    accentBg: "#f5f3ff",
  },
  {
    icon: Wrench,
    title: "Hosting, Dominios & Mantenimiento",
    description: "Gestión completa de hosting y dominios, más planes de mantenimiento mensual que incluyen actualizaciones, seguridad, copias de seguridad y soporte técnico continuo.",
    tags: ["Hosting", "Dominios", "SSL", "Mantenimiento"],
    accent: "#ef4444",
    accentBg: "#fef2f2",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <span
              className="text-zinc-400 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              Servicios
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="text-white max-w-xl"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Todo lo que tu negocio necesita para crecer en Internet
            </h2>
            <p
              className="text-zinc-400 max-w-sm"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
            >
              Desde una landing page hasta una aplicación web completa — entregamos soluciones que se alinean con tus objetivos de negocio.
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
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% -20%, ${s.accent}12, transparent 70%)`,
                }}
              />

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${s.accent}20`, border: `1px solid ${s.accent}30` }}
                >
                  <s.icon size={20} style={{ color: s.accent }} />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-white"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
                  >
                    {s.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-600 group-hover:text-zinc-300 transition-colors mt-0.5 shrink-0"
                  />
                </div>

                <p
                  className="text-zinc-500 mb-5"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.65 }}
                >
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        background: `${s.accent}18`,
                        color: s.accent,
                        border: `1px solid ${s.accent}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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
            className="px-7 py-3.5 bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Ver planes y precios
          </button>
          <a
            href="https://wa.me/573123198706"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "15px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
            </svg>
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
