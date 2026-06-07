import { motion } from "motion/react";
import { useRegion } from "../../hooks/useRegion";
import { TRUST_SPAIN, type Region4 } from "../../i18n/spainContent";

const CO_PROBLEMS = [
  "Tu competencia aparece en Google cuando te buscan — tú no.",
  "Pierdes clientes que buscan tu servicio a las 2am.",
  "Sin web, pedir por WhatsApp parece informal y aleja prospectos.",
  "Dependes de redes sociales que pueden bloquearte o desaparecer.",
  "No puedes mostrar tu trabajo con credibilidad profesional.",
  "Cada mes sin web son clientes que van directo a tu competencia.",
];

export function TrustSection() {
  const region = useRegion();
  const isSpain = region !== "CO";
  const d = isSpain ? (TRUST_SPAIN[region as Region4] ?? TRUST_SPAIN.ES) : null;

  const badge = d?.badge ?? "El problema";
  const heading = d?.heading ?? "Si tienes un negocio en Colombia y aún dependes del voz a voz, estás";
  const headingHighlight = d?.headingHighlight ?? "perdiendo clientes a diario.";
  const problems = d?.problems ?? CO_PROBLEMS;
  const closing = d?.closing ?? "Una web de Nexus Studio trabaja por tu negocio";
  const closingHighlight = d?.closingHighlight ?? "24/7, en Google, en Maps, desde el celular.";

  return (
    <section
      id="problem"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #09090b 0%, #0d0d18 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(252,165,165,0.9)",
              }}
            >
              {badge}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "#fff",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {heading}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f87171, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {headingHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {(problems as readonly string[]).map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3.5 rounded-2xl p-5"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(239,68,68,0.15)" }}
              >
                <span style={{ fontSize: "16px" }}>✗</span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {problem}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-7 py-4"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <span style={{ fontSize: "20px" }}>💡</span>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(15px, 2vw, 17px)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {closing}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {closingHighlight}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
