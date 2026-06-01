import { useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// ── Dimensiones ────────────────────────────────────────────────────────────
const R   = 255;         // 13% más pequeño que 293
const D   = R * 2;       // 586
const BOX = D + 320;     // 906 — espacio para órbitas + tarjetas

// ── Helper: polígono de puntos normalizados → string SVG ──────────────────
function pts(size: number, coords: [number, number][], shift = 0) {
  return coords.map(([x, y]) => `${x * size + shift},${y * size}`).join(" ");
}

// ── Helper: path de elipse rotada para animateMotion ─────────────────────
function rotatedEllipsePath(rx: number, ry: number, rotDeg: number): string {
  const steps = 80;
  const θ = (rotDeg * Math.PI) / 180;
  const segs: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const x = rx * Math.cos(t) * Math.cos(θ) - ry * Math.sin(t) * Math.sin(θ);
    const y = rx * Math.cos(t) * Math.sin(θ) + ry * Math.sin(t) * Math.cos(θ);
    segs.push(i === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : `L${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return segs.join(" ") + " Z";
}

// ── Continentes (polígonos normalizados 0‑1 en espacio D×D) ───────────────
const CONTINENTS: { id: string; c: [number, number][] }[] = [
  { id: "na", c: [
    [0.05,0.08],[0.10,0.06],[0.15,0.05],[0.21,0.06],[0.26,0.09],
    [0.29,0.14],[0.30,0.21],[0.28,0.28],[0.25,0.35],[0.22,0.41],
    [0.19,0.47],[0.17,0.50],[0.14,0.46],[0.13,0.42],[0.16,0.37],
    [0.12,0.33],[0.09,0.29],[0.06,0.24],[0.05,0.18],[0.04,0.12],
  ]},
  { id: "sa", c: [
    [0.14,0.52],[0.18,0.49],[0.24,0.50],[0.27,0.55],[0.28,0.62],
    [0.26,0.70],[0.23,0.77],[0.20,0.80],[0.17,0.78],[0.14,0.72],
    [0.13,0.64],[0.13,0.58],
  ]},
  { id: "gr", c: [
    [0.12,0.04],[0.17,0.03],[0.22,0.04],[0.24,0.09],[0.21,0.13],[0.15,0.12],[0.11,0.08],
  ]},
  { id: "eu", c: [
    [0.38,0.11],[0.43,0.09],[0.49,0.10],[0.53,0.13],[0.55,0.19],
    [0.53,0.25],[0.50,0.28],[0.46,0.27],[0.42,0.25],[0.39,0.20],[0.37,0.15],
  ]},
  { id: "af", c: [
    [0.40,0.27],[0.46,0.25],[0.53,0.27],[0.57,0.33],[0.58,0.43],
    [0.56,0.54],[0.53,0.64],[0.50,0.73],[0.47,0.73],[0.44,0.67],
    [0.41,0.57],[0.40,0.46],[0.40,0.35],
  ]},
  { id: "me", c: [
    [0.54,0.24],[0.60,0.22],[0.64,0.26],[0.65,0.33],[0.61,0.38],[0.56,0.37],[0.53,0.31],
  ]},
  { id: "as", c: [
    [0.55,0.08],[0.63,0.07],[0.72,0.08],[0.80,0.10],[0.85,0.14],
    [0.87,0.21],[0.86,0.29],[0.82,0.37],[0.77,0.43],[0.79,0.49],
    [0.75,0.54],[0.71,0.52],[0.67,0.48],[0.63,0.42],[0.58,0.37],
    [0.55,0.29],[0.53,0.19],
  ]},
  { id: "in", c: [
    [0.62,0.34],[0.66,0.32],[0.70,0.35],[0.70,0.43],[0.67,0.50],[0.64,0.52],[0.61,0.46],[0.60,0.39],
  ]},
  { id: "se", c: [
    [0.71,0.43],[0.77,0.41],[0.82,0.45],[0.83,0.54],[0.77,0.57],[0.72,0.53],
  ]},
  { id: "au", c: [
    [0.73,0.57],[0.80,0.56],[0.86,0.58],[0.88,0.66],[0.85,0.73],
    [0.80,0.75],[0.75,0.72],[0.73,0.66],[0.72,0.61],
  ]},
  { id: "jp", c: [
    [0.83,0.22],[0.86,0.20],[0.88,0.24],[0.87,0.31],[0.84,0.33],[0.82,0.28],
  ]},
  { id: "nz", c: [
    [0.89,0.68],[0.91,0.66],[0.92,0.71],[0.90,0.75],[0.88,0.72],
  ]},
];

// Zonas de ciudad (alta densidad de puntos)
const CITY_ZONES: { id: string; c: [number, number][] }[] = [
  { id: "us-east",  c: [[0.16,0.24],[0.21,0.22],[0.23,0.26],[0.21,0.30],[0.16,0.29]] },
  { id: "us-west",  c: [[0.08,0.28],[0.12,0.26],[0.13,0.31],[0.11,0.33],[0.08,0.31]] },
  { id: "brazil",   c: [[0.20,0.55],[0.24,0.53],[0.26,0.58],[0.23,0.62],[0.19,0.60]] },
  { id: "uk",       c: [[0.40,0.13],[0.43,0.11],[0.45,0.15],[0.44,0.19],[0.40,0.17]] },
  { id: "cent-eu",  c: [[0.45,0.16],[0.50,0.14],[0.52,0.19],[0.49,0.24],[0.45,0.21]] },
  { id: "china",    c: [[0.70,0.22],[0.76,0.20],[0.79,0.26],[0.76,0.31],[0.70,0.29]] },
  { id: "india",    c: [[0.62,0.37],[0.67,0.35],[0.69,0.40],[0.66,0.45],[0.62,0.42]] },
  { id: "japan",    c: [[0.83,0.22],[0.87,0.20],[0.88,0.26],[0.85,0.31],[0.82,0.28]] },
  { id: "nigeria",  c: [[0.44,0.45],[0.48,0.43],[0.50,0.47],[0.48,0.51],[0.43,0.50]] },
  { id: "aus-se",   c: [[0.79,0.63],[0.84,0.61],[0.86,0.67],[0.83,0.71],[0.79,0.68]] },
  { id: "e-africa", c: [[0.52,0.45],[0.56,0.43],[0.58,0.47],[0.56,0.52],[0.51,0.50]] },
];

// Puntos de mega-ciudades
const CITIES: [number, number][] = [
  [0.18,0.25],[0.21,0.24],[0.11,0.29],[0.23,0.56],[0.16,0.52],[0.14,0.48],[0.20,0.48],
  [0.41,0.13],[0.46,0.16],[0.48,0.18],[0.51,0.17],[0.49,0.20],[0.44,0.22],[0.47,0.24],
  [0.45,0.47],[0.47,0.43],[0.48,0.37],[0.51,0.40],[0.44,0.34],
  [0.64,0.27],[0.71,0.22],[0.73,0.26],[0.75,0.29],[0.65,0.40],[0.63,0.44],[0.56,0.34],
  [0.83,0.22],[0.85,0.26],[0.80,0.28],[0.84,0.28],
  [0.81,0.66],[0.84,0.64],[0.81,0.70],
];

// ── Anillos orbitales ──────────────────────────────────────────────────────
const ORBITS = [
  { rx: 388, ry: 78,  dur: 10,  rotZ: -22, w: 1.8, col: "rgba(129,140,248,0.75)", dot: "#818cf8",  glow: "rgba(129,140,248,0.9)" },
  { rx: 415, ry: 102, dur: 17,  rotZ:  38, w: 1.1, col: "rgba(168,85,247,0.60)",  dot: "#a855f7",  glow: "rgba(168,85,247,0.9)"  },
  { rx: 432, ry: 65,  dur: 23,  rotZ: -58, w: 1.5, col: "rgba(99,102,241,0.65)",  dot: "#6366f1",  glow: "rgba(99,102,241,0.9)"  },
  { rx: 368, ry: 135, dur: 28,  rotZ:  75, w: 0.9, col: "rgba(196,181,253,0.42)", dot: "#c4b5fd",  glow: "rgba(196,181,253,0.9)" },
  { rx: 455, ry: 90,  dur: 14,  rotZ:  15, w: 1.2, col: "rgba(139,92,246,0.55)",  dot: "#8b5cf6",  glow: "rgba(139,92,246,0.9)"  },
  { rx: 400, ry: 112, dur: 36,  rotZ: -42, w: 0.7, col: "rgba(167,139,250,0.36)", dot: "#a78bfa",  glow: "rgba(167,139,250,0.9)" },
  { rx: 466, ry: 60,  dur: 20,  rotZ:  62, w: 1.3, col: "rgba(99,102,241,0.42)",  dot: "#818cf8",  glow: "rgba(99,102,241,0.9)"  },
];

// ── Estrellas (130) ────────────────────────────────────────────────────────
const STARS = Array.from({ length: 130 }, (_, i) => ({
  cx: ((i * 97 + 23) % 98) + 1,
  cy: ((i * 67 + 47) % 96) + 2,
  r:  i % 11 === 0 ? 2.0 : i % 7 === 0 ? 1.4 : i % 4 === 0 ? 0.85 : i % 2 === 0 ? 0.55 : 0.30,
  op: 0.10 + (i % 9) * 0.10,
  tw: i % 3 === 0,
  dur: 1.8 + (i % 5) * 0.7,
}));

// ── Nodos de red ───────────────────────────────────────────────────────────
const NODES = [
  {id:0,  x:0.27, y:0.22}, {id:1,  x:0.35, y:0.58}, {id:2,  x:0.49, y:0.18},
  {id:3,  x:0.56, y:0.54}, {id:4,  x:0.68, y:0.24}, {id:5,  x:0.74, y:0.62},
  {id:6,  x:0.48, y:0.42}, {id:7,  x:0.22, y:0.44}, {id:8,  x:0.62, y:0.14},
  {id:9,  x:0.40, y:0.72}, {id:10, x:0.81, y:0.44}, {id:11, x:0.24, y:0.26},
  {id:12, x:0.57, y:0.32}, {id:13, x:0.44, y:0.32}, {id:14, x:0.32, y:0.74},
  {id:15, x:0.69, y:0.72}, {id:16, x:0.14, y:0.36}, {id:17, x:0.85, y:0.30},
  {id:18, x:0.58, y:0.46}, {id:19, x:0.38, y:0.14},
];

// Conexiones — algunas son "autopistas" de datos (índice par → más gruesas)
const CONNS = [
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[0,2],[2,4],[4,5],[3,5],[1,3],
  [7,0],[7,1],[8,4],[9,3],[10,4],[11,0],[11,7],[12,4],[12,3],[13,2],[13,3],
  [14,9],[14,7],[15,5],[15,10],[16,7],[16,11],[17,10],[17,4],[18,3],[18,5],
  [19,2],[19,0],[18,12],[13,19],[16,1],[8,2],[8,12],
];

// Autopistas de datos (mayor brillo y partículas)
const HIGHWAYS = new Set([0, 6, 16, 24, 30]);

function qp(a: {x:number;y:number}, b: {x:number;y:number}) {
  const ax = a.x*D, ay = a.y*D, bx = b.x*D, by = b.y*D;
  const off = Math.sqrt((bx-ax)**2+(by-ay)**2)*0.16;
  return `M${ax},${ay} Q${(ax+bx)/2},${(ay+by)/2-off} ${bx},${by}`;
}

// ── Tarjetas simples (igual que la referencia) ─────────────────────────────
const CARDS = [
  { icon:"👥", t:"Empresas",    s:"Conectadas",        pos:{ top:"6%",   left:"13%"  }, dy:8,  d:0.0 },
  { icon:"🌐", t:"Presencia",   s:"Global",             pos:{ top:"5%",   right:"4%"  }, dy:10, d:0.4 },
  { icon:"🚀", t:"Rendimiento", s:"Optimizado",         pos:{ top:"38%",  left:"3%"   }, dy:7,  d:0.8 },
  { icon:"📈", t:"Crecimiento", s:"Sin Límites",        pos:{ top:"38%",  right:"2%"  }, dy:9,  d:1.2 },
  { icon:"💬", t:"Clientes",    s:"Siempre Conectados", pos:{ bottom:"20%",left:"8%"  }, dy:8,  d:1.6 },
  { icon:"🔒", t:"Seguridad",   s:"Garantizada",        pos:{ bottom:"18%",right:"2%" }, dy:10, d:2.0 },
  { icon:"☁️", t:"Tecnología",  s:"De alto nivel",      pos:{ bottom:"3%", left:"35%" }, dy:7,  d:2.4 },
];

// ─────────────────────────────────────────────────────────────────────────────
export function PlanetHero() {
  const ref = useRef<HTMLDivElement>(null);
  const rx  = useMotionValue(0);
  const ry  = useMotionValue(0);
  const sx  = useSpring(rx, { stiffness: 42, damping: 18 });
  const sy  = useSpring(ry, { stiffness: 42, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-8,  8]);
  const rotX = useTransform(sy, [-1, 1], [ 8, -8]);
  const stX  = useTransform(sx, [-1, 1], [-16, 16]);
  const stY  = useTransform(sy, [-1, 1], [-16, 16]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rc = el.getBoundingClientRect();
    rx.set((e.clientX - rc.left  - rc.width  / 2) / rc.width);
    ry.set((e.clientY - rc.top   - rc.height / 2) / rc.height);
  }, [rx, ry]);

  // Paths de elipses rotadas para animateMotion de las órbitas
  const orbitPaths = useMemo(() => ORBITS.map(o => rotatedEllipsePath(o.rx, o.ry, o.rotZ)), []);

  const TILT = D + 260; // contenedor de la escena 3D

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      className="relative select-none"
      style={{ width: BOX, height: BOX }}
    >

      {/* ── CAPA 1: Estrellas con parallax ───────────────────────────────── */}
      <motion.svg
        className="absolute inset-0 pointer-events-none"
        width="100%" height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ x: stX, y: stY }}
      >
        {STARS.map((s, i) => s.tw ? (
          <motion.circle
            key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
            animate={{ opacity: [s.op * 0.15, s.op, s.op * 0.15] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
          />
        ) : (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op} />
        ))}
      </motion.svg>

      {/* ── CAPA 2: Nebulosas digitales ──────────────────────────────────── */}
      {/* Nebulosa violeta principal */}
      <div className="absolute pointer-events-none" style={{
        top: "-5%", left: "0%", width: "80%", height: "75%",
        background: "radial-gradient(ellipse 75% 68% at 55% 48%, rgba(88,28,135,0.22) 0%, rgba(109,40,217,0.10) 50%, transparent 75%)",
        filter: "blur(45px)",
      }} />
      {/* Nebulosa azul eléctrica */}
      <div className="absolute pointer-events-none" style={{
        top: "15%", right: "-8%", width: "60%", height: "70%",
        background: "radial-gradient(ellipse 70% 60% at 40% 52%, rgba(37,99,235,0.18) 0%, rgba(59,130,246,0.08) 55%, transparent 78%)",
        filter: "blur(55px)",
      }} />
      {/* Nebulosa fucsia — bottom left */}
      <div className="absolute pointer-events-none" style={{
        bottom: "-10%", left: "5%", width: "55%", height: "55%",
        background: "radial-gradient(ellipse 65% 55% at 48% 45%, rgba(126,34,206,0.14) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />
      {/* Nebulosa cian — top right */}
      <div className="absolute pointer-events-none" style={{
        top: "0%", right: "5%", width: "45%", height: "45%",
        background: "radial-gradient(ellipse 60% 50% at 55% 40%, rgba(6,182,212,0.08) 0%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      {/* ── CAPA 3: Estrellas fugaces ────────────────────────────────────── */}
      {[0,1,2,3,4].map(i => (
        <motion.div key={i} className="absolute pointer-events-none" style={{
          top: `${6 + i * 18}%`, left: `${4 + i * 12}%`,
          width: 70 + i * 35, height: 1.5,
          background: "linear-gradient(90deg, transparent, rgba(220,210,255,0.95), rgba(180,170,255,0.5), transparent)",
          borderRadius: 2,
          rotate: "-15deg",
        }}
          animate={{ x: [0, 200], opacity: [0, 1, 0] }}
          transition={{ duration: 0.85, delay: 6 + i * 9, repeat: Infinity, repeatDelay: 18 + i * 7, ease: "easeIn" }}
        />
      ))}

      {/* ── Halo exterior pulsante ────────────────────────────────────────── */}
      <motion.div className="absolute pointer-events-none" style={{
        top: "50%", left: "50%",
        width: D + 300, height: D + 300,
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(109,40,217,0.35) 0%, rgba(99,102,241,0.16) 40%, transparent 66%)",
        filter: "blur(28px)",
        borderRadius: "50%",
      }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Segundo halo más frío */}
      <motion.div className="absolute pointer-events-none" style={{
        top: "50%", left: "50%",
        width: D + 420, height: D + 420,
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 55%)",
        filter: "blur(40px)",
        borderRadius: "50%",
      }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── CONTENEDOR 3D ────────────────────────────────────────────────── */}
      <motion.div className="absolute" style={{
        top: "50%", left: "50%",
        width: TILT, height: TILT,
        x: "-50%", y: "-50%",
        rotateY: rotY, rotateX: rotX,
        transformStyle: "preserve-3d",
      }}>

        {/* ── ANILLOS ORBITALES ─────────────────────────────────────────── */}
        <div className="absolute pointer-events-none"
          style={{ top: "50%", left: "50%", width: 0, height: 0, transform: "translate(-50%,-50%)" }}>
          {ORBITS.map((o, i) => (
            <motion.div key={i} className="absolute" style={{
              width:  o.rx * 2, height: o.ry * 2,
              top:   -o.ry,    left:   -o.rx,
              borderRadius: "50%",
              border: `${o.w}px solid ${o.col}`,
              boxShadow: `0 0 10px ${o.col}, 0 0 22px ${o.col}`,
            }}
              animate={{ rotate: [`${o.rotZ}deg`, `${o.rotZ + 360}deg`] }}
              transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Puntos orbitales animados con animateMotion */}
        <svg
          className="absolute pointer-events-none"
          style={{ top: "50%", left: "50%", overflow: "visible", transform: "translate(-50%,-50%)" }}
          width="0" height="0"
        >
          {ORBITS.map((o, i) => (
            <g key={i}>
              {/* Dot con glow */}
              <circle r={i % 2 === 0 ? 5 : 4}
                fill={o.dot}
                style={{ filter: `drop-shadow(0 0 8px ${o.glow}) drop-shadow(0 0 16px ${o.glow})` }}
              >
                <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={orbitPaths[i]} />
              </circle>
              {/* Halo del dot */}
              <circle r={i % 2 === 0 ? 10 : 8}
                fill="none" stroke={o.dot} strokeWidth="1" opacity="0.4"
              >
                <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={orbitPaths[i]} />
              </circle>
            </g>
          ))}
        </svg>

        {/* ── HALOS DE ATMÓSFERA ────────────────────────────────────────── */}
        {/* Halo principal pulsante */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{
          top: "50%", left: "50%",
          width: D + 48, height: D + 48,
          transform: "translate(-50%,-50%)",
          border: "1.5px solid rgba(129,140,248,0.30)",
        }}
          animate={{
            boxShadow: [
              "0 0 44px 20px rgba(109,40,217,0.42), 0 0 100px 40px rgba(99,102,241,0.22), inset 0 0 60px 14px rgba(109,40,217,0.16)",
              "0 0 72px 32px rgba(109,40,217,0.64), 0 0 140px 60px rgba(99,102,241,0.34), inset 0 0 88px 24px rgba(109,40,217,0.26)",
              "0 0 44px 20px rgba(109,40,217,0.42), 0 0 100px 40px rgba(99,102,241,0.22), inset 0 0 60px 14px rgba(109,40,217,0.16)",
            ],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Segundo halo azul */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{
          top: "50%", left: "50%",
          width: D + 80, height: D + 80,
          transform: "translate(-50%,-50%)",
          border: "1px solid rgba(99,102,241,0.16)",
        }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Tercer halo tenue */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{
          top: "50%", left: "50%",
          width: D + 130, height: D + 130,
          transform: "translate(-50%,-50%)",
          border: "0.5px solid rgba(139,92,246,0.10)",
        }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* ── ESFERA DEL PLANETA ────────────────────────────────────────── */}
        <div className="absolute" style={{
          top: "50%", left: "50%",
          width: D, height: D,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          overflow: "hidden",
          background: "radial-gradient(circle at 33% 30%, #1e1570 0%, #100c42 22%, #080520 52%, #030110 85%)",
          boxShadow: [
            "inset -70px -45px 120px rgba(0,0,0,0.97)",
            "inset 24px 20px 70px rgba(99,102,241,0.28)",
            "inset 0 0 40px rgba(109,40,217,0.12)",
            "0 0 110px rgba(99,102,241,0.24)",
            "0 0 220px rgba(109,40,217,0.16)",
          ].join(","),
        }}>

          {/* ── TEXTURA: NASA Earth at Night con filtro morado/neón ── */}
          {/* La imagen equirectangular (2:1) scrollea horizontalmente → rotación suave */}
          <motion.div
            style={{
              position: "absolute", top: 0, left: 0,
              width: D * 2, height: D,
              backgroundImage: `url(/earth.jpg)`,
              backgroundSize: `${D * 2}px ${D}px`,
              backgroundRepeat: "no-repeat",
              // Filtro CSS para lograr el tono morado/neón de la referencia
              filter: "hue-rotate(248deg) saturate(3.2) brightness(1.25) contrast(1.15)",
            }}
            animate={{ x: [0, -D] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          {/* Segunda copia para loop seamless */}
          <motion.div
            style={{
              position: "absolute", top: 0, left: D,
              width: D * 2, height: D,
              backgroundImage: `url(/earth.jpg)`,
              backgroundSize: `${D * 2}px ${D}px`,
              backgroundRepeat: "no-repeat",
              filter: "hue-rotate(248deg) saturate(3.2) brightness(1.25) contrast(1.15)",
            }}
            animate={{ x: [0, -D] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Escáner de datos — línea horizontal que barre el planeta */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: 0, right: 0, height: "22%",
              background: "linear-gradient(180deg, transparent 0%, rgba(129,140,248,0.055) 50%, transparent 100%)",
            }}
            animate={{ top: ["-22%", "105%"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          />

          {/* ── SOMBRA ESFERA: lado noche muy oscuro (derecha-abajo) ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 32% 30%, transparent 0%, transparent 20%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.58) 68%, rgba(0,0,0,0.90) 85%, rgba(0,0,0,0.97) 100%)",
          }} />
          {/* ── LUZ SOLAR: azul-blanco desde arriba-derecha (igual que la referencia) ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 48% 55% at 72% 18%, rgba(180,210,255,0.38) 0%, rgba(130,160,255,0.15) 38%, transparent 65%)",
          }} />
          {/* ── HALO VIOLETA costado izquierdo (ilumina las Américas) ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 50% 65% at 26% 34%, rgba(140,120,255,0.22) 0%, rgba(100,80,220,0.08) 45%, transparent 70%)",
          }} />
          {/* ── FRANJA ECUATORIAL brillante ── */}
          <div className="absolute pointer-events-none" style={{
            top: "35%", left: 0, right: 0, height: "28%",
            background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(120,100,255,0.08) 0%, transparent 70%)",
          }} />
          {/* ── DESTELLO LENTE superior-derecho ── */}
          <div className="absolute pointer-events-none" style={{
            top: "-6%", right: "-6%", width: "48%", height: "48%",
            background: "radial-gradient(circle at 65% 25%, rgba(200,220,255,0.36) 0%, rgba(160,185,255,0.14) 35%, transparent 65%)",
          }} />
          {/* ── RIM LIGHT azul-morado en todo el borde ── */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            boxShadow: [
              "inset 0 0 80px 28px rgba(60,40,180,0.30)",
              "inset 0 0 35px 10px rgba(100,60,220,0.18)",
              "inset 60px 40px 100px rgba(0,0,0,0.55)",
            ].join(","),
          }} />
        </div>

        {/* ── RED DE NODOS ──────────────────────────────────────────────── */}
        <svg
          className="absolute pointer-events-none"
          width={D} height={D}
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <defs>
            <filter id="ng" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="lg" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="hwy" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Líneas de conexión */}
          {CONNS.map(([ai, bi], i) => {
            const isHwy = HIGHWAYS.has(i);
            return (
              <path key={`c${i}`}
                d={qp(NODES[ai], NODES[bi])}
                fill="none"
                stroke={isHwy
                  ? "rgba(220,205,255,0.75)"
                  : i % 3 === 0 ? "rgba(210,195,255,0.60)"
                  : i % 3 === 1 ? "rgba(180,160,255,0.44)"
                  : "rgba(150,130,240,0.36)"}
                strokeWidth={isHwy ? 1.4 : 0.8}
                filter={isHwy ? "url(#hwy)" : "url(#lg)"}
              />
            );
          })}

          {/* Partículas de datos moviéndose */}
          {CONNS.slice(0, 18).map(([ai, bi], i) => {
            const path = qp(NODES[ai], NODES[bi]);
            const isHwy = HIGHWAYS.has(i);
            return (
              <g key={`p${i}`}>
                <circle r={isHwy ? 3.8 : 2.8} fill={isHwy ? "rgba(240,230,255,0.98)" : "rgba(230,215,255,0.92)"}>
                  <animateMotion dur={`${1.8 + (i % 6) * 0.55}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} path={path} />
                </circle>
                <circle r={isHwy ? 1.8 : 1.2} fill="white">
                  <animateMotion dur={`${1.8 + (i % 6) * 0.55}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} path={path} />
                </circle>
                {isHwy && (
                  <circle r={5} fill="rgba(200,180,255,0.25)">
                    <animateMotion dur={`${1.8 + (i % 6) * 0.55}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} path={path} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodos de red */}
          {NODES.map(n => {
            const x = n.x * D, y = n.y * D;
            return (
              <g key={`n${n.id}`} filter="url(#ng)">
                <motion.circle cx={x} cy={y} r={8} fill="none"
                  stroke="rgba(210,195,255,0.60)" strokeWidth={1.2}
                  animate={{ r: [8, 18, 8], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4 + (n.id % 3) * 0.6, repeat: Infinity, delay: n.id * 0.22 }}
                />
                <motion.circle cx={x} cy={y} r={5} fill="rgba(210,195,255,0.90)"
                  animate={{ r: [5, 7, 5] }}
                  transition={{ duration: 1.7 + (n.id % 2) * 0.5, repeat: Infinity, delay: n.id * 0.16 }}
                />
                <circle cx={x} cy={y} r={2.4} fill="white" opacity={0.98} />
              </g>
            );
          })}
        </svg>

        {/* ── TARJETAS SIMPLES (igual que la referencia) ───────────────── */}
        {CARDS.map((c, i) => (
          <motion.div key={i}
            className="absolute flex items-center gap-3 px-3.5 py-2.5 rounded-2xl"
            style={{
              ...c.pos,
              background: "rgba(6,4,22,0.88)",
              border: "1px solid rgba(129,140,248,0.35)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.65), 0 0 18px rgba(99,102,241,0.16)",
              backdropFilter: "blur(18px)",
              minWidth: 148,
            }}
            initial={{ opacity: 0, scale: 0.80, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: [0, c.dy, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.9 + c.d },
              scale:   { duration: 0.5, delay: 0.9 + c.d },
              y: { duration: 3.2 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: c.d * 0.4 },
            }}
          >
            <span style={{ fontSize: 17 }}>{c.icon}</span>
            <div>
              <p style={{ fontFamily:"Inter,sans-serif", fontWeight:700, fontSize:12, color:"#fff", lineHeight:1.25 }}>
                {c.t}
              </p>
              <p style={{ fontFamily:"Inter,sans-serif", fontWeight:400, fontSize:10, color:"rgba(200,185,255,0.75)", lineHeight:1.25 }}>
                {c.s}
              </p>
            </div>
            <motion.div style={{
              width:6, height:6, borderRadius:"50%", background:"#a78bfa",
              marginLeft:"auto", boxShadow:"0 0 10px rgba(167,139,250,1)",
            }}
              animate={{ opacity:[1,0.3,1], scale:[1,1.5,1] }}
              transition={{ duration:1.8+i*0.2, repeat:Infinity, delay:i*0.3 }}
            />
          </motion.div>
        ))}

        {/* ── BADGE "LIVE" ──────────────────────────────────────────────── */}
        <motion.div
          className="absolute flex items-center gap-2 px-3.5 py-2 rounded-full"
          style={{
            bottom: "9%", right: "9%",
            background: "rgba(6,4,22,0.92)",
            border: "1px solid rgba(34,197,94,0.45)",
            boxShadow: "0 4px 22px rgba(0,0,0,0.55), 0 0 16px rgba(34,197,94,0.12)",
            backdropFilter: "blur(16px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.5, delay: 2.8 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        >
          <motion.div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.6, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: "#4ade80" }}>
            Conexiones activas
          </span>
        </motion.div>

      </motion.div>
    </div>
  );
}
