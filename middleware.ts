// ============================================================================
//  Vercel Routing Middleware — geolocalización en el edge (antes de la caché).
//
//  1) Expone el país de Vercel (x-vercel-ip-country) en la cookie `nx-country`
//     → el cliente adapta moneda / aviso sin llamar a una IP API externa.
//  2) Redirige la HOME `/` a `/es` SOLO a visitantes europeos reales (307), para
//     que España/Europa vea su precio en € y no el de Colombia (COP). LatAm y el
//     resto del mundo se quedan en `/`. NO se redirige a los crawlers → Google
//     indexa tanto `/` (Colombia) como `/es` (España). Mismo HTML para bot y
//     usuario en cada URL → no es cloaking.
//
//  EUROPE debe mantenerse en sync con src/geo-europe.ts (el edge no puede
//  importar de src de forma garantizada).
//
//  A prueba de fallos: ante cualquier error continúa con next().
// ============================================================================
import { geolocation, next } from "@vercel/functions";

export const config = {
  runtime: "edge",
  // Solo navegación de documentos: excluye /assets/* y cualquier archivo con
  // extensión (favicon.ico, og-image.jpg, sitemap.xml, robots.txt, *.png…).
  matcher: ["/((?!assets/|.*\\.).*)"],
};

// Países que ven la versión España/€. Sync con src/geo-europe.ts.
const EUROPE = new Set([
  "ES", "PT", "FR", "IT", "DE", "IE", "NL", "BE", "LU", "AT", "GR", "CY",
  "MT", "PL", "CZ", "SK", "HU", "RO", "BG", "HR", "SI", "SE", "DK", "FI",
  "EE", "LV", "LT", "GB", "NO", "IS", "LI", "CH", "AD", "MC", "SM", "VA",
]);

// Crawlers que NO deben ser redirigidos (que indexen `/` = Colombia).
const CRAWLER_RE =
  /bot|crawl|spider|slurp|mediapartners|google-?inspectiontool|bingpreview|facebookexternalhit|embedly|pinterest|whatsapp|telegrambot/i;

export default function middleware(request: Request) {
  try {
    const { country } = geolocation(request);
    const cookie = country
      ? `nx-country=${country}; Path=/; Max-Age=86400; SameSite=Lax`
      : null;

    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";

    // Redirige SOLO la home `/`, SOLO a visitantes europeos reales (no LatAm,
    // no crawlers). Conserva la query (UTM/ads).
    if (
      url.pathname === "/" &&
      country &&
      EUROPE.has(country) &&
      !CRAWLER_RE.test(ua)
    ) {
      url.pathname = "/es";
      const headers: Record<string, string> = { Location: url.toString() };
      if (cookie) headers["set-cookie"] = cookie;
      return new Response(null, { status: 307, headers });
    }

    if (cookie) return next({ headers: { "set-cookie": cookie } });
  } catch {
    /* nunca romper la navegación por un fallo de geolocalización */
  }
  return next();
}
