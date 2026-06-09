import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  CheckCircle2, XCircle, ArrowRight, MessageCircle, Clock,
  TrendingUp, ShieldCheck, Zap, Smartphone, Search,
  BarChart2, Lock, Monitor, Eye, Globe,
} from "lucide-react";
import { useLang } from "../../hooks/useLang";

const WA_BASE = "https://wa.me/573123198706?text=";
const WA_PLANS_ES: Record<string, string> = {
  inicio:      WA_BASE + encodeURIComponent("Hola, me interesa el Plan Esencial ($590.000 COP). ¿Pueden darme más información?"),
  crecimiento: WA_BASE + encodeURIComponent("Hola, me interesa el Plan Profesional ($990.000 COP). ¿Pueden darme más información?"),
  empresarial: WA_BASE + encodeURIComponent("Hola, me interesa el Plan Empresarial (desde $2.500.000 COP). ¿Pueden darme más información?"),
};
const WA_PLANS_EN: Record<string, string> = {
  inicio:      WA_BASE + encodeURIComponent("Hello, I'm interested in the Essential Plan ($590,000 COP). Can you give me more information?"),
  crecimiento: WA_BASE + encodeURIComponent("Hello, I'm interested in the Professional Plan ($990,000 COP). Can you give me more information?"),
  empresarial: WA_BASE + encodeURIComponent("Hello, I'm interested in the Business Plan (from $2,500,000 COP). Can you give me more information?"),
};
const WA = WA_BASE + encodeURIComponent("Hola, me interesa cotizar una página web para mi negocio.");

const PLAN_VISUAL = [
  { id: "inicio",      price: 590000, priceLabel: null,              accent: "#818cf8", featured: false },
  { id: "crecimiento", price: 990000, priceLabel: null,              accent: "#a78bfa", featured: true  },
  { id: "empresarial", price: 0,      priceLabel: "Desde $2.500.000",accent: "#34d399", featured: false },
];

const PLANS_ES = [
  {
    id: "inicio",
    badge: null,
    name: "Plan Esencial",
    label: "Presencia online profesional",
    tagline: "Presencia online profesional para tu negocio",
    delivery: "10 días hábiles",
    cta: "Quiero empezar",
    roiNote: null as string | null,
    urgency: null as string | null,
    dailyCost: null as string | null,
    socialProof: null as string | null,
    description: "Ideal para emprendedores, profesionales independientes y pequeños negocios en Colombia que necesitan una web seria que genere confianza y contactos.",
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
      "Sin dominio propio (ej: tunegocio.com)",
      "Sin posicionamiento en Google Maps",
      "Sin landing page de captación por servicio",
    ],
  },
  {
    id: "crecimiento",
    badge: "⭐ MÁS POPULAR",
    name: "Plan Profesional",
    label: "La web que trabaja por tu negocio 24/7",
    tagline: "La web que trabaja por tu negocio 24/7",
    delivery: "7 a 15 días hábiles",
    cta: "Quiero más clientes",
    roiNote: "1 consulta cerrada = inversión recuperada" as string | null,
    urgency: "Solo 2 cupos disponibles — uno ya reservado" as string | null,
    dailyCost: "$2.750 / día durante 1 año" as string | null,
    socialProof: "7 de cada 10 clientes colombianos eligen este plan" as string | null,
    description: "Para clínicas, consultorios, abogados y pymes colombianas que quieren captar clientes por internet con SEO, WhatsApp y diseño premium.",
    features: [
      "Todo lo del Plan Esencial incluido",
      "Hasta 8 páginas + blog configurado",
      "SEO avanzado por sector (abogados, clínicas…)",
      "Copy de conversión incluido por nuestro equipo",
      "Dominio .com.co tuyo + hosting 1 año",
      "Sabes cuántas personas visitan tu web",
      "Formularios avanzados de captura de leads",
      "Tus clientes te encuentran en Google Maps",
      "Soporte y ajustes durante 60 días",
      "Diseño adaptado a tu sector de negocio",
    ],
    missing: [] as string[],
  },
  {
    id: "empresarial",
    badge: null,
    name: "Plan Empresarial",
    label: "Estrategia digital completa",
    tagline: "Estrategia digital completa para liderar tu sector",
    delivery: "Según alcance del proyecto",
    cta: "Solicitar cotización",
    roiNote: null as string | null,
    urgency: null as string | null,
    dailyCost: null as string | null,
    socialProof: null as string | null,
    description: "Para negocios que quieren dominar su categoría en Google, aparecer en ChatGPT y Gemini, y automatizar la captación de clientes con IA.",
    features: [
      "Sistema de citas o reservas online",
      "Tienda virtual para vender tus productos",
      "Automatizaciones que trabajan por ti",
      "Integración con tus herramientas actuales",
      "Panel para gestionar tu contenido",
      "GEO SEO: visible en ChatGPT, Gemini y Claude",
      "Posicionamiento avanzado en Google",
      "Soporte prioritario dedicado 6 meses",
    ],
    missing: [] as string[],
  },
];

