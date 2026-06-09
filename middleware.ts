// ============================================================================
//  Vercel Routing Middleware — geolocalización en el edge (antes de la caché).
//
//  1) Expone el país nativo de Vercel (x-vercel-ip-country) en cookie
//     `nx-country` → el cliente lo lee sin llamar a una IP API externa.
//  2) Redirige la HOME `/` a `/es` para visitantes reales fuera de Colombia
//     (server-side 307): a prueba de JS desactivado, sin parpadeo de moneda.
//     NO se redirige a los crawlers, para que Google indexe `/` (Colombia).
//     El contenido de cada URL es idéntico para bots y humanos → no es cloaking.
//
//  Es a prueba de fallos: ante cualquier error continúa con next(); nunca puede
//  tumbar el sitio.
// ============================================================================
import { geolocation, next } from "@vercel/functions";

export const config = {
  runtime: "edge",
  // Solo navegación de documentos: excluye /assets/* y cualquier archivo con
  // extensión (favicon.ico, og-image.jpg, sitemap.xml, robots.txt, *.png…).
  matcher: ["/((?!assets/|.*\\.).*)"],
};

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

    // Redirige SOLO la home `/`, SOLO a visitantes reales fuera de Colombia.
    // Conserva la query (UTM/ads). Set-Cookie hace la respuesta no cacheable.
    if (
      url.pathname === "/" &&
      country &&
      country !== "CO" &&
      !CRAWLER_RE.test(ua)
    ) {
      url.pathname = "/es";
      const headers: Record<string, string> = { Location: url.toString() };
      if (cookie) headers["set-cookie"] = cookie;
      return new Response(null, { status: 307, headers });
    }

    // Resto de rutas: continúa y deja la cookie del país para el cliente.
    if (cookie) return next({ headers: { "set-cookie": cookie } });
  } catch {
    /* nunca romper la navegación por un fallo de geolocalización */
  }
  return next();
}
