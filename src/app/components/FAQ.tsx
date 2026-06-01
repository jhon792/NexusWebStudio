import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tarda el desarrollo de una página web?",
    answer:
      "Depende del plan elegido. Una landing page básica se entrega en 3 a 5 días hábiles. Un sitio empresarial completo toma entre 7 y 15 días hábiles. Para proyectos con funcionalidades especiales, el tiempo se acuerda al inicio según el alcance. Al confirmar tu proyecto recibes un cronograma con fechas claras.",
  },
  {
    question: "¿Incluye dominio y hosting?",
    answer:
      "El dominio y el hosting no están incluidos por defecto, pero te asesoramos para elegir la opción más conveniente y económica según tu proyecto. Si lo prefieres, también podemos gestionarlos por ti a un costo adicional. El certificado SSL (HTTPS) sí está incluido en todos los planes.",
  },
  {
    question: "¿El sitio funcionará bien en celulares?",
    answer:
      "Sí. Todos nuestros sitios web son 100% responsive, lo que significa que se adaptan perfectamente a teléfonos, tablets y computadores. Diseñamos primero para móvil porque la mayoría del tráfico web proviene de dispositivos móviles, y también es un factor clave para el posicionamiento en Google.",
  },
  {
    question: "¿Puedo solicitar cambios durante el desarrollo?",
    answer:
      "Sí. Durante el proceso de desarrollo tienes rondas de revisión para ajustar el diseño y el contenido hasta que quedes satisfecho. Una vez lanzado el sitio, también ofrecemos planes de mantenimiento que incluyen ajustes de contenido y mejoras continuas.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "El pago se divide en dos partes: 50% al inicio del proyecto y 50% al entregar el sitio terminado. Aceptamos transferencia bancaria, Nequi, Daviplata y otros medios de pago colombianos. Antes de iniciar te entregamos una cotización detallada sin compromisos.",
  },
  {
    question: "¿Ofrecen soporte después de la entrega?",
    answer:
      "Sí. Todos los planes incluyen un período de soporte post-entrega para resolver dudas y ajustes. Adicionalmente, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, copias de seguridad, cambios de contenido y soporte técnico continuo.",
  },
  {
    question: "¿Necesito saber de tecnología para manejar mi sitio?",
    answer:
      "No. Te entregamos tu sitio listo para usar y te explicamos cómo realizar cambios básicos de contenido de forma sencilla. Si en algún momento necesitas ayuda, nuestro equipo está disponible para apoyarte sin necesidad de que tengas conocimientos técnicos.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: open ? "rgba(129,140,248,0.06)" : "rgba(255,255,255,0.03)",
        border: open ? "1px solid rgba(129,140,248,0.2)" : "1px solid rgba(255,255,255,0.07)",
        marginBottom: "8px",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: open ? "#fff" : "rgba(255,255,255,0.7)",
            lineHeight: 1.4,
          }}
        >
          {faq.question}
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all"
          style={{
            background: open ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.07)",
            border: open ? "1px solid rgba(129,140,248,0.3)" : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {open ? (
            <Minus size={13} style={{ color: "#818cf8" }} />
          ) : (
            <Plus size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-5"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24" style={{ background: "#09090b" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left sticky */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Preguntas Frecuentes
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              ¿Tienes dudas?{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Aquí las respondemos.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                marginBottom: "28px",
              }}
            >
              Si no encuentras lo que buscas, escríbenos directamente. Respondemos todas las consultas.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 6px 20px rgba(99,102,241,0.3)",
                }}
              >
                Hacer una pregunta
              </button>
              <a
                href="https://wa.me/573123198706?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(37,211,102,0.1)",
                  color: "#4ade80",
                  border: "1px solid rgba(37,211,102,0.2)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={16} />
                Preguntar por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
