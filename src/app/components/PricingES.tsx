import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  CheckCircle2, XCircle, ArrowRight, MessageCircle, Clock,
  TrendingUp, ShieldCheck, Zap, Smartphone, Search,
  BarChart2, Lock, Monitor, Eye, Globe, Languages,
} from "lucide-react";

const WA_BASE = "https://wa.me/573123198706?text=";
const WA_PLANS: Record<string, string> = {
  esencial:     WA_BASE + encodeURIComponent("Hola, me interesa el Plan Esencial (390 €). ¿Pueden darme más información?"),
  profesional:  WA_BASE + encodeURIComponent("Hola, me interesa el Plan Profesional (790 €). ¿Pueden darme más información?"),
  premium:      WA_BASE + encodeURIComponent("Hola, me interesa el Plan Premium (1.490 €). ¿Pueden darme más información?"),
};
const WA_DEFAULT = WA_BASE + encodeURIComponent("Hola, me interesa solicitar presupuesto para una página web en España.");

const plans = [
  {
    id: "esencial",
    badge: null,
    name: "Plan Esencial",
    label: "Tu primera presencia online profesional",
    tagline: "Tu primera presencia online profesional",
    price: 390,
    priceLabel: null,
    currency: "EUR",
    delivery: "10 días hábiles",
    accent: "#818cf8",
    featured: false,
    cta: "Quiero empezar",
    roiNote: null,
    urgency: null,
    dailyCost: null,
    socialProof: null,
    languages: ["🇪🇸 Español", "🇬🇧 English"],
    languageNote: "2 idiomas incluidos",
    description: "Ideal para autónomos, despachos unipersonales y pequeños negocios en España que necesitan presencia web profesional y comenzar a recibir contactos por internet.",
    features: [
      "Diseño web responsive hasta 5 páginas",
      "SEO técnico inicial + indexación en Google",
      "Google Analytics + Search Console configurado",
      "SSL incluido + formulario de contacto",
      "WhatsApp Business integrado",
      "Velocidad optimizada (Lighthouse +90)",
      "Entrega garantizada en 10 días hábiles",
      "Soporte técnico 30 días",
    ],
    missing: [
      "Sin blog optimizado para SEO",
      "Sin chatbot de IA para captación de leads",
      "Sin GEO SEO (ChatGPT, Gemini, Claude)",
      "Sin más de 2 idiomas",
    ],
  },
  {
    id: "profesional",
    badge: "⭐ MÁS POPULAR",
    name: "Plan Profesional",
    label: "La web que genera clientes, no solo visitas",
    tagline: "La web que genera clientes, no solo visitas",
    price: 790,
    priceLabel: null,
    currency: "EUR",
    delivery: "15 días hábiles",
    accent: "#a78bfa",
    featured: true,
    cta: "Quiero más clientes",
    roiNote: "1 cliente captado = inversión recuperada",
    urgency: "Solo 3 cupos disponibles — uno ya reservado",
    dailyCost: "2,16 € / día durante 1 año",
    socialProof: "El preferido por abogados, clínicas e inmobiliarias",
    languages: ["🇪🇸 Español", "🇬🇧 English"],
    languageNote: "Español + English incluidos",
    description: "Para despachos de abogados, clínicas estéticas, odontólogos y pymes en España que quieren captar clientes de forma constante. SEO avanzado, copy de conversión y CRM integrado.",
    features: [
      "Todo lo del Plan Esencial incluido",
      "Hasta 8 páginas + blog configurado",
      "SEO avanzado por sector (abogados, clínicas…)",
      "Copy de conversión incluido por nuestro equipo",
      "Schema markup + datos estructurados Google",
      "Página de captación por servicio",
      "1 landing page adicional optimizada",
      "Integración básica CRM (HubSpot o Notion)",
      "Entrega en 15 días hábiles",
      "Soporte 60 días + revisión al mes 3",
    ],
    missing: [],
  },
  {
    id: "premium",
    badge: null,
    name: "Plan Premium",
    label: "Estrategia digital completa para crecer en España",
    tagline: "Estrategia digital completa para crecer en España",
    price: 1490,
    priceLabel: null,
    currency: "EUR",
    delivery: "21 días hábiles",
    accent: "#34d399",
    featured: false,
    cta: "Solicitar presupuesto",
    roiNote: null,
    urgency: null,
    dailyCost: null,
    socialProof: null,
    languages: ["🇪🇸 Español", "🇬🇧 English", "🇫🇷 Français", "🇩🇪 Deutsch"],
    languageNote: "Hasta 4 idiomas incluidos",
    description: "Para negocios que quieren dominar su sector en España, aparecer en ChatGPT y Gemini, y automatizar la captación de clientes con IA generativa.",
    features: [
      "Todo lo del Plan Profesional incluido",
      "Hasta 12 páginas + landing pages por cada servicio",
      "GEO SEO: visible en ChatGPT, Gemini y Claude",
      "Multiidioma ES + EN incluido",
      "Automatización con IA (formularios inteligentes)",
      "Integración CRM avanzada + secuencia de email",
      "Google Ads setup inicial incluido",
      "Estrategia completa de captación de leads",
      "Entrega en 21 días hábiles",
      "Soporte prioritario 90 días",
    ],
    missing: [],
  },
];

