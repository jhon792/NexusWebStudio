import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const R = 285;
const D = R * 2;

// ── Continent dots: [x_ratio, y_ratio, size, opacity] ──────────────────────
// x/y in [0,1] relative to D×D; duplicated for seamless 2× scroll
const RAW_DOTS: [number, number, number, number][] = [
  // ── North America (bright core) ──
  [0.11,0.14,2.2,0.98],[0.13,0.16,2.6,0.95],[0.16,0.18,2.8,1.0],[0.14,0.22,2.4,0.95],
  [0.18,0.24,2.6,0.98],[0.20,0.20,2.2,0.92],[0.22,0.17,2.4,0.96],[0.09,0.20,2.0,0.88],
  [0.17,0.28,2.2,0.90],[0.13,0.30,2.4,0.93],[0.19,0.32,2.0,0.88],[0.21,0.28,2.2,0.91],
  [0.15,0.26,2.6,0.96],[0.12,0.24,2.2,0.90],[0.10,0.16,1.8,0.85],[0.23,0.23,2.0,0.88],
  [0.08,0.26,1.6,0.80],[0.24,0.30,1.8,0.84],[0.11,0.32,1.8,0.82],[0.20,0.35,2.0,0.87],
  // ── Central America ──
  [0.20,0.40,1.6,0.78],[0.21,0.43,1.4,0.74],[0.19,0.45,1.6,0.78],
  // ── South America ──
  [0.19,0.52,2.2,0.92],[0.21,0.55,2.6,0.96],[0.18,0.58,2.2,0.90],[0.22,0.61,2.4,0.94],
  [0.20,0.65,2.0,0.88],[0.23,0.60,2.2,0.91],[0.17,0.56,2.0,0.87],[0.24,0.56,1.8,0.84],
  [0.19,0.70,1.8,0.82],[0.21,0.68,1.6,0.78],[0.22,0.73,1.4,0.72],
  // ── Greenland ──
  [0.17,0.08,1.8,0.82],[0.19,0.09,1.6,0.78],[0.16,0.11,1.4,0.72],
  // ── Europe ──
  [0.44,0.16,2.0,0.90],[0.46,0.18,2.4,0.95],[0.49,0.16,2.0,0.88],[0.47,0.22,2.2,0.92],
  [0.42,0.21,2.0,0.88],[0.51,0.19,1.8,0.84],[0.43,0.25,1.8,0.82],[0.48,0.14,1.6,0.78],
  [0.50,0.23,1.6,0.80],[0.45,0.27,1.6,0.78],[0.53,0.22,1.4,0.74],
  // ── Africa ──
  [0.45,0.38,2.2,0.92],[0.47,0.42,2.6,0.96],[0.49,0.46,2.4,0.94],[0.46,0.50,2.2,0.90],
  [0.50,0.53,2.4,0.94],[0.44,0.55,2.0,0.88],[0.51,0.58,2.2,0.91],[0.47,0.62,2.0,0.87],
  [0.43,0.44,2.0,0.88],[0.52,0.46,1.8,0.84],[0.45,0.66,1.8,0.82],[0.50,0.66,1.6,0.78],
  [0.48,0.70,1.4,0.74],[0.46,0.34,1.8,0.82],
  // ── Middle East ──
  [0.54,0.30,1.8,0.84],[0.56,0.33,1.6,0.78],[0.58,0.31,2.0,0.88],[0.55,0.36,1.4,0.74],
  // ── Asia (huge) ──
  [0.57,0.14,2.2,0.92],[0.60,0.16,2.8,0.98],[0.63,0.18,2.6,0.96],[0.67,0.15,2.8,0.98],
  [0.70,0.18,2.4,0.95],[0.73,0.16,2.2,0.92],[0.76,0.20,2.4,0.95],[0.79,0.18,2.0,0.88],
  [0.59,0.22,2.2,0.90],[0.63,0.26,2.6,0.96],[0.68,0.24,2.4,0.94],[0.72,0.22,2.0,0.88],
  [0.65,0.20,2.2,0.92],[0.75,0.25,2.0,0.88],[0.78,0.22,1.8,0.84],[0.61,0.30,2.2,0.90],
  [0.70,0.30,2.0,0.88],[0.74,0.28,2.2,0.91],[0.55,0.20,2.0,0.88],[0.80,0.26,1.8,0.84],
  [0.62,0.14,2.4,0.94],[0.66,0.30,1.8,0.82],[0.57,0.26,2.0,0.86],
  // ── SE Asia ──
  [0.71,0.44,2.0,0.88],[0.73,0.48,2.2,0.91],[0.75,0.46,1.8,0.84],[0.77,0.50,2.0,0.87],
  [0.74,0.52,1.6,0.78],[0.72,0.54,1.4,0.74],
  // ── Australia ──
  [0.74,0.60,2.2,0.92],[0.77,0.63,2.6,0.96],[0.80,0.61,2.2,0.90],[0.78,0.66,2.4,0.94],
  [0.82,0.64,2.0,0.87],[0.80,0.68,1.8,0.82],[0.76,0.67,1.6,0.78],
  // ── Japan / Philippines ──
  [0.79,0.26,1.8,0.84],[0.80,0.29,1.6,0.78],[0.81,0.27,1.4,0.72],
  // ── Ocean scatter (faint) ──
  [0.30,0.40,0.8,0.22],[0.36,0.60,0.6,0.18],[0.55,0.76,0.7,0.20],[0.07,0.50,0.6,0.16],
  [0.26,0.76,0.7,0.18],[0.87,0.50,0.6,0.15],[0.41,0.10,0.7,0.20],[0.66,0.78,0.6,0.18],
  [0.90,0.34,0.7,0.18],[0.34,0.80,0.6,0.15],[0.86,0.74,0.6,0.16],[0.04,0.64,0.5,0.14],
  [0.50,0.10,0.6,0.18],[0.25,0.12,0.5,0.16],[0.88,0.14,0.6,0.15],
];

