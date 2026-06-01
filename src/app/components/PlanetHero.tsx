import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const R = 310;
const D = R * 2;   // 620px diameter planet
const SW = D * 2;  // 1240px scrolling texture width

// ── Continent dots [xRatio, yRatio, radius, opacity] ──────────────────────
// Coordinates in 0–1 relative to D×D
const DOTS: [number,number,number,number][] = [
  // North America — dense bright
  [0.10,0.12,2.8,1.0],[0.12,0.14,3.2,1.0],[0.15,0.16,3.0,1.0],[0.13,0.20,2.6,0.98],
  [0.17,0.22,3.0,1.0],[0.19,0.18,2.8,0.98],[0.21,0.15,2.6,0.96],[0.09,0.19,2.2,0.92],
  [0.16,0.26,2.8,0.98],[0.12,0.28,2.6,0.96],[0.18,0.30,2.4,0.94],[0.20,0.26,2.8,0.97],
  [0.14,0.24,3.0,0.99],[0.11,0.22,2.4,0.93],[0.09,0.15,2.0,0.88],[0.23,0.21,2.6,0.95],
  [0.07,0.24,1.8,0.84],[0.23,0.28,2.2,0.90],[0.10,0.31,2.0,0.88],[0.20,0.33,2.4,0.92],
  [0.15,0.10,2.0,0.88],[0.18,0.08,1.8,0.84],[0.13,0.34,2.0,0.88],[0.22,0.35,1.8,0.84],
  [0.08,0.28,1.6,0.80],[0.24,0.24,2.0,0.86],[0.11,0.36,1.8,0.82],
  // Central America
  [0.19,0.39,1.8,0.82],[0.20,0.42,1.6,0.78],[0.18,0.44,1.8,0.80],
  // South America
  [0.18,0.50,2.6,0.96],[0.20,0.53,3.0,1.0],[0.17,0.56,2.6,0.95],[0.21,0.59,2.8,0.98],
  [0.19,0.63,2.4,0.93],[0.22,0.58,2.6,0.96],[0.16,0.54,2.4,0.93],[0.23,0.54,2.2,0.90],
  [0.18,0.68,2.2,0.90],[0.20,0.66,1.8,0.84],[0.21,0.71,1.6,0.78],[0.17,0.62,2.0,0.86],
  // Greenland
  [0.16,0.06,2.2,0.88],[0.18,0.07,2.0,0.84],[0.15,0.09,1.8,0.80],
  // Iceland
  [0.35,0.10,1.4,0.72],[0.36,0.11,1.2,0.68],
  // Europe
  [0.43,0.14,2.4,0.94],[0.45,0.16,2.8,0.98],[0.48,0.14,2.4,0.93],[0.46,0.20,2.6,0.96],
  [0.41,0.19,2.4,0.93],[0.50,0.17,2.2,0.90],[0.42,0.23,2.2,0.90],[0.47,0.12,2.0,0.86],
  [0.49,0.21,2.0,0.86],[0.44,0.25,2.0,0.85],[0.52,0.20,1.8,0.82],[0.40,0.16,2.0,0.86],
  [0.53,0.16,1.6,0.78],[0.44,0.27,1.8,0.82],
  // Africa
  [0.44,0.36,2.6,0.96],[0.46,0.40,3.0,1.0],[0.48,0.44,2.8,0.98],[0.45,0.48,2.6,0.95],
  [0.49,0.51,2.8,0.97],[0.43,0.53,2.4,0.93],[0.50,0.56,2.6,0.96],[0.46,0.60,2.4,0.93],
  [0.42,0.42,2.4,0.93],[0.51,0.44,2.2,0.90],[0.44,0.64,2.2,0.90],[0.49,0.64,2.0,0.86],
  [0.47,0.68,1.8,0.82],[0.45,0.32,2.2,0.90],[0.52,0.48,2.0,0.86],[0.43,0.58,2.0,0.85],
  // Middle East
  [0.53,0.28,2.2,0.90],[0.55,0.31,1.8,0.82],[0.57,0.29,2.4,0.93],[0.54,0.34,1.6,0.78],
  [0.56,0.26,2.0,0.86],
  // Asia
  [0.56,0.12,2.6,0.96],[0.59,0.14,3.2,1.0],[0.62,0.16,3.0,1.0],[0.66,0.13,3.2,1.0],
  [0.69,0.16,2.8,0.98],[0.72,0.14,2.6,0.96],[0.75,0.18,2.8,0.98],[0.78,0.16,2.4,0.94],
  [0.58,0.20,2.6,0.95],[0.62,0.24,3.0,1.0],[0.67,0.22,2.8,0.97],[0.71,0.20,2.4,0.93],
  [0.64,0.18,2.6,0.96],[0.74,0.23,2.4,0.93],[0.77,0.20,2.2,0.90],[0.60,0.28,2.6,0.95],
  [0.69,0.28,2.4,0.93],[0.73,0.26,2.6,0.96],[0.54,0.18,2.4,0.93],[0.79,0.24,2.2,0.90],
  [0.61,0.12,2.8,0.97],[0.65,0.28,2.2,0.88],[0.56,0.24,2.4,0.92],[0.80,0.20,2.0,0.86],
  [0.63,0.32,2.0,0.86],[0.68,0.32,2.2,0.88],[0.70,0.34,1.8,0.82],[0.57,0.30,2.0,0.85],
  [0.82,0.22,1.8,0.82],[0.76,0.28,2.0,0.84],
  // SE Asia
  [0.70,0.42,2.4,0.93],[0.72,0.46,2.6,0.96],[0.74,0.44,2.2,0.90],[0.76,0.48,2.4,0.93],
  [0.73,0.50,2.0,0.86],[0.71,0.52,1.8,0.82],[0.75,0.54,1.6,0.78],
  // Australia
  [0.73,0.58,2.6,0.96],[0.76,0.61,3.0,1.0],[0.79,0.59,2.6,0.95],[0.77,0.64,2.8,0.98],
  [0.81,0.62,2.4,0.93],[0.79,0.66,2.2,0.90],[0.75,0.65,2.0,0.86],[0.82,0.66,1.8,0.82],
  // Japan
  [0.78,0.24,2.0,0.88],[0.79,0.27,1.8,0.82],[0.80,0.25,1.6,0.78],
  // UK/Islands
  [0.40,0.14,1.4,0.74],[0.41,0.12,1.2,0.70],
  // Madagascar
  [0.56,0.60,1.6,0.78],[0.57,0.62,1.4,0.72],
  // Ocean micro-dots
  [0.30,0.38,0.8,0.22],[0.35,0.58,0.7,0.18],[0.54,0.74,0.8,0.20],[0.07,0.48,0.6,0.16],
  [0.25,0.74,0.7,0.18],[0.87,0.48,0.6,0.15],[0.40,0.09,0.7,0.20],[0.65,0.77,0.6,0.18],
  [0.90,0.33,0.7,0.16],[0.33,0.79,0.6,0.15],[0.85,0.72,0.6,0.14],[0.03,0.63,0.5,0.13],
  [0.50,0.08,0.6,0.18],[0.25,0.12,0.5,0.15],[0.88,0.12,0.6,0.14],[0.29,0.52,0.5,0.12],
];

