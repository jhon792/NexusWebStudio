import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { usePageSEO } from "../../hooks/usePageSEO";
import { Navbar } from "../components/Navbar";
import { TrustSection } from "../components/TrustSection";
import { WhySellOnline } from "../components/WhySellOnline";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Process } from "../components/Process";
import { PricingES } from "../components/PricingES";
import { WhyMe } from "../components/WhyMe";
import { FAQUES } from "../components/FAQUES";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

const WA =
  "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20solicitar%20presupuesto%20para%20una%20p%C3%A1gina%20web.";

const trustItems = [
  "+40 negocios atendidos",
  "Entrega en 15 a 30 días",
  "Resultados medibles",
  "Soporte incluido",
  "Sin costes ocultos",
];

const HEADING_LINES = ["Páginas web que", "generan clientes", "en España."];

// ── Schema JSON-LD España ───────────────────────────────────────────────────
const schemaES = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.nexsustudio.site/en/#webpage",
      "url": "https://www.nexsustudio.site/en/",
      "name": "Diseño Web para España | Nexsu Studio",
      "inLanguage": "es-ES",
      "isPartOf": { "@id": "https://www.nexsustudio.site/#website" },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService", "WebDesigner"],
      "@id": "https://www.nexsustudio.site/en/#business-es",
      "name": "Nexsu Studio — Diseño Web España",
      "url": "https://www.nexsustudio.site/en/",
      "description":
        "Agencia de diseño web para España y Europa. Especializados en despachos de abogados, clínicas estéticas, odontólogos e inmobiliarias. Planes desde 390 €. Precio cerrado, entrega en 10 días.",
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "areaServed": [
        { "@type": "Country", "name": "España" },
        { "@type": "City", "name": "Madrid" },
        { "@type": "City", "name": "Barcelona" },
        { "@type": "City", "name": "Valencia" },
        { "@type": "City", "name": "Sevilla" },
        { "@type": "City", "name": "Bilbao" },
        { "@type": "AdministrativeArea", "name": "Europa" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Planes de Diseño Web — España",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Plan Esencial — Primera Presencia Online Profesional" },
            "price": "390",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Plan Profesional — Web que Genera Clientes en España" },
            "price": "790",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Plan Premium — Estrategia Digital Completa con GEO SEO" },
            "price": "1490",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta una página web para abogados en España?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Una página web profesional para despachos de abogados en España cuesta entre 390 € y 1.490 € según el plan. El Plan Esencial cuesta 390 €, el Plan Profesional 790 € y el Plan Premium 1.490 €. Todos incluyen diseño personalizado, SEO técnico inicial y soporte. Precio cerrado, sin mensualidades.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo tarda en estar lista mi web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El Plan Esencial se entrega en 10 días hábiles. El Plan Profesional en 15 días hábiles y el Plan Premium en 21 días hábiles. Todos los plazos están garantizados en el contrato.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Mi web va a aparecer en Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Todos nuestros proyectos incluyen SEO técnico inicial, configuración de Google Search Console e indexación garantizada. El posicionamiento orgánico en resultados relevantes tarda entre 3 y 6 meses desde la publicación.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si quiero cambiar algo después de entregada la web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tienes soporte incluido según tu plan: 30 días en Plan Esencial, 60 días en Plan Profesional y 90 días prioritario en Plan Premium. Después del periodo de soporte ofrecemos mantenimiento mensual opcional.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Trabajan con clientes de toda España o solo de Barcelona y Madrid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trabajamos con clientes de toda España de forma 100% remota. Hemos entregado proyectos en Madrid, Barcelona, Valencia, Sevilla, Bilbao y otras ciudades. El proceso es completamente online y en español.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Qué es el GEO SEO que incluye el Plan Premium?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El GEO SEO es la optimización de tu web para aparecer citada en respuestas de inteligencias artificiales como ChatGPT, Google Gemini y Claude. Incluye estructura de contenido extractable, schema markup avanzado y FAQ optimizadas para búsqueda por IA.",
          },
        },
      ],
    },
  ],
};

// ── Typewriter heading ──────────────────────────────────────────────────────
function TypewriterHeading() {
  const [displayed, setDisplayed] = useState<string[]>(["", "", ""]);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const allChars = HEADING_LINES.join("\n");
    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      const partial = allChars.slice(0, charIndex);
      const parts = partial.split("\n");
      setDisplayed([parts[0] ?? "", parts[1] ?? "", parts[2] ?? ""]);
      if (charIndex >= allChars.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!done) return;
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
        lineHeight: 1.07,
        letterSpacing: "-0.036em",
        color: "#fff",
        marginBottom: 24,
        minHeight: "calc(3 * 1.07 * clamp(2.4rem, 5vw, 3.75rem))",
      }}
    >
      {displayed[0]}
      <br />
      <span
        style={{
          background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #c084fc 80%, #e879f9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayed[1]}
      </span>
      <br />
      {displayed[2]}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: "3px",
            background: "#8b5cf6",
            marginLeft: 2,
            opacity: showCursor ? 1 : 0,
            transition: "opacity 0.1s",
            verticalAlign: "middle",
            height: "0.85em",
          }}
        />
      )}
    </motion.h1>
  );
}

// ── Magnetic button ─────────────────────────────────────────────────────────
function MagneticWrapper({ children, strength = 0.35, radius = 130 }: { children: React.ReactNode; strength?: number; radius?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 350, damping: 22 });
  const y = useSpring(0, { stiffness: 350, damping: 22 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) { x.set(dx * strength); y.set(dy * strength); }
    },
    [strength, radius, x, y]
  );

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x, y, willChange: "transform", display: "inline-block" }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