// ── Nodes on sphere (x,y in 0–1) ──────────────────────────────────────────
const NODES = [
  { id:0,  x:0.34, y:0.26 }, // N. America
  { id:1,  x:0.41, y:0.58 }, // S. America
  { id:2,  x:0.53, y:0.22 }, // Europe
  { id:3,  x:0.58, y:0.54 }, // Africa
  { id:4,  x:0.70, y:0.27 }, // Asia
  { id:5,  x:0.75, y:0.62 }, // Australia
  { id:6,  x:0.50, y:0.44 }, // Hub
  { id:7,  x:0.27, y:0.44 }, // West
  { id:8,  x:0.65, y:0.17 }, // N. Asia
  { id:9,  x:0.44, y:0.70 }, // S.
  { id:10, x:0.82, y:0.44 }, // Far East
  { id:11, x:0.30, y:0.28 }, // Canada
  { id:12, x:0.60, y:0.35 }, // M. East
  { id:13, x:0.47, y:0.33 }, // Med
];

const CONNECTIONS = [
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],
  [0,2],[2,4],[4,5],[3,5],[1,3],
  [7,0],[7,1],[8,4],[9,3],[10,4],
  [11,0],[11,7],[12,4],[12,3],[13,2],[13,3],
];

// ── Floating cards ──────────────────────────────────────────────────────────
const CARDS = [
  {
    icon: "👥", title: "Empresas",    sub: "Conectadas",
    pos: { top: "2%",  left: "12%" }, delay: 0.0, dy: 8,
  },
  {
    icon: "🌐", title: "Presencia",   sub: "Global",
    pos: { top: "4%",  right: "4%" }, delay: 0.5, dy: 10,
  },
  {
    icon: "🚀", title: "Rendimiento", sub: "Optimizado",
    pos: { top: "36%", left: "4%" },  delay: 1.0, dy: 7,
  },
  {
    icon: "📈", title: "Crecimiento", sub: "Sin Límites",
    pos: { top: "38%", right: "2%" }, delay: 1.5, dy: 9,
  },
  {
    icon: "💬", title: "Clientes",    sub: "Siempre Conectados",
    pos: { bottom: "18%", left: "8%" }, delay: 2.0, dy: 8,
  },
  {
    icon: "🔒", title: "Seguridad",   sub: "Garantizada",
    pos: { bottom: "16%", right: "2%" }, delay: 2.5, dy: 10,
  },
  {
    icon: "☁️", title: "Tecnología",  sub: "En la Nube",
    pos: { bottom: "2%", left: "35%" }, delay: 3.0, dy: 7,
  },
];

