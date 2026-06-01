import { motion } from "motion/react";
import { Zap, Smartphone, Search, Shield } from "lucide-react";

const stats = [
  {
    icon: Zap,
    title: "Carga Rápida",
    value: "< 1s",
    sub: "Tiempo promedio de carga",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    value: "100%",
    sub: "Adaptable a todos los dispositivos",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    icon: Search,
    title: "SEO Optimizado",
    value: "95+",
    sub: "Puntaje Google Lighthouse",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    icon: Shield,
    title: "Seguro por Diseño",
    value: "SSL",
    sub: "HTTPS y mejores prácticas",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-white border-y border-zinc-100" aria-label="Características incluidas en todos los proyectos">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-zinc-400 text-sm mb-8"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          Incluido en todos los proyectos
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl border border-zinc-100 p-6 hover:border-zinc-200 hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: stat.bg }}
              >
                <stat.icon size={18} style={{ color: stat.color }} aria-hidden="true" />
              </div>
              <div
                className="text-zinc-900 mb-1"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </div>
              <div className="text-zinc-800 mb-1" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px" }}>
                {stat.title}
              </div>
              <div className="text-zinc-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