// ── Hero España ─────────────────────────────────────────────────────────────
function HeroES() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nebulaTopY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const nebulaBotY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const sectors = [
    { label: "Abogados", href: "/en/sectores/diseno-web-para-abogados/" },
    { label: "Clínicas Estéticas", href: "/en/sectores/diseno-web-para-clinicas-esteticas/" },
    { label: "Odontólogos", href: "/en/sectores/diseno-web-para-odontologos/" },
    { label: "Inmobiliarias", href: "/en/sectores/diseno-web-para-inmobiliarias/" },
    { label: "Constructoras", href: "/en/sectores/diseno-web-para-constructoras/" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden"
      style={{ background: "#06040f" }}
      aria-label="Diseño web premium para España — Nexsu Studio"
    >
      {/* Grid fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ backgroundImage: ["linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px)", "linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)", "linear-gradient(rgba(139,92,246,0.018) 1px, transparent 1px)", "linear-gradient(90deg, rgba(139,92,246,0.018) 1px, transparent 1px)"].join(","), backgroundSize: "60px 60px, 60px 60px, 240px 240px, 240px 240px" }} />

      {/* Nebulosas */}
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 100% 65% at 72% -5%, rgba(88,28,135,0.24) 0%, rgba(99,102,241,0.12) 45%, transparent 68%)", y: nebulaTopY }} />
      <motion.div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "-15%", left: "-10%", width: "65%", height: "80%", background: "radial-gradient(ellipse 75% 65% at 45% 45%, rgba(76,29,149,0.18) 0%, rgba(109,40,217,0.06) 55%, transparent 75%)", filter: "blur(55px)", y: nebulaTopY }} />
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "5%", right: "-15%", width: "70%", height: "90%", background: "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(37,99,235,0.16) 0%, rgba(59,130,246,0.07) 55%, transparent 78%)", filter: "blur(60px)" }} />
      <motion.div className="absolute pointer-events-none" aria-hidden="true" style={{ bottom: "-20%", left: "15%", width: "70%", height: "60%", background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(126,34,206,0.12) 0%, transparent 70%)", filter: "blur(65px)", y: nebulaBotY }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col max-w-3xl">

          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8 self-start">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.28)" }}>
              <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.72)" }}>
                🇪🇸 Especialistas en web para España y Europa
              </span>
            </div>
          </motion.div>

          {/* H1 typewriter */}
          <TypewriterHeading />

          {/* Subtítulo */}
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.78, color: "rgba(255,255,255,0.48)", marginBottom: 24, maxWidth: 560 }}>
            Diseño web premium con SEO, automatización con IA y entrega en 15 días. Especialistas en abogados, clínicas estéticas, odontólogos e inmobiliarias en España.
          </motion.p>

          {/* Sectores */}
          <motion.nav custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-2 mb-8" aria-label="Sectores que atendemos en España">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.32)", flexShrink: 0 }}>Sectores:</span>
            {sectors.map(({ label, href }) => (
              <motion.a key={label} href={href} whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.5)" }} transition={{ duration: 0.15 }} style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.22)", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(199,193,255,0.75)", textDecoration: "none" }}>
                {label}
              </motion.a>
            ))}
          </motion.nav>

          {/* Price anchor */}
          <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-8">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>
              Desde <strong style={{ color: "rgba(255,255,255,0.65)" }}>390 €</strong>
              {" · "}Entrega en 10 días
              {" · "}Precio cerrado
            </p>
            <button
              type="button"
              onClick={() => scrollTo("#pricing")}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#818cf8", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0, minHeight: "unset", minWidth: "unset" }}
              aria-label="Ver todos los planes de precios para España"
            >
              → Ver planes
            </button>
          </motion.div>

          {/* CTAs */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3 mb-10">
            <MagneticWrapper strength={0.3} radius={120}>
              <motion.a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "14px 28px", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)", borderRadius: 14, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none", boxShadow: "0 8px 36px rgba(99,102,241,0.38), 0 2px 8px rgba(99,102,241,0.20)", display: "inline-flex", alignItems: "center", gap: 10 }}
                whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(99,102,241,0.6), 0 2px 8px rgba(99,102,241,0.25)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                aria-label="Solicitar presupuesto de diseño web por WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                </svg>
                Solicitar presupuesto — WhatsApp
              </motion.a>
            </MagneticWrapper>

            <motion.button
              type="button"
              onClick={() => scrollTo("#portfolio")}
              className="inline-flex items-center gap-2 cursor-pointer"
              style={{ padding: "14px 24px", background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 14, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,0.80)" }}
              whileHover={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.22)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              aria-label="Ver casos de éxito y ejemplos de diseño web para España"
            >
              Ver casos de éxito
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* Trust items */}
          <motion.ul custom={5} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-x-5 gap-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {trustItems.map((item, i) => (
              <motion.li key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }} className="flex items-center gap-1.5">
                <CheckCircle size={14} style={{ color: "#818cf8", flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.52)" }}>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

// ── Página completa España ──────────────────────────────────────────────────
export default function HomeES() {
  usePageSEO({
    title: "Páginas web que generan clientes para empresas, abogados y clínicas en España | Nexsu Studio",
    description:
      "Diseño web premium con SEO, automatización con IA y entrega en 15 días. Especialistas en abogados, clínicas estéticas, odontólogos e inmobiliarias en España. Desde 390 €. Presupuesto gratuito.",
    canonical: "https://www.nexsustudio.site/en/",
  });

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: "#09090b", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* Schema JSON-LD España */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaES) }} />

      <Navbar />
      <main id="main-content">
        <HeroES />
        <TrustSection />
        <WhySellOnline />
        <Services />
        <Projects />
        <Process />
        <PricingES />
        <WhyMe />
        <FAQUES />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
