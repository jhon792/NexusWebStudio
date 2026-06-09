import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./NexusSeo.css";

const VIDEO_ID = "AavsQP3gPj4";

/* Visibilidad/posicionamiento en Google (índice 0–100) a 12 meses.
   Con SEO sube hasta lo más alto; Sin SEO se queda abajo. */
const WITHOUT = [8, 9, 10, 11, 11, 12, 13, 13, 14, 15, 15, 16];
const WITH_SEO = [8, 16, 26, 38, 50, 62, 72, 81, 88, 93, 96, 98];

export function NexusSeo() {
  const { t } = useNexus();
  const s = t.seo;

  return (
    <section className="nx nx-seo" id="nx-seo" aria-labelledby="nx-seo-title">
      <div className="nx-seo__head">
        <span className="nx-seo__eyebrow">{s.eyebrow}</span>
        <h2 className="nx-seo__title" id="nx-seo-title">{s.title}</h2>
        <p className="nx-seo__sub">{s.sub}</p>
      </div>

      <div className="nx-seo__grid">
        <LiteYouTube id={VIDEO_ID} label={s.videoTitle} />
        <GrowthChart
          title={s.chartTitle}
          note={s.chartNote}
          legendWith={s.legendWith}
          legendWithout={s.legendWithout}
          monthLabel={s.monthLabel}
        />
      </div>
    </section>
  );
}

/* ── Vídeo con carga diferida (facade) — no carga el iframe hasta el clic ── */
function LiteYouTube({ id, label }: { id: string; label: string }) {
  const [open, setOpen] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (open) {
    return (
      <div className="nx-video" aria-label={label}>
        <iframe
          className="nx-video__iframe"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="nx-video" onClick={() => setOpen(true)} aria-label={label}>
      <img className="nx-video__thumb" src={thumb} alt={label} loading="lazy" decoding="async" />
      <span className="nx-video__play">
        <span className="nx-video__btn" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="nx-video__label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
        {label}
      </span>
    </button>
  );
}

/* ── Gráfica de crecimiento (SVG propio, interactiva) ─────────────── */
const VB_W = 600;
const VB_H = 320;
const PAD = { l: 40, r: 16, t: 16, b: 28 };
const PLOT_W = VB_W - PAD.l - PAD.r;
const PLOT_H = VB_H - PAD.t - PAD.b;
const MAX_Y = 100;
const N = WITH_SEO.length;

const xAt = (i: number) => PAD.l + (i / (N - 1)) * PLOT_W;
const yAt = (v: number) => PAD.t + PLOT_H - (v / MAX_Y) * PLOT_H;
const toPoints = (arr: number[]) => arr.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ");

function GrowthChart({
  title, note, legendWith, legendWithout, monthLabel,
}: {
  title: string; note: string; legendWith: string; legendWithout: string; monthLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);

  const areaPath =
    `M ${xAt(0)} ${yAt(0)} ` +
    WITH_SEO.map((v, i) => `L ${xAt(i)} ${yAt(v)}`).join(" ") +
    ` L ${xAt(N - 1)} ${yAt(0)} Z`;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * VB_W;
    const i = Math.round(((px - PAD.l) / PLOT_W) * (N - 1));
    setHover(Math.max(0, Math.min(N - 1, i)));
  };

  const xLabels = [0, 2, 5, 8, 11];

  return (
    <div className="nx-growth" ref={ref}>
      <h3 className="nx-growth__title">{title}</h3>
      <div className="nx-growth__legend">
        <span><span className="nx-growth__dot nx-growth__dot--with" />{legendWith}</span>
        <span><span className="nx-growth__dot nx-growth__dot--without" />{legendWithout}</span>
      </div>

      <div className="nx-growth__chart">
        <svg
          className="nx-growth__svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label={title}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          {/* Rejilla horizontal */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const y = PAD.t + PLOT_H * f;
            return <line key={f} className="nx-growth__axis" x1={PAD.l} y1={y} x2={VB_W - PAD.r} y2={y} />;
          })}

          {/* Área bajo la curva con SEO */}
          <defs>
            <linearGradient id="nx-growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(212,175,55,0.35)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0)" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#nx-growth-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          {/* Línea sin optimización */}
          <polyline
            className="nx-growth__line nx-growth__line--without"
            points={toPoints(WITHOUT)}
            style={{
              strokeDasharray: 1600,
              strokeDashoffset: inView ? 0 : 1600,
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* Línea con SEO */}
          <polyline
            className="nx-growth__line nx-growth__line--with"
            points={toPoints(WITH_SEO)}
            style={{
              strokeDasharray: 2600,
              strokeDashoffset: inView ? 0 : 2600,
              transition: "stroke-dashoffset 1.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          {/* Etiquetas X */}
          {xLabels.map((i) => (
            <text key={i} className="nx-growth__xlabel" x={xAt(i)} y={VB_H - 8} textAnchor="middle">
              {monthLabel} {i + 1}
            </text>
          ))}

          {/* Interacción */}
          {hover !== null && (
            <>
              <line
                className="nx-growth__hover-line"
                x1={xAt(hover)} y1={PAD.t} x2={xAt(hover)} y2={PAD.t + PLOT_H}
              />
              <circle cx={xAt(hover)} cy={yAt(WITHOUT[hover])} r={4} fill="#9aa7b4" />
              <circle cx={xAt(hover)} cy={yAt(WITH_SEO[hover])} r={5} fill="#d4af37"
                stroke="#fff" strokeWidth={2} />
            </>
          )}
        </svg>

        {hover !== null && (
          <div
            className="nx-growth__tip"
            style={{ left: `${(xAt(hover) / VB_W) * 100}%` }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{monthLabel} {hover + 1}</div>
            <div className="nx-growth__tip-row">
              <span className="nx-growth__dot nx-growth__dot--with" />
              <strong>{WITH_SEO[hover]}%</strong> {legendWith}
            </div>
            <div className="nx-growth__tip-row" style={{ opacity: 0.7 }}>
              <span className="nx-growth__dot nx-growth__dot--without" />
              {WITHOUT[hover]}% {legendWithout}
            </div>
          </div>
        )}
      </div>

      <p className="nx-growth__note">{note}</p>
    </div>
  );
}

export default NexusSeo;