// ── Orbits ──────────────────────────────────────────────────────────────────
const ORBITS = [
  { rx: 330, ry: 68,  dur: 13, rotZ: -20, w: 1.2, col: "rgba(129,140,248,0.55)" },
  { rx: 355, ry: 90,  dur: 20, rotZ:  30, w: 0.9, col: "rgba(168,85,247,0.40)"  },
  { rx: 370, ry: 55,  dur: 25, rotZ: -52, w: 1.0, col: "rgba(99,102,241,0.45)"  },
  { rx: 315, ry: 110, dur: 32, rotZ:  68, w: 0.7, col: "rgba(196,181,253,0.30)" },
  { rx: 385, ry: 75,  dur: 17, rotZ:  12, w: 0.8, col: "rgba(139,92,246,0.35)"  },
];

// ── Stars ────────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 52 }, (_, i) => ({
  cx: ((i * 83 + 17) % 98) + 1,
  cy: ((i * 59 + 37) % 96) + 2,
  r:  i % 7 === 0 ? 1.5 : i % 3 === 0 ? 1.0 : 0.55,
  op: 0.20 + (i % 6) * 0.10,
  tw: i % 4 === 0,
}));

// ── Particles ────────────────────────────────────────────────────────────────
const PARTICLES = CONNECTIONS.slice(0, 12).map((conn, i) => ({
  conn, dur: 2.2 + (i % 5) * 0.7, delay: i * 0.55,
}));

function nodeXY(n: typeof NODES[0]) {
  return { x: n.x * D, y: n.y * D };
}
function cubicPath(a: typeof NODES[0], b: typeof NODES[0]) {
  const ax = a.x * D, ay = a.y * D, bx = b.x * D, by = b.y * D;
  const mx = (ax + bx) / 2, my = (ay + by) / 2 - 32;
  return `M${ax},${ay} Q${mx},${my} ${bx},${by}`;
}

