import { useRef } from "react";
import { motion, useAnimation } from "motion/react";

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

/* Duplicar para scroll infinito */
const doubled = [...testimonials, ...testimonials];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            bounce: 0.6,
            delay: i * 0.07,
          }}
          aria-hidden="true"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#FBBF24"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.article
      className="flex-shrink-0 w-[340px] sm:w-[380px] rounded-2xl p-6 mx-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 48px rgba(99,102,241,0.15)",
        borderColor: "rgba(99,102,241,0.25)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      aria-label={`Testimonio de ${t.name}`}
    >
      <StarRating count={t.stars} />

      <blockquote
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "0.92rem",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.58)",
          margin: "14px 0 18px",
          fontStyle: "italic",
        }}
      >
        "{t.quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `${t.color}22`,
            border: `1.5px solid ${t.color}44`,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: t.color,
            }}
          >
            {t.initials}
          </span>
        </motion.div>
        <div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#fff",
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  // Sección oculta hasta tener reseñas reales — no mostramos testimonios inventados.
  return null;
  // eslint-disable-next-line no-unreachable
  const controls = useAnimation();

  const startMarquee = () => {
    controls.start({
      x: ["-0%", "-50%"],
      transition: { duration: 38, ease: "linear", repeat: Infinity },
    });
  };

  const pauseMarquee = () => controls.stop();

  /* Arrancar al montar */
  if (typeof window !== "undefined") {
    setTimeout(startMarquee, 100);
  }

  return (
    <section
      id="testimonials"
      className="py-28 overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Lo que dicen nuestros clientes
            </span>
          </div>
          <h2
            id="testimonials-heading"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Resultados reales de negocios{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              como el tuyo
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div
        className="relative"
        onMouseEnter={pauseMarquee}
        onMouseLeave={startMarquee}
        role="region"
        aria-label="Testimonios de clientes — pausa al pasar el cursor"
      >
        {/* Gradient masks */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #0a0a0f, transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(-90deg, #0a0a0f, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <motion.div
          className="flex"
          animate={controls}
          style={{ willChange: "transform" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} index={i % testimonials.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
