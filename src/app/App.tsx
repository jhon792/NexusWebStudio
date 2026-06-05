import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { GlobalEffects } from "./components/GlobalEffects";
import { useAnalytics } from "../hooks/useAnalytics";

const Home = lazy(() => import("./pages/Home"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Villavicencio = lazy(() => import("./pages/Villavicencio"));
const Bogota = lazy(() => import("./pages/Bogota"));
const Medellin = lazy(() => import("./pages/Medellin"));

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
      {/* Efectos globales: cursor + barra de progreso */}
      <GlobalEffects />
      <CookieBanner />
      <FloatingWhatsApp />
      <AppRoutes />
    </>
  );
}
