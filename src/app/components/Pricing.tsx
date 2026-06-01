import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  CheckCircle2, ArrowRight, MessageCircle,
  ShieldCheck, BarChart2, Search, Smartphone,
  Zap, FileText, Lock, Eye, Globe, Clock, Monitor,
  Rocket, Building2, ShoppingBag,
} from "lucide-react";

const WA = "https://wa.me/573123198706";

// ─────────────────────────────────────────────
// DATOS DE LOS PLANES
// ─────────────────────────────────────────────
const plans = [
  {
    id: "profesional",
    Icon: Rocket,
    badge: null,
    name: "Plan Profesional",
    label: "Perfecta entrada al mundo digital",
    price: 600000,
    refPrice: 1800000,          // precio que cobra una agencia tradicional
    savingsLabel: "Ahorras $1.200.000",
    savingsPct: "67% menos",
    monthlyEquiv: 50000,        // $600.000 ÷ 12 meses
    roiNote: "Con 1 cliente nuevo ya recuperas la inversión",
    description:
      "Ideal para negocios que desean una presencia profesional y empezar a captar clientes rápidamente.",
    delivery: "3 a 5 días hábiles",
    cta: "Quiero mi Página Profesional",
    featured: false,
    accentColor: "#6366f1",
    features: [
      "Hasta 3 secciones optimizadas para conversión",
      "Diseño UX/UI profesional",
      "Diseño responsive (móvil, tablet, PC)",
      "Botón de WhatsApp siempre visible",
      "Formulario inteligente de contacto",
      "Optimización de velocidad",
      "Certificado SSL incluido",
      "Integración Google Maps",
      "Optimización para móviles",
      "Carga rápida inferior a 2 segundos",
    ],
  },
  {
    id: "empresarial",
    Icon: Building2,
    badge: "⭐ Más solicitado",
    name: "Plan Empresarial",
    label: "La mejor inversión para tu negocio",
    price: 1500000,
    refPrice: 3500000,
    savingsLabel: "Ahorras $2.000.000",
    savingsPct: "57% menos",
    monthlyEquiv: 125000,       // $1.500.000 ÷ 12 meses
    roiNote: "Con 2 clientes nuevos al mes ya tienes ROI positivo",
    description:
      "Diseñado para empresas que buscan generar confianza, posicionarse en Google y captar más clientes.",
    delivery: "7 a 15 días hábiles",
    cta: "Quiero mi Sitio Empresarial",
    featured: true,
    accentColor: "#818cf8",
    features: [
      "Hasta 8 páginas profesionales",
      "Diseño completamente personalizado",
      "Arquitectura orientada a conversión",
      "Blog optimizado para SEO",
      "Formularios avanzados de captura",
      "Integración WhatsApp Business",
      "Google Analytics + Google Search Console",
      "SEO On Page optimizado",
      "Optimización de velocidad avanzada",
      "Certificado SSL incluido",
      "Panel administrativo intuitivo",
      "Sitemap.xml + Robots.txt",
      "Datos estructurados Schema.org",
      "Optimización Lighthouse 90+",
      "Soporte técnico 60 días post-entrega",
      "Diseño adaptado a tu sector",
    ],
  },
  {
    id: "tienda",
    Icon: ShoppingBag,
    badge: null,
    name: "Tienda Virtual",
    label: "Tu negocio abierto las 24 horas",
    price: 3000000,
    refPrice: 6500000,
    savingsLabel: "Ahorras $3.500.000",
    savingsPct: "54% menos",
    monthlyEquiv: 250000,       // $3.000.000 ÷ 12 meses
    roiNote: "Una venta diaria cubre el costo en el primer mes",
    description:
      "Convierte tu negocio en una máquina de ventas online disponible 24/7, sin límites geográficos.",
    delivery: "Según alcance del proyecto",
    cta: "Quiero mi Tienda Online",
    featured: false,
    accentColor: "#10b981",
    features: [
      "Productos y categorías ilimitadas",
      "Carrito de compras profesional",
      "Integración Wompi, PayU, Stripe y PayPal",
      "Gestión de inventario en tiempo real",
      "Gestión completa de pedidos",
      "Correos automáticos transaccionales",
      "SEO especializado para e-commerce",
      "Google Analytics 4 + seguimiento de conversiones",
      "Certificado SSL incluido",
      "Panel administrativo completo",
      "Optimización de velocidad",
      "Diseño 100% orientado a ventas",
      "Capacitación básica incluida",
      "Compatibilidad con cupones y descuentos",
      "Informes de ventas en tiempo real",
    ],
  },
];

