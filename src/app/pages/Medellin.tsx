// → src/app/pages/Medellin.tsx
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { usePageSEO } from "../../hooks/usePageSEO";

const WA = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio%20en%20Medell%C3%ADn.";

const schemaMedellin = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.nexsustudio.site/medellin#webpage",
      "url": "https://www.nexsustudio.site/medellin",
      "name": "Diseño Web Medellín Antioquia | Nexus Studio",
      "description": "Nexus Studio: diseño web profesional en Medellín, Antioquia. Sitios modernos que generan clientes para tu empresa. Landing pages y tiendas virtuales. ¡Cotiza!",
      "inLanguage": "es-CO",
      "isPartOf": { "@id": "https://www.nexsustudio.site/#website" }
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.nexsustudio.site/medellin#business-med",
      "name": "Nexus Studio — Diseño Web Medellín",
      "url": "https://www.nexsustudio.site/medellin",
      "telephone": "+573123198706",
      "description": "Diseño y desarrollo web profesional en Medellín, Antioquia. Sitios modernos para empresas, startups y emprendedores paisas que quieren crecer en digital.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.244,
        "longitude": -75.574
      },
      "areaServed": {
        "@type": "City",
        "name": "Medellín",
        "containedInPlace": { "@type": "State", "name": "Antioquia" }
      },
      "serviceType": ["Diseño Web", "Desarrollo Web", "Landing Pages", "SEO Local"],
      "sameAs": ["https://wa.me/573123198706"]
    }
  ]
};

const features = [
  {
    icon: "💡",
    title: "Para la cultura de innovación paisa",
    desc: "Medellín es la ciudad del emprendimiento colombiano. Diseñamos sitios que reflejan esa ambición: modernos, rápidos y orientados a convertir visitas en negocios.",
  },
  {
    icon: "🛒",
    title: "Tiendas virtuales y landing pages",
    desc: "Desde una landing para captar clientes por Instagram hasta una tienda con pagos colombianos: PSE, Nequi y tarjetas. Tú eliges, nosotros lo construimos.",
  },
  {
    icon: "📈",
    title: "SEO local en Antioquia",
    desc: "Posicionamos tu negocio en Google Maps y búsqueda orgánica para Medellín y el Área Metropolitana. Sin promesas vacías, con resultados medibles desde el inicio.",
  },
];

export default function Medellin() {
  usePageSEO({
    title: "Diseño Web Medellín Antioquia | Nexus Studio",
    description: "Nexus Studio: diseño web profesional en Medellín, Antioquia. Sitios modernos que generan clientes para tu empresa. Landing pages y más. ¡Cotiza gratis!",
    canonical: "https://www.nexsustudio.site/medellin",
    ogTitle: "Diseño Web Medellín | Nexus Studio",
    ogDescription: "Sitios web que generan clientes en Medellín y Antioquia. Landing pages, sitios empresariales y tiendas virtuales. ¡Cotiza gratis!",
  });

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: "#09090b", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      {/* JSON-LD para Medellín */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMedellin) }}
      />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative flex items-center pt-32 pb-24 overflow-hidden"
          style={{ background: "#06040f" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 35%, rgba(109,40,217,0.20) 0%, rgba(99,102,241,0.10) 50%, transparent 70%)",
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
              <a
                href="/"
                style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              >
                Nexus Studio
              </a>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>›</span>
              <span style={{ fontSize: 13, color: "rgba(199,193,255,0.7)" }}>
                Medellín
              </span>
            </nav>

            {/* H1 */}
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.034em",
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Diseño web profesional{" "}
              <br />en{" "}
              <span style={{
                background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Medellín
              </span>
            </h1>

            {/* H2 */}
            <h2
              style={{
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 24,
                letterSpacing: "-0.015em",
              }}
            >
              Servicios web para empresas en Medellín
            </h2>

            {/* Intro */}
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.42)",
                maxWidth: 620,
                marginBottom: 36,
              }}
            >
              Medellín y Antioquia son hoy el epicentro del emprendimiento digital en Colombia.
              Si tienes una empresa, startup o negocio en la ciudad y quieres una página web
              que realmente consiga clientes —no solo que se vea bien—, Nexus Studio es tu
              equipo. Trabajamos 100% remoto, sin burocracia, y entregamos resultados en 3 a
              15 días hábiles.
            </p>

            {/* CTA WhatsApp */}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 30px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 8px 36px rgba(99,102,241,0.40)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
              </svg>
              Cotizar gratis — WhatsApp
            </a>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 14 }}>
              Respuesta en menos de 2 horas · Sin compromiso
            </p>
          </div>
        </section>

        {/* ── Diferenciadores para Medellín ───────────────────────────────── */}
        <section style={{ background: "#09090b", padding: "80px 0" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  style={{
                    padding: "28px 24px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      color: "#fff",
                      marginBottom: 10,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.38)" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "80px 0",
            background: "linear-gradient(135deg, rgba(109,40,217,0.12) 0%, rgba(99,102,241,0.07) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#fff",
                marginBottom: 16,
                letterSpacing: "-0.025em",
              }}
            >
              ¿Tu negocio en Medellín necesita más clientes desde Google?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", marginBottom: 32 }}>
              Cuéntanos qué necesitas. Sin costo, sin presión, con respuesta directa por WhatsApp.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 6px 28px rgba(99,102,241,0.35)",
              }}
            >
              Cotizar ahora — WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
