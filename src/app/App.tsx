import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { GlobalEffects } from "./components/GlobalEffects";
import { useAnalytics } from "../hooks/useAnalytics";
import { detectCountry, readCachedCountry, isLikelyCrawler } from "./components/nexus/nexus-geo";
// Home Nexus: carga EAGER (no lazy) — es la página de entrada. Evita el waterfall
// de un segundo chunk + motion antes del hero → baja el LCP móvil (el hero pinta
// de una, sin pasar por el spinner de Suspense).
import NexusLanding from "./components/nexus/NexusLanding";
import i18n, { getLangFromPath } from "../i18n";

// ── Colombia ──────────────────────────────────────────────────────────────────
const Home        = lazy(() => import("./pages/Home"));
const Villavicencio = lazy(() => import("./pages/Villavicencio"));
const Bogota      = lazy(() => import("./pages/Bogota"));
const Medellin    = lazy(() => import("./pages/Medellin"));

// ── Home Nexus → eager (ver import arriba). El resto de páginas siguen lazy. ────

// ── Compartidas ───────────────────────────────────────────────────────────────
const BlogArticle    = lazy(() => import("./pages/BlogArticle"));
const PrivacyPolicy  = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy   = lazy(() => import("./pages/CookiePolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const LegalNotice    = lazy(() => import("./pages/LegalNotice"));
const NotFound       = lazy(() => import("./pages/NotFound"));

// Sincroniza el idioma i18n con la ruta actual.
// Nunca redirige al usuario — solo cambia las traducciones de componentes compartidos.
function LanguageSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lang = getLangFromPath(pathname);
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [pathname]);
  return null;
}

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

/**
 * Home de Colombia (`/`). Detecta el país por IP: si NO es Colombia, redirige
 * a la versión de España (`/es`). Los colombianos se quedan aquí (COP, ES/EN).
 */
function NexusHomeColombia() {
  const navigate = useNavigate();
  useEffect(() => {
    // No redirigir a los crawlers: que indexen `/` (Colombia). `/es` ya es
    // rastreable por su cuenta (sitemap + canonical + hreflang propios).
    if (isLikelyCrawler()) return;

    let alive = true;
    const cached = readCachedCountry();
    if (cached && cached !== "CO") {
      navigate("/es", { replace: true });
      return;
    }
    detectCountry().then((country) => {
      if (alive && country && country !== "CO") navigate("/es", { replace: true });
    });
    return () => { alive = false; };
  }, [navigate]);

  return (
    <LightSuspense>
      <NexusLanding region="CO" />
    </LightSuspense>
  );
}

function AppRoutes() {
  useAnalytics();

  return (
    <>
      <LanguageSync />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Home Nexus ────────────────────────────────────────────
                 /     → Colombia (COP · ES/EN). Si la IP no es CO → /es
                 /es   → España/Europa (EUR · ES/EN/FR/IT)               */}
          <Route path="/" element={<NexusHomeColombia />} />
          <Route path="/es" element={<LightSuspense><NexusLanding region="EU" /></LightSuspense>} />
          <Route path="/home-clasico" element={<Home />} />

          {/* ── Colombia (es-CO) ──────────────────────────────────────── */}
          <Route path="/villavicencio" element={<Villavicencio />} />
          <Route path="/bogota" element={<Bogota />} />
          <Route path="/medellin" element={<Medellin />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/terminos" element={<TermsConditions />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />

          {/* ── Alias de la home Nexus ────────────────────────────────── */}
          <Route path="/nexus" element={<LightSuspense><NexusLanding /></LightSuspense>} />

          {/* ── España / Europa — la home antigua se eliminó.
                 Toda /en/* (home) redirige a la nueva home de España (/es). */}
          <Route path="/en" element={<Navigate to="/es" replace />} />
          <Route path="/en/" element={<Navigate to="/es" replace />} />
          <Route path="/en/en" element={<Navigate to="/es" replace />} />
          <Route path="/en/en/" element={<Navigate to="/es" replace />} />
          <Route path="/en/fr" element={<Navigate to="/es" replace />} />
          <Route path="/en/fr/" element={<Navigate to="/es" replace />} />
          <Route path="/en/it" element={<Navigate to="/es" replace />} />
          <Route path="/en/it/" element={<Navigate to="/es" replace />} />
          {/* Legales (se conservan) */}
          <Route path="/en/blog/:slug" element={<BlogArticle />} />
          <Route path="/en/privacidad" element={<PrivacyPolicy />} />
          <Route path="/en/cookies" element={<CookiePolicy />} />
          <Route path="/en/terminos" element={<TermsConditions />} />
          <Route path="/en/aviso-legal" element={<LegalNotice />} />
          {/* Rutas de sectores — se añaden en Fase 6 */}

          {/* ── Catch-all ─────────────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <>
      <GlobalEffects />
      <CookieBanner />
      <FloatingWhatsApp />
      <AppRoutes />
    </>
  );
}