const PLANS_EN = [
  {
    id: "inicio",
    badge: null,
    name: "Essential Plan",
    label: "Professional online presence",
    tagline: "Professional online presence for your business",
    delivery: "10 business days",
    cta: "Get started",
    roiNote: null as string | null,
    urgency: null as string | null,
    dailyCost: null as string | null,
    socialProof: null as string | null,
    description: "Ideal for entrepreneurs, independent professionals and small businesses in Colombia that need a serious website that builds trust and generates leads.",
    features: [
      "Responsive web design up to 5 pages",
      "Initial technical SEO + Google indexing",
      "Google Analytics + Search Console configured",
      "SSL included + contact form",
      "WhatsApp Business integrated",
      "Optimised speed (Lighthouse +90)",
      "Guaranteed delivery in 10 business days",
      "30-day technical support",
    ],
    missing: [
      "No SEO-optimised blog",
      "No custom domain (e.g. yourbusiness.com)",
      "No Google Maps positioning",
      "No lead capture landing page per service",
    ],
  },
  {
    id: "crecimiento",
    badge: "⭐ MOST POPULAR",
    name: "Professional Plan",
    label: "The website that works for your business 24/7",
    tagline: "The website that works for your business 24/7",
    delivery: "7 to 15 business days",
    cta: "I want more clients",
    roiNote: "1 closed consultation = investment recovered" as string | null,
    urgency: "Only 2 spots available — one already reserved" as string | null,
    dailyCost: "$2,750 / day over 1 year" as string | null,
    socialProof: "7 out of 10 Colombian clients choose this plan" as string | null,
    description: "For clinics, practices, lawyers and Colombian SMEs that want to attract clients online with SEO, WhatsApp and premium design.",
    features: [
      "Everything in the Essential Plan included",
      "Up to 8 pages + blog configured",
      "Advanced SEO by sector (lawyers, clinics…)",
      "Conversion copy included by our team",
      "Your own .com.co domain + 1 year hosting",
      "Know how many people visit your website",
      "Advanced lead capture forms",
      "Your clients find you on Google Maps",
      "Support and adjustments for 60 days",
      "Design adapted to your business sector",
    ],
    missing: [] as string[],
  },
  {
    id: "empresarial",
    badge: null,
    name: "Business Plan",
    label: "Complete digital strategy",
    tagline: "Complete digital strategy to lead your sector",
    delivery: "According to project scope",
    cta: "Request a quote",
    roiNote: null as string | null,
    urgency: null as string | null,
    dailyCost: null as string | null,
    socialProof: null as string | null,
    description: "For businesses that want to dominate their category on Google, appear on ChatGPT and Gemini, and automate lead generation with AI.",
    features: [
      "Online appointment or booking system",
      "Online store to sell your products",
      "Automations that work for you",
      "Integration with your current tools",
      "Panel to manage your content",
      "GEO SEO: visible on ChatGPT, Gemini and Claude",
      "Advanced Google positioning",
      "Dedicated priority support 6 months",
    ],
    missing: [] as string[],
  },
];