// ── Network nodes ──────────────────────────────────────────────────────────
const NODES = [
  {id:0,  x:0.30, y:0.24},{id:1,  x:0.38, y:0.56},{id:2,  x:0.50, y:0.20},
  {id:3,  x:0.56, y:0.52},{id:4,  x:0.68, y:0.25},{id:5,  x:0.73, y:0.60},
  {id:6,  x:0.49, y:0.42},{id:7,  x:0.24, y:0.42},{id:8,  x:0.63, y:0.15},
  {id:9,  x:0.41, y:0.70},{id:10, x:0.80, y:0.42},{id:11, x:0.27, y:0.26},
  {id:12, x:0.58, y:0.33},{id:13, x:0.45, y:0.31},{id:14, x:0.74, y:0.42},
  {id:15, x:0.35, y:0.35},
];
const CONNS = [
  [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[0,2],[2,4],[4,5],[3,5],[1,3],
  [7,0],[7,1],[8,4],[9,3],[10,4],[11,0],[11,7],[12,4],[12,3],[13,2],
  [13,3],[14,10],[14,5],[15,0],[15,1],[15,7],
];

// ── Orbit rings ────────────────────────────────────────────────────────────
const ORBITS = [
  {rx:375,ry:78, dur:12, rotZ:-22, w:1.4, glow:"rgba(129,140,248,0.65)"},
  {rx:400,ry:100,dur:19, rotZ: 32, w:1.0, glow:"rgba(168,85,247,0.50)"},
  {rx:420,ry:62, dur:24, rotZ:-55, w:1.2, glow:"rgba(99,102,241,0.55)"},
  {rx:355,ry:125,dur:31, rotZ: 70, w:0.8, glow:"rgba(196,181,253,0.38)"},
  {rx:440,ry:88, dur:16, rotZ: 14, w:0.9, glow:"rgba(139,92,246,0.45)"},
];

// ── Cards (match reference image) ─────────────────────────────────────────
const CARDS = [
  {icon:"👥", t:"Empresas",    s:"Conectadas",        pos:{top:"6%",   left:"13%"}, dy:8,  delay:0.0},
  {icon:"🌐", t:"Presencia",   s:"Global",             pos:{top:"5%",   right:"5%"}, dy:10, delay:0.4},
  {icon:"🚀", t:"Rendimiento", s:"Optimizado",         pos:{top:"38%",  left:"5%"},  dy:7,  delay:0.8},
  {icon:"📈", t:"Crecimiento", s:"Sin Límites",        pos:{top:"38%",  right:"3%"}, dy:9,  delay:1.2},
  {icon:"💬", t:"Clientes",    s:"Siempre Conectados", pos:{bottom:"20%",left:"10%"},dy:8,  delay:1.6},
  {icon:"🔒", t:"Seguridad",   s:"Garantizada",        pos:{bottom:"18%",right:"2%"},dy:10, delay:2.0},
  {icon:"☁️", t:"Tecnología",  s:"En la Nube",         pos:{bottom:"3%",left:"36%"}, dy:7,  delay:2.4},
];

// ── Stars ──────────────────────────────────────────────────────────────────
const STARS = Array.from({length:55},(_,i)=>({
  cx:((i*89+19)%97)+1, cy:((i*61+41)%95)+2,
  r: i%7===0?1.6:i%3===0?1.0:0.55,
  op:0.18+(i%6)*0.10, tw:i%4===0,
}));

function nxy(n:{x:number;y:number}){return{x:n.x*D, y:n.y*D};}
function qpath(a:{x:number;y:number},b:{x:number;y:number}){
  const ax=a.x*D,ay=a.y*D,bx=b.x*D,by=b.y*D;
  const mx=(ax+bx)/2, my=(ay+by)/2-36;
  return `M${ax},${ay} Q${mx},${my} ${bx},${by}`;
}

// Latitude lines in texture (y positions 0–1)
const LAT_LINES = [0.10,0.20,0.30,0.40,0.50,0.60,0.70,0.80,0.90];
// Longitude lines in texture (x positions 0–1, for one half)
const LON_LINES = [0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,
                   0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95];

export function PlanetHero(){
  const ref=useRef<HTMLDivElement>(null);
  const rx=useMotionValue(0), ry=useMotionValue(0);
  const sx=useSpring(rx,{stiffness:50,damping:20});
  const sy=useSpring(ry,{stiffness:50,damping:20});
  const rotY=useTransform(sx,[-1,1],[-6,6]);
  const rotX=useTransform(sy,[-1,1],[6,-6]);
  const stX =useTransform(sx,[-1,1],[-10,10]);
  const stY =useTransform(sy,[-1,1],[-10,10]);

  const onMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    const el=ref.current; if(!el) return;
    const rc=el.getBoundingClientRect();
    rx.set((e.clientX-rc.left-rc.width/2)/rc.width);
    ry.set((e.clientY-rc.top-rc.height/2)/rc.height);
  },[rx,ry]);

  const BOX = D+240; // component bounding box

  return(
    <div ref={ref} onMouseMove={onMove} onMouseLeave={()=>{rx.set(0);ry.set(0);}}
      className="relative select-none" style={{width:BOX, height:BOX}}>

      {/* ── Stars ── */}
      <motion.svg className="absolute inset-0 pointer-events-none"
        width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{x:stX,y:stY}}>
        {STARS.map((s,i)=>s.tw?(
          <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
            animate={{opacity:[s.op*0.2,s.op,s.op*0.2]}}
            transition={{duration:2.2+(i%3)*0.8,repeat:Infinity,ease:"easeInOut",delay:i*0.22}}/>
        ):(
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op}/>
        ))}
      </motion.svg>

      {/* ── Nebula ── */}
      <div className="absolute pointer-events-none" style={{
        top:"0%",left:"5%",width:"90%",height:"90%",
        background:"radial-gradient(ellipse 80% 65% at 58% 46%, rgba(76,29,149,0.22) 0%, rgba(109,40,217,0.08) 55%, transparent 75%)",
        filter:"blur(35px)",
      }}/>

      {/* ── Shooting stars ── */}
      {[0,1,2].map(i=>(
        <motion.div key={i} className="absolute pointer-events-none" style={{
          top:`${10+i*22}%`, left:`${6+i*14}%`,
          width:80+i*30, height:2,
          background:"linear-gradient(90deg,transparent,rgba(220,210,255,0.95),transparent)",
          borderRadius:2,
        }} animate={{x:[0,160],opacity:[0,1,0]}}
          transition={{duration:1.0,delay:5+i*9,repeat:Infinity,repeatDelay:16+i*8,ease:"easeIn"}}/>
      ))}

      {/* ── Main mega-glow ── */}
      <motion.div className="absolute pointer-events-none" style={{
        top:"50%",left:"50%",
        width:D+240, height:D+240,
        transform:"translate(-50%,-50%)",
        background:"radial-gradient(circle,rgba(109,40,217,0.35) 0%,rgba(99,102,241,0.18) 40%,transparent 68%)",
        filter:"blur(24px)", borderRadius:"50%",
      }}
        animate={{opacity:[0.8,1,0.8],scale:[0.97,1.03,0.97]}}
        transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}/>

      {/* ── 3D tilt wrapper ── */}
      <motion.div className="absolute" style={{
        top:"50%",left:"50%",
        width:D+200, height:D+200,
        x:"-50%",y:"-50%",
        rotateY:rotY, rotateX:rotX,
        transformStyle:"preserve-3d",
      }}>

        {/* ── Orbit rings ── */}
        <div className="absolute pointer-events-none"
          style={{top:"50%",left:"50%",width:0,height:0,transform:"translate(-50%,-50%)"}}>
          {ORBITS.map((o,i)=>(
            <motion.div key={i} className="absolute" style={{
              width:o.rx*2, height:o.ry*2,
              top:-o.ry, left:-o.rx,
              borderRadius:"50%",
              border:`${o.w}px solid ${o.glow}`,
              boxShadow:`0 0 10px ${o.glow},0 0 20px ${o.glow}`,
            }}
              animate={{rotate:[`${o.rotZ}deg`,`${o.rotZ+360}deg`]}}
              transition={{duration:o.dur,repeat:Infinity,ease:"linear"}}/>
          ))}
        </div>

        {/* ── Atmosphere outer ring ── */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{
          top:"50%",left:"50%",
          width:D+40, height:D+40,
          transform:"translate(-50%,-50%)",
          border:"2px solid rgba(129,140,248,0.30)",
          boxShadow:[
            "0 0 40px 16px rgba(109,40,217,0.35)",
            "0 0 80px 30px rgba(99,102,241,0.18)",
            "inset 0 0 40px 10px rgba(109,40,217,0.12)",
          ].join(","),
        }}
          animate={{boxShadow:[
            "0 0 40px 16px rgba(109,40,217,0.35),0 0 80px 30px rgba(99,102,241,0.18),inset 0 0 40px 10px rgba(109,40,217,0.12)",
            "0 0 60px 24px rgba(109,40,217,0.50),0 0 100px 40px rgba(99,102,241,0.25),inset 0 0 60px 15px rgba(109,40,217,0.18)",
            "0 0 40px 16px rgba(109,40,217,0.35),0 0 80px 30px rgba(99,102,241,0.18),inset 0 0 40px 10px rgba(109,40,217,0.12)",
          ]}}
          transition={{duration:3.5,repeat:Infinity,ease:"easeInOut"}}/>

        {/* ── Planet sphere ── */}
        <div className="absolute" style={{
          top:"50%",left:"50%",
          width:D, height:D,
          transform:"translate(-50%,-50%)",
          borderRadius:"50%",
          overflow:"hidden",
          background:"radial-gradient(circle at 34% 32%,#201970 0%,#100c42 25%,#070520 55%,#030110 85%)",
          boxShadow:[
            "inset -60px -35px 100px rgba(0,0,0,0.95)",
            "inset 20px 16px 60px rgba(99,102,241,0.25)",
            "0 0 100px rgba(99,102,241,0.22)",
            "0 0 180px rgba(109,40,217,0.14)",
          ].join(","),
        }}>

          {/* Rotating layer: grid + continent dots */}
          <motion.svg width={SW} height={D}
            style={{position:"absolute",top:0,left:0}}
            animate={{x:[0,-D]}}
            transition={{duration:56,repeat:Infinity,ease:"linear"}}>
            <defs>
              <filter id="cg" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="gg" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Lat/lon grid — first half */}
            <g filter="url(#gg)" opacity={0.45}>
              {LAT_LINES.map(y=>(
                <line key={`lat1-${y}`} x1={0} y1={y*D} x2={D} y2={y*D}
                  stroke="rgba(129,140,248,0.22)" strokeWidth={0.5}/>
              ))}
              {LON_LINES.map(x=>(
                <line key={`lon1-${x}`} x1={x*D} y1={0} x2={x*D} y2={D}
                  stroke="rgba(129,140,248,0.18)" strokeWidth={0.5}/>
              ))}
            </g>
            {/* Lat/lon grid — second half */}
            <g filter="url(#gg)" opacity={0.45}>
              {LAT_LINES.map(y=>(
                <line key={`lat2-${y}`} x1={D} y1={y*D} x2={SW} y2={y*D}
                  stroke="rgba(129,140,248,0.22)" strokeWidth={0.5}/>
              ))}
              {LON_LINES.map(x=>(
                <line key={`lon2-${x}`} x1={x*D+D} y1={0} x2={x*D+D} y2={D}
                  stroke="rgba(129,140,248,0.18)" strokeWidth={0.5}/>
              ))}
            </g>

            {/* Continent dots — first half */}
            <g filter="url(#cg)">
              {DOTS.map(([xr,yr,r,op],i)=>(
                <circle key={`a${i}`} cx={xr*D} cy={yr*D} r={r}
                  fill={op>0.95?"rgba(240,235,255,1)":op>0.85?"rgba(220,210,255,0.97)":"rgba(196,181,253,0.90)"}
                  opacity={op}/>
              ))}
            </g>
            {/* Continent dots — second half */}
            <g filter="url(#cg)">
              {DOTS.map(([xr,yr,r,op],i)=>(
                <circle key={`b${i}`} cx={xr*D+D} cy={yr*D} r={r}
                  fill={op>0.95?"rgba(240,235,255,1)":op>0.85?"rgba(220,210,255,0.97)":"rgba(196,181,253,0.90)"}
                  opacity={op}/>
              ))}
            </g>
          </motion.svg>

          {/* Sphere depth shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:"radial-gradient(circle at 34% 32%,transparent 0%,transparent 28%,rgba(0,0,0,0.28) 55%,rgba(0,0,0,0.70) 78%,rgba(0,0,0,0.92) 100%)",
          }}/>
          {/* Left-side sunlight highlight */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:"radial-gradient(ellipse 55% 70% at 28% 30%,rgba(160,150,255,0.28) 0%,rgba(100,100,220,0.10) 45%,transparent 70%)",
          }}/>
          {/* Blue rim atmosphere (matches reference) */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            boxShadow:"inset 0 0 60px 18px rgba(80,50,200,0.22),inset 0 0 25px 6px rgba(130,80,255,0.15)",
          }}/>
        </div>

        {/* ── Network SVG ── */}
        <svg className="absolute pointer-events-none" width={D} height={D}
          style={{top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
          <defs>
            <filter id="ng" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="lg" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Lines */}
          {CONNS.map(([ai,bi],i)=>{
            const col=i%3===0?"rgba(210,195,255,0.65)":i%3===1?"rgba(180,160,255,0.48)":"rgba(150,130,240,0.40)";
            return<path key={`c${i}`} d={qpath(NODES[ai],NODES[bi])}
              fill="none" stroke={col} strokeWidth={0.9} filter="url(#lg)"/>;
          })}

          {/* Particles */}
          {CONNS.slice(0,14).map(([ai,bi],i)=>{
            const path=qpath(NODES[ai],NODES[bi]);
            const dur=2.0+(i%5)*0.65;
            const delay=i*0.50;
            return(
              <g key={`p${i}`}>
                <circle r={3.0} fill="rgba(230,220,255,0.95)">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} path={path}/>
                </circle>
                <circle r={1.4} fill="white">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`} path={path}/>
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map(n=>{
            const {x,y}=nxy(n);
            return(
              <g key={`n${n.id}`} filter="url(#ng)">
                <motion.circle cx={x} cy={y} r={7}
                  fill="none" stroke="rgba(210,195,255,0.60)" strokeWidth={1.2}
                  animate={{r:[7,16,7],opacity:[0.7,0,0.7]}}
                  transition={{duration:2.2+(n.id%3)*0.6,repeat:Infinity,delay:n.id*0.25}}/>
                <motion.circle cx={x} cy={y} r={4.5}
                  fill="rgba(210,195,255,0.92)"
                  animate={{r:[4.5,6,4.5]}}
                  transition={{duration:1.6+(n.id%2)*0.5,repeat:Infinity,delay:n.id*0.18}}/>
                <circle cx={x} cy={y} r={2.2} fill="white" opacity={0.98}/>
              </g>
            );
          })}
        </svg>

        {/* ── Floating cards ── */}
        {CARDS.map((c,i)=>(
          <motion.div key={i}
            className="absolute flex items-center gap-3 px-3.5 py-2.5 rounded-2xl"
            style={{
              ...c.pos,
              background:"rgba(6,4,22,0.88)",
              border:"1px solid rgba(129,140,248,0.38)",
              boxShadow:"0 8px 32px rgba(0,0,0,0.60),0 0 20px rgba(99,102,241,0.18)",
              backdropFilter:"blur(16px)",
              minWidth:148,
            }}
            initial={{opacity:0,scale:0.78,y:10}}
            animate={{opacity:1,scale:1,y:[0,c.dy,0]}}
            transition={{
              opacity:{duration:0.5,delay:0.8+c.delay},
              scale:{duration:0.5,delay:0.8+c.delay},
              y:{duration:3.0+i*0.35,repeat:Infinity,ease:"easeInOut",delay:c.delay*0.4},
            }}>
            <span style={{fontSize:17}}>{c.icon}</span>
            <div>
              <p style={{fontFamily:"Inter,sans-serif",fontWeight:700,fontSize:12,color:"#fff",lineHeight:1.25}}>
                {c.t}
              </p>
              <p style={{fontFamily:"Inter,sans-serif",fontWeight:400,fontSize:10,color:"rgba(200,185,255,0.75)",lineHeight:1.25}}>
                {c.s}
              </p>
            </div>
            <motion.div style={{
              width:6,height:6,borderRadius:"50%",background:"#a78bfa",marginLeft:"auto",
              boxShadow:"0 0 10px rgba(167,139,250,1)",
            }}
              animate={{opacity:[1,0.4,1],scale:[1,1.4,1]}}
              transition={{duration:1.8+i*0.2,repeat:Infinity,delay:i*0.3}}/>
          </motion.div>
        ))}

        {/* ── Live badge ── */}
        <motion.div className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            bottom:"8%",right:"10%",
            background:"rgba(6,4,22,0.88)",
            border:"1px solid rgba(34,197,94,0.45)",
            boxShadow:"0 4px 20px rgba(0,0,0,0.50)",
          }}
          initial={{opacity:0}}
          animate={{opacity:1,y:[0,-7,0]}}
          transition={{opacity:{duration:0.5,delay:2.5},y:{duration:3.5,repeat:Infinity,ease:"easeInOut"}}}>
          <motion.div className="w-2 h-2 rounded-full" style={{background:"#22c55e"}}
            animate={{opacity:[1,0.2,1],scale:[1,1.5,1]}}
            transition={{duration:1.1,repeat:Infinity}}/>
          <span style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:10,color:"#4ade80"}}>
            Conexiones activas
          </span>
        </motion.div>

      </motion.div>
    </div>
  );
}
