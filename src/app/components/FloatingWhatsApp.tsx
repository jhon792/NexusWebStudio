import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRegion } from "../../hooks/useRegion";
import { useLang } from "../../hooks/useLang";

const WA =
  "https://wa.me/573123198706?text=Hola%2C%20vi%20tu%20sitio%20web%20y%20me%20interesa%20cotizar%20un%20proyecto.";
const TIKTOK = "https://www.tiktok.com/@nexus_studio2";

const TOOLTIP_TEXT: Record<string, { title: string; subtitle: string }> = {
  ES:    { title: "¿Tienes dudas?",    subtitle: "Escríbenos ahora, respondemos en minutos." },
  EN:    { title: "Have questions?",   subtitle: "Write to us now, we reply in minutes." },
  FR:    { title: "Des questions ?",   subtitle: "Écrivez-nous, nous répondons en quelques minutes." },
  IT:    { title: "Hai domande?",      subtitle: "Scrivici ora, rispondiamo in pochi minuti." },
  CO_ES: { title: "¿Tienes dudas?",    subtitle: "Escríbenos ahora, respondemos en minutos." },
  CO_EN: { title: "Have questions?",   subtitle: "Write to us now, we reply in minutes." },
};

export function FloatingWhatsApp() {
  const region = useRegion();
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const tooltipKey = region === "CO"
    ? (lang === "en" ? "CO_EN" : "CO_ES")
    : (region as string);
  const tooltip = TOOLTIP_TEXT[tooltipKey] ?? TOOLTIP_TEXT.ES;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShowTooltip(true), 500);
    const t2 = setTimeout(() => setShowTooltip(false), 5500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed bottom-6 right-6 z-[990] flex flex-col items-end gap-3"
          aria-label="Contacto y redes sociales"
          onMouseEnter={() => setShowSocial(true)}
          onMouseLeave={() => setShowSocial(false)}
          onFocus={() => setShowSocial(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setShowSocial(false);
          }}
        >
          {/* TikTok — aparece al pasar el cursor (o con foco de teclado) sobre el área */}
          <AnimatePresence>
            {showSocial && (
              <motion.a
                key="tiktok"
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.4, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4, y: 12 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: "#010101", boxShadow: "0 8px 28px rgba(0,0,0,0.45)" }}
                aria-label="Síguenos en TikTok — @nexus_studio2"
              >
                <TikTokLogo />
              </motion.a>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 14, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-2xl shadow-2xl border border-zinc-100 px-4 py-3 max-w-[200px] text-right"
              >
                <p
                  className="text-zinc-900 font-semibold text-sm leading-snug"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tooltip.title}
                </p>
                <p
                  className="text-zinc-500 text-xs mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tooltip.subtitle}
                </p>
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
                  style={{
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: "6px solid white",
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: -180 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
            }}
            aria-label="Abrir chat de WhatsApp con Nexus Studio"
          >
            {/* Anillo pulsante */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "#25D366" }}
              animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
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
      )}
    </AnimatePresence>
  );
}

/* Logo oficial de TikTok con su efecto de color (cian #25F4EE + magenta #FE2C55
   desplazados sobre blanco) — la nota musical reconocible de la marca. */
function TikTokLogo() {
  const d =
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="#25F4EE" transform="translate(-1,0.6)" />
      <path d={d} fill="#FE2C55" transform="translate(1,-0.6)" />
      <path d={d} fill="#FFFFFF" />
    </svg>
  );
}
