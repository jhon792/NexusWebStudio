import { motion } from "motion/react";

const testimonials = [
  {
    quote: "Nuestro nuevo sitio web transformó por completo cómo los pacientes nos encuentran en línea. Las reservas aumentaron un 340% en los primeros tres meses y constantemente recibimos comentarios sobre lo profesional que se ve. La mejor inversión que hemos hecho para nuestra clínica.",
    name: "Dra. Maria Santos",
    role: "Directora Médica",
    company: "Santos Medical Center",
    initials: "MS",
    color: "#6366f1",
    stars: 5,
  },
  {
    quote: "Era escéptico sobre contratar a un freelancer en lugar de una agencia, pero la calidad superó cualquier agencia con la que haya trabajado. El sitio se lanzó a tiempo, dentro del presupuesto y nuestras solicitudes de consulta se duplicaron en 60 días.",
    name: "Alexander Müller",
    role: "Socio Director",
    company: "Müller & Associates Law",
    initials: "AM",
    color: "#10b981",
    stars: 5,
  },
  {
    quote: "La presencia online de nuestra clínica era muy pobre antes. Ahora tenemos un sitio web que refleja la experiencia de lujo que ofrecemos en persona. Los clientes nos dicen que el sitio web fue lo que los convenció de agendar su primera cita.",
    name: "Dra. Isabela Costa",
    role: "Fundadora & CEO",
    company: "AesthetiQ Clinic São Paulo",
    initials: "IC",
    color: "#f59e0b",
    stars: 5,
  },
  {
    quote: "Trabajar con John fue como tener un equipo técnico interno. Entendió nuestros objetivos de negocio de inmediato y construyó exactamente lo que necesitábamos. Las integraciones de API nos ahorraron más de 20 horas de trabajo manual por semana.",
    name: "James Thornton",
    role: "Director de Operaciones",
    company: "Thornton & Co. Solicitors",
    initials: "JT",
    color: "#3b82f6",
    stars: 5,
  },
  {
    quote: "La plataforma de e-commerce que desarrolló para nosotros maneja miles de pedidos mensuales sin ningún problema. El rendimiento es excepcional y nuestra tasa de conversión mejoró un 85% comparado con nuestra tienda anterior.",
    name: "Sophie Laurent",
    role: "Gerente de E-commerce",
    company: "Beauté Luxe Paris",
    initials: "SL",
    color: "#ef4444",
    stars: 5,
  },
  {
    quote: "La comunicación fue excelente durante todo el proceso. Actualizaciones semanales, respuestas rápidas y un genuino interés en que nuestro negocio tuviera éxito. Seguimos trabajando juntos en mejoras continuas — muy recomendado.",
    name: "Carlos Mendes",
    role: "CEO",
    company: "Mendes Dental Group",
    initials: "CM",
    color: "#8b5cf6",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <span
              className="text-zinc-400 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              Testimonios de clientes
            </span>
          </div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Clientes que confían en nuestro trabajo
            <br />desde todo el mundo
          </h2>
          <p
            className="text-zinc-500 max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            Resultados reales. Clientes reales. Ingresos reales.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 cursor-default"
            >
              <StarRating count={t.stars} />

              <p
                className="text-zinc-300 my-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.75 }}
              >
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.07]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-white text-sm"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-zinc-500 text-xs"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
