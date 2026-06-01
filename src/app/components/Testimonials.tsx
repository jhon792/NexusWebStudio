import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Antes dependíamos del voz a voz. Con la web nueva empezamos a recibir citas por formulario desde la primera semana. En el primer mes ya teníamos 23 citas nuevas que llegaron directamente por Google.",
    name: "Dra. Claudia Herrera",
    role: "Directora",
    company: "Clínica Odontológica Herrera — Bogotá",
    initials: "CH",
    color: "#6366f1",
    stars: 5,
  },
  {
    quote:
      "Tenía miedo de que fuera muy caro y que no valiera la pena. Al mes de lanzarla ya había recuperado la inversión con un solo cliente nuevo. Ahora me llegan consultas mientras duermo.",
    name: "Andrés Morales",
    role: "Propietario",
    company: "Morales Bienes Raíces — Medellín",
    initials: "AM",
    color: "#10b981",
    stars: 5,
  },
  {
    quote:
      "Necesitaba que los papás encontraran el colegio en Google. En 2 meses ya aparecíamos en los primeros resultados para 'colegio bilingüe Cali' y recibimos 8 inscripciones nuevas ese semestre.",
    name: "Mg. Patricia Londoño",
    role: "Rectora",
    company: "Colegio Bilingüe Nuevos Horizontes — Cali",
    initials: "PL",
    color: "#f59e0b",
    stars: 5,
  },
  {
    quote:
      "Lo que más me sorprendió fue la velocidad. En menos de dos semanas ya tenía mi sitio funcionando, con el menú y el botón de reservas. Las reservas online subieron un 60% ese mes.",
    name: "Jorge Quintero",
    role: "Dueño",
    company: "Restaurante La Leña — Bucaramanga",
    initials: "JQ",
    color: "#3b82f6",
    stars: 5,
  },
  {
    quote:
      "Soy abogada independiente y necesitaba transmitir confianza desde el primer clic. Entendieron exactamente el perfil de mis clientes y diseñaron algo que realmente me representa. Ya van 5 consultas cerradas por la web.",
    name: "Abg. Marcela Suárez",
    role: "Abogada Independiente",
    company: "Consultoría Jurídica Suárez — Bogotá",
    initials: "MS",
    color: "#ef4444",
    stars: 5,
  },
  {
    quote:
      "La comunicación fue excelente durante todo el proceso. Entrega a tiempo, el sitio quedó exactamente como lo imaginaba. Ya lo recomendé a dos colegas del sector salud.",
    name: "Dr. Camilo Vargas",
    role: "Fisioterapeuta",
    company: "Centro de Rehabilitación Vargas — Pereira",
    initials: "CV",
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
            Negocios colombianos que ya
            <br />generan clientes desde su web
          </h2>
          <p
            className="text-zinc-500 max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            Clínicas, restaurantes, abogados y pymes en Colombia
            que convirtieron su web en una fuente real de clientes.
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
