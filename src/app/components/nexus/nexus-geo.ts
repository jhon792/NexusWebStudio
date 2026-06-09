/* ============================================================================
   NEXUS · Geolocalización por país (cliente)
   Prioridad: 1) cookie del Edge Middleware (x-vercel-ip-country, sin red) →
              2) caché de sesión → 3) IP API externa (GeoJS → ipapi.co).
   En producción la cookie del edge resuelve todo sin latencia ni terceros; las
   IP API quedan solo como fallback (p. ej. en `vite dev`, donde no hay edge).
   ============================================================================ */

export type GeoRegion = "CO" | "EU";

const COUNTRY_KEY = "nx-geo-country";   // caché de sesión
const EDGE_COOKIE = "nx-country";       // cookie puesta por middleware.ts

/** País provisto por el Edge Middleware vía cookie `nx-country`. Sin red.
 *  Parser por split (sin RegExp construido por string → sin fragilidad de
 *  escape) que tolera cookies compuestas y exige un valor de 2 letras. */
export function readEdgeCountry(): string | null {
  try {
    for (const part of document.cookie.split(/;\s*/)) {
      const eq = part.indexOf("=");
      if (eq === -1) continue;
      if (part.slice(0, eq).trim() === EDGE_COOKIE) {
        const v = part.slice(eq + 1).trim();
        return /^[A-Za-z]{2}$/.test(v) ? v.toUpperCase() : null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Lectura síncrona para el primer pintado: cookie del edge → caché de sesión. */
export function readCachedCountry(): string | null {
  const edge = readEdgeCountry();
  if (edge) return edge;
  try {
    return sessionStorage.getItem(COUNTRY_KEY);
  } catch {
    return null;
  }
}

function cacheCountry(c: string) {
  try { sessionStorage.setItem(COUNTRY_KEY, c); } catch { /* ignore */ }
}

/** "CO" → Colombia · cualquier otro país → España/Europa. */
export function regionForCountry(country: string | null | undefined): GeoRegion {
  return country === "CO" ? "CO" : "EU";
}

/** Heurística de crawler: NO se redirige a los bots para que indexen `/`
 *  (home de Colombia) — práctica avalada por Google para páginas locale-adaptive.
 *  No es cloaking: el contenido de cada URL es idéntico para bots y usuarios. */
const CRAWLER_RE =
  /bot|crawl|spider|slurp|mediapartners|google-?inspectiontool|bingpreview|facebookexternalhit|embedly|pinterest|whatsapp|telegrambot/i;

export function isLikelyCrawler(): boolean {
  try { return CRAWLER_RE.test(navigator.userAgent); } catch { return false; }
}

let inflight: Promise<string | null> | null = null;

async function fetchCountry(): Promise<string | null> {
  // 0) Edge Middleware (x-vercel-ip-country) — sin red, sin terceros.
  const edge = readEdgeCountry();
  if (edge) return edge;

  // 1) GeoJS (fallback: solo cuando no hay cookie del edge, p. ej. en local).
  try {
    const r = await fetch("https://get.geojs.io/v1/ip/country.json");
    if (r.ok) {
      const j = await r.json();
      if (j?.country) return String(j.country).toUpperCase();
    }
  } catch { /* fallback */ }

  // 2) ipapi.co (último recurso).
  try {
    const r = await fetch("https://ipapi.co/country/");
    if (r.ok) {
      const t = (await r.text()).trim().toUpperCase();
      if (t.length === 2) return t;
    }
  } catch { /* sin red */ }

  return null;
}

/** Detecta el país. Las llamadas concurrentes comparten una sola petición. */
export function detectCountry(): Promise<string | null> {
  if (inflight) return inflight;
  inflight = fetchCountry().then((c) => {
    inflight = null;
    if (c) cacheCountry(c);
    return c;
  });
  return inflight;
}
