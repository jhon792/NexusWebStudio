import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const R = 310;
const D = R * 2; // 620 px

// ── Continent polygons: [x,y] normalized 0-1 in D×D space ─────────────────
// We render both halves for seamless scroll loop
function pts(D: number, coords: [number,number][], shift=0) {
  return coords.map(([x,y]) => `${x*D+shift},${y*D}`).join(" ");
}

const CONTINENTS: { id:string; c:[number,number][] }[] = [
  { id:"na", c:[
    [0.08,0.09],[0.13,0.07],[0.21,0.07],[0.26,0.10],[0.28,0.16],
    [0.27,0.22],[0.25,0.30],[0.22,0.37],[0.19,0.43],[0.17,0.46],
    [0.15,0.43],[0.18,0.37],[0.13,0.34],[0.09,0.30],[0.07,0.24],
    [0.06,0.16],[0.07,0.11],
  ]},
  { id:"sa", c:[
    [0.16,0.48],[0.22,0.46],[0.26,0.50],[0.27,0.57],[0.25,0.65],
    [0.23,0.72],[0.20,0.75],[0.17,0.71],[0.15,0.62],[0.15,0.54],
  ]},
  { id:"gr", c:[ // Greenland
    [0.14,0.06],[0.18,0.05],[0.22,0.06],[0.22,0.11],[0.19,0.13],[0.14,0.11],
  ]},
  { id:"eu", c:[
    [0.40,0.12],[0.44,0.10],[0.49,0.11],[0.53,0.14],[0.54,0.20],
    [0.51,0.26],[0.48,0.28],[0.44,0.27],[0.41,0.24],[0.39,0.17],
  ]},
  { id:"af", c:[
    [0.42,0.29],[0.47,0.27],[0.53,0.29],[0.55,0.35],[0.55,0.44],
    [0.54,0.54],[0.51,0.63],[0.48,0.70],[0.46,0.70],[0.43,0.65],
    [0.41,0.54],[0.41,0.43],[0.42,0.34],
  ]},
  { id:"me", c:[ // Middle East
    [0.53,0.26],[0.58,0.24],[0.62,0.28],[0.62,0.34],[0.58,0.38],[0.54,0.36],[0.52,0.30],
  ]},
  { id:"as", c:[ // Asia main
    [0.54,0.10],[0.62,0.09],[0.70,0.10],[0.77,0.12],[0.82,0.16],
    [0.84,0.23],[0.82,0.30],[0.78,0.37],[0.74,0.42],[0.76,0.48],
    [0.72,0.52],[0.68,0.50],[0.64,0.46],[0.60,0.40],[0.56,0.37],
    [0.54,0.28],[0.53,0.18],
  ]},
  { id:"se", c:[ // SE Asia
    [0.70,0.44],[0.75,0.42],[0.80,0.46],[0.80,0.54],[0.74,0.56],[0.70,0.52],
  ]},
  { id:"au", c:[ // Australia
    [0.73,0.57],[0.79,0.56],[0.84,0.58],[0.85,0.66],[0.82,0.72],
    [0.77,0.73],[0.73,0.70],[0.71,0.65],[0.71,0.60],
  ]},
  { id:"nz", c:[ // NZ approximate
    [0.88,0.68],[0.90,0.66],[0.91,0.70],[0.89,0.73],[0.87,0.71],
  ]},
];

// High-density city cluster areas (extra bright overlay)
const CITY_ZONES: { id:string; c:[number,number][] }[] = [
  { id:"us-east",  c:[[0.17,0.24],[0.20,0.22],[0.22,0.25],[0.21,0.28],[0.18,0.28]] },
  { id:"us-west",  c:[[0.10,0.28],[0.12,0.27],[0.13,0.30],[0.11,0.32],[0.09,0.31]] },
  { id:"br",       c:[[0.21,0.54],[0.24,0.52],[0.25,0.56],[0.23,0.59],[0.20,0.57]] },
  { id:"uk",       c:[[0.41,0.15],[0.43,0.13],[0.44,0.16],[0.43,0.18],[0.41,0.17]] },
  { id:"de-fr",    c:[[0.45,0.17],[0.48,0.16],[0.49,0.19],[0.47,0.22],[0.45,0.20]] },
  { id:"cn",       c:[[0.70,0.22],[0.75,0.20],[0.77,0.25],[0.74,0.30],[0.70,0.28]] },
  { id:"in",       c:[[0.62,0.38],[0.66,0.36],[0.68,0.40],[0.65,0.44],[0.62,0.42]] },
  { id:"jp",       c:[[0.79,0.24],[0.82,0.22],[0.83,0.26],[0.81,0.30],[0.79,0.28]] },
  { id:"ng",       c:[[0.44,0.46],[0.47,0.44],[0.49,0.47],[0.47,0.50],[0.44,0.49]] },
  { id:"au-se",    c:[[0.79,0.64],[0.82,0.62],[0.84,0.66],[0.82,0.69],[0.79,0.67]] },
];

