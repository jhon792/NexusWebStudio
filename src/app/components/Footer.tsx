import { Link } from "react-router";
import { motion } from "motion/react";
import { useRegion } from "../../hooks/useRegion";
import { useLang } from "../../hooks/useLang";
import { FOOTER_SPAIN, type Region4 } from "../../i18n/spainContent";

const MotionLink = motion.create(Link);

const CO_NAV_ES = {
  Servicios: [
    { label: "Landing Pages",        href: "/#services" },
    { label: "Páginas Corporativas",  href: "/#services" },
    { label: "Tiendas Virtuales",     href: "/#services" },
    { label: "Sistemas Web",          href: "/#services" },
    { label: "Mantenimiento",         href: "/#pricing" },
    { label: "SEO Básico",            href: "/#services" },
  ],
  Navegación: [
    { label: "Ejemplos de Diseño",   href: "/#portfolio" },
    { label: "Planes y Precios",      href: "/#pricing" },
    { label: "Proceso de Trabajo",    href: "/#process" },
    { label: "Preguntas Frecuentes",  href: "/#faq" },
    { label: "Contacto",              href: "/#contact" },
  ],
  Ciudades: [
    { label: "Diseño web Villavicencio", href: "/villavicencio" },
    { label: "Diseño web Bogotá",        href: "/bogota" },
    { label: "Diseño web Medellín",      href: "/medellin" },
  ],
  Legal: [
    { label: "Política de Privacidad",   href: "/privacidad" },
    { label: "Política de Cookies",      href: "/cookies" },
    { label: "Términos y Condiciones",   href: "/terminos" },
    { label: "Aviso Legal",              href: "/aviso-legal" },
  ],
};

const CO_NAV_EN = {
  Services: [
    { label: "Landing Pages",         href: "/#services" },
    { label: "Corporate Websites",    href: "/#services" },
    { label: "Online Stores",         href: "/#services" },
    { label: "Web Systems",           href: "/#services" },
    { label: "Maintenance",           href: "/#pricing" },
    { label: "Basic SEO",             href: "/#services" },
  ],
  Navigation: [
    { label: "Design Examples",       href: "/#portfolio" },
    { label: "Plans & Pricing",       href: "/#pricing" },
    { label: "Work Process",          href: "/#process" },
    { label: "FAQ",                   href: "/#faq" },
    { label: "Contact",               href: "/#contact" },
  ],
  Cities: [
    { label: "Web design Villavicencio", href: "/villavicencio" },
    { label: "Web design Bogotá",        href: "/bogota" },
    { label: "Web design Medellín",      href: "/medellin" },
  ],
  Legal: [
    { label: "Privacy Policy",           href: "/privacidad" },
    { label: "Cookie Policy",            href: "/cookies" },
    { label: "Terms & Conditions",       href: "/terminos" },
    { label: "Legal Notice",             href: "/aviso-legal" },
  ],
};

const CO_TEXT_ES = {
  tagline: "Diseño y desarrollo web profesional para negocios y empresas en Colombia. Páginas que generan confianza y atraen nuevos clientes.",
  waBtn: "Escríbenos por WhatsApp",
  available: "Disponible para nuevos proyectos",
  location: "Servicio 100% remoto para toda Colombia.\nSede: Villavicencio, Meta.",
  copyright: "Nexus Studio. Todos los derechos reservados.",
};

const CO_TEXT_EN = {
  tagline: "Professional web design and development for businesses and companies in Colombia. Websites that build trust and attract new clients.",
  waBtn: "Write to us on WhatsApp",
  available: "Available for new projects",
  location: "100% remote service throughout Colombia.\nHeadquarters: Villavicencio, Meta.",
  copyright: "Nexus Studio. All rights reserved.",
};

export function Footer() {
  const region = useRegion();
  const lang = useLang();
  const isSpain = region !== "CO";
  const r = region as Region4;
  const isCOEn = !isSpain && lang.startsWith("en");
  const fd = isSpain ? (FOOTER_SPAIN[r] ?? FOOTER_SPAIN.ES) : null;
  const co = isCOEn ? CO_TEXT_EN : CO_TEXT_ES;

  const tagline   = fd?.tagline   ?? co.tagline;
  const waBtn     = fd?.waBtn     ?? co.waBtn;
  const available = fd?.available ?? co.available;
  const location  = fd?.location  ?? co.location;
  const copyright = fd?.copyright ?? co.copyright;
  const rights    = fd?.rights    ?? "";
  const activeNav = fd?.nav ?? (isCOEn ? CO_NAV_EN : CO_NAV_ES);

  const privacyHref  = isSpain ? "/en/privacidad"  : "/privacidad";
  const termosHref   = isSpain ? "/en/terminos"    : "/terminos";
  const cookiesHref  = isSpain ? "/en/cookies"     : "/cookies";
  const privacyLabel = isSpain ? (r === "EN" ? "Privacy" : r === "FR" ? "Confidentialité" : r === "IT" ? "Privacy" : "Privacidad") : (isCOEn ? "Privacy" : "Privacidad");
  const termosLabel  = isSpain ? (r === "EN" ? "Terms" : r === "FR" ? "Conditions" : r === "IT" ? "Termini" : "Términos") : (isCOEn ? "Terms" : "Términos");
  const cookiesLabel = isSpain ? (r === "EN" ? "Cookies" : r === "FR" ? "Cookies" : r === "IT" ? "Cookie" : "Cookies") : "Cookies";

  return (
    <footer style={{ background: "#030305", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 grid lg:grid-cols-6 gap-10">
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
              {tagline}
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
              {waBtn}
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
                {available}
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.22)",
                marginTop: "12px",
                whiteSpace: "pre-line",
              }}
            >
              {location}
            </p>
          </div>

          {/* Nav links */}
          {Object.entries(activeNav).map(([category, links]) => (
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
                {(links as { label: string; href: string }[]).map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") && !link.href.startsWith("/#") && !link.href.includes("#") ? (
                      <MotionLink
                        to={link.href}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.35)",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        whileHover={{ color: "rgba(255,255,255,0.92)", x: 4, scale: 1.04 }}
                        transition={{ duration: 0.18 }}
                      >
                        {link.label}
                      </MotionLink>
                    ) : (
                      <motion.a
                        href={link.href}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.35)",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                        whileHover={{ color: "rgba(255,255,255,0.92)", x: 4, scale: 1.04 }}
                        transition={{ duration: 0.18 }}
                      >
                        {link.label}
                      </motion.a>
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
            © 2025 {copyright} {rights}
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/nexus"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#d4af37", textDecoration: "none" }}
              aria-label="Ver propuesta Premium"
            >
              ✦ Premium
            </Link>
            <Link
              to={privacyHref}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              {privacyLabel}
            </Link>
            <Link
              to={termosHref}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              {termosLabel}
            </Link>
            <Link
              to={cookiesHref}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
            >
              {cookiesLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