const STANDARDS_ES = [
  { Icon: ShieldCheck, label: "Sitio seguro",        tooltip: "Tu página muestra el candado verde. Los clientes confían más en sitios seguros y Google los posiciona mejor en los resultados de búsqueda." },
  { Icon: Smartphone, label: "Perfecto en celular",  tooltip: "Tu web se ve impecable en cualquier teléfono. La mayoría de tus clientes potenciales te visitan desde el celular, no desde computador." },
  { Icon: Zap,        label: "Carga en segundos",    tooltip: "Cada segundo de demora aleja clientes. Tu web está optimizada para cargar rápido, mantener la atención y aparecer mejor en Google." },
  { Icon: Search,     label: "Visible en Google",    tooltip: "Configuramos tu sitio para que Google lo encuentre. Sin esto, tu web existe pero nadie la ve en los resultados de búsqueda." },
  { Icon: BarChart2,  label: "Estadísticas reales",  tooltip: "Sabes exactamente cuántas personas visitan tu web, qué buscan y desde dónde llegan. Información para tomar mejores decisiones." },
  { Icon: Globe,      label: "Indexado en Google",   tooltip: "Le decimos a Google todas tus páginas para que las muestre a las personas correctas en el momento correcto." },
  { Icon: Lock,       label: "Protección activa",    tooltip: "Tu sitio está protegido contra ataques automáticos comunes en internet. La información de tus visitantes siempre segura." },
  { Icon: Monitor,    label: "Todos los navegadores",tooltip: "Funciona perfectamente en Chrome, Safari, Firefox y Edge, sin importar el dispositivo o navegador del visitante." },
  { Icon: Eye,        label: "Fácil de navegar",     tooltip: "Diseñado para que cualquier persona encuentre lo que busca sin dificultad. Una buena experiencia convierte más visitantes en clientes." },
  { Icon: TrendingUp, label: "Orientado a vender",   tooltip: "Cada botón, sección y texto tiene un objetivo claro: que el visitante te llame, te escriba o te compre." },
];

const STANDARDS_EN = [
  { Icon: ShieldCheck, label: "Secure site",        tooltip: "Your page shows the green padlock. Clients trust secure sites more and Google ranks them better in search results." },
  { Icon: Smartphone, label: "Perfect on mobile",   tooltip: "Your website looks impeccable on any phone. Most of your potential clients visit you from mobile, not a computer." },
  { Icon: Zap,        label: "Loads in seconds",    tooltip: "Every second of delay drives clients away. Your website is optimised to load fast, hold attention and rank better on Google." },
  { Icon: Search,     label: "Visible on Google",   tooltip: "We configure your site so Google finds it. Without this, your website exists but nobody sees it in search results." },
  { Icon: BarChart2,  label: "Real statistics",     tooltip: "You know exactly how many people visit your website, what they search for and where they come from. Data to make better decisions." },
  { Icon: Globe,      label: "Indexed on Google",   tooltip: "We tell Google all your pages so it shows them to the right people at the right moment." },
  { Icon: Lock,       label: "Active protection",   tooltip: "Your site is protected against common automated internet attacks. Your visitors' information always safe." },
  { Icon: Monitor,    label: "All browsers",        tooltip: "Works perfectly in Chrome, Safari, Firefox and Edge, regardless of the visitor's device or browser." },
  { Icon: Eye,        label: "Easy to navigate",    tooltip: "Designed so anyone finds what they're looking for without difficulty. A good experience converts more visitors into clients." },
  { Icon: TrendingUp, label: "Sales-oriented",      tooltip: "Every button, section and text has a clear goal: for the visitor to call you, message you or buy from you." },
];