const standards = [
  { Icon: ShieldCheck, label: "Sitio seguro (SSL)", tooltip: "Tu web muestra el candado seguro. Los clientes confían más y Google posiciona mejor los sitios con SSL. Incluido en todos los planes." },
  { Icon: Smartphone, label: "Perfecto en móvil", tooltip: "Tu web se ve impecable en cualquier dispositivo. En España más del 70% del tráfico web viene desde el móvil — diseñamos para eso." },
  { Icon: Zap, label: "Carga ultrarrápida", tooltip: "Cada segundo de demora hace que pierdas clientes. Tu web carga en menos de 2 segundos y aparece mejor en Google." },
  { Icon: Search, label: "Visible en Google", tooltip: "Configuramos la web para que Google la encuentre cuando alguien busca tu servicio en España. Sin esto tu web existe pero nadie la ve." },
  { Icon: BarChart2, label: "Analítica real", tooltip: "Sabes exactamente cuántas personas visitan tu web, qué buscan y desde dónde llegan. Datos reales para tomar mejores decisiones." },
  { Icon: Globe, label: "SEO técnico", tooltip: "Sitemap, hreflang, canonicals y robots.txt configurados. Google sabe todo lo que necesita para indexar tu web correctamente." },
  { Icon: Languages, label: "Multiidioma", tooltip: "Hasta 4 idiomas en el Plan Premium. Hreflang correcto para SEO internacional. Cada versión tiene su propio URL indexado en Google." },
  { Icon: Lock, label: "Protección activa", tooltip: "Tu web está protegida contra ataques comunes. La información de tus visitantes siempre segura según el RGPD." },
  { Icon: Monitor, label: "Todos los navegadores", tooltip: "Funciona en Chrome, Safari, Firefox y Edge. Compatible con cualquier dispositivo que usen tus clientes en España." },
  { Icon: Eye, label: "Centrado en conversión", tooltip: "Cada botón, sección y texto tiene un objetivo claro: que el visitante te llame, rellene el formulario o te escriba." },
];

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const DURATION = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayed(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{displayed.toLocaleString("es-ES")} €</span>;
}

