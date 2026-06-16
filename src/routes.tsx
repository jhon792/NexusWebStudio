import { Suspense, useEffect, type ReactNode } from "react";
import {
  Outlet, Navigate, useLocation, useNavigate, type RouteObject,
} from "react-router";
import { CookieBanner } from "./app/components/CookieBanner";
import { FloatingWhatsApp } from "./app/components/FloatingWhatsApp";
import { RegionBanner } from "./app/components/RegionBanner";
import { GlobalEffects } from "./app/components/GlobalEffects";
import { useAnalytics } from "./hooks/useAnalytics";
import { detectCountry, readCachedCountry, isLikelyCrawler } from "./app/components/nexus/nexus-geo";
import { isEuropean } from "./geo-europe";
import NexusLanding from "./app/components/nexus/NexusLanding";
import i18n, { getLangFromPath } from "./i18n";

/* Helper: convierte un import dinámico de página en una ruta `lazy` de
   react-router. El router la resuelve ANTES de renderizar, así el prerender
   obtiene el HTML real (no el fallback de Suspense) y el cliente la code-split. */
const page = (factory: () => Promise<{ default: React.ComponentType }>) =>
  () => factory().then((m) => ({ Component: m.default }));

function PageLoader({ light = false }: { light?: boolean }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-label="Cargando página..."
      role="status"
      style={{ background: light ? "#f8f9fa" : "#09090b" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{
            borderColor: light ? "rgba(11,34,64,0.15)" : "rgba(99,102,241,0.2)",
            borderTopColor: light ? "#d4af37" : "#6366f1",
          }}
        />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: light ? "rgba(11,34,64,0.4)" : "rgba(255,255,255,0.35)",
          }}
        >
          Cargando...
        </span>
      </div>
    </div>
  );
}

/** Suspense con loader claro, aislado para la landing Nexus. */
function LightSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader light />}>{children}</Suspense>;
}

/** Sincroniza el idioma i18n con la ruta actual (solo cliente; en SSR es no-op). */
function LanguageSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lang = getLangFromPath(pathname);
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [pathname]);
  return null;
}

/**
 * Home de Colombia (`/`). Responde 200 para todos (incluido Google). Solo a
 * visitantes EUROPEOS reales se les reenvía a `/es` (€) — para que España/Europa
 * no vea el precio de Colombia (COP). LatAm y el resto se quedan aquí. No
 * redirige a crawlers (que indexen `/`). Respaldo para navegación interna SPA;
 * el edge ya cubre la carga inicial.
 */
function NexusHomeColombia() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLikelyCrawler()) return;
    let alive = true;
    const cached = readCachedCountry();
    if (isEuropean(cached)) {
      navigate("/es", { replace: true });
      return;
    }
    detectCountry().then((country) => {
      if (alive && isEuropean(country)) navigate("/es", { replace: true });
    });
    return () => { alive = false; };
  }, [navigate]);

  return (
    <LightSuspense>
      <NexusLanding region="CO" />
    </LightSuspense>
  );
}

/** Layout raíz: shell global + Outlet. Envuelve todas las rutas. */
function RootLayout() {
  useAnalytics();
  return (
    <>
      <GlobalEffects />
      <CookieBanner />
      <RegionBanner />
      <FloatingWhatsApp />
      <LanguageSync />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // ── Home Nexus (prerenderizadas) ──────────────────────────────
      { index: true, element: <NexusHomeColombia /> },
      { path: "es", element: <LightSuspense><NexusLanding region="EU" /></LightSuspense> },
      { path: "nexus", element: <LightSuspense><NexusLanding /></LightSuspense> },

      // ── Colombia + compartidas (lazy + prerenderizables) ──────────
      { path: "home-clasico", lazy: page(() => import("./app/pages/Home")) },
      { path: "villavicencio", lazy: page(() => import("./app/pages/Villavicencio")) },
      { path: "bogota", lazy: page(() => import("./app/pages/Bogota")) },
      { path: "medellin", lazy: page(() => import("./app/pages/Medellin")) },
      { path: "blog/:slug", lazy: page(() => import("./app/pages/BlogArticle")) },
      { path: "privacidad", lazy: page(() => import("./app/pages/PrivacyPolicy")) },
      { path: "cookies", lazy: page(() => import("./app/pages/CookiePolicy")) },
      { path: "terminos", lazy: page(() => import("./app/pages/TermsConditions")) },
      { path: "aviso-legal", lazy: page(() => import("./app/pages/LegalNotice")) },

      // ── /en/* → redirects a /es (no se prerenderizan) ─────────────
      { path: "en", element: <Navigate to="/es" replace /> },
      { path: "en/en", element: <Navigate to="/es" replace /> },
      { path: "en/fr", element: <Navigate to="/es" replace /> },
      { path: "en/it", element: <Navigate to="/es" replace /> },
      { path: "en/blog/:slug", lazy: page(() => import("./app/pages/BlogArticle")) },
      { path: "en/privacidad", lazy: page(() => import("./app/pages/PrivacyPolicy")) },
      { path: "en/cookies", lazy: page(() => import("./app/pages/CookiePolicy")) },
      { path: "en/terminos", lazy: page(() => import("./app/pages/TermsConditions")) },
      { path: "en/aviso-legal", lazy: page(() => import("./app/pages/LegalNotice")) },

      // ── Catch-all ─────────────────────────────────────────────────
      { path: "*", lazy: page(() => import("./app/pages/NotFound")) },
    ],
  },
];
