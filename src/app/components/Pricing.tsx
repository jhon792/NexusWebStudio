import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  CheckCircle2, ArrowRight, MessageCircle, Clock,
  ShieldCheck, BarChart2, Search, Smartphone, Zap,
  FileText, Globe, Lock, Monitor, Eye,
} from "lucide-react";

const WA = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web.";

const plans = [
  {
    id: "basico",
    badge: null,
    name: "Plan Básico",
    label: "Ideal para emprendedores",
    price: 600000,
    currency: "COP",
    delivery: "3 a 5 días hábiles",
    description:
      "Perfecto para negocios que quieren dar el primer paso digital con una presencia profesional y funcional.",
    cta: "Solicitar Plan Básico",
    featured: false,
    accent: "#818cf8",
    features: [
      "Landing page hasta 3 secciones",
      "Diseño UX/UI profesional",
      "100% responsive (móvil, tablet, PC)",
      "Botón de WhatsApp visible",
      "Formulario de contacto",
      "Certificado SSL incluido",
      "Integración Google Maps",
      "Optimización de velocidad",
      "Entrega en 3 a 5 días",
    ],
  },
  {
    id: "profesional",
    badge: "MÁS RECOMENDADO",
    name: "Plan Profesional",
    label: "La mejor inversión para tu negocio",
    price: 1500000,
    currency: "COP",
    delivery: "7 a 15 días hábiles",
    description:
      "Diseñado para empresas que buscan generar confianza, posicionarse en Google y captar más clientes de forma constante.",
    cta: "Solicitar Plan Profesional",
    featured: true,
    accent: "#a78bfa",
    features: [
      "Hasta 8 páginas profesionales",
      "Diseño 100% personalizado",
      "Arquitectura orientada a conversión",
      "Blog optimizado para SEO",
      "Formularios avanzados de captura",
      "WhatsApp Business integrado",
      "Google Analytics incluido",
      "SEO On Page optimizado",
      "Certificado SSL incluido",
      "Panel de administración",
      "Sitemap.xml + Robots.txt",
      "Soporte técnico 60 días",
    ],
  },
  {
    id: "empresarial",
    badge: null,
    name: "Plan Empresarial",
    label: "Para mayor personalización",
    price: 0,
    priceLabel: "Cotización personalizada",
    currency: "COP",
    delivery: "Según alcance del proyecto",
    description:
      "Para empresas que requieren funcionalidades especiales, tiendas virtuales, integraciones avanzadas o sistemas a medida.",
    cta: "Solicitar cotización",
    featured: false,
    accent: "#34d399",
    features: [
      "Alcance completamente personalizado",
      "Tienda virtual (opcional)",
      "Funcionalidades especiales",
      "Integraciones a medida",
      "Pasarelas de pago colombianas",
      "Panel administrativo completo",
      "Google Analytics 4 avanzado",
      "SEO especializado",
      "Capacitación incluida",
      "Soporte prioritario",
      "Certificado SSL incluido",
      "Entrega según proyecto",
    ],
  },
];

const standards = [
  { Icon: ShieldCheck, label: "Certificado SSL", tooltip: "HTTPS activo: tu sitio aparece con el candado verde. Google lo requiere para posicionar y genera confianza inmediata en tus visitantes." },
  { Icon: Smartphone, label: "Diseño responsive", tooltip: "Tu web se adapta perfectamente a celular, tablet y computador. La mayoría del tráfico web en Colombia viene de dispositivos móviles." },
  { Icon: Zap, label: "Velocidad optimizada", tooltip: "Imágenes comprimidas, código limpio y caché configurada. Un sitio lento aleja a los visitantes antes de que vean tu contenido." },
  { Icon: Search, label: "SEO técnico", tooltip: "Configuración base para que Google pueda rastrear e indexar tu sitio correctamente. Sin esto, tu web no aparece en búsquedas." },
  { Icon: BarChart2, label: "Google Analytics", tooltip: "Mide cuántas personas visitan tu web, desde dónde llegan y qué hacen. Datos reales para tomar decisiones de negocio." },
  { Icon: FileText, label: "Sitemap.xml", tooltip: "Le dice a Google exactamente qué páginas existen en tu sitio para indexarlas de forma eficiente y sin errores." },
  { Icon: Globe, label: "Robots.txt", tooltip: "Guía a los motores de búsqueda sobre qué partes del sitio pueden rastrear. Mejora la eficiencia del indexado." },
  { Icon: Lock, label: "Seguridad web", tooltip: "Cabeceras HTTP de seguridad que protegen contra ataques comunes como XSS, clickjacking e inyección de código." },
  { Icon: Monitor, label: "Multi-dispositivo", tooltip: "Probado en Chrome, Firefox, Safari y Edge. Funciona correctamente en cualquier navegador y dispositivo del mercado." },
  { Icon: Eye, label: "Accesibilidad", tooltip: "Diseñado para ser usable por todas las personas. Mejora la experiencia general y el posicionamiento SEO." },
];

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayed(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>${displayed.toLocaleString("es-CO")}</span>;
}

