import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cookie, Shield, BarChart2, Megaphone, ChevronRight } from "lucide-react";
import { useConsent } from "../../hooks/useConsent";

const WA = "https://wa.me/573123198706";

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

function Toggle({ label, description, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-zinc-100 last:border-0">
      <div className="flex-1">
        <div
          className="text-zinc-900 mb-0.5"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px" }}
        >
          {label}
          {disabled && (
            <span
              className="ml-2 px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded text-xs"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              Siempre activo
            </span>
          )}
        </div>
        <p className="text-zinc-500" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 ${
          checked ? "bg-zinc-900" : "bg-zinc-200"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={`${label}: ${checked ? "activado" : "desactivado"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function CookieBanner() {
  const { needsBanner, loaded, acceptAll, rejectAll, savePreferences } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!loaded || !needsBanner) return null;

  const handleSave = () => {
    savePreferences({ analytics, marketing });
    setShowSettings(false);
  };

  return (
    <>
      {/* Overlay oscuro detrás del panel de configuración */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[998] backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Panel de configuración de cookies */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[999] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
          >
            {/* Header del panel */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Cookie size={18} className="text-zinc-700" />
                <h2
                  id="cookie-settings-title"
                  className="text-zinc-900"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
                >
                  Configurar preferencias
                </h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Cerrar configuración de cookies"
              >
                <X size={16} className="text-zinc-500" />
              </button>
            </div>

            {/* Cuerpo del panel */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <p
                className="text-zinc-500 mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.6 }}
              >
                Selecciona qué tipos de cookies deseas permitir. Siempre puedes cambiar tu elección visitando nuestra{" "}
                <a href="/cookies" className="text-zinc-900 underline hover:no-underline">
                  Política de Cookies
                </a>
                .
              </p>

              <Toggle
                label="Cookies Necesarias"
                description="Esenciales para el funcionamiento del sitio. No pueden desactivarse."
                checked={true}
                disabled={true}
              />
              <Toggle
                label="Cookies Analíticas"
                description="Nos permiten entender cómo navegas por el sitio (Google Analytics 4). Los datos son anónimos."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                label="Cookies de Marketing"
                description="Usadas para mostrarte publicidad relevante en otras plataformas según tu comportamiento."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            {/* Acciones del panel */}
            <div className="p-5 border-t border-zinc-100 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer text-sm font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Guardar preferencias
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer text-sm font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Aceptar todo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner principal (mostrado cuando no está el panel de configuración) */}
      <AnimatePresence>
        {!showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[997] bg-white border-t border-zinc-200 shadow-2xl"
            role="dialog"
            aria-modal="false"
            aria-label="Aviso de cookies"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row items-start lg:items-center gap-5">
              {/* Ícono + texto */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie size={18} className="text-zinc-700" />
                </div>
                <div>
                  <p
                    className="text-zinc-900 mb-0.5"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px" }}
                  >
                    Este sitio utiliza cookies
                  </p>
                  <p
                    className="text-zinc-500"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", lineHeight: 1.5 }}
                  >
                    Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes aceptar, rechazar o configurar tus preferencias.{" "}
                    <a href="/cookies" className="text-zinc-700 underline hover:no-underline">
                      Política de Cookies
                    </a>
                  </p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 border border-zinc-200 text-zinc-600 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  <ChevronRight size={14} />
                  Configurar
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer text-sm"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Rechazar
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer text-sm"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  Aceptar todo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
