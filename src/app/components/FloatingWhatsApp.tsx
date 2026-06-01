import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WA = "https://wa.me/573123198706?text=Hola%2C%20vi%20tu%20sitio%20web%20y%20me%20interesa%20cotizar%20un%20proyecto.";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    setShowTooltip(true);
    const t = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[990] flex flex-col items-end gap-3"
      aria-label="Contactar por WhatsApp"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl shadow-2xl border border-zinc-100 px-4 py-3 max-w-[200px] text-right"
          >
            <p
              className="text-zinc-900 font-semibold text-sm leading-snug"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ¿Tienes dudas?
            </p>
            <p
              className="text-zinc-500 text-xs mt-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Escríbenos ahora, respondemos en minutos.
            </p>
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "6px solid white",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <motion.a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
        }}
        aria-label="Abrir WhatsApp"
      >
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-25"
          style={{ background: "#25D366" }}
        />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
        </svg>
      </motion.a>
    </div>
  );
}