export function PlanetHero() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spX = useSpring(rawX, { stiffness: 55, damping: 20 });
  const spY = useSpring(rawY, { stiffness: 55, damping: 20 });
  const rotY = useTransform(spX, [-1, 1], [-6, 6]);
  const rotX = useTransform(spY, [-1, 1], [6, -6]);
  const stX  = useTransform(spX, [-1, 1], [-8, 8]);
  const stY  = useTransform(spY, [-1, 1], [-8, 8]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rc = el.getBoundingClientRect();
    rawX.set((e.clientX - rc.left - rc.width / 2) / rc.width);
    rawY.set((e.clientY - rc.top - rc.height / 2) / rc.height);
  }, [rawX, rawY]);

  const SIZE = D + 220;

  return (
    <div
      ref={ref} onMouseMove={onMove} onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="relative select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Stars parallax layer */}
      <motion.svg className="absolute inset-0 pointer-events-none"
        width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none" style={{ x: stX, y: stY }}
      >
        {STARS.map((s, i) => s.tw ? (
          <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
            animate={{ opacity: [s.op * 0.3, s.op, s.op * 0.3] }}
            transition={{ duration: 2 + (i % 3) * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
          />
        ) : (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op} />
        ))}
      </motion.svg>

      {/* Nebula glow */}
      <div className="absolute pointer-events-none" style={{
        top: "5%", left: "10%", width: "85%", height: "85%",
        background: "radial-gradient(ellipse 75% 60% at 58% 48%, rgba(76,29,149,0.18) 0%, rgba(109,40,217,0.06) 50%, transparent 72%)",
        filter: "blur(30px)",
      }} />

      {/* Shooting stars */}
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute pointer-events-none" style={{
          top: `${12 + i * 20}%`, left: `${8 + i * 12}%`,
          width: 70 + i * 25, height: 1.5,
          background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.9), transparent)",
          borderRadius: 2,
        }}
          animate={{ x: [0, 140], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, delay: 5 + i * 8, repeat: Infinity, repeatDelay: 14 + i * 9, ease: "easeIn" }}
        />
      ))}

      {/* Outer mega-glow */}
      <div className="absolute pointer-events-none" style={{
        top: "50%", left: "50%",
        width: D + 200, height: D + 200,
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(109,40,217,0.30) 0%, rgba(99,102,241,0.14) 42%, transparent 68%)",
        filter: "blur(22px)", borderRadius: "50%",
      }} />

      {/* Parallax + 3D tilt wrapper */}
      <motion.div className="absolute" style={{
        top: "50%", left: "50%",
        width: D + 180, height: D + 180,
        x: "-50%", y: "-50%",
        rotateY: rotY, rotateX: rotX,
        transformStyle: "preserve-3d",
      }}>

        {/* Orbit rings */}
        <div className="absolute pointer-events-none" style={{
          top: "50%", left: "50%", width: 0, height: 0, transform: "translate(-50%,-50%)",
        }}>
          {ORBITS.map((o, i) => (
            <motion.div key={i} className="absolute" style={{
              width: o.rx * 2, height: o.ry * 2,
              top: -o.ry, left: -o.rx,
              borderRadius: "50%",
              border: `${o.w}px solid ${o.col}`,
              rotate: `${o.rotZ}deg`,
              boxShadow: `0 0 8px ${o.col}, 0 0 16px ${o.col}`,
            }}
              animate={{ rotate: [`${o.rotZ}deg`, `${o.rotZ + 360}deg`] }}
              transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Planet sphere */}
        <div className="absolute" style={{
          top: "50%", left: "50%",
          width: D, height: D,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          overflow: "hidden",
          background: "radial-gradient(circle at 36% 33%, #1c1654 0%, #0f0b38 28%, #08061e 58%, #040210 88%)",
          boxShadow: [
            "inset -50px -30px 90px rgba(0,0,0,0.92)",
            "inset 18px 14px 50px rgba(99,102,241,0.22)",
            "0 0 80px rgba(99,102,241,0.20)",
            "0 0 140px rgba(109,40,217,0.12)",
          ].join(", "),
        }}>
          {/* Rotating continent + dot layer */}
          <motion.svg
            width={D * 2} height={D}
            style={{ position: "absolute", top: 0, left: 0 }}
            animate={{ x: [0, -D] }}
            transition={{ duration: 54, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint ocean grid */}
            {Array.from({ length: 24 }, (_, row) =>
              Array.from({ length: 44 }, (_, col) => (
                <circle key={`g-${row}-${col}`}
                  cx={(col / 43) * D * 2} cy={(row / 23) * D}
                  r={0.45} fill="rgba(99,102,241,0.15)" />
              ))
            )}
            {/* Bright continent dots — first half */}
            <g filter="url(#dot-glow)">
              {RAW_DOTS.map(([xr, yr, r, op], i) => (
                <circle key={`d1-${i}`}
                  cx={xr * D} cy={yr * D} r={r}
                  fill={op > 0.88 ? "rgba(220,210,255,0.98)" : op > 0.75 ? "rgba(196,181,253,0.92)" : "rgba(167,139,250,0.85)"}
                  opacity={op}
                />
              ))}
            </g>
            {/* Bright continent dots — second half (seamless) */}
            <g filter="url(#dot-glow)">
              {RAW_DOTS.map(([xr, yr, r, op], i) => (
                <circle key={`d2-${i}`}
                  cx={xr * D + D} cy={yr * D} r={r}
                  fill={op > 0.88 ? "rgba(220,210,255,0.98)" : op > 0.75 ? "rgba(196,181,253,0.92)" : "rgba(167,139,250,0.85)"}
                  opacity={op}
                />
              ))}
            </g>
            {/* Faint ocean grid second half */}
            {Array.from({ length: 24 }, (_, row) =>
              Array.from({ length: 44 }, (_, col) => (
                <circle key={`g2-${row}-${col}`}
                  cx={(col / 43) * D * 2 + D} cy={(row / 23) * D}
                  r={0.45} fill="rgba(99,102,241,0.15)" />
              ))
            )}
          </motion.svg>

          {/* Sphere depth shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 36% 33%, transparent 0%, transparent 30%, rgba(0,0,0,0.30) 58%, rgba(0,0,0,0.75) 82%, rgba(0,0,0,0.92) 100%)",
          }} />
          {/* Top-left light */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 30% 28%, rgba(167,139,250,0.22) 0%, transparent 52%)",
          }} />
          {/* Atmosphere edge glow */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            boxShadow: "inset 0 0 50px 12px rgba(109,40,217,0.18), inset 0 0 20px 4px rgba(99,102,241,0.12)",
          }} />
        </div>

        {/* Edge atmosphere ring */}
        <div className="absolute rounded-full pointer-events-none" style={{
          top: "50%", left: "50%",
          width: D + 28, height: D + 28,
          transform: "translate(-50%,-50%)",
          border: "1px solid rgba(129,140,248,0.22)",
          boxShadow: "0 0 30px 10px rgba(109,40,217,0.22), inset 0 0 30px 10px rgba(109,40,217,0.08)",
        }} />

        {/* Network SVG — nodes + lines + particles */}
        <svg className="absolute pointer-events-none"
          width={D} height={D}
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <defs>
            <filter id="node-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.8" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {CONNECTIONS.map(([ai, bi], i) => {
            const col = i % 3 === 0 ? "rgba(196,181,253,0.60)" : i % 3 === 1 ? "rgba(167,139,250,0.45)" : "rgba(129,140,248,0.38)";
            return (
              <path key={`c${i}`} d={cubicPath(NODES[ai], NODES[bi])}
                fill="none" stroke={col} strokeWidth={0.8} filter="url(#line-glow)" />
            );
          })}

          {/* Data particles */}
          {PARTICLES.map(({ conn, dur, delay }, i) => {
            const path = cubicPath(NODES[conn[0]], NODES[conn[1]]);
            return (
              <g key={`p${i}`}>
                <circle r={2.6} fill="rgba(220,210,255,0.95)">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} path={path} />
                </circle>
                <circle r={1.2} fill="white">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} path={path} />
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const { x, y } = nodeXY(n);
            return (
              <g key={`n${n.id}`} filter="url(#node-glow)">
                <motion.circle cx={x} cy={y} r={6}
                  fill="none" stroke="rgba(196,181,253,0.55)" strokeWidth={1}
                  animate={{ r: [6, 13, 6], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4 + (n.id % 3) * 0.5, repeat: Infinity, delay: n.id * 0.28 }}
                />
                <motion.circle cx={x} cy={y} r={4}
                  fill="rgba(196,181,253,0.90)"
                  animate={{ r: [4, 5.5, 4] }}
                  transition={{ duration: 1.8 + (n.id % 2) * 0.5, repeat: Infinity, delay: n.id * 0.2 }}
                />
                <circle cx={x} cy={y} r={2} fill="white" opacity={0.95} />
              </g>
            );
          })}
        </svg>

        {/* Floating cards */}
        {CARDS.map((card, i) => (
          <motion.div key={i} className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl"
            style={{
              ...card.pos,
              background: "rgba(8,6,24,0.90)",
              border: "1px solid rgba(129,140,248,0.32)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 16px rgba(99,102,241,0.15)",
              backdropFilter: "blur(14px)",
              minWidth: 140,
            }}
            initial={{ opacity: 0, scale: 0.80 }}
            animate={{ opacity: 1, scale: 1, y: [0, card.dy, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 + card.delay },
              scale:   { duration: 0.5, delay: 0.6 + card.delay },
              y: { duration: 3.2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: card.delay * 0.5 },
            }}
          >
            <span style={{ fontSize: 18 }}>{card.icon}</span>
            <div>
              <p style={{ fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", lineHeight: 1.2 }}>
                {card.title}
              </p>
              <p style={{ fontFamily: "Inter,sans-serif", fontWeight: 400, fontSize: 10, color: "rgba(196,181,253,0.75)", lineHeight: 1.2 }}>
                {card.sub}
              </p>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,0.9)", marginLeft: "auto" }} />
          </motion.div>
        ))}

        {/* Live badge */}
        <motion.div className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            bottom: "10%", right: "8%",
            background: "rgba(8,6,24,0.90)",
            border: "1px solid rgba(34,197,94,0.40)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { duration: 0.5, delay: 2.2 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        >
          <motion.div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }}
            animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span style={{ fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 10, color: "#4ade80" }}>
            Conexiones activas
          </span>
        </motion.div>

      </motion.div>
    </div>
  );
}