// Individual mega-city bright dots [x,y]
const CITIES: [number,number][] = [
  [0.18,0.25],[0.20,0.24],[0.11,0.29],[0.22,0.55],[0.16,0.51], // Americas
  [0.42,0.14],[0.46,0.17],[0.47,0.19],[0.50,0.18],[0.48,0.21], // Europe
  [0.44,0.47],[0.46,0.42],[0.48,0.36],[0.50,0.38],              // Africa
  [0.63,0.27],[0.70,0.22],[0.72,0.25],[0.74,0.28],[0.64,0.40],  // Asia
  [0.80,0.24],[0.81,0.27],[0.79,0.30],[0.78,0.28],              // Japan area
  [0.80,0.65],[0.82,0.64],                                       // Australia
];

// ── Floating cards ──────────────────────────────────────────────────────────
const CARDS = [
  {icon:"👥", t:"Empresas",    s:"Conectadas",         pos:{top:"6%",  left:"14%"}, dy:8,  d:0.0},
  {icon:"🌐", t:"Presencia",   s:"Global",              pos:{top:"5%",  right:"4%"}, dy:10, d:0.4},
  {icon:"🚀", t:"Rendimiento", s:"Optimizado",          pos:{top:"38%", left:"4%"},  dy:7,  d:0.8},
  {icon:"📈", t:"Crecimiento", s:"Sin Límites",         pos:{top:"38%", right:"2%"}, dy:9,  d:1.2},
  {icon:"💬", t:"Clientes",    s:"Siempre Conectados",  pos:{bottom:"20%",left:"10%"},dy:8, d:1.6},
  {icon:"🔒", t:"Seguridad",   s:"Garantizada",         pos:{bottom:"18%",right:"2%"},dy:10,d:2.0},
  {icon:"☁️", t:"Tecnología",  s:"De alto nivel",       pos:{bottom:"4%",left:"36%"},dy:7,  d:2.4},
];

// ── Orbit rings ────────────────────────────────────────────────────────────
const ORBITS = [
  {rx:375,ry:72, dur:12,rotZ:-22,w:1.5,col:"rgba(129,140,248,0.70)"},
  {rx:400,ry:95, dur:19,rotZ: 35,w:1.0,col:"rgba(168,85,247,0.55)"},
  {rx:418,ry:58, dur:25,rotZ:-55,w:1.3,col:"rgba(99,102,241,0.60)"},
  {rx:355,ry:120,dur:32,rotZ: 72,w:0.8,col:"rgba(196,181,253,0.40)"},
  {rx:440,ry:82, dur:16,rotZ: 14,w:0.9,col:"rgba(139,92,246,0.48)"},
];

// ── Stars ──────────────────────────────────────────────────────────────────
const STARS = Array.from({length:55},(_,i)=>({
  cx:((i*89+19)%97)+1, cy:((i*61+41)%95)+2,
  r:i%7===0?1.6:i%3===0?1.0:0.55,
  op:0.18+(i%6)*0.10, tw:i%4===0,
}));

// ── Network nodes ──────────────────────────────────────────────────────────
const NODES=[
  {id:0,x:0.30,y:0.24},{id:1,x:0.38,y:0.56},{id:2,x:0.50,y:0.20},
  {id:3,x:0.56,y:0.52},{id:4,x:0.68,y:0.25},{id:5,x:0.73,y:0.60},
  {id:6,x:0.49,y:0.42},{id:7,x:0.24,y:0.42},{id:8,x:0.63,y:0.15},
  {id:9,x:0.41,y:0.70},{id:10,x:0.80,y:0.42},{id:11,x:0.27,y:0.26},
  {id:12,x:0.58,y:0.33},{id:13,x:0.45,y:0.31},
];
const CONNS=[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[0,2],[2,4],[4,5],[3,5],[1,3],
 [7,0],[7,1],[8,4],[9,3],[10,4],[11,0],[11,7],[12,4],[12,3],[13,2],[13,3]];

