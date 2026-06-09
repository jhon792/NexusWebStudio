import { motion } from "motion/react";
import { useRegion } from "../../hooks/useRegion";
import { useLang } from "../../hooks/useLang";
import { PROJECTS_SPAIN, type Region4 } from "../../i18n/spainContent";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
];

const DEMO_ACCENTS = ["#c084fc", "#fbbf24", "#fb923c", "#34d399", "#60a5fa"];

const CO_ITEMS_ES = [
  { category: "Clínica Estética",    title: "Diseño para clínica de estética",    description: "Ejemplo de cómo podría verse el sitio web de una clínica estética: presentación de tratamientos, galería de resultados, formulario de citas y sección de confianza.", tags: ["Citas online", "Galería de servicios", "WhatsApp integrado"] },
  { category: "Escuela de Conducción",title: "Diseño para autoescuela",            description: "Sitio web orientado a captar estudiantes: cursos disponibles, horarios, precios, proceso de inscripción y contacto directo por WhatsApp.", tags: ["Inscripción online", "Horarios", "Cotización rápida"] },
  { category: "Restaurante",          title: "Diseño para restaurante",            description: "Presencia digital para restaurante con menú visual, reservas, ubicación interactiva y galería de platos para despertar el apetito antes de la visita.", tags: ["Menú digital", "Reservas", "Google Maps"] },
  { category: "Odontología",          title: "Diseño para consultorio dental",     description: "Sitio web para odontólogos con presentación de tratamientos, equipo profesional, sistema de citas y sección de confianza que convierte visitantes en pacientes.", tags: ["Agenda de citas", "Tratamientos", "Equipo médico"] },
  { category: "Empresa Corporativa",  title: "Diseño corporativo empresarial",    description: "Sitio web de imagen corporativa con presentación de empresa, servicios, portafolio de proyectos, equipo y canales de contacto para clientes B2B.", tags: ["Imagen corporativa", "Portafolio", "Contacto B2B"] },
];

const CO_ITEMS_EN = [
  { category: "Aesthetic Clinic",  title: "Design for aesthetic clinic",        description: "Example of what an aesthetic clinic website could look like: treatment presentation, results gallery, appointment form and trust section.", tags: ["Online appointments", "Services gallery", "WhatsApp integrated"] },
  { category: "Driving School",    title: "Design for driving school",           description: "Website focused on capturing students: available courses, schedules, prices, enrolment process and direct WhatsApp contact.", tags: ["Online enrolment", "Schedules", "Quick quote"] },
  { category: "Restaurant",        title: "Design for restaurant",               description: "Digital presence for restaurant with visual menu, reservations, interactive location and dish gallery to whet the appetite before the visit.", tags: ["Digital menu", "Reservations", "Google Maps"] },
  { category: "Dentistry",         title: "Design for dental practice",          description: "Website for dentists with treatment presentation, professional team, appointment system and trust section that converts visitors into patients.", tags: ["Appointment booking", "Treatments", "Medical team"] },
  { category: "Corporate Company", title: "Corporate business design",           description: "Corporate image website with company presentation, services, project portfolio, team and contact channels for B2B clients.", tags: ["Corporate image", "Portfolio", "B2B contact"] },
];

const WA_CO = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20ver%20un%20dise%C3%B1o%20para%20mi%20negocio.";
const WA_ES = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20ver%20un%20dise%C3%B1o%20para%20mi%20negocio%20en%20Espa%C3%B1a.";

export function Projects() {
  const region = useRegion();
  const lang = useLang();
  const isSpain = region !== "CO";
  const r = region as Region4;
  const d = isSpain ? (PROJECTS_SPAIN[r] ?? PROJECTS_SPAIN.ES) : null;
  const isCOEn = !isSpain && lang.startsWith("en");

  const badge     = d?.badge ?? (isCOEn ? "Design Examples"     : "Ejemplos de Diseño");
  const heading   = d?.heading ?? (isCOEn ? "Projects"           : "Proyectos");
  const highlight = d?.headingHighlight ?? (isCOEn ? "Demonstrative" : "Demostrativos");
  const subtitle  = d?.subtitle ?? (isCOEn
    ? "These designs show examples of what the digital presence of different types of businesses could look like. Every real project is designed completely custom for your specific business."
    : "Estos diseños muestran ejemplos de cómo podría verse la presencia digital de distintos tipos de negocios. Cada proyecto real se diseña completamente a medida para tu negocio específico.");
  const rawItems  = d?.items ?? (isCOEn ? CO_ITEMS_EN : CO_ITEMS_ES);
  const waLink    = isSpain ? WA_ES : WA_CO;

  const ctaLabel = isSpain
    ? (r === "EN" ? "Request design for my business" : r === "FR" ? "Demander un design pour mon entreprise" : r === "IT" ? "Richiedere un design per la mia azienda" : "Solicitar diseño para mi negocio")
    : (isCOEn ? "Request design for my business" : "Solicitar diseño para mi negocio");

  const ctaQuestion = isSpain
    ? (r === "EN" ? "Want to see what your business website could look like?" : r === "FR" ? "Vous voulez voir à quoi pourrait ressembler le site web de votre entreprise ?" : r === "IT" ? "Vuoi vedere come potrebbe essere il sito web della tua azienda?" : "¿Quieres ver cómo podría verse el sitio web de tu negocio?")
    : (isCOEn ? "Want to see what your business website could look like?" : "¿Quieres ver cómo podría verse el sitio web de tu negocio?");

  const demos = (rawItems as readonly { category: string; title: string; description: string; tags: readonly string[] }[]).map((item, i) => ({
    ...item,
    image: DEMO_IMAGES[i],
    accent: DEMO_ACCENTS[i],
  }));

  return (
    <section id="portfolio" className="py-24" style={{ background: "#0d0d18" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
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
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-14"
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((demo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={demo.image}
                  alt={`Ejemplo de diseño web para ${demo.category}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)" }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: "rgba(0,0,0,0.55)",
                      border: `1px solid ${demo.accent}80`,
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {demo.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {demo.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "14px",
                  }}
                >
                  {demo.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(demo.tags as readonly string[]).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        background: `${demo.accent}14`,
                        color: demo.accent,
                        border: `1px solid ${demo.accent}28`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
            }}
          >
            {ctaQuestion}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(99,102,241,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
            </svg>
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