// ─────────────────────────────────────────────
// ESTÁNDARES DE CALIDAD (con tooltips)
// ─────────────────────────────────────────────
interface GuaranteeItem {
  Icon: React.ElementType;
  label: string;
  tooltip: string;
}

const guarantees: GuaranteeItem[] = [
  {
    Icon: ShieldCheck,
    label: "Certificado SSL",
    tooltip: "Activa el candado verde (HTTPS) y cifra la conexión de tus visitantes. Google lo exige para posicionarse y genera confianza inmediata.",
  },
  {
    Icon: BarChart2,
    label: "Google Analytics",
    tooltip: "Mide cuántos visitan tu web, desde dónde llegan y qué hacen. Datos reales para saber qué funciona y qué mejorar.",
  },
  {
    Icon: Search,
    label: "SEO técnico",
    tooltip: "Configuración técnica para que Google pueda rastrear e indexar tu sitio correctamente. Sin esto, tu web no aparece en búsquedas.",
  },
  {
    Icon: Smartphone,
    label: "Diseño responsive",
    tooltip: "Tu web se adapta perfectamente a celular, tablet y computador. El 70% del tráfico en Colombia es desde celular.",
  },
  {
    Icon: Zap,
    label: "Velocidad optimizada",
    tooltip: "Imágenes comprimidas, código limpio y caché configurada. Cada segundo de retraso reduce las conversiones un 7%.",
  },
  {
    Icon: FileText,
    label: "Sitemap.xml",
    tooltip: "Le dice a Google exactamente qué páginas existen en tu sitio para indexarlas más rápido y sin errores.",
  },
  {
    Icon: Globe,
    label: "Robots.txt",
    tooltip: "Guía a los robots de Google sobre qué partes de tu sitio pueden rastrear. Mejora la eficiencia del crawling.",
  },
  {
    Icon: Lock,
    label: "Seguridad web",
    tooltip: "Cabeceras HTTP de seguridad que protegen tu sitio contra ataques comunes como XSS, clickjacking e inyección de código.",
  },
  {
    Icon: Monitor,
    label: "Multi-dispositivo",
    tooltip: "Probado en Chrome, Firefox, Safari y Edge. Funciona igual de bien en cualquier navegador y dispositivo del mercado.",
  },
  {
    Icon: Eye,
    label: "Accesibilidad web",
    tooltip: "Diseñado para ser usable por personas con discapacidades visuales o motoras. Mejora la experiencia y el posicionamiento SEO.",
  },
];

// ─────────────────────────────────────────────
// SUBCOMPONENTES
// ─────────────────────────────────────────────

/** Contador animado de precios — easeOutQuart */
function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setDisplayed(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>${displayed.toLocaleString("es-CO")}</span>;
}

/** Feature item con micro-animación en hover */
function Feature({ text, featured }: { text: string; featured: boolean }) {
  return (
    <motion.li
      className="flex items-start gap-2.5"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <CheckCircle2
        size={14}
        className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ color: featured ? "#a78bfa" : "#6366f1" }}
      />
      <span
        className={`text-[13px] leading-relaxed ${featured ? "text-zinc-300" : "text-zinc-400"}`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {text}
      </span>
    </motion.li>
  );
}

