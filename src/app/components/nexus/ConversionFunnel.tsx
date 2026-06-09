import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./ConversionFunnel.css";

/* Iconos por id de sector / objetivo (estables, no traducibles) */
const SECTOR_ICONS: Record<string, React.ReactNode> = {
  estetica: <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />,
  dental: <path d="M12 2c3 0 5 2 5 5 0 2-1 4-1 7s-1 8-2 8-1-4-2-4-1 4-2 4-2-5-2-8-1-5-1-7c0-3 2-5 5-5Z" />,
  legal: <path d="M12 3v18M5 7h14M7 7l-3 7a4 4 0 0 0 6 0L7 7Zm10 0-3 7a4 4 0 0 0 6 0l-3-7Z" />,
  otro: <path d="M3 9h18M9 21V9M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />,
};
const GOAL_ICONS: Record<string, React.ReactNode> = {
  citas: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm6 11 2 2 4-4" />,
  autoridad: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Zm-2 9 2 2 4-4" />,
  seo: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.3-4.3" />,
  rediseno: <path d="M3 7h18M3 12h18M3 17h12M19 15l3 3-3 3" />,
};

const WA_NUMBER = "573123198706";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{7,}$/;

interface FunnelData {
  sector: string;
  goal: string;
  email: string;
  whatsapp: string;
  consent: boolean;
}

interface ConversionFunnelProps {
  onSubmit?: (data: FunnelData) => Promise<void> | void;
}

