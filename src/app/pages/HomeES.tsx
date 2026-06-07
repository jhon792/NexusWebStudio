import { usePageSEO } from "../../hooks/usePageSEO";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const WA =
  "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20solicitar%20presupuesto%20para%20una%20p%C3%A1gina%20web.";

const SECTORS = [
  "Despachos de Abogados",
  "Clínicas Estéticas",
  "Odontólogos",
  "Inmobiliarias",
  "Constructoras",
  "Concesionarios",
  "Talleres Mecánicos",
];

export default function HomeES() {
  usePageSEO({
    title: "Diseño Web para España | Abogados, Clínicas e Inmobiliarias | Nexsu Studio",
    description:
      "Agencia de diseño web premium para España y Europa. Especializados en despachos de abogados, clínicas estéticas, odontólogos e inmobiliarias. Presupuesto gratuito.",
    canonical: "https://www.nexsustudio.site/en/",
  });

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: "#09090b",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Navbar />

      <main id="main-content">
        {/* ── Hero España ─────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden"
          style={{ background: "#06040f" }}
          aria-label="Diseño web premium para España y Europa — Nexsu Studio"
        >
          {/* Grid de fondo */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
                "linear-gradient(rgba(139,92,246,0.018) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(139,92,246,0.018) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "60px 60px, 60px 60px, 240px 240px, 240px 240px",
            }}
          />

          {/* Nebulosas */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 100% 65% at 72% -5%, rgba(88,28,135,0.24) 0%, rgba(99,102,241,0.12) 45%, transparent 68%)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              top: "5%",
              right: "-15%",
              width: "70%",
              height: "90%",
              background:
                "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(37,99,235,0.16) 0%, rgba(59,130,246,0.07) 55%, transparent 78%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl">

              {/* Badge región */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                style={{
                  background: "rgba(99,102,241,0.10)",
                  border: "1px solid rgba(99,102,241,0.28)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  🇪🇸 Nexsu Studio — España y Europa
                </span>
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
                  lineHeight: 1.07,
                  letterSpacing: "-0.036em",
                  color: "#fff",
                  marginBottom: 24,
                }}
              >
                Diseñamos páginas web que generan clientes para{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #c084fc 80%, #e879f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  abogados, clínicas e inmobiliarias en España
                </span>
              </h1>

              {/* Subtítulo */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "1.1rem",
                  lineHeight: 1.78,
                  color: "rgba(255,255,255,0.48)",
                  marginBottom: 40,
                  maxWidth: 560,
                }}
              >
                Diseño web premium, SEO y automatización con IA para empresas de alto valor.
                Especializados en sectores exigentes: despachos de abogados, clínicas estéticas,
                odontólogos e inmobiliarias. Resultados medibles desde el primer mes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    borderRadius: 14,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#fff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 8px 36px rgba(99,102,241,0.38), 0 2px 8px rgba(99,102,241,0.20)",
                  }}
                  aria-label="Solicitar presupuesto de diseño web por WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                  </svg>
                  Solicitar presupuesto — WhatsApp
                </a>
                <a
                  href="/"
                  style={{
                    padding: "14px 24px",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    borderRadius: 14,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.80)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  aria-label="Ver versión Colombia"
                >
                  🇨🇴 Ver versión Colombia
                </a>
              </div>

              {/* Trust items */}
              <ul
                className="flex flex-wrap gap-x-5 gap-y-2"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
                aria-label="Por qué elegirnos"
              >
                {[
                  "+40 negocios atendidos",
                  "Entrega en 15 a 30 días",
                  "Resultados medibles",
                  "Soporte incluido",
                  "Sin costes ocultos",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="rgba(99,102,241,0.2)" />
                      <polyline points="8 12 11 15 16 9" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.52)",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Sectores que atendemos ──────────────────────────────────── */}
        <section
          className="py-20"
          style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.05)" }}
          aria-label="Sectores que atendemos en España"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
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
                Sectores especializados
              </span>
            </div>

            <h2
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
              Web profesional para sectores{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                de alto valor en España
              </span>
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                maxWidth: "520px",
                margin: "0 auto 40px",
              }}
            >
              Diseñamos webs específicas para cada sector, con el copy, estructura y
              SEO que necesita tu tipo de negocio para generar clientes en España.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {SECTORS.map((sector) => (
                <div
                  key={sector}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    borderRadius: 12,
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.22)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "rgba(199,193,255,0.85)",
                  }}
                >
                  {sector}
                </div>
              ))}
            </div>

            {/* Precios España — preview */}
            <div className="mt-16 grid md:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
              {[
                { name: "Plan Profesional", price: "890 €", desc: "Diseño web + SEO técnico + Google Analytics. Hasta 5 páginas. Entrega en 15–21 días.", accent: "#818cf8" },
                { name: "Plan Premium", price: "1.490 €", desc: "Todo lo anterior + SEO avanzado, blog, automatización con IA y GEO SEO para ChatGPT.", accent: "#a78bfa", featured: true },
                { name: "Plan Empresarial", price: "Desde 2.500 €", desc: "Sistema de citas, tienda virtual, automatizaciones y desarrollo completamente a medida.", accent: "#34d399" },
              ].map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    padding: "28px",
                    borderRadius: 20,
                    background: plan.featured ? "linear-gradient(160deg, rgba(67,56,202,0.35) 0%, rgba(13,13,24,0.97) 55%)" : "rgba(255,255,255,0.03)",
                    border: plan.featured ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: plan.featured ? "0 0 0 1px rgba(129,140,248,0.15), 0 40px 90px -12px rgba(99,102,241,0.25)" : "none",
                  }}
                >
                  {plan.featured && (
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full mb-3"
                      style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif" }}
                    >
                      ⭐ MÁS ELEGIDO
                    </div>
                  )}
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>
                    {plan.name}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 28, color: plan.accent, marginBottom: 12, letterSpacing: "-0.03em" }}>
                    {plan.price}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>
                    {plan.desc}
                  </p>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-5 py-3 rounded-xl w-full"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      ...(plan.featured
                        ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }
                        : { background: `${plan.accent}15`, color: plan.accent, border: `1px solid ${plan.accent}30` }),
                    }}
                  >
                    Solicitar presupuesto
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
