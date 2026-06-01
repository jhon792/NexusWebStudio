import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const R = 180; // planet radius px
const D = R * 2;

// ── Continent dots [x_ratio, y_ratio, size] in 0–1 unit space ──────────────
const DOTS: [number, number, number, number][] = [
  // North America
  [0.11,0.18,1.8,0.85],[0.14,0.20,1.5,0.80],[0.17,0.23,2.0,0.90],[0.13,0.27,1.6,0.75],
  [0.20,0.29,1.7,0.85],[0.15,0.31,1.4,0.70],[0.22,0.26,1.9,0.88],[0.09,0.24,1.3,0.72],
  [0.18,0.17,1.5,0.78],[0.12,0.34,1.6,0.80],[0.10,0.17,1.4,0.73],[0.24,0.21,1.7,0.82],
  [0.08,0.30,1.3,0.68],[0.21,0.35,1.5,0.76],[0.16,0.14,1.4,0.70],
  // South America
  [0.20,0.52,1.6,0.82],[0.22,0.55,1.8,0.88],[0.18,0.58,1.5,0.78],[0.21,0.62,1.7,0.84],
  [0.19,0.65,1.4,0.72],[0.23,0.60,1.6,0.80],[0.17,0.56,1.5,0.76],[0.24,0.57,1.3,0.70],
  [0.19,0.70,1.4,0.68],
  // Europe
  [0.45,0.18,1.5,0.82],[0.47,0.21,1.7,0.88],[0.50,0.18,1.4,0.78],[0.48,0.24,1.6,0.84],
  [0.43,0.23,1.5,0.78],[0.52,0.21,1.3,0.72],[0.44,0.27,1.4,0.75],[0.49,0.16,1.3,0.70],
  // Africa
  [0.46,0.41,1.7,0.84],[0.48,0.45,1.8,0.90],[0.50,0.49,1.6,0.82],[0.47,0.53,1.5,0.78],
  [0.51,0.55,1.7,0.86],[0.45,0.57,1.4,0.74],[0.52,0.61,1.6,0.80],[0.48,0.64,1.5,0.76],
  [0.44,0.45,1.6,0.80],[0.53,0.47,1.4,0.74],[0.46,0.68,1.3,0.68],
  // Middle East
  [0.54,0.32,1.4,0.76],[0.56,0.35,1.3,0.72],[0.58,0.33,1.5,0.78],
  // Asia (large)
  [0.58,0.17,1.8,0.88],[0.62,0.19,2.0,0.92],[0.65,0.21,1.7,0.86],[0.68,0.18,1.9,0.90],
  [0.72,0.21,1.6,0.84],[0.60,0.25,1.5,0.80],[0.64,0.29,1.8,0.88],[0.70,0.27,1.7,0.86],
  [0.66,0.23,1.6,0.82],[0.74,0.24,1.5,0.78],[0.76,0.19,1.4,0.74],[0.62,0.33,1.6,0.80],
  [0.56,0.21,1.5,0.78],[0.78,0.27,1.7,0.84],[0.80,0.22,1.5,0.76],[0.68,0.32,1.4,0.74],
  [0.72,0.35,1.6,0.78],[0.60,0.14,1.5,0.80],
  // South/Southeast Asia
  [0.70,0.46,1.5,0.78],[0.72,0.50,1.6,0.82],[0.74,0.48,1.4,0.74],[0.76,0.52,1.5,0.78],
  // Australia
  [0.75,0.61,1.6,0.82],[0.78,0.64,1.8,0.88],[0.80,0.62,1.5,0.78],[0.77,0.67,1.6,0.80],
  [0.82,0.65,1.4,0.74],[0.80,0.68,1.3,0.70],
  // Greenland
  [0.18,0.09,1.3,0.68],[0.20,0.10,1.4,0.72],[0.17,0.12,1.2,0.65],
  // Japan
  [0.78,0.29,1.3,0.72],[0.79,0.31,1.2,0.68],
  // Sparse ocean
  [0.30,0.42,0.7,0.30],[0.35,0.60,0.6,0.25],[0.55,0.74,0.7,0.28],[0.08,0.48,0.6,0.22],
  [0.25,0.74,0.7,0.25],[0.87,0.48,0.6,0.22],[0.40,0.12,0.7,0.28],[0.65,0.78,0.6,0.25],
  [0.90,0.32,0.7,0.25],[0.33,0.78,0.6,0.20],[0.85,0.72,0.6,0.22],[0.05,0.62,0.5,0.18],
];