export function ConversionFunnel({ onSubmit }: ConversionFunnelProps) {
  const { t } = useNexus();
  const f = t.funnel;

  const [step, setStep] = useState(0); // 0,1,2 · 3 = éxito
  const [data, setData] = useState<FunnelData>({
    sector: "",
    goal: "",
    email: "",
    whatsapp: "",
    consent: false,
  });
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailOk = EMAIL_RE.test(data.email);
  const phoneOk = PHONE_RE.test(data.whatsapp);

  const progress = useMemo(() => (step >= 3 ? 100 : Math.round(((step + 1) / 3) * 100)), [step]);

  const canAdvance =
    (step === 0 && data.sector) ||
    (step === 1 && data.goal) ||
    (step === 2 && emailOk && phoneOk && data.consent);

  const next = () => {
    if (step < 2) return setStep((sx) => sx + 1);
    submit();
  };
  const back = () => setStep((sx) => Math.max(0, sx - 1));

  const submit = async () => {
    setTouched(true);
    if (!(emailOk && phoneOk && data.consent)) return;

    /* Conversión para Google Ads / Meta (si los píxeles están cargados). */
    try {
      (window as any).gtag?.("event", "generate_lead", { value: 1, currency: "EUR" });
      (window as any).fbq?.("track", "Lead");
    } catch { /* píxeles no presentes */ }

    if (onSubmit) {
      setSubmitting(true);
      try { await onSubmit(data); } finally { setSubmitting(false); }
    } else {
      /* Entrega inmediata del lead a la agencia por WhatsApp (sin backend).
         Se abre de forma síncrona en el clic para evitar el bloqueo de pop-ups. */
      const sLabel = sectorLabel || "negocio";
      const gLabel = goalLabel || "captar clientes";
      const msg =
        `Nuevo lead — Sector: ${sLabel}. Objetivo: ${gLabel}.` +
        ` Email: ${data.email}. WhatsApp: ${data.whatsapp}.`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    }
    setStep(3);
  };

  const pickSector = (id: string) => {
    setData((d) => ({ ...d, sector: id }));
    window.setTimeout(() => setStep(1), 280);
  };
  const pickGoal = (id: string) => {
    setData((d) => ({ ...d, goal: id }));
    window.setTimeout(() => setStep(2), 280);
  };

  const sectorLabel = f.sectors.find((sx) => sx.id === data.sector)?.label ?? "";
  const goalLabel = f.goals.find((g) => g.id === data.goal)?.label.toLowerCase() ?? "";
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(f.waMsg(sectorLabel, goalLabel))}`;

  return (
    <section className="nx nx-funnel" id="nx-funnel" aria-label="Solicita tu propuesta">
      <div className="nx-funnel__head">
        <span className="nx-funnel__eyebrow">{f.eyebrow}</span>
        <h2 className="nx-funnel__title">{f.title}</h2>
      </div>

      <div className="nx-funnel__card">
        <div className="nx-funnel__progress">
          <div className="nx-funnel__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="nx-funnel__inner">
          {step < 3 && (
            <div className="nx-funnel__steps" aria-hidden="true">
              {[0, 1, 2].map((sx, i) => (
                <span key={sx} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className={`nx-funnel__step-dot ${sx <= step ? "nx-funnel__step-dot--on" : ""}`} />
                  {i < 2 && <span className="nx-funnel__step-sep" />}
                </span>
              ))}
              <span style={{ marginLeft: "0.6rem" }}>{f.stepOf(step + 1)}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepShell key="s0">
                <h3 className="nx-funnel__q">{f.q1}</h3>
                <p className="nx-funnel__hint">{f.hint1}</p>
                <div className="nx-funnel__options" role="radiogroup" aria-label={f.q1}>
                  {f.sectors.map((o) => (
                    <OptionCard
                      key={o.id}
                      active={data.sector === o.id}
                      onClick={() => pickSector(o.id)}
                      label={o.label}
                      desc={o.desc}
                      icon={SECTOR_ICONS[o.id]}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell key="s1">
                <h3 className="nx-funnel__q">{f.q2}</h3>
                <p className="nx-funnel__hint">{f.hint2}</p>
                <div className="nx-funnel__options" role="radiogroup" aria-label={f.q2}>
                  {f.goals.map((o) => (
                    <OptionCard
                      key={o.id}
                      active={data.goal === o.id}
                      onClick={() => pickGoal(o.id)}
                      label={o.label}
                      desc={o.desc}
                      icon={GOAL_ICONS[o.id]}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell key="s2">
                <h3 className="nx-funnel__q">{f.q3}</h3>
                <p className="nx-funnel__hint">{f.hint3}</p>
                <div className="nx-funnel__fields">
                  <div className="nx-funnel__field">
                    <label className="nx-funnel__field-label" htmlFor="nx-email">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
                      </svg>
                      {f.emailLabel}
                    </label>
                    <input
                      id="nx-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={f.emailPh}
                      className={`nx-funnel__input ${touched && !emailOk ? "nx-funnel__input--error" : ""}`}
                      value={data.email}
                      onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                    />
                    {touched && !emailOk && <span className="nx-funnel__error">{f.errEmail}</span>}
                  </div>

                  <div className="nx-funnel__field">
                    <label className="nx-funnel__field-label" htmlFor="nx-wa">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                      </svg>
                      {f.waLabel}
                    </label>
                    <input
                      id="nx-wa"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={f.waPh}
                      className={`nx-funnel__input ${touched && !phoneOk ? "nx-funnel__input--error" : ""}`}
                      value={data.whatsapp}
                      onChange={(e) => setData((d) => ({ ...d, whatsapp: e.target.value }))}
                    />
                    {touched && !phoneOk && <span className="nx-funnel__error">{f.errPhone}</span>}
                  </div>

                  <label className="nx-funnel__consent">
                    <input
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => setData((d) => ({ ...d, consent: e.target.checked }))}
                    />
                    {f.consent}
                  </label>
                  {touched && !data.consent && <span className="nx-funnel__error">{f.errConsent}</span>}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <motion.div
                key="ok"
                className="nx-funnel__success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="nx-funnel__success-badge">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>{f.successTitle}</h3>
                <p>{f.successText(sectorLabel.toLowerCase() || "negocio")}</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "1.4rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.85rem 1.5rem",
                    borderRadius: "999px",
                    background: "var(--nx-gold)",
                    color: "var(--nx-navy)",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    textDecoration: "none",
                    boxShadow: "var(--nx-shadow-gold)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                  </svg>
                  {f.waBtn}
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <div className="nx-funnel__nav">
              <button type="button" className="nx-funnel__back" onClick={back} disabled={step === 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
                </svg>
                {f.back}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  className="nx-funnel__next nx-funnel__next--submit"
                  onClick={next}
                  disabled={!canAdvance || submitting}
                >
                  {submitting ? f.sending : f.submit}
                  {!submitting && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function OptionCard({
  active,
  onClick,
  label,
  desc,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      className={`nx-funnel__option ${active ? "nx-funnel__option--on" : ""}`}
      onClick={onClick}
    >
      <span className="nx-funnel__check" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="nx-funnel__option-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="nx-funnel__option-label">{label}</span>
      <span className="nx-funnel__option-desc">{desc}</span>
    </button>
  );
}

export default ConversionFunnel;