const PRICING_UI = {
  ES: {
    badge: "Planes e Inversión",
    h2: "Una valla publicitaria cuesta $800.000/mes.",
    h2Highlight: "Tu web trabaja 365 días por mucho menos.",
    subtitle: "Inversión única. Sin mensualidades. El 90% de nuestros clientes recuperan la inversión con el primer cliente nuevo que llega por la web.",
    socialProofCount: "+40 negocios",
    socialProofSuffix: "ya confían en nosotros",
    paymentTerms: "50% al iniciar · 50% al entregar",
    deliveryLabel: "Entrega:",
    priceOneTime: "Inversión única",
    priceNote: "COP · pago único",
    missingTitle: "Lo que NO incluye este plan",
    waBtn: "Preguntar por WhatsApp",
    comparisonText: "¿Tienes una clínica, restaurante o empresa de servicios?",
    comparisonHighlight: "El Plan Profesional fue diseñado exactamente para ti. 7 de cada 10 clientes nuestros lo eligen.",
    comparisonCta: "Asesoría gratuita",
    standardsBadge: "Incluido en todos los planes",
    standardsTitle: "Todo lo que garantizamos en cada proyecto",
    standardsSubtitle: "Pasa el cursor sobre cada elemento para saber qué significa para tu negocio.",
    trustItems: ["SSL incluido en todos los planes", "Sin costos ocultos", "Precios fijos garantizados", "50% inicio · 50% entrega"],
    ctaMain: "Quiero mi página web ahora",
    ctaWA: "Hablar por WhatsApp",
    locale: "es-CO",
  },
  EN: {
    badge: "Plans & Investment",
    h2: "A billboard costs $800,000/month.",
    h2Highlight: "Your website works 365 days for much less.",
    subtitle: "One-time investment. No monthly fees. 90% of our clients recover their investment with the first new client from the web.",
    socialProofCount: "+40 businesses",
    socialProofSuffix: "already trust us",
    paymentTerms: "50% to start · 50% on delivery",
    deliveryLabel: "Delivery:",
    priceOneTime: "One-time investment",
    priceNote: "COP · one-time payment",
    missingTitle: "What this plan does NOT include",
    waBtn: "Ask on WhatsApp",
    comparisonText: "Do you have a clinic, restaurant or service business?",
    comparisonHighlight: "The Professional Plan was designed exactly for you. 7 out of 10 of our clients choose it.",
    comparisonCta: "Free advice",
    standardsBadge: "Included in all plans",
    standardsTitle: "Everything we guarantee in every project",
    standardsSubtitle: "Hover over each item to see what it means for your business.",
    trustItems: ["SSL included in all plans", "No hidden costs", "Guaranteed fixed prices", "50% start · 50% delivery"],
    ctaMain: "I want my website now",
    ctaWA: "Talk on WhatsApp",
    locale: "en-US",
  },
};

