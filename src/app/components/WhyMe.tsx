import { motion } from "motion/react";
import { Code2, Gauge, Layers, HeartHandshake, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Desarrollo 100% Personalizado",
    description: "Sin plantillas, sin constructores visuales. Cada línea de código está escrita específicamente para tu proyecto, garantizando unicidad, rendimiento y flexibilidad que las soluciones genéricas no pueden igualar.",
    points: ["Código limpio y escalable", "Diseño único para tu marca", "Sin licencias ni dependencias de plataforma"],
    color: "#6366f1",
  },
  {
    icon: Gauge,
    title: "Alto Rendimiento Garantizado",
    description: "La velocidad no es un extra — está integrada desde el principio. Imágenes optimizadas, JavaScript mínimo y estrategias de caché inteligentes que mantienen puntajes de Lighthouse por encima de 95.",
    points: ["Carga en menos de 1 segundo", "Core Web Vitals optimizados", "Despliegue en CDN y edge computing"],
    color: "#10b981",
  },
  {
    icon: Layers,
    title: "Tecnologías Modernas",
    description: "Construido con el mismo stack que impulsa las startups más exitosas del mundo — React, Node.js, PHP y la infraestructura cloud que escala sin esfuerzo con el crecimiento de tu negocio.",
    points: ["React + Node.js + PHP", "Despliegue en Vercel / AWS", "Integraciones con CMS headless"],
    color: "#f59e0b",
  },
  {
    icon: HeartHandshake,
    title: "Soporte a Largo Plazo",
    description: "Lanzar tu sitio web es el comienzo, no el final. Ofrezco mantenimiento continuo, actualizaciones de seguridad, monitoreo de rendimiento y soporte prioritario para que nunca te quedes sin respaldo.",
    points: ["Planes de mantenimiento mensual", "Respuesta prioritaria garantizada", "Actualizaciones proactivas de seguridad"],
    color: "#3b82f6",
  },
];

export function WhyMe() {
  return (
    <section id="why" className="py-28 bg-white">
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
            <span
              className="text-zinc-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              ¿Por qué trabajar conmigo?
            </span>
          </div>
          <h2
            className="text-zinc-900 mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            No soy otro freelancer más
          </h2>
          <p
            className="text-zinc-400 max-w-lg mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            Trato cada proyecto como un cofundador lo haría: obsesionado con los detalles, responsable de los resultados y comprometido con tu éxito a largo plazo.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-zinc-50 rounded-2xl p-8 border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${reason.color}15`, border: `1px solid ${reason.color}25` }}
              >
                <reason.icon size={22} style={{ color: reason.color }} />
              </div>

              <h3
                className="text-zinc-900 mb-3"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "18px" }}
              >
                {reason.title}
              </h3>

              <p
                className="text-zinc-500 mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
              >
                {reason.description}
              </p>

              <ul className="flex flex-col gap-2">
                {reason.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} style={{ color: reason.color, flexShrink: 0 }} />
                    <span
                      className="text-zinc-600 text-sm"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-zinc-900 rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <div
              className="text-white mb-1"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px" }}
            >
              ¿Listo para construir algo increíble?
            </div>
            <div
              className="text-zinc-400"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
            >
              Hablemos de tu proyecto — sin compromisos, solo claridad.
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              Solicitar Cotización
            </button>
            <a
              href="https://wa.me/573123198706"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