/** Card con tooltip animado al hacer hover */
function GuaranteeCard({ Icon, label, tooltip, index }: GuaranteeItem & { index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 p-5 bg-zinc-50 border border-zinc-100 rounded-2xl text-center cursor-default transition-all duration-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
    >
      {/* Indicador "?" */}
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center">
        <span className="text-zinc-500 font-bold" style={{ fontSize: "9px" }}>?</span>
      </div>

      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center transition-colors group-hover:bg-indigo-100">
        <Icon size={18} className="text-indigo-500" />
      </div>
      <span
        className="text-zinc-700 text-sm font-medium leading-tight"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>

      {/* Tooltip animado */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-2xl shadow-2xl z-50 text-left pointer-events-none"
            style={{
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <p
              className="text-white font-semibold text-xs mb-1.5"
              style={{ letterSpacing: "-0.01em" }}
            >
              {label}
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed">{tooltip}</p>
            {/* Flecha */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
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

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export function Pricing() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ══════════════════════════════════════════════
          SECCIÓN OSCURA — Planes y precios
      ══════════════════════════════════════════════ */}
      <section id="pricing" className="relative bg-zinc-950 overflow-hidden py-28">

        {/* Decoración de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Grid sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── HEADER ── */}
          <div className="text-center mb-16">

            {/* Scarcity */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/25 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span
                className="text-amber-300 text-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Solo tomamos <strong className="text-amber-200">3 proyectos nuevos por mes</strong> para garantizar calidad
              </span>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <span
                className="text-zinc-400 text-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Planes &amp; Inversión
              </span>
            </motion.div>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white mb-5"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Elige el plan ideal
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                para tu negocio
              </span>
            </motion.h2>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-zinc-400 max-w-xl mx-auto mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
            >
              Inversión transparente. Sin letra pequeña. Sin costos ocultos.
              <br />Solo resultados reales para tu empresa.
            </motion.p>

            {/* Pago 50/50 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span className="text-zinc-400 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                Forma de pago:{" "}
                <strong className="text-zinc-200">50% al iniciar · 50% al entregar</strong>
              </span>
            </motion.div>
          </div>

          {/* ── CARDS ── */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={
                  !plan.featured
                    ? { y: -6, transition: { duration: 0.25 } }
                    : {}
                }
                className={`relative flex flex-col rounded-3xl overflow-visible transition-shadow duration-300 ${
                  plan.featured
                    ? "z-10 lg:scale-[1.04]"
                    : "cursor-pointer"
                }`}
                style={
                  plan.featured
                    ? {
                        background:
                          "linear-gradient(160deg, rgba(67,56,202,0.35) 0%, rgba(24,24,27,0.95) 50%)",
                        border: "1px solid rgba(129,140,248,0.35)",
                        boxShadow:
                          "0 0 0 1px rgba(129,140,248,0.2), 0 32px 80px -12px rgba(99,102,241,0.3), 0 0 120px -20px rgba(139,92,246,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                {/* Badge "Más solicitado" */}
                {plan.badge && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                    style={{ zIndex: 20 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="px-5 py-1.5 rounded-full text-white text-xs font-bold tracking-wide"
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

                {/* Cuerpo de la card */}
                <div className="p-7 lg:p-8 flex flex-col flex-1">

                  {/* Ícono + nombre */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: plan.featured
                          ? "rgba(129,140,248,0.15)"
                          : "rgba(255,255,255,0.06)",
                        border: `1px solid ${plan.featured ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <plan.Icon size={20} style={{ color: plan.accentColor }} />
                    </div>
                    <div>
                      <p
                        className="text-white font-bold text-base"
                        style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
                      >
                        {plan.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: plan.featured ? "#a78bfa" : "#71717a",
                        }}
                      >
                        {plan.label}
                      </p>
                    </div>
                  </div>

                  {/* ── BLOQUE DE PRECIO CON PSICOLOGÍA ── */}
                  <div className="mb-2">

                    {/* 1. ANCLAJE — precio de agencia tachado + ahorro */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs line-through"
                        style={{ fontFamily: "Inter, sans-serif", color: "#52525b" }}
                      >
                        Agencias cobran: ${plan.refPrice.toLocaleString("es-CO")}
                      </span>
                      <motion.span
                        initial={{ scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.25 }}
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          background: "rgba(34,197,94,0.15)",
                          color: "#4ade80",
                          border: "1px solid rgba(34,197,94,0.25)",
                        }}
                      >
                        ✓ {plan.savingsLabel}
                      </motion.span>
                    </div>

                    {/* 2. PRECIO PRINCIPAL ANIMADO */}
                    <p
                      className="text-zinc-400 text-xs mb-0.5"
                      style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}
                    >
                      Tú pagas solo
                    </p>
                    <p
                      className="text-white"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3vw, 2.25rem)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      <AnimatedPrice value={plan.price} />
                    </p>

                    {/* COP + pago */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-zinc-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                        COP · pago único
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          background: "rgba(255,255,255,0.06)",
                          color: "#a1a1aa",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        50% inicio · 50% entrega
                      </span>
                    </div>

                    {/* 3. AMORTIZACIÓN MENSUAL — el golpe psicológico */}
                    <div
                      className="flex items-center gap-1.5 mt-3 px-3 py-2 rounded-xl"
                      style={{
                        background: plan.featured ? "rgba(129,140,248,0.08)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${plan.featured ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <span className="text-lg">💡</span>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: plan.featured ? "#c4b5fd" : "#71717a",
                          lineHeight: 1.4,
                        }}
                      >
                        Equivale a solo{" "}
                        <strong style={{ color: plan.featured ? "#e9d5ff" : "#a1a1aa" }}>
                          ${plan.monthlyEquiv.toLocaleString("es-CO")}/mes
                        </strong>{" "}
                        durante 1 año
                      </span>
                    </div>

                    {/* 4. ROI — recuperación de inversión */}
                    <div className="flex items-start gap-1.5 mt-2 px-1">
                      <span className="text-green-400 text-xs mt-0.5">↗</span>
                      <span
                        className="text-xs italic"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: "#4ade80",
                          lineHeight: 1.4,
                        }}
                      >
                        {plan.roiNote}
                      </span>
                    </div>
                  </div>

                  {/* Tiempo de entrega */}
                  <div
                    className="flex items-center gap-2 mt-4 mb-4 px-3 py-2 rounded-xl"
                    style={{
                      background: plan.featured ? "rgba(129,140,248,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${plan.featured ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Clock size={13} style={{ color: plan.featured ? "#a78bfa" : "#6366f1", flexShrink: 0 }} />
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: plan.featured ? "#c4b5fd" : "#a1a1aa",
                      }}
                    >
                      Entrega: {plan.delivery}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p
                    className="text-zinc-400 text-sm mb-6 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}
                  >
                    {plan.description}
                  </p>

                  {/* Separador */}
                  <div
                    className="w-full h-px mb-5"
                    style={{
                      background: plan.featured
                        ? "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <Feature key={f} text={f} featured={plan.featured} />
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <motion.button
                      onClick={scrollToContact}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer group font-semibold transition-all duration-200"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        ...(plan.featured
                          ? {
                              background:
                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                              color: "#fff",
                              boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                            }
                          : {
                              background: "rgba(255,255,255,0.08)",
                              color: "#e4e4e7",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }),
                      }}
                    >
                      {plan.cta}
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </motion.button>

                    <motion.a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      className="w-full py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm transition-all duration-200"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        background: "rgba(37,211,102,0.1)",
                        color: "#4ade80",
                        border: "1px solid rgba(37,211,102,0.2)",
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

          {/* ── NOTA INFERIOR ── */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-zinc-600 text-sm mt-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ¿No sabes cuál elegir?{" "}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
            >
              Escríbenos y te asesoramos sin costo.
            </a>
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECCIÓN CLARA — Todos los proyectos incluyen
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-5">
              <span
                className="text-zinc-500 text-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Incluido en todos los planes
              </span>
            </div>
            <h3
              className="text-zinc-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Estándares de calidad que aplicamos
            </h3>
            <p
              className="text-zinc-400 mt-2 max-w-md mx-auto"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.6 }}
            >
              Buenas prácticas que implementamos en cada proyecto.{" "}
              <span className="text-zinc-500 font-medium">
                Pasa el cursor sobre cada elemento para ver qué incluye.
              </span>
            </p>
          </motion.div>

          {/* Grid de estándares con tooltips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {guarantees.map((g, i) => (
              <GuaranteeCard key={g.label} {...g} index={i} />
            ))}
          </div>

          {/* Franja final de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-zinc-400 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {[
              "✅ SSL incluido en todos los planes",
              "✅ Sin costos ocultos",
              "✅ Precios fijos garantizados",
              "✅ 50% inicio · 50% entrega",
            ].map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA final */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <motion.button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 bg-zinc-900 text-white rounded-xl font-semibold text-sm cursor-pointer transition-colors hover:bg-zinc-700 inline-flex items-center gap-2 group"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Solicitar cotización gratuita
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="px-8 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold text-sm cursor-pointer transition-colors hover:bg-[#20c05a] inline-flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif" }}
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
