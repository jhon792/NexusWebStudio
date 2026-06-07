import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { GlobalEffects } from "./components/GlobalEffects";
import { useAnalytics } from "../hooks/useAnalytics";
import i18n, { getLangFromPath } from "../i18n";

// ── Colombia ──────────────────────────────────────────────────────────────────
const Home        = lazy(() => import("./pages/Home"));
const Villavicencio = lazy(() => import("./pages/Villavicencio"));
const Bogota      = lazy(() => import("./pages/Bogota"));
const Medellin    = lazy(() => import("./pages/Medellin"));

// ── España / Europa ───────────────────────────────────────────────────────────
const HomeES = lazy(() => import("./pages/HomeES"));

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

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-label="Cargando página..."
      role="status"
      style={{ background: "#09090b" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(99,102,241,0.2)", borderTopColor: "#6366f1" }}
        />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Cargando...
        </span>
      </div>
    </div>
  );
}

function AppRoutes() {
  useAnalytics();

  return (
    <>
      <LanguageSync />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Colombia (es-CO) ──────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/villavicencio" element={<Villavicencio />} />
          <Route path="/bogota" element={<Bogota />} />
          <Route path="/medellin" element={<Medellin />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/terminos" element={<TermsConditions />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />

          {/* ── España / Europa (es-ES) — rutas /en/* ─────────────────── */}
          <Route path="/en" element={<HomeES />} />
          <Route path="/en/" element={<HomeES />} />
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
