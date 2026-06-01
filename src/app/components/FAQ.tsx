import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tarda el desarrollo de una página web?",
    answer: "El tiempo varía según el plan elegido. El Plan Profesional se entrega en 3 a 5 días hábiles. El Plan Empresarial toma entre 7 y 15 días hábiles. La Tienda Virtual se estima según el alcance del proyecto. Al confirmar tu proyecto recibes un cronograma detallado con fechas exactas.",
  },
  {
    question: "¿Incluyen dominio y hosting?",
    answer: "El plan Sitio Web Premium incluye dominio gratis por 1 año y hosting gratis por 1 año. Para los demás planes, te asesoramos para contratar el hosting y dominio más conveniente según tu proyecto, o podemos gestionarlo por ti con costos adicionales muy asequibles.",
  },
  {
    question: "¿Puedo solicitar cambios durante el desarrollo?",
    answer: "Sí. Todos los planes incluyen rondas de revisiones durante el desarrollo para que el resultado sea exactamente lo que necesitas. Una vez lanzado el sitio, también ofrecemos planes de mantenimiento mensual que incluyen ajustes y actualizaciones de contenido.",
  },
  {
    question: "¿La web será adaptable a dispositivos móviles?",
    answer: "Absolutamente. Todos los sitios web que desarrollamos son 100% responsive, lo que significa que se ven y funcionan perfectamente en celulares, tablets y computadoras de escritorio. Además, están optimizados para el índice Mobile-First de Google.",
  },
  {
    question: "¿Ofrecen posicionamiento SEO?",
    answer: "Sí. Todos los planes incluyen optimización SEO técnica: meta etiquetas, velocidad de carga, estructura semántica, sitemap y robots.txt. El plan Premium incluye SEO avanzado. Para estrategias de contenido SEO a largo plazo, también ofrecemos servicios complementarios.",
  },
  {
    question: "¿Pueden crear tiendas online (e-commerce)?",
    answer: "Sí. El plan Tienda Online incluye catálogo de productos, carrito de compras, integración con pasarelas de pago (PayPal, Stripe, Wompi, u otras según el país), gestión de pedidos y un panel administrativo completo para manejar tu tienda sin necesitar programar.",
  },
  {
    question: "¿Trabajan con clientes internacionales?",
    answer: "Sí. Trabajamos con clientes en toda Latinoamérica, España, Estados Unidos y más países. La comunicación se realiza por WhatsApp, videollamada o correo electrónico. Aceptamos pagos en USD, COP y otras divisas según el acuerdo.",
  },
  {
    question: "¿Ofrecen soporte técnico después del lanzamiento?",
    answer: "Sí. Todos los planes incluyen soporte post-lanzamiento durante el período acordado. Además, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, monitoreo de rendimiento, copias de seguridad y soporte prioritario para que tu sitio siempre funcione de manera óptima.",
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
      className={`border-b border-zinc-100 last:border-0 transition-colors ${open ? "bg-zinc-50 -mx-6 px-6 rounded-xl" : ""}`}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`transition-colors ${open ? "text-zinc-900" : "text-zinc-700 group-hover:text-zinc-900"}`}
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px" }}
        >
          {faq.question}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
            open ? "bg-zinc-900" : "bg-zinc-100 group-hover:bg-zinc-200"
          }`}
        >
          {open ? (
            <Minus size={14} className="text-white" />
          ) : (
            <Plus size={14} className="text-zinc-500" />
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
              className="pb-5 text-zinc-500"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.75 }}
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
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left sticky col */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-6">
              <span className="text-zinc-500 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                Preguntas Frecuentes
              </span>
            </div>
            <h2
              className="text-zinc-900 mb-4"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              ¿Tienes dudas?
              <br />Aquí las respondemos.
            </h2>
            <p
              className="text-zinc-400 mb-8"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
            >
              Si no encuentras lo que buscas aquí, no dudes en contactarnos directamente. Respondemos todas las consultas.
            </p>

            {/* Quick contact buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "14px" }}
              >
                Enviar pregunta
              </button>
              <a
                href="https://wa.me/573123198706"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-all cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "14px" }}
              >
                <MessageCircle size={16} />
                Preguntar por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div className="divide-y-0">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
