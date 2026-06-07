import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Globe, Building2, ShoppingBag, Code2, Wrench, Search, Clock } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Landing Page de Alto Impacto",
    description:
      "Una sola página diseñada para convertir: el visitante entra, entiende lo que ofreces y te contacta. Perfecta para captar clientes desde Google Ads o redes sociales.",
    benefit: "Clientes desde el primer día",
    delivery: "Entrega en 1 a 3 días",
    accent: "#818cf8",
  },
  {
    icon: Building2,
    title: "Sitio Corporativo Profesional",
    description:
      "Tu empresa en internet con todo lo que genera confianza: servicios claros, equipo, casos de éxito y formulario de contacto. El cliente llega y ya quiere trabajar contigo.",
    benefit: "Credibilidad que cierra ventas",
    delivery: "Entrega en 5 a 8 días",
    accent: "#60a5fa",
  },
  {
    icon: ShoppingBag,
    title: "Tienda Virtual con Pagos Colombianos",
    description:
      "Vende tus productos online con PSE, Nequi y tarjetas. Catálogo, carrito y panel de administración incluidos. Tu tienda nunca cierra.",
    benefit: "Ventas mientras duermes",
    delivery: null,
    accent: "#34d399",
  },
  {
    icon: Code2,
    title: "Sistema de Citas y Reservas",
    description:
      "Tus clientes agendan online sin necesidad de llamarte. Para clínicas, consultorios, salones y servicios por turnos. Reduce el trabajo administrativo hasta un 80%.",
    benefit: "Sin llamadas, sin ausencias",
    delivery: null,
    accent: "#f59e0b",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Soporte Continuo",
    description:
      "Tu sitio siempre actualizado, seguro y funcionando. Actualizamos contenido, monitoreamos caídas y respondemos en menos de 24 horas.",
    benefit: "Tranquilidad sin preocupaciones",
    delivery: null,
    accent: "#c084fc",
  },
  {
    icon: Search,
    title: "Posicionamiento en Google",
    description:
      "Configuramos tu sitio para que aparezca cuando alguien busca tu servicio en tu ciudad. SEO local + Google Maps + Core Web Vitals. Clientes sin pagar publicidad.",
    benefit: "Clientes orgánicos cada mes",
    delivery: null,
    accent: "#fb7185",
  },
];

/* ─── Card con efecto 3D tilt ────────────────────────────────────────────── */
function TiltCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const springRotX = useSpring(rotateX, { stiffness: 280, damping: 22 });
  const springRotY = useSpring(rotateY, { stiffness: 280, damping: 22 });
  const springGlow = useSpring(glowOpacity, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    rotateY.set(((x - halfW) / halfW) * 7);
    rotateX.set(((y - halfH) / halfH) * -7);
    glowOpacity.set(1);
  }, []);

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative rounded-2xl p-6 cursor-default"
      aria-label={`Servicio: ${service.title}`}
    >
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-hidden="true"
      />

      {/* Glow dinámico que sigue al mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${service.accent}18, transparent 70%)`,
          opacity: springGlow,
        }}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Ícono con bounce al entrar y glow en hover */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            delay: index * 0.1 + 0.2,
            bounce: 0.55,
            duration: 0.7,
          }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
          style={{ background: `${service.accent}18` }}
          whileHover={{ boxShadow: `0 0 22px ${service.accent}60, 0 0 8px ${service.accent}40` }}
        >
          <Icon
            size={22}
            style={{ color: service.accent }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Título */}
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#fff",
            marginBottom: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {service.title}
        </h3>

        {/* Descripción */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.48)",
            marginBottom: 16,
          }}
        >
          {service.description}
        </p>

        {/* Benefit pill */}
        <motion.div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{
            background: `${service.accent}14`,
            border: `1px solid ${service.accent}30`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: service.accent }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              color: service.accent,
            }}
          >
            {service.benefit}
          </span>
        </motion.div>

        {service.delivery && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-2"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <Clock size={11} style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
              {service.delivery}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="py-24"
      style={{ background: "#09090b" }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
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
              Nuestros Servicios
            </span>
          </div>
          <h2
            id="services-heading"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: 600,
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
              crecer en internet
            </span>
          </h2>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
