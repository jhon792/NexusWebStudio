import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const WA = "https://wa.me/573123198706?text=Hola%2C%20me%20interesa%20solicitar%20presupuesto%20para%20una%20p%C3%A1gina%20web.";

const faqs = [
  {
    question: "¿Cuánto cuesta una página web profesional en España?",
    answer:
      "El precio de una página web profesional en España varía según las funcionalidades. En Nexsu Studio ofrecemos tres planes: Plan Profesional desde 450 €, Plan Premium desde 790 € y Plan Empresarial desde 1.700 €. Todos incluyen diseño responsive, SEO técnico inicial, hosting, dominio y soporte. Es una inversión única sin mensualidades ocultas. El 90% de nuestros clientes recuperan la inversión con el primer cliente captado a través de la web.",
  },
  {
    question: "¿La web aparecerá en Google?",
    answer:
      "Sí. Todos nuestros proyectos incluyen SEO técnico inicial: alta en Google Search Console, optimización de Core Web Vitals, metatags correctos, sitemap y robots.txt. El posicionamiento orgánico tarda entre 3 y 6 meses según la competencia del sector en España. El Plan Premium incluye SEO avanzado y GEO SEO para aparecer también en respuestas de ChatGPT, Gemini y Claude.",
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista la web?",
    answer:
      "El tiempo de entrega depende del plan elegido: el Plan Profesional se entrega en 15 a 21 días hábiles, el Plan Premium en 21 a 30 días hábiles y los proyectos del Plan Empresarial tienen un plazo acordado al inicio según el alcance. Al confirmar el proyecto recibes un cronograma detallado con hitos y fechas claras para planificar el lanzamiento de tu negocio.",
  },
  {
    question: "¿Podéis hacer la web en varios idiomas?",
    answer:
      "Sí. El Plan Profesional incluye 2 idiomas (español e inglés). El Plan Premium permite hasta 4 idiomas: español, inglés, francés y alemán. Cada versión idiomática tiene su propio URL con hreflang correcto para SEO internacional — así Google sabe exactamente qué versión mostrar en cada país. El Plan Empresarial permite idiomas adicionales sin límite.",
  },
  {
    question: "¿Puedo ver el resultado antes del pago final?",
    answer:
      "Sí. Trabajamos con un esquema de pago 50/50: el 50% al inicio del proyecto y el 50% al entregar. Antes del pago final te compartimos un enlace de previsualización con el sitio terminado para que lo revises en detalle, solicites los ajustes que necesites y des tu aprobación. Solo cuando el resultado cumple tus expectativas se realiza el pago final y el sitio se publica en tu dominio.",
  },
  {
    question: "¿Qué diferencia hay con contratar una agencia local en España?",
    answer:
      "Las agencias locales en España suelen cobrar entre 2.000 € y 6.000 € por un proyecto similar. Nexsu Studio ofrece el mismo nivel de calidad —diseño premium, SEO técnico, velocidad optimizada— con precios más competitivos al operar desde Colombia con clientes internacionales. Todo el proceso es 100% remoto: WhatsApp, videollamada y correo. Hemos trabajado con clientes en España y Europa con resultados verificables.",
  },
  {
    question: "¿Qué es el GEO SEO y por qué importa para mi negocio en España?",
    answer:
      "GEO SEO (Generative Engine Optimization) es la optimización para aparecer en las respuestas de inteligencias artificiales como ChatGPT, Gemini, Perplexity y Claude. Cada vez más personas en España preguntan a estas IAs 'qué agencia de diseño web me recomiendas para mi despacho' y la IA les da una respuesta. El Plan Premium incluye GEO SEO para que Nexsu Studio —y tu web— sean citados en esas respuestas.",
  },
  {
    question: "¿Qué pasa después de lanzar la web?",
    answer:
      "Todos nuestros planes incluyen soporte técnico posterior al lanzamiento: 30 días en el Plan Profesional, 3 meses en el Plan Premium y 6 meses en el Plan Empresarial. Durante ese período resolvemos cualquier incidencia, realizamos ajustes y te ayudamos a interpretar los datos de Google Analytics. También ofrecemos planes de mantenimiento mensual para empresas que necesitan actualización continua de contenidos y seguridad.",
  },
];

export function FAQUES() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const WA_LINK = WA;

  return (
    <section
      id="faq"
      className="py-24"
      style={{ background: "#09090b" }}
      aria-label="Preguntas frecuentes sobre diseño web para España"
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
              Preguntas frecuentes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff", marginBottom: "14px" }}
          >
            Todo lo que necesitas saber
            <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              antes de empezar
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto" }}
          >
            Las preguntas que nos hacen los despachos, clínicas e inmobiliarias en España antes de contratar.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
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
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
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
                      }}
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
            ¿Tienes alguna pregunta más?{" "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Te respondemos en menos de 2 horas.</span>
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl flex items-center gap-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", background: "rgba(37,211,102,0.1)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.2)", textDecoration: "none" }}
          >
            <MessageCircle size={15} />
            Preguntar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