// ── Network nodes on sphere ─────────────────────────────────────────────────
const NODES = [
  { id: 0,  x: 0.34, y: 0.27 }, // North America
  { id: 1,  x: 0.41, y: 0.57 }, // South America
  { id: 2,  x: 0.54, y: 0.24 }, // Europe
  { id: 3,  x: 0.59, y: 0.54 }, // Africa
  { id: 4,  x: 0.71, y: 0.29 }, // Asia
  { id: 5,  x: 0.75, y: 0.63 }, // Australia
  { id: 6,  x: 0.50, y: 0.44 }, // Hub center
  { id: 7,  x: 0.27, y: 0.44 }, // West
  { id: 8,  x: 0.64, y: 0.19 }, // North Asia
  { id: 9,  x: 0.44, y: 0.71 }, // South
  { id: 10, x: 0.81, y: 0.44 }, // Far East
  { id: 11, x: 0.31, y: 0.29 }, // Canada
];

const CONNECTIONS = [
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],
  [0,2],[2,4],[4,5],[3,5],[1,3],
  [7,0],[7,1],[8,4],[9,3],[10,4],[11,0],[11,7],
];

// ── Floating cards ──────────────────────────────────────────────────────────
const CARDS = [
  { icon: "🌎", label: "Presencia Global",     pos: { top: "4%",  left: "-18%" }, delay: 0.0, dy: 8  },
  { icon: "📈", label: "Crecimiento",          pos: { top: "28%", right: "-20%" }, delay: 0.4, dy: 10 },
  { icon: "⚡", label: "Rendimiento",           pos: { bottom: "26%", right: "-18%" }, delay: 0.8, dy: 7  },
  { icon: "🔒", label: "Seguridad",            pos: { bottom: "6%",  left: "-14%" }, delay: 1.2, dy: 9  },
  { icon: "💬", label: "WhatsApp",             pos: { top: "64%", left: "-20%" }, delay: 1.6, dy: 8  },
  { icon: "☁️", label: "Tecnología",            pos: { top: "8%",  right: "-16%" }, delay: 2.0, dy: 10 },
];

// ── Orbits ──────────────────────────────────────────────────────────────────
const ORBITS = [
  { rx: 215, ry: 52,  duration: 14, rotZ: -18, color: "rgba(129,140,248,0.40)" },
  { rx: 235, ry: 70,  duration: 20, rotZ:  28, color: "rgba(168,85,247,0.28)"  },
  { rx: 250, ry: 42,  duration: 26, rotZ: -50, color: "rgba(99,102,241,0.32)"  },
  { rx: 205, ry: 88,  duration: 34, rotZ:  65, color: "rgba(196,181,253,0.22)" },
  { rx: 265, ry: 55,  duration: 18, rotZ:  10, color: "rgba(139,92,246,0.20)"  },
];

// ── Stars ───────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 46 }, (_, i) => ({
  cx: ((i * 79 + 13) % 98) + 1,
  cy: ((i * 53 + 31) % 96) + 2,
  r:  i % 6 === 0 ? 1.3 : i % 3 === 0 ? 0.9 : 0.5,
  op: 0.25 + (i % 5) * 0.12,
  twinkle: i % 4 === 0,
}));

// ── Particle paths ──────────────────────────────────────────────────────────
// Each particle follows one connection's SVG path
const PARTICLES = CONNECTIONS.slice(0, 10).map((conn, i) => ({
  conn,
  duration: 2.5 + (i % 4) * 0.8,
  delay: i * 0.6,
}));

function nodeXY(node: typeof NODES[0]) {
  return { x: node.x * D, y: node.y * D };
}

function cubicPath(a: typeof NODES[0], b: typeof NODES[0]) {
  const ax = a.x * D, ay = a.y * D;
  const bx = b.x * D, by = b.y * D;
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2 - 28;
  return `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`;
}

