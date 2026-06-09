import { motion } from "motion/react";
import {
  HeartHandshake, Palette, Smartphone, Users,
  MessageSquare, Code2, Zap, ShieldCheck,
} from "lucide-react";
import { useRegion } from "../../hooks/useRegion";
import { useLang } from "../../hooks/useLang";
import { WHYME_SPAIN, type Region4 } from "../../i18n/spainContent";

const DIFF_META = [
  { icon: HeartHandshake, accent: "#818cf8" },
  { icon: Palette,        accent: "#c084fc" },
  { icon: Smartphone,     accent: "#60a5fa" },
  { icon: Users,          accent: "#34d399" },
  { icon: MessageSquare,  accent: "#25D366" },
  { icon: Code2,          accent: "#fbbf24" },
  { icon: Zap,            accent: "#f59e0b" },
  { icon: ShieldCheck,    accent: "#fb7185" },
];

const CO_DIFFS_ES = [
  { title: "Atención personalizada",           description: "Trabajamos directamente contigo, sin intermediarios. Cada proyecto recibe atención dedicada desde el inicio hasta el lanzamiento." },
  { title: "Diseño moderno",                   description: "Creamos diseños visualmente atractivos y actuales, alineados con las tendencias del sector y adaptados a la identidad de tu negocio." },
  { title: "Optimización móvil",               description: "Tu sitio se ve perfecto en celulares. Diseñamos primero para móvil porque la mayoría de tus clientes potenciales llegan desde su teléfono." },
  { title: "Enfoque en experiencia de usuario",description: "Cada elemento está pensado para guiar al visitante hacia la acción que más te interesa: llamarte, escribirte o solicitar información." },
  { title: "Comunicación constante",           description: "Te mantenemos informado durante todo el proceso. Respondemos tus preguntas y te explicamos cada decisión de diseño y desarrollo." },
  { title: "Desarrollo a medida",              description: "No usamos plantillas genéricas. Tu sitio web es creado específicamente para tu negocio, sus objetivos y su público objetivo." },
  { title: "Tecnología actual",                description: "Construimos con tecnologías modernas que garantizan velocidad, seguridad y escalabilidad para que tu sitio funcione de forma óptima." },
  { title: "Seguridad web",                    description: "Implementamos certificado SSL, cabeceras de seguridad y buenas prácticas para proteger tu sitio y la información de tus visitantes." },
];

const CO_DIFFS_EN = [
  { title: "Personalised attention",          description: "We work directly with you, no intermediaries. Every project receives dedicated attention from start to launch." },
  { title: "Modern design",                   description: "We create visually attractive and current designs, aligned with industry trends and adapted to your brand identity." },
  { title: "Mobile optimisation",             description: "Your site looks perfect on phones. We design mobile-first because most of your potential clients arrive from their smartphone." },
  { title: "User experience focus",           description: "Every element is designed to guide the visitor toward the action that matters most: calling you, messaging you or requesting information." },
  { title: "Constant communication",          description: "We keep you informed throughout the entire process. We answer your questions and explain every design and development decision." },
  { title: "Custom development",              description: "We don't use generic templates. Your website is created specifically for your business, its goals and its target audience." },
  { title: "Current technology",              description: "We build with modern technologies that guarantee speed, security and scalability so your site works optimally." },
  { title: "Web security",                    description: "We implement SSL certificate, security headers and best practices to protect your site and your visitors' information." },
];

const CO_CTA = {
  ES: {
    badge: "Nuestros diferenciadores",
    heading: "No somos una fábrica de webs.",
    highlight: "Máximo 3 clientes al mes.",
    subtitle: "Por eso cada sitio está construido 100% a medida, con atención directa y resultados verificables.",
    ctaTitle: "Quedan 2 cupos en junio. ¿Tu negocio merece uno?",
    ctaSub: "Empieza con un diagnóstico gratuito — sin compromiso, sin pagar nada, sin tecnicismos.",
    ctaBtn: "Diagnóstico gratuito",
    ctaWA: "WhatsApp",
  },
  EN: {
    badge: "Our differentiators",
    heading: "We're not a web factory.",
    highlight: "Maximum 3 clients per month.",
    subtitle: "That's why every site is built 100% custom, with direct attention and verifiable results.",
    ctaTitle: "2 spots left in June. Does your business deserve one?",
    ctaSub: "Start with a free diagnosis — no commitment, no payment, no technical jargon.",
    ctaBtn: "Free diagnosis",
    ctaWA: "WhatsApp",
  },
};

const WA_CO = "https://wa.me/573123198706?text=Hola%2C%20quiero%20el%20diagn%C3%B3stico%20gratuito%20de%20mi%20p%C3%A1gina%20web.";
const WA_ES = "https://wa.me/573123198706?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios%20para%20Espa%C3%B1a.";

export function WhyMe() {
  const region = useRegion();
  const lang = useLang();
  const isSpain = region !== "CO";
  const r = region as Region4;
  const d = isSpain ? (WHYME_SPAIN[r] ?? WHYME_SPAIN.ES) : null;
  const isCOEn = !isSpain && lang.startsWith("en");
  const co = CO_CTA[isCOEn ? "EN" : "ES"];

  const badge      = d?.badge      ?? co.badge;
  const heading    = d?.heading    ?? co.heading;
  const highlight  = d?.headingHighlight ?? co.highlight;
  const subtitle   = d?.subtitle   ?? co.subtitle;
  const ctaTitle   = d?.ctaTitle   ?? co.ctaTitle;
  const ctaSub     = d?.ctaSubtitle?? co.ctaSub;
  const ctaBtn     = d?.ctaBtn     ?? co.ctaBtn;
  const ctaWA      = d?.ctaWA      ?? co.ctaWA;
  const waLink     = isSpain ? WA_ES : WA_CO;

  const textDiffs = d?.differentiators ?? (isCOEn ? CO_DIFFS_EN : CO_DIFFS_ES);
  const differentiators = DIFF_META.map((meta, i) => ({
    ...meta,
    title: (textDiffs as readonly { title: string; description: string }[])[i]?.title ?? "",
    description: (textDiffs as readonly { title: string; description: string }[])[i]?.description ?? "",
  }));

  return (
    <section id="why" className="py-24" style={{ background: "#0d0d18" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {badge}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            {heading}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlight}
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {differentiators.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl p-5 cursor-default overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${d.accent}12, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${d.accent}18`, border: `1px solid ${d.accent}28` }}
                >
                  <d.icon size={18} style={{ color: d.accent }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {d.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 100%)",
            border: "1px solid rgba(129,140,248,0.2)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{ background: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15), transparent 65%)" }}
          />
          <div className="relative">
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2.5vw, 22px)",
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              {ctaTitle}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)" }}>
              {ctaSub}
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3 shrink-0">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl cursor-pointer transition-all duration-200 inline-flex items-center gap-2"
              style={{
                background: "#fff",
                color: "#09090b",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              {ctaBtn}
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer transition-all duration-200"
              style={{
                background: "rgba(37,211,102,0.12)",
                color: "#4ade80",
                border: "1px solid rgba(37,211,102,0.25)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
              </svg>
              {ctaWA}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
