import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { detectCountry, readCachedCountry, isLikelyCrawler } from "./nexus/nexus-geo";
import { isEuropean } from "../../geo-europe";

/* ============================================================================
   Aviso de región — sugiere (sin forzar) la versión correcta según el país.
   Sustituye al antiguo redirect automático: la home `/` (Colombia/COP) y `/es`
   (España/€) responden 200 para todos; este banner solo invita a cambiar.
   - No aparece para crawlers ni si ya se descartó (localStorage).
   - Posición fija (no empuja el contenido → sin CLS).
   ============================================================================ */

const DISMISS_KEY = "nx-region-banner-dismissed";

export function RegionBanner() {
  const { pathname } = useLocation();
  const onCO = pathname === "/";
  const onES = pathname === "/es" || pathname.startsWith("/en");

  const [country, setCountry] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true); // oculto hasta detectar (evita parpadeo)

  useEffect(() => {
    if (isLikelyCrawler()) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch { /* sin storage */ }
    setHidden(false);

    const cached = readCachedCountry();
    if (cached) { setCountry(cached); return; }
    let alive = true;
    detectCountry().then((c) => { if (alive) setCountry(c); });
    return () => { alive = false; };
  }, []);

  if (hidden || !country) return null;
  if (!onCO && !onES) return null;

  const suggestES = onCO && isEuropean(country); // visitante europeo en la home CO
  const suggestCO = onES && country === "CO";    // colombiano en la versión España
  if (!suggestES && !suggestCO) return null;

  const close = () => {
    setHidden(true);
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch { /* sin storage */ }
  };

  const href = suggestES ? "/es" : "/";
  const flag = suggestES ? "🇪🇸" : "🇨🇴";
  const text = suggestES
    ? "¿Nos visitas desde España o Europa?"
    : "¿Estás en Colombia?";
  const cta = suggestES ? "Ver precios en € →" : "Ver precios en COP →";

  return (
    <div
      role="region"
      aria-label="Sugerencia de región"
      style={{
        position: "fixed",
        left: "16px",
        bottom: "16px",
        zIndex: 9998,
        maxWidth: "330px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "14px",
        background: "rgba(17,19,26,0.97)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 12px 34px rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span style={{ fontSize: "22px", lineHeight: 1 }} aria-hidden="true">{flag}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.3 }}>{text}</span>
        <a
          href={href}
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#a5b4fc",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {cta}
        </a>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Cerrar aviso"
        style={{
          marginLeft: "auto",
          flexShrink: 0,
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "16px",
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}

export default RegionBanner;