export function PlanetHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 22 });

  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);

  const starsX = useTransform(springX, [-1, 1], [-6, 6]);
  const starsY = useTransform(springY, [-1, 1], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    rawY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none"
      style={{ width: D + 160, height: D + 160 }}
    >
      {/* ── Space background: stars ── */}
      <motion.svg
        className="absolute inset-0 pointer-events-none"
        width="100%" height="100%"
        style={{ x: starsX, y: starsY }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {STARS.map((s, i) =>
          s.twinkle ? (
            <motion.circle
              key={i} cx={s.cx} cy={s.cy} r={s.r}
              fill="white"
              animate={{ opacity: [s.op * 0.4, s.op, s.op * 0.4] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ) : (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op} />
          )
        )}
      </motion.svg>

      {/* ── Nebula background glow ── */}
      <div className="absolute pointer-events-none" style={{
        top: "10%", left: "5%", width: "90%", height: "80%",
        background: "radial-gradient(ellipse 70% 55% at 55% 45%, rgba(88,28,220,0.07) 0%, transparent 70%)",
        filter: "blur(24px)",
      }} />

      {/* ── Shooting stars ── */}
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${15 + i * 22}%`,
            left: `${10 + i * 15}%`,
            width: 60 + i * 20,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.8), transparent)",
            borderRadius: 2,
          }}
          animate={{ x: [0, 120], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.2,
            delay: 4 + i * 7,
            repeat: Infinity,
            repeatDelay: 12 + i * 8,
            ease: "easeIn",
          }}
        />
      ))}

      {/* ── Outer glow halo ── */}
      <div className="absolute pointer-events-none" style={{
        top: "50%", left: "50%",
        width: D + 120, height: D + 120,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 45%, transparent 70%)",
        filter: "blur(18px)",
        borderRadius: "50%",
      }} />

      {/* ── Parallax wrapper ── */}
      <motion.div
        className="absolute"
        style={{
          top: "50%", left: "50%",
          width: D + 140, height: D + 140,
          x: "-50%", y: "-50%",
          rotateY, rotateX,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Orbit rings ── */}
        <div className="absolute pointer-events-none" style={{
          top: "50%", left: "50%",
          width: 0, height: 0,
          transform: "translate(-50%, -50%)",
        }}>
          {ORBITS.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: orb.rx * 2, height: orb.ry * 2,
                top: -orb.ry, left: -orb.rx,
                borderRadius: "50%",
                border: `1px solid ${orb.color}`,
                rotate: `${orb.rotZ}deg`,
                boxShadow: `0 0 6px ${orb.color}`,
              }}
              animate={{ rotate: [`${orb.rotZ}deg`, `${orb.rotZ + 360}deg`] }}
              transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* ── Planet sphere ── */}
        <div className="absolute" style={{
          top: "50%", left: "50%",
          width: D, height: D,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          background: "radial-gradient(circle at 38% 35%, #1e1650 0%, #130f3a 30%, #0a0820 60%, #060410 100%)",
          boxShadow: "inset -40px -25px 80px rgba(0,0,0,0.9), inset 15px 12px 40px rgba(99,102,241,0.18), 0 0 60px rgba(99,102,241,0.15)",
        }}>
          {/* Rotating continent dot layer */}
          <motion.svg
            width={D * 2} height={D}
            style={{ position: "absolute", top: 0, left: 0 }}
            animate={{ x: [0, -D] }}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
          >
            {/* Ocean grid dots */}
            {Array.from({ length: 28 }, (_, row) =>
              Array.from({ length: 50 }, (_, col) => {
                const x = (col / 49) * D * 2;
                const y = (row / 27) * D;
                return (
                  <circle key={`${row}-${col}`}
                    cx={x} cy={y} r={0.4}
                    fill="rgba(99,102,241,0.12)"
                  />
                );
              })
            )}
            {/* Continent dots (first half) */}
            {DOTS.map(([xr, yr, r, op], i) => (
              <circle key={`d${i}`}
                cx={xr * D} cy={yr * D} r={r}
                fill={`rgba(167,139,250,${op})`}
              />
            ))}
            {/* Continent dots (second half — seamless) */}
            {DOTS.map(([xr, yr, r, op], i) => (
              <circle key={`d2-${i}`}
                cx={xr * D + D} cy={yr * D} r={r}
                fill={`rgba(167,139,250,${op})`}
              />
            ))}
            {/* Ocean grid second half */}
            {Array.from({ length: 28 }, (_, row) =>
              Array.from({ length: 50 }, (_, col) => {
                const x = (col / 49) * D * 2 + D;
                const y = (row / 27) * D;
                return (
                  <circle key={`o2-${row}-${col}`}
                    cx={x} cy={y} r={0.4}
                    fill="rgba(99,102,241,0.12)"
                  />
                );
              })
            )}
          </motion.svg>

          {/* Sphere lighting overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 38% 35%, transparent 0%, transparent 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.70) 85%, rgba(0,0,0,0.88) 100%)",
          }} />
          {/* Left light highlight */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 32% 30%, rgba(129,140,248,0.18) 0%, transparent 55%)",
          }} />
          {/* Atmosphere rim glow */}
          <div className="absolute inset-0 pointer-events-none rounded-full" style={{
            boxShadow: "inset 0 0 40px 8px rgba(99,102,241,0.12)",
          }} />
        </div>

        {/* ── Network layer (nodes + connections + particles) ── */}
        <svg
          className="absolute pointer-events-none"
          width={D} height={D}
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <defs>
            <filter id="glow-node">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-line">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {CONNECTIONS.map(([ai, bi], i) => {
            const a = NODES[ai], b = NODES[bi];
            return (
              <path
                key={`c${i}`}
                d={cubicPath(a, b)}
                fill="none"
                stroke={i % 3 === 0 ? "rgba(167,139,250,0.55)" : i % 3 === 1 ? "rgba(129,140,248,0.40)" : "rgba(196,181,253,0.35)"}
                strokeWidth={0.7}
                filter="url(#glow-line)"
              />
            );
          })}

          {/* Data particles */}
          {PARTICLES.map(({ conn, duration, delay }, i) => {
            const a = NODES[conn[0]], b = NODES[conn[1]];
            const path = cubicPath(a, b);
            return (
              <g key={`p${i}`}>
                <circle r={2.2} fill="rgba(196,181,253,0.9)">
                  <animateMotion
                    dur={`${duration}s`} repeatCount="indefinite"
                    begin={`${delay}s`} path={path}
                  />
                </circle>
                <circle r={1} fill="white">
                  <animateMotion
                    dur={`${duration}s`} repeatCount="indefinite"
                    begin={`${delay}s`} path={path}
                  />
                </circle>
              </g>
            );
          })}

          {/* Network nodes */}
          {NODES.map((node) => {
            const { x, y } = nodeXY(node);
            return (
              <g key={`n${node.id}`} filter="url(#glow-node)">
                {/* Pulse ring */}
                <motion.circle
                  cx={x} cy={y} r={5}
                  fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth={1}
                  animate={{ r: [5, 10, 5], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5 + (node.id % 3) * 0.5, repeat: Infinity, delay: node.id * 0.3 }}
                />
                <motion.circle
                  cx={x} cy={y} r={3.5}
                  fill="rgba(167,139,250,0.85)"
                  animate={{ r: [3.5, 4.5, 3.5] }}
                  transition={{ duration: 2 + (node.id % 2) * 0.6, repeat: Infinity, delay: node.id * 0.2 }}
                />
                <circle cx={x} cy={y} r={1.5} fill="white" opacity={0.9} />
              </g>
            );
          })}
        </svg>

        {/* ── Floating cards ── */}
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap"
            style={{
              ...card.pos,
              background: "rgba(10,8,28,0.92)",
              border: "1px solid rgba(129,140,248,0.28)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 12px rgba(99,102,241,0.12)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, card.dy, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 + card.delay },
              scale:   { duration: 0.5, delay: 0.5 + card.delay },
              y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
            }}
          >
            <span style={{ fontSize: "14px" }}>{card.icon}</span>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.01em",
            }}>
              {card.label}
            </span>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#a78bfa",
              boxShadow: "0 0 6px rgba(167,139,250,0.8)",
            }} />
          </motion.div>
        ))}

        {/* ── Live indicator ── */}
        <motion.div
          className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            bottom: "14%", right: "0%",
            background: "rgba(10,8,28,0.92)",
            border: "1px solid rgba(34,197,94,0.35)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ opacity: { duration: 0.5, delay: 2 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "10px", color: "#4ade80" }}>
            Conexiones activas
          </span>
        </motion.div>

      </motion.div>
    </div>
  );
}
