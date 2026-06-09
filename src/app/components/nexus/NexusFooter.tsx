import { Link } from "react-router";
import { useNexus } from "./NexusLangContext";
import "./NexusFooter.css";

const WA = "https://wa.me/573123198706";

/* Anclas internas (estables); las etiquetas vienen del diccionario */
const SECTOR_HREFS = ["#nx-portfolio", "#nx-portfolio", "#nx-portfolio", "#nx-pricing"];
const NAV_HREFS = ["#nx-portfolio", "#nx-services", "#nx-pricing", "#nx-faq", "#nx-funnel"];
const LEGAL_HREFS = ["/privacidad", "/cookies", "/terminos", "/aviso-legal"];

export function NexusFooter() {
  const { t } = useNexus();
  const fo = t.footer;

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
        </div>

        <nav className="nx-footer__col" aria-label={fo.servicesTitle}>
          <div className="nx-footer__col-title">{fo.servicesTitle}</div>
          <ul className="nx-footer__list">
            {fo.sectors.map((label, i) => (
              <li key={label}>
                <button type="button" className="nx-footer__link" onClick={() => scrollTo(SECTOR_HREFS[i])}>
                  {label}
                </button>
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
