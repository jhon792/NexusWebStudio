import { Link } from "react-router";

const footerNav = {
  Servicios: [
    { label: "Landing Pages", href: "/#services" },
    { label: "Páginas Corporativas", href: "/#services" },
    { label: "Tiendas Virtuales", href: "/#services" },
    { label: "Sistemas Web", href: "/#services" },
    { label: "Mantenimiento", href: "/#pricing" },
    { label: "SEO Básico", href: "/#services" },
  ],
  Navegación: [
    { label: "Ejemplos de Diseño", href: "/#portfolio" },
    { label: "Planes y Precios", href: "/#pricing" },
    { label: "Proceso de Trabajo", href: "/#process" },
    { label: "Preguntas Frecuentes", href: "/#faq" },
    { label: "Contacto", href: "/#contact" },
  ],
  Legal: [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Política de Cookies", href: "/cookies" },
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Aviso Legal", href: "/aviso-legal" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "#030305", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 grid lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "13px",
                    color: "#fff",
                  }}
                >
                  NS
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Nexus Studio
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "280px",
                marginBottom: "20px",
              }}
            >
              Diseño y desarrollo web profesional para negocios y empresas en Colombia. Páginas que generan confianza y atraen nuevos clientes.
            </p>
            <a
              href="https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 transition-all duration-200"
              style={{
                background: "rgba(37,211,102,0.1)",
                border: "1px solid rgba(37,211,102,0.2)",
                color: "#4ade80",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
            <br />
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mt-1"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#4ade80",
                }}
              >
                Disponible para nuevos proyectos
              </span>
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "14px",
                }}
              >
                {category}
              </div>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                      <Link
                        to={link.href}
                        className="transition-colors"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.35)",
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="transition-colors"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.35)",
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2025 Nexus Studio. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacidad"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              Privacidad
            </Link>
            <Link
              to="/terminos"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              Términos
            </Link>
            <Link
              to="/cookies"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