function AnimatedPrice({ value, locale }: { value: number; locale: string }) {
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

  return <span ref={ref}>${displayed.toLocaleString(locale)}</span>;
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
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center cursor-default"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>?</span>
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <Icon size={18} style={{ color: "#818cf8" }} />
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
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#fff", marginBottom: "6px" }}>{label}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{tooltip}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #18181b" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Pricing() {
  const lang = useLang();
  const isCOEn = lang.startsWith("en");
  const ui = PRICING_UI[isCOEn ? "EN" : "ES"];
  const activePlans = (isCOEn ? PLANS_EN : PLANS_ES).map((p, i) => ({ ...PLAN_VISUAL[i], ...p }));
  const activeStandards = isCOEn ? STANDARDS_EN : STANDARDS_ES;
  const waPlans = isCOEn ? WA_PLANS_EN : WA_PLANS_ES;

  const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section id="pricing" className="relative py-24 overflow-hidden" style={{ background: "#0d0d18" }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── HEADER ── */}
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
                {ui.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff", marginBottom: "16px" }}
            >
              {ui.h2}
              <br />
              <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {ui.h2Highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto 24px" }}
            >
              {ui.subtitle}
            </motion.p>

            {/* Social proof bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex flex-wrap items-center justify-center gap-5"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["#6366f1","#8b5cf6","#a855f7","#ec4899"].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-white" style={{ background: c, borderColor: "#0d0d18", fontSize: "9px", fontWeight: 700 }}>
                      {["C","M","A","R"][i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  <strong style={{ color: "rgba(255,255,255,0.75)" }}>{ui.socialProofCount}</strong> {ui.socialProofSuffix}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", marginLeft: "2px" }}>4.9/5</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>{ui.paymentTerms}</strong>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── PLAN CARDS ── */}
          <div className="grid lg:grid-cols-3 gap-5 items-center">
            {activePlans.map((plan, i) => (
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
                        background: "linear-gradient(160deg, rgba(67,56,202,0.35) 0%, rgba(13,13,24,0.97) 55%)",
                        border: "1px solid rgba(129,140,248,0.35)",
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
                  <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent 50%, rgba(168,85,247,0.05))", zIndex: -1 }} />
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
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}

                <div className="p-7 lg:p-8 flex flex-col flex-1">

                  {/* Plan label + name */}
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}28` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} />
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
                  <div className="mb-4">
                    {plan.price > 0 ? (
                      <>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>
                          {ui.priceOneTime}
                        </p>
                        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3vw, 2.6rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "#fff" }}>
                          <AnimatedPrice value={plan.price} locale={ui.locale} />
                        </p>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>{ui.priceNote}</p>
                      </>
                    ) : (
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "1.7rem", color: plan.accent, letterSpacing: "-0.03em" }}>
                        {plan.priceLabel} COP
                      </p>
                    )}
                  </div>

                  {/* ROI + Daily cost widget — only featured */}
                  {plan.featured && plan.dailyCost && (
                    <div className="mb-4 rounded-2xl p-3.5 flex flex-col gap-2" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(129,140,248,0.18)" }}>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={13} style={{ color: "#a78bfa", flexShrink: 0 }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#c4b5fd" }}>
                          {plan.dailyCost}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{plan.roiNote}</span>
                      </div>
                    </div>
                  )}

                  {/* Social proof — only featured */}
                  {plan.featured && plan.socialProof && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-1">
                        {["#6366f1","#8b5cf6","#a855f7"].map((c, idx) => (
                          <div key={idx} className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-white" style={{ background: c, borderColor: "#0d0d18", fontSize: "7px", fontWeight: 700 }}>
                            {["C","M","A"][idx]}
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
                    <Clock size={13} style={{ color: plan.featured ? "#a78bfa" : "#818cf8", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: plan.featured ? "#c4b5fd" : "rgba(255,255,255,0.5)" }}>
                      {ui.deliveryLabel} {plan.delivery}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px mb-5" style={{ background: plan.featured ? "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)" : "rgba(255,255,255,0.06)" }} />

                  {/* Features ✅ */}
                  <ul className="flex flex-col gap-2.5 mb-4 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: plan.featured ? "#a78bfa" : "#818cf8" }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.5, color: plan.featured ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Missing features ❌ */}
                  {plan.missing.length > 0 && (
                    <div className="mb-5">
                      <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", color: "rgba(255,80,80,0.6)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "10px" }}>
                        {ui.missingTitle}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {plan.missing.map((m) => (
                          <li key={m} className="flex items-start gap-2.5">
                            <XCircle size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(255,80,80,0.45)" }} />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", lineHeight: 1.45, color: "rgba(255,255,255,0.25)" }}>
                              {m}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Urgency — only featured */}
                  {plan.featured && plan.urgency && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shrink-0" />
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
                          : plan.id === "empresarial"
                          ? { background: `${plan.accent}15`, color: plan.accent, border: `1px solid ${plan.accent}30` }
                          : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.1)" }),
                      }}
                      aria-label={`${plan.cta} — ${plan.name}`}
                    >
                      {plan.cta}
                      <ArrowRight size={15} aria-hidden="true" />
                    </motion.button>

                    <motion.a
                      href={waPlans[plan.id] ?? WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, background: "rgba(37,211,102,0.08)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.18)", textDecoration: "none" }}
                      aria-label={`${ui.waBtn} — ${plan.name}`}
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                      {ui.waBtn}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── COMPARISON NUDGE ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.2)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                {ui.comparisonText}{" "}
                <span style={{ color: "rgba(255,255,255,0.65)" }}>{ui.comparisonHighlight}</span>
              </p>
            </div>
            <motion.a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
            >
              <MessageCircle size={15} />
              {ui.comparisonCta}
            </motion.a>
          </motion.div>

        </div>
      </section>

      {/* ── STANDARDS SECTION ── */}
      <section className="py-20" style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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
                {ui.standardsBadge}
              </span>
            </div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "10px" }}>
              {ui.standardsTitle}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              {ui.standardsSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {activeStandards.map((s, i) => (
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
            {ui.trustItems.map((item) => (
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
              type="button"
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2 group"
              style={{ fontFamily: "Inter, sans-serif", background: "linear-gradient(135deg, #6366f1, #a855f7)", color: "#fff", boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}
              aria-label={ui.ctaMain}
            >
              {ui.ctaMain}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </motion.button>
            <motion.a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm cursor-pointer inline-flex items-center gap-2"
              style={{ fontFamily: "Inter, sans-serif", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
            >
              <MessageCircle size={16} />
              {ui.ctaWA}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