function qp(a:{x:number;y:number},b:{x:number;y:number}){
  const ax=a.x*D,ay=a.y*D,bx=b.x*D,by=b.y*D;
  return `M${ax},${ay} Q${(ax+bx)/2},${(ay+by)/2-34} ${bx},${by}`;
}

export function PlanetHero(){
  const ref=useRef<HTMLDivElement>(null);
  const rx=useMotionValue(0),ry=useMotionValue(0);
  const sx=useSpring(rx,{stiffness:50,damping:20});
  const sy=useSpring(ry,{stiffness:50,damping:20});
  const rotY=useTransform(sx,[-1,1],[-6,6]);
  const rotX=useTransform(sy,[-1,1],[6,-6]);
  const stX=useTransform(sx,[-1,1],[-10,10]);
  const stY=useTransform(sy,[-1,1],[-10,10]);
  const onMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    const el=ref.current; if(!el)return;
    const rc=el.getBoundingClientRect();
    rx.set((e.clientX-rc.left-rc.width/2)/rc.width);
    ry.set((e.clientY-rc.top-rc.height/2)/rc.height);
  },[rx,ry]);

  const BOX=D+240;

  return(
    <div ref={ref} onMouseMove={onMove} onMouseLeave={()=>{rx.set(0);ry.set(0);}}
      className="relative select-none" style={{width:BOX,height:BOX}}>

      {/* Stars */}
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

      {/* Nebula */}
      <div className="absolute pointer-events-none" style={{
        top:"0%",left:"5%",width:"90%",height:"90%",
        background:"radial-gradient(ellipse 80% 65% at 58% 44%, rgba(76,29,149,0.25) 0%, rgba(109,40,217,0.08) 55%, transparent 75%)",
        filter:"blur(35px)",
      }}/>

      {/* Shooting stars */}
      {[0,1,2].map(i=>(
        <motion.div key={i} className="absolute pointer-events-none" style={{
          top:`${10+i*22}%`,left:`${6+i*14}%`,
          width:80+i*30,height:2,
          background:"linear-gradient(90deg,transparent,rgba(220,210,255,0.95),transparent)",
          borderRadius:2,
        }} animate={{x:[0,160],opacity:[0,1,0]}}
          transition={{duration:1.0,delay:5+i*9,repeat:Infinity,repeatDelay:16+i*8,ease:"easeIn"}}/>
      ))}

      {/* Outer mega-glow — pulsing */}
      <motion.div className="absolute pointer-events-none" style={{
        top:"50%",left:"50%",width:D+250,height:D+250,
        transform:"translate(-50%,-50%)",
        background:"radial-gradient(circle,rgba(109,40,217,0.38) 0%,rgba(99,102,241,0.18) 42%,transparent 68%)",
        filter:"blur(26px)",borderRadius:"50%",
      }}
        animate={{opacity:[0.75,1,0.75],scale:[0.97,1.03,0.97]}}
        transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}/>

      {/* 3D tilt */}
      <motion.div className="absolute" style={{
        top:"50%",left:"50%",width:D+200,height:D+200,
        x:"-50%",y:"-50%",
        rotateY:rotY,rotateX:rotX,transformStyle:"preserve-3d",
      }}>

        {/* Orbit rings */}
        <div className="absolute pointer-events-none"
          style={{top:"50%",left:"50%",width:0,height:0,transform:"translate(-50%,-50%)"}}>
          {ORBITS.map((o,i)=>(
            <motion.div key={i} className="absolute" style={{
              width:o.rx*2,height:o.ry*2,top:-o.ry,left:-o.rx,
              borderRadius:"50%",
              border:`${o.w}px solid ${o.col}`,
              boxShadow:`0 0 12px ${o.col},0 0 24px ${o.col}`,
            }}
              animate={{rotate:[`${o.rotZ}deg`,`${o.rotZ+360}deg`]}}
              transition={{duration:o.dur,repeat:Infinity,ease:"linear"}}/>
          ))}
        </div>

        {/* Atmosphere pulsing ring */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{
          top:"50%",left:"50%",width:D+44,height:D+44,
          transform:"translate(-50%,-50%)",
          border:"2px solid rgba(129,140,248,0.35)",
        }}
          animate={{
            boxShadow:[
              "0 0 40px 18px rgba(109,40,217,0.40),0 0 90px 35px rgba(99,102,241,0.20),inset 0 0 50px 12px rgba(109,40,217,0.14)",
              "0 0 65px 28px rgba(109,40,217,0.60),0 0 120px 50px rgba(99,102,241,0.30),inset 0 0 70px 20px rgba(109,40,217,0.22)",
              "0 0 40px 18px rgba(109,40,217,0.40),0 0 90px 35px rgba(99,102,241,0.20),inset 0 0 50px 12px rgba(109,40,217,0.14)",
            ]
          }}
          transition={{duration:3.5,repeat:Infinity,ease:"easeInOut"}}/>

        {/* Planet sphere */}
        <div className="absolute" style={{
          top:"50%",left:"50%",width:D,height:D,
          transform:"translate(-50%,-50%)",
          borderRadius:"50%",overflow:"hidden",
          background:"radial-gradient(circle at 34% 32%,#201970 0%,#100c42 25%,#070520 55%,#030110 85%)",
          boxShadow:[
            "inset -65px -40px 110px rgba(0,0,0,0.96)",
            "inset 22px 18px 65px rgba(99,102,241,0.26)",
            "0 0 100px rgba(99,102,241,0.22)",
            "0 0 200px rgba(109,40,217,0.14)",
          ].join(","),
        }}>

          {/* SCROLLING TEXTURE: grid + continents */}
          <motion.svg width={D*2} height={D}
            style={{position:"absolute",top:0,left:0}}
            animate={{x:[0,-D]}}
            transition={{duration:56,repeat:Infinity,ease:"linear"}}>
            <defs>
              {/* Glow filter for continent dots */}
              <filter id="cg" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="cgg" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="1.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Ocean faint grid pattern */}
              <pattern id="op" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="4.5" cy="4.5" r="0.55" fill="rgba(99,102,241,0.20)"/>
              </pattern>
              {/* Continent dense dots pattern */}
              <pattern id="cp" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.25" fill="rgba(230,220,255,0.93)"/>
              </pattern>
              {/* City extra-dense dots pattern */}
              <pattern id="czp" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.1" fill="rgba(255,252,255,0.98)"/>
              </pattern>
              {/* Lat/lon grid line pattern */}
              <pattern id="gp" x="0" y="0" width={D/10} height={D/10} patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2={D*2} y2="0" stroke="rgba(129,140,248,0.14)" strokeWidth="0.5"/>
                <line x1="0" y1="0" x2="0" y2={D} stroke="rgba(129,140,248,0.12)" strokeWidth="0.5"/>
              </pattern>

              {/* Continent clip mask — first half [0,D] */}
              <clipPath id="cmask1">
                {CONTINENTS.map(cn=>(
                  <polygon key={cn.id} points={pts(D,cn.c,0)}/>
                ))}
              </clipPath>
              {/* City clip mask — first half */}
              <clipPath id="czmask1">
                {CITY_ZONES.map(cz=>(
                  <polygon key={cz.id} points={pts(D,cz.c,0)}/>
                ))}
              </clipPath>
              {/* Continent clip mask — second half [D,2D] */}
              <clipPath id="cmask2">
                {CONTINENTS.map(cn=>(
                  <polygon key={cn.id} points={pts(D,cn.c,D)}/>
                ))}
              </clipPath>
              {/* City clip mask — second half */}
              <clipPath id="czmask2">
                {CITY_ZONES.map(cz=>(
                  <polygon key={cz.id} points={pts(D,cz.c,D)}/>
                ))}
              </clipPath>
            </defs>

            {/* Ocean grid (full width) */}
            <rect width={D*2} height={D} fill="url(#op)"/>
            {/* Lat/lon grid lines */}
            <rect width={D*2} height={D} fill="url(#gp)" opacity={0.6}/>

            {/* Continents — first half */}
            <rect width={D} height={D} fill="url(#cp)"
              clipPath="url(#cmask1)" filter="url(#cg)"/>
            {/* City zones — first half */}
            <rect width={D} height={D} fill="url(#czp)"
              clipPath="url(#czmask1)" filter="url(#cg)"/>
            {/* Continents — second half */}
            <rect x={D} width={D} height={D} fill="url(#cp)"
              clipPath="url(#cmask2)" filter="url(#cg)"/>
            {/* City zones — second half */}
            <rect x={D} width={D} height={D} fill="url(#czp)"
              clipPath="url(#czmask2)" filter="url(#cg)"/>

            {/* Mega-city bright dots — first half */}
            <g filter="url(#cg)">
              {CITIES.map(([cx,cy],i)=>(
                <circle key={`mc1-${i}`} cx={cx*D} cy={cy*D} r={2.5}
                  fill="rgba(255,252,255,1)" opacity={0.98}/>
              ))}
            </g>
            {/* Mega-city bright dots — second half */}
            <g filter="url(#cg)">
              {CITIES.map(([cx,cy],i)=>(
                <circle key={`mc2-${i}`} cx={cx*D+D} cy={cy*D} r={2.5}
                  fill="rgba(255,252,255,1)" opacity={0.98}/>
              ))}
            </g>
          </motion.svg>

          {/* Sphere depth shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:"radial-gradient(circle at 34% 32%,transparent 0%,transparent 26%,rgba(0,0,0,0.26) 52%,rgba(0,0,0,0.68) 76%,rgba(0,0,0,0.92) 100%)",
          }}/>
          {/* Left sunlight highlight */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:"radial-gradient(ellipse 52% 65% at 30% 30%,rgba(155,145,255,0.24) 0%,rgba(100,90,220,0.08) 45%,transparent 68%)",
          }}/>
          {/* Upper-right flare (matches reference) */}
          <div className="absolute pointer-events-none" style={{
            top:"-5%",right:"-5%",width:"50%",height:"50%",
            background:"radial-gradient(circle at 70% 30%,rgba(180,200,255,0.30) 0%,rgba(140,160,255,0.12) 40%,transparent 70%)",
          }}/>
          {/* Blue rim atmosphere */}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{
            boxShadow:"inset 0 0 65px 20px rgba(70,50,200,0.22),inset 0 0 28px 8px rgba(120,80,255,0.14)",
          }}/>
        </div>

        {/* Network SVG */}
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
          {CONNS.map(([ai,bi],i)=>(
            <path key={`c${i}`} d={qp(NODES[ai],NODES[bi])}
              fill="none"
              stroke={i%3===0?"rgba(210,195,255,0.65)":i%3===1?"rgba(180,160,255,0.48)":"rgba(150,130,240,0.40)"}
              strokeWidth={0.9} filter="url(#lg)"/>
          ))}
          {/* Particles */}
          {CONNS.slice(0,14).map(([ai,bi],i)=>{
            const path=qp(NODES[ai],NODES[bi]);
            return(
              <g key={`p${i}`}>
                <circle r={3.0} fill="rgba(230,220,255,0.95)">
                  <animateMotion dur={`${2.0+(i%5)*0.65}s`} repeatCount="indefinite" begin={`${i*0.50}s`} path={path}/>
                </circle>
                <circle r={1.4} fill="white">
                  <animateMotion dur={`${2.0+(i%5)*0.65}s`} repeatCount="indefinite" begin={`${i*0.50}s`} path={path}/>
                </circle>
              </g>
            );
          })}
          {/* Nodes */}
          {NODES.map(n=>{
            const x=n.x*D,y=n.y*D;
            return(
              <g key={`n${n.id}`} filter="url(#ng)">
                <motion.circle cx={x} cy={y} r={7} fill="none"
                  stroke="rgba(210,195,255,0.65)" strokeWidth={1.2}
                  animate={{r:[7,16,7],opacity:[0.7,0,0.7]}}
                  transition={{duration:2.2+(n.id%3)*0.6,repeat:Infinity,delay:n.id*0.25}}/>
                <motion.circle cx={x} cy={y} r={4.5} fill="rgba(210,195,255,0.92)"
                  animate={{r:[4.5,6,4.5]}}
                  transition={{duration:1.6+(n.id%2)*0.5,repeat:Infinity,delay:n.id*0.18}}/>
                <circle cx={x} cy={y} r={2.2} fill="white" opacity={0.98}/>
              </g>
            );
          })}
        </svg>

        {/* Floating cards */}
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
              opacity:{duration:0.5,delay:0.8+c.d},
              scale:{duration:0.5,delay:0.8+c.d},
              y:{duration:3.0+i*0.35,repeat:Infinity,ease:"easeInOut",delay:c.d*0.4},
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
              width:6,height:6,borderRadius:"50%",background:"#a78bfa",
              marginLeft:"auto",boxShadow:"0 0 10px rgba(167,139,250,1)",
            }}
              animate={{opacity:[1,0.4,1],scale:[1,1.4,1]}}
              transition={{duration:1.8+i*0.2,repeat:Infinity,delay:i*0.3}}/>
          </motion.div>
        ))}

        {/* Live badge */}
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
