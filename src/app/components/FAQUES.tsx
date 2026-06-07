import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { useRegion } from "../../hooks/useRegion";
import { FAQ_SPAIN, type Region4 } from "../../i18n/spainContent";

const WA = "https://wa.me/573123198706?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20dise%C3%B1o%20web%20para%20mi%20negocio%20en%20Espa%C3%B1a.";

export function FAQUES() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const region = useRegion();
  const r = region as Region4;
  const d = FAQ_SPAIN[r] ?? FAQ_SPAIN.ES;

  return (
    <section
      id="faq"
      className="py-24"
      style={{ background: "#09090b" }}
      aria-labelledby="faq-es-heading"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
              {d.badge}
            </span>
          </motion.div>

          <motion.h2
            id="faq-es-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff", marginBottom: "14px" }}
          >
            {d.heading}
            <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {d.headingHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto" }}
          >
            {d.subtitle}
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {(d.items as readonly { question: string; answer: string }[]).map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: isOpen ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.03)",
                    border: isOpen ? "1px solid rgba(129,140,248,0.25)" : "1px solid rgba(255,255,255,0.07)",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    style={{ background: "transparent", border: "none" }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: 1.4,
                        color: isOpen ? "#fff" : "rgba(255,255,255,0.75)",
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: isOpen ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.06)",
                        border: isOpen ? "1px solid rgba(129,140,248,0.3)" : "1px solid rgba(255,255,255,0.1)",
                        transition: "background 0.2s, border-color 0.2s",
                        minHeight: "unset",
                        minWidth: "unset",
                      }}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus size={13} style={{ color: "#a78bfa" }} />
                      ) : (
                        <Plus size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            lineHeight: 1.75,
                            color: "rgba(255,255,255,0.5)",
                            padding: "0 20px 20px",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl"
          style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(129,140,248,0.2)" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
            {d.ctaText}{" "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{d.ctaHighlight}</span>
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
          >
            <MessageCircle size={15} aria-hidden="true" />
            {d.ctaBtn}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
