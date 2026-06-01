import { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-zinc-100 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">NS</span>
            </div>
            <span className="text-zinc-900 hidden sm:block font-semibold text-sm">NexuStudio</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-zinc-500 text-sm mb-3">Última actualización: {lastUpdated}</p>
          <h1
            className="text-zinc-900"
            style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            {title}
          </h1>
        </div>

        <div
          className="prose-zinc max-w-none"
          style={{ fontSize: "15px", lineHeight: 1.8, color: "#3f3f46" }}
        >
          {children}
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-zinc-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-sm">© 2025 NexuStudio. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacidad" className="text-zinc-500 hover:text-zinc-900 transition-colors">Privacidad</Link>
            <Link to="/cookies" className="text-zinc-500 hover:text-zinc-900 transition-colors">Cookies</Link>
            <Link to="/terminos" className="text-zinc-500 hover:text-zinc-900 transition-colors">Términos</Link>
            <Link to="/aviso-legal" className="text-zinc-500 hover:text-zinc-900 transition-colors">Aviso Legal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Helpers de tipografía para las páginas legales */
export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-zinc-900 mt-10 mb-4"
      style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3
      className="text-zinc-800 mt-6 mb-2"
      style={{ fontWeight: 600, fontSize: "1rem" }}
    >
      {children}
    </h3>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="text-zinc-600 mb-4" style={{ lineHeight: 1.8, fontSize: "15px" }}>
      {children}
    </p>
  );
}

export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 mb-4 text-zinc-600 space-y-1.5" style={{ fontSize: "15px" }}>
      {children}
    </ul>
  );
}

export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 p-5 bg-zinc-50 border border-zinc-200 rounded-xl">
      <p className="text-zinc-700 text-sm" style={{ lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}
