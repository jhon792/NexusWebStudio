import { Link } from "react-router";
import { useNexus } from "./NexusLangContext";
import { SECTORS, sectorPath } from "../../../data/sectores";
import "./NexusFooter.css";

const WA = "https://wa.me/573123198706";
const TIKTOK = "https://www.tiktok.com/@nexus_studio2";

/* Anclas internas (estables); las etiquetas vienen del diccionario */
const NAV_HREFS = ["#nx-portfolio", "#nx-services", "#nx-pricing", "#nx-faq", "#nx-funnel"];
const LEGAL_HREFS = ["/privacidad", "/cookies", "/terminos", "/aviso-legal"];

export function NexusFooter() {
  const { t, region } = useNexus();
  const fo = t.footer;
  // Enlaces reales a las páginas de sector de la región actual (CO o ES) →
  // rutas de rastreo internas para que Google descubra e indexe los sectores.
  const sectorLinks = SECTORS.filter((s) => s.region === region);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="nx nx-footer" aria-label="Pie de página">
      <div className="nx-footer__top">
        <div className="nx-footer__brand">
          <div className="nx-footer__brand-row">
            <span className="nx-footer__logo">NS</span>
            <span className="nx-footer__name">Nexus Studio</span>
          </div>
          <p className="nx-footer__tagline">{fo.tagline}</p>
          <a className="nx-footer__wa" href={WA} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
            </svg>
            {fo.wa}
          </a>
          <a
            className="nx-footer__social nx-footer__social--tiktok"
            href={TIKTOK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en TikTok — @nexus_studio2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
            TikTok
          </a>
        </div>

        <nav className="nx-footer__col" aria-label={fo.servicesTitle}>
          <div className="nx-footer__col-title">{fo.servicesTitle}</div>
          <ul className="nx-footer__list">
            {sectorLinks.map((s) => (
              <li key={s.slug}>
                <Link className="nx-footer__link" to={sectorPath(s)}>{s.professionTitle}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nx-footer__col" aria-label={fo.navTitle}>
          <div className="nx-footer__col-title">{fo.navTitle}</div>
          <ul className="nx-footer__list">
            {fo.nav.map((label, i) => (
              <li key={label}>
                <button type="button" className="nx-footer__link" onClick={() => scrollTo(NAV_HREFS[i])}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nx-footer__col" aria-label={fo.legalTitle}>
          <div className="nx-footer__col-title">{fo.legalTitle}</div>
          <ul className="nx-footer__list">
            {fo.legal.map((label, i) => (
              <li key={label}>
                <Link className="nx-footer__link" to={LEGAL_HREFS[i]}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="nx-footer__bottom">
        <p>© 2025 Nexus Studio. {fo.rights}</p>
      </div>
    </footer>
  );
}

export default NexusFooter;