function GuaranteeCard({
  Icon,
  label,
  tooltip,
  index,
}: {
  Icon: React.ElementType;
  label: string;
  tooltip: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center cursor-default transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>?</span>
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)" }}
      >
        <Icon size={18} style={{ color: "#818cf8" }} />
      </div>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-2xl z-50 pointer-events-none text-left"
            style={{
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              {label}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
              {tooltip}
            </p>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid #18181b",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Pricing() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Plans section */}
      <section id="pricing" className="relative py-24 overflow-hidden" style={{ background: "#0d0d18" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Planes e Inversión
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              Elige el plan ideal
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                para tu negocio
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                maxWidth: "440px",
                margin: "0 auto 20px",
              }}
            >
              Inversión transparente. Sin letra pequeña. Sin costos ocultos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                Forma de pago:{" "}
                <strong style={{ color: "rgba(255,255,255,0.75)" }}>50% al iniciar · 50% al entregar</strong>
              </span>
            </motion.div>
          </div>

          {/* Plan cards */}
          <div className="grid lg:grid-cols-3 gap-5 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col rounded-3xl overflow-visible"
                style={
                  plan.featured
                    ? {
                        background: "linear-gradient(160deg, rgba(67,56,202,0.3) 0%, rgba(13,13,24,0.97) 50%)",
                        border: "1px solid rgba(129,140,248,0.3)",
                        boxShadow: "0 0 0 1px rgba(129,140,248,0.15), 0 32px 80px -12px rgba(99,102,241,0.25)",
                        transform: "scale(1.03)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="px-5 py-1.5 rounded-full text-white text-xs font-bold tracking-wider"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
                      }}
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}

                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  {/* Name */}
                  <div className="mb-5">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                      style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}28` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: plan.accent,
                        }}
                      >
                        {plan.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: "20px",
                        color: "#fff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {plan.name}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    {plan.price > 0 ? (
                      <>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          Desde
                        </p>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
                            letterSpacing: "-0.04em",
                            lineHeight: 1,
                            color: "#fff",
                          }}
                        >
                          <AnimatedPrice value={plan.price} />
                        </p>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.35)",
                            marginTop: "6px",
                          }}
                        >
                          COP · pago único
                        </p>
                      </>
                    ) : (
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "1.4rem",
                          color: plan.accent,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {plan.priceLabel}
                      </p>
                    )}
                  </div>

                  {/* Delivery */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5"
                    style={{
                      background: plan.featured ? "rgba(129,140,248,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${plan.featured ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Clock size={13} style={{ color: plan.featured ? "#a78bfa" : "#818cf8", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: plan.featured ? "#c4b5fd" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      Entrega: {plan.delivery}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "20px",
                    }}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="w-full h-px mb-5"
                    style={{
                      background: plan.featured
                        ? "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: plan.featured ? "#a78bfa" : "#818cf8" }}
                        />
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            lineHeight: 1.5,
                            color: plan.featured ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <motion.button
                      onClick={scrollToContact}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer font-semibold transition-all duration-200"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        ...(plan.featured
                          ? {
                              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                              color: "#fff",
                              boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                            }
                          : {
                              background: "rgba(255,255,255,0.07)",
                              color: "rgba(255,255,255,0.85)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }),
                      }}
                    >
                      {plan.cta}
                      <ArrowRight size={15} />
                    </motion.button>

                    <motion.a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm transition-all duration-200"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        background: "rgba(37,211,102,0.08)",
                        color: "#4ade80",
                        border: "1px solid rgba(37,211,102,0.18)",
                        textDecoration: "none",
                      }}
                    >
                      <MessageCircle size={14} />
                      Preguntar por WhatsApp
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}
          >
            ¿No sabes cuál elegir?{" "}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#818cf8" }}
              className="hover:underline transition-colors"
            >
              Escríbenos y te asesoramos sin costo.
            </a>
          </motion.p>
        </div>
      </section>

      {/* Standards section */}
      <section className="py-20" style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Incluido en todos los planes
              </span>
            </div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "10px",
              }}
            >
              Estándares de calidad que aplicamos
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Pasa el cursor sobre cada elemento para ver qué incluye.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {standards.map((s, i) => (
              <GuaranteeCard key={s.label} {...s} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}
          >
            {["SSL incluido en todos los planes", "Sin costos ocultos", "Precios fijos garantizados", "50% inicio · 50% entrega"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 whitespace-nowrap">
                <span style={{ color: "#22c55e" }}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2 group transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(99,102,241,0.3)",
              }}
            >
              Solicitar cotización gratuita
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2 transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "rgba(37,211,102,0.1)",
                color: "#4ade80",
                border: "1px solid rgba(37,211,102,0.2)",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} />
              Hablar por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
