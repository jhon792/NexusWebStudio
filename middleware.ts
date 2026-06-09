// ============================================================================
//  Vercel Routing Middleware — geolocalización en el edge (antes de la caché).
//  Lee el país nativo de Vercel (x-vercel-ip-country) y lo expone al cliente en
//  una cookie `nx-country`. Así el hook de geo lo lee SIN llamar a una IP API
//  externa (sin latencia, sin depender de terceros, sin choque con la CSP).
//  El cliente cae a GeoJS/ipapi.co solo si la cookie no existe (p. ej. en local).
//
//  Es a prueba de fallos: ante cualquier error continúa la navegación con
//  next(); nunca puede tumbar el sitio.
// ============================================================================
import { geolocation, next } from "@vercel/functions";

export const config = {
  runtime: "edge",
  // Solo en navegación de documentos: excluye /assets/* y cualquier archivo con
  // extensión (favicon.ico, og-image.jpg, sitemap.xml, robots.txt, *.png…).
  matcher: ["/((?!assets/|.*\\.).*)"],
};

export default function middleware(request: Request) {
  try {
    const { country } = geolocation(request);
    if (country) {
      return next({
        headers: {
          "set-cookie": `nx-country=${country}; Path=/; Max-Age=86400; SameSite=Lax`,
        },
      });
    }
  } catch {
    /* nunca romper la navegación por un fallo de geolocalización */
  }
  return next();
}