function LanguageBadges({ langs, note }: { langs: string[]; note: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {langs.map((l) => (
          <span
            key={l}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 999,
              background: "rgba(129,140,248,0.12)",
              border: "1px solid rgba(129,140,248,0.25)",
              color: "#c4b5fd",
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 4 }}>
        <Languages size={11} style={{ color: "#818cf8" }} aria-hidden="true" />
        {note}
      </p>
    </div>
  );
}

function GuaranteeCard({ Icon, label, tooltip, index }: { Icon: React.ElementType; label: string; tooltip: string; index: number }) {
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
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${tooltip}`}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setHovered((v) => !v); }}
    >
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }} aria-hidden="true">?</span>
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <Icon size={18} style={{ color: "#818cf8" }} aria-hidden="true" />
      </div>
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
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
            style={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
            role="tooltip"
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#fff", marginBottom: "6px" }}>{label}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{tooltip}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #18181b" }} aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PricingES() {
  const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section id="pricing" className="relative py-24 overflow-hidden" style={{ background: "#0d0d18" }} aria-labelledby="pricing-es-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

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
                Planes e Inversión — España y Europa
              </span>
            </motion.div>

            <motion.h2
              id="pricing-es-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff", marginBottom: "16px" }}
            >
              Una agencia local en España cobra 3.000 €.
              <br />
              <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Nosotros entregamos lo mismo desde 390 €.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "500px", margin: "0 auto 24px" }}
            >
              Precio cerrado. Sin mensualidades. El 90% de nuestros clientes recuperan la inversión con el primer cliente captado.
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex flex-wrap items-center justify-center gap-5"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5" aria-hidden="true">
                  {["#6366f1","#8b5cf6","#a855f7","#ec4899"].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-white" style={{ background: c, borderColor: "#0d0d18", fontSize: "9px", fontWeight: 700 }}>
                      {["J","M","A","R"][i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  <strong style={{ color: "rgba(255,255,255,0.75)" }}>+200 proyectos</strong> entregados en Colombia y España
                </span>
              </div>
              <div className="flex items-center gap-1.5" aria-label="Valoración 4.9 sobre 5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", marginLeft: "2px" }}>4.9/5</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>50% al inicio · 50% en la entrega</strong>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Plan cards */}
          <div className="grid lg:grid-cols-3 gap-5 items-center">
            {plans.map((plan, i) => (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col rounded-3xl overflow-visible"
                aria-label={`${plan.name}: ${plan.price > 0 ? plan.price + " €" : plan.priceLabel}`}
                style={
                  plan.featured
                    ? {
                        background: "linear-gradient(160deg, rgba(67,56,202,0.35) 0%, rgba(13,13,24,0.97) 55%)",
                        border: "2px solid rgba(129,140,248,0.5)",
                        boxShadow: "0 0 0 1px rgba(129,140,248,0.15), 0 40px 90px -12px rgba(99,102,241,0.35), 0 0 60px -20px rgba(168,85,247,0.2)",
                        transform: "scale(1.04)",
                        zIndex: 10,
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                {plan.featured && (
                  <div className="absolute -inset-px rounded-3xl pointer-events-none" aria-hidden="true" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent 50%, rgba(168,85,247,0.05))", zIndex: -1 }} />
                )}

                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="px-5 py-1.5 rounded-full text-white text-xs font-bold tracking-wider whitespace-nowrap"
                      style={{ fontFamily: "Inter, sans-serif", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)", boxShadow: "0 4px 24px rgba(99,102,241,0.55)" }}
                      aria-label={plan.badge}
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}

                <div className="p-7 lg:p-8 flex flex-col flex-1">
                  {/* Plan name */}
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}28` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} aria-hidden="true" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: plan.accent }}>{plan.label}</span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", letterSpacing: "-0.02em" }}>
                      {plan.name}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>
                      Inversión única
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3vw, 2.6rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "#fff" }}>
                      <AnimatedPrice value={plan.price} />
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                      EUR · pago único, sin mensualidades
                    </p>
                  </div>

                  {/* Precio cerrado tagline */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(74,222,128,0.7)", marginBottom: "16px", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    Precio cerrado. Lo que ves es lo que pagas.
                  </p>

                  {/* Languages badge */}
                  <LanguageBadges langs={plan.languages} note={plan.languageNote} />

                  {/* ROI + Daily cost (featured only) */}
                  {plan.featured && plan.dailyCost && (
                    <div className="mb-4 rounded-2xl p-3.5 flex flex-col gap-2" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(129,140,248,0.18)" }}>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={13} style={{ color: "#a78bfa", flexShrink: 0 }} aria-hidden="true" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#c4b5fd" }}>
                          {plan.dailyCost}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{plan.roiNote}</span>
                      </div>
                    </div>
                  )}

                  {/* Social proof (featured only) */}
                  {plan.featured && plan.socialProof && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-1" aria-hidden="true">
                        {["#6366f1","#8b5cf6","#a855f7"].map((c, idx) => (
                          <div key={idx} className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-white" style={{ background: c, borderColor: "#0d0d18", fontSize: "7px", fontWeight: 700 }}>
                            {["A","M","C"][idx]}
                          </div>
                        ))}
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                        {plan.socialProof}
                      </span>
                    </div>
                  )}

                  {/* Delivery */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5" style={{ background: plan.featured ? "rgba(129,140,248,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${plan.featured ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                    <Clock size={13} style={{ color: plan.featured ? "#a78bfa" : "#818cf8", flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: plan.featured ? "#c4b5fd" : "rgba(255,255,255,0.5)" }}>
                      Entrega: {plan.delivery}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
                    {plan.description}
                  </p>

                  <div className="w-full h-px mb-5" style={{ background: plan.featured ? "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)" : "rgba(255,255,255,0.06)" }} aria-hidden="true" />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-4 flex-1" aria-label={`Características del ${plan.name}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: plan.featured ? "#a78bfa" : "#818cf8" }} aria-hidden="true" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.5, color: plan.featured ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Missing (loss aversion for Plan Esencial) */}
                  {plan.missing.length > 0 && (
                    <div className="mb-5">
                      <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} aria-hidden="true" />
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,80,80,0.6)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "10px" }}>
                        Lo que NO incluye este plan
                      </p>
                      <ul className="flex flex-col gap-2" aria-label="Funciones no incluidas">
                        {plan.missing.map((m) => (
                          <li key={m} className="flex items-start gap-2.5">
                            <XCircle size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(255,80,80,0.45)" }} aria-hidden="true" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", lineHeight: 1.45, color: "rgba(255,255,255,0.25)" }}>
                              {m}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Urgency (featured) */}
                  {plan.featured && plan.urgency && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shrink-0" aria-hidden="true" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "rgba(251,191,36,0.8)" }}>
                        {plan.urgency}
                      </span>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <motion.button
                      type="button"
                      onClick={scrollToContact}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer font-semibold"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: plan.featured ? "15px" : "14px",
                        ...(plan.featured
                          ? { background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)", color: "#fff", boxShadow: "0 10px 28px rgba(99,102,241,0.4)" }
                          : plan.id === "premium"
                          ? { background: `${plan.accent}15`, color: plan.accent, border: `1px solid ${plan.accent}30` }
                          : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.1)" }),
                      }}
                      aria-label={`${plan.cta} — ${plan.name}`}
                    >
                      {plan.cta}
                      <ArrowRight size={15} aria-hidden="true" />
                    </motion.button>

                    <motion.a
                      href={WA_PLANS[plan.id] ?? WA_DEFAULT}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, background: "rgba(37,211,102,0.08)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.18)", textDecoration: "none" }}
                      aria-label={`Preguntar por WhatsApp sobre ${plan.name}`}
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      Preguntar por WhatsApp
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Comparison nudge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)" }} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                ¿Tienes un despacho de abogados, clínica estética o inmobiliaria?{" "}
                <span style={{ color: "rgba(255,255,255,0.65)" }}>El <strong style={{ color: "#a78bfa" }}>Plan Profesional</strong> fue diseñado exactamente para tu sector.</span>
              </p>
            </div>
            <motion.a
              href={WA_PLANS.profesional}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
              aria-label="Solicitar asesoría gratuita por WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Asesoría gratuita
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Standards section */}
      <section className="py-20" style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.05)" }} aria-labelledby="standards-es-heading">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Incluido en todos los planes
              </span>
            </div>
            <h3 id="standards-es-heading" style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "10px" }}>
              Todo lo que garantizamos en cada proyecto
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Pulsa o pasa el cursor sobre cada elemento para saber qué significa para tu negocio.
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
            {["SSL incluido en todos los planes", "Sin costes ocultos", "Precios fijos garantizados", "50% inicio · 50% entrega", "Cumplimiento RGPD"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 whitespace-nowrap">
                <span style={{ color: "#22c55e" }} aria-hidden="true">✓</span>
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
              type="button"
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2 group"
              style={{ fontFamily: "Inter, sans-serif", background: "linear-gradient(135deg, #6366f1, #a855f7)", color: "#fff", boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}
              aria-label="Quiero mi página web ahora — ir al formulario de contacto"
            >
              Quiero mi página web ahora
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </motion.button>
            <motion.a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
              aria-label="Hablar por WhatsApp sobre diseño web para España"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Hablar por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
