import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { useAnalytics } from "../hooks/useAnalytics";

// Lazy loading de páginas → code splitting automático
const Home = lazy(() => import("./pages/Home"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Landing pages por ciudad
const Villavicencio = lazy(() => import("./pages/Villavicencio"));
const Bogota = lazy(() => import("./pages/Bogota"));
const Medellin = lazy(() => import("./pages/Medellin"));

function PageLoader() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      aria-label="Cargando página..."
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          Cargando...
        </span>
      </div>
    </div>
  );
}

function AppRoutes() {
  useAnalytics(); // carga GA4 solo si hay consentimiento

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/villavicencio" element={<Villavicencio />} />
        <Route path="/bogota" element={<Bogota />} />
        <Route path="/medellin" element={<Medellin />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/terminos" element={<TermsConditions />} />
        <Route path="/aviso-legal" element={<LegalNotice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <CookieBanner />
      <FloatingWhatsApp />
      <AppRoutes />
    </>
  );
}
