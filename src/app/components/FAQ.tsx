import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";

// Las primeras 6 preguntas están sincronizadas con el schema FAQPage de SEOSchemas.tsx
// → activan el acordeón de preguntas directamente en los resultados de Google.
// Orden: mayor intención de compra primero.
const faqs = [
  {
    question: "¿Cuánto cuesta una página web en Colombia?",
    answer:
      "Manejamos tres planes de inversión. El Plan Inicio vale $590.000 COP e incluye landing page profesional lista en 3 a 5 días. El Plan Crecimiento vale $990.000 COP e incluye SEO, dominio propio y hosting por un año completo — es el más elegido por negocios colombianos que quieren aparecer en Google. Para proyectos a medida —tiendas virtuales, sistemas de citas o apps web— el Plan Empresarial parte desde $2.500.000 COP. Todos son pagos únicos, sin mensualidades.",
  },
  {
    question: "¿Las páginas web que hacen aparecen en Google?",
    answer:
      "Sí. Todos los sitios se entregan optimizados para Google: configuramos Google Search Console para rastreo correcto, aplicamos SEO técnico (velocidad de carga, encabezados y metadatos) y vinculamos el negocio en Google Maps si aplica. El Plan Crecimiento y el Plan Empresarial incluyen posicionamiento SEO local sin costo adicional. Los resultados orgánicos comienzan a verse entre 4 y 12 semanas según la competencia del sector en tu ciudad.",
  },
  {
    question: "¿Cuánto tiempo tarda el desarrollo de un sitio web?",
    answer:
      "Depende del proyecto: una landing page se entrega en 3 a 5 días hábiles; un sitio empresarial completo toma de 7 a 15 días hábiles. Los proyectos con funcionalidades especiales —tiendas virtuales o sistemas de citas y reservas— tienen un plazo acordado al inicio según el alcance. Al confirmar tu proyecto recibes un cronograma detallado con fechas de entrega claras.",
  },
  {
    question: "¿Trabajan con clientes de toda Colombia?",
    answer:
      "Sí, trabajamos con negocios de toda Colombia de forma 100% remota. Hemos desarrollado proyectos para clientes en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Pereira y Villavicencio. Todo el proceso —reunión inicial, diseño, revisiones y entrega— se gestiona por WhatsApp, videollamada y correo. No necesitas reuniones presenciales para iniciar tu proyecto.",
  },
  {
    question: "¿Puedo ver el sitio antes de hacer el pago final?",
    answer:
      "Sí. Trabajamos con pago dividido: 50% al inicio del proyecto y 50% al entregar. Antes del pago final te compartimos un enlace de vista previa con el sitio terminado para que lo revises en detalle, solicites los ajustes que necesites y des tu aprobación. Solo cuando el resultado cumple tus expectativas se realiza el pago final y el sitio se publica en tu dominio.",
  },
  {
    question: "¿Qué incluye el mantenimiento mensual de un sitio web?",
    answer:
      "El plan de mantenimiento mensual incluye: actualizaciones de seguridad contra vulnerabilidades, copias de seguridad automáticas semanales, cambios de contenido (textos, imágenes, precios), monitoreo de disponibilidad 24/7 y soporte técnico con respuesta en menos de 24 horas. También incluye revisión periódica del posicionamiento en Google y ajustes menores de diseño. Es el servicio ideal para mantener tu negocio digital activo y seguro sin preocuparte por la parte técnica.",
  },
  // ── Preguntas de alta conversión ──────────────────────────────────────────
  {
    question: "¿Por qué necesito web si ya tengo redes sociales?",
    answer:
      "Las redes sociales son prestadas. Facebook e Instagram pueden bloquearte, cambiar el algoritmo o simplemente desaparecer. Tu página web es tuya, vive en tu dominio y funciona aunque Meta tenga caídas. Además, una web posicionada en Google trae clientes que buscan activamente tu servicio — algo que las redes no replican igual. Tener ambas es lo ideal; depender solo de redes es un riesgo que no vale la pena asumir.",
  },
  {
    question: "¿El sitio funcionará bien en celulares?",
    answer:
      "Sí. Todos nuestros sitios son 100% responsive: se adaptan perfectamente a teléfonos, tablets y computadores. Diseñamos primero para móvil porque más del 65% del tráfico web en Colombia viene de dispositivos móviles, y también es un factor determinante para el posicionamiento en Google. Un sitio que no funciona bien en celular pierde clientes y posiciones.",
  },
  {
    question: "¿Vale la pena la inversión si mi negocio es pequeño?",
    answer:
      "El tamaño del negocio no define si necesitas web — lo define si tienes clientes que te buscan en internet. Si alguien en tu ciudad busca en Google 'dentista cerca' o 'restaurante en Villavicencio' y tú no apareces, ese cliente va a tu competencia. Con el Plan Crecimiento ($990.000, pago único), un solo cliente nuevo recupera toda la inversión. La mayoría de nuestros clientes lo reciben en las primeras semanas.",
  },
  {
    question: "¿Qué necesito tener listo para empezar?",
    answer:
      "Muy poco. Con el nombre de tu negocio, a qué te dedicas y algunas fotos (o usamos imágenes de calidad profesional), ya podemos comenzar. Te hacemos las preguntas correctas en una llamada o chat de 20 minutos y desde ahí tomamos el control del proceso. No necesitas conocimientos técnicos ni preparar nada por adelantado.",
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
              Las dudas más comunes{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                respondidas sin rodeos.
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
              Si no encuentras lo que buscas, escríbenos y respondemos en menos de 1 hora.
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
