import { Link } from "react-router";

const footerNav = {
  Servicios: [
    { label: "Landing Page", href: "/#pricing" },
    { label: "Sitio Empresarial", href: "/#pricing" },
    { label: "Tienda Online", href: "/#pricing" },
    { label: "Aplicaciones Web", href: "/#services" },
    { label: "SEO Técnico", href: "/#services" },
    { label: "Mantenimiento", href: "/#pricing" },
  ],
  Recursos: [
    { label: "Blog", href: "/#blog" },
    { label: "Preguntas Frecuentes", href: "/#faq" },
    { label: "Proceso de Trabajo", href: "/#process" },
    { label: "Planes y Precios", href: "/#pricing" },
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
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span
                  className="text-zinc-900 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 800 }}
                >
                  NS
                </span>
              </div>
              <span
                className="text-white"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
              >
                NexuStudio
              </span>
            </div>
            <p
              className="text-zinc-400 mb-6 max-w-xs"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.75 }}
            >
              Desarrollo web profesional para empresas que quieren crecer en Internet. Sitios que convierten visitantes en clientes reales.
            </p>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573123198706"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] rounded-xl hover:bg-[#25D366]/25 transition-colors text-sm mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-green-400 text-xs"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Disponible para nuevos proyectos
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <div
                className="text-zinc-300 mb-4"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
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
                        className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
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
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2025 NexuStudio. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacidad" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Privacidad
            </Link>
            <Link to="/terminos" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Términos
            </Link>
            <Link to="/cookies" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
