import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./TrustGuarantees.css";

/* ── Contador animado 0 → valor al entrar en viewport ──────── */
function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* Valores fijos de las métricas (las etiquetas vienen del diccionario) */
const METRIC_VALUES = [
  { to: 150, prefix: "+", suffix: "%" },
  { to: 0, prefix: "", suffix: "%" },
  { to: 3, prefix: "×", suffix: "" },
];

export function TrustGuarantees() {
  const { t } = useNexus();
  const tr = t.trust;
  const METRICS = METRIC_VALUES.map((v, i) => ({ ...v, label: tr.metrics[i].label }));
  const gaugeRef = useRef<HTMLDivElement>(null);
  const gaugeInView = useInView(gaugeRef, { once: true, margin: "-80px" });

  return (
    <section className="nx nx-trust" aria-label="Garantías y transparencia">
      <div className="nx-trust__head">
        <span className="nx-trust__eyebrow">{tr.eyebrow}</span>
        <h2 className="nx-trust__title">{tr.title}</h2>
        <p className="nx-trust__sub">{tr.sub}</p>
      </div>

      <div className="nx-trust__grid">
        {/* ── Garantía de Velocidad ── */}
        <div className="nx-trust__card" ref={gaugeRef}>
          <div className="nx-trust__card-top">
            <span className="nx-trust__icon nx-trust__icon--gold" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
              </svg>
            </span>
            <span className="nx-trust__card-label">{tr.speedLabel}</span>
          </div>
          <p className="nx-trust__card-text">{tr.speedText}</p>

          <div className="nx-trust__gauge">
            <div className="nx-trust__gauge-head">
              <span className="nx-trust__gauge-time">
                {gaugeInView ? "1,4 s" : "—"}
              </span>
              <span className="nx-trust__gauge-target">{tr.speedTarget}</span>
            </div>
            <div className="nx-trust__gauge-bar">
              <div
                className="nx-trust__gauge-fill"
                style={{ width: gaugeInView ? "40%" : "0%" }}
              />
              <span className="nx-trust__gauge-threshold" />
            </div>
            <div className="nx-trust__gauge-foot">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {tr.speedFoot}
            </div>
          </div>
        </div>

        {/* ── Cumplimiento y Privacidad Legal ── */}
        <div className="nx-trust__card">
          <div className="nx-trust__card-top">
            <span className="nx-trust__icon nx-trust__icon--navy" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <span className="nx-trust__card-label">{tr.legalLabel}</span>
          </div>
          <p className="nx-trust__card-text">{tr.legalText}</p>

          <div className="nx-trust__seal">
            <span className="nx-trust__seal-tick" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            {tr.seal1}
          </div>
          <div className="nx-trust__seal">
            <span className="nx-trust__seal-tick" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            {tr.seal2}
          </div>
        </div>

        {/* ── Métricas de intención (contadores) ── */}
        <div className="nx-trust__metrics" aria-label="Compromisos medibles">
          {METRICS.map((m) => (
            <div className="nx-trust__metric" key={m.label}>
              <div className="nx-trust__metric-num">
                <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="nx-trust__metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustGuarantees;
