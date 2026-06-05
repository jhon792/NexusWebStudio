import { motion, useSpring, useScroll } from "motion/react";

/* ─── Barra de progreso de scroll ───────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2.5,
        scaleX,
        transformOrigin: "left center",
        background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 45%, #c084fc 80%, #e879f9 100%)",
        zIndex: 99997,
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(139,92,246,0.6)",
      }}
    />
  );
}

/* ─── Export principal ───────────────────────────────────────────────────── */
export function GlobalEffects() {
  return <ScrollProgressBar />;
}
