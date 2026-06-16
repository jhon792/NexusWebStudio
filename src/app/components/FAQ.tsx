import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { useLang } from "../../hooks/useLang";

// Las primeras 6 preguntas están sincronizadas con el schema FAQPage de SEOSchemas.tsx
// → activan el acordeón de preguntas directamente en los resultados de Google.
// Orden: mayor intención de compra primero.
const FAQS_ES = [
  {
    question: "¿Cuánto cuesta una página web en Colombia?",
    answer:
      "Manejamos tres planes de inversión. El Plan Inicio vale $590.000 COP e incluye landing page profesional lista en 3 a 5 días. El Plan Crecimiento vale $2.000.000 COP e incluye SEO, dominio propio y hosting por un año completo — es el más elegido por negocios colombianos que quieren aparecer en Google. Para proyectos a medida —tiendas virtuales, sistemas de citas o apps web— el Plan Empresarial parte desde $3.400.000 COP. Todos son pagos únicos, sin mensualidades.",
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
      "El tamaño del negocio no define si necesitas web — lo define si tienes clientes que te buscan en internet. Si alguien en tu ciudad busca en Google 'dentista cerca' o 'restaurante en Villavicencio' y tú no apareces, ese cliente va a tu competencia. Con el Plan Crecimiento ($2.000.000, pago único), un solo cliente nuevo recupera toda la inversión. La mayoría de nuestros clientes lo reciben en las primeras semanas.",
  },
  {
    question: "¿Qué necesito tener listo para empezar?",
    answer:
      "Muy poco. Con el nombre de tu negocio, a qué te dedicas y algunas fotos (o usamos imágenes de calidad profesional), ya podemos comenzar. Te hacemos las preguntas correctas en una llamada o chat de 20 minutos y desde ahí tomamos el control del proceso. No necesitas conocimientos técnicos ni preparar nada por adelantado.",
  },
];

const FAQS_EN = [
  {
    question: "How much does a website cost in Colombia?",
    answer:
      "We offer three investment plans. The Starter Plan costs $590,000 COP and includes a professional landing page ready in 3 to 5 days. The Growth Plan costs $2,000,000 COP and includes SEO, a custom domain and hosting for a full year — it's the most popular choice for Colombian businesses that want to appear on Google. For custom projects — online stores, booking systems or web apps — the Business Plan starts at $3,400,000 COP. All are one-time payments, no monthly fees.",
  },
  {
    question: "Do your websites appear on Google?",
    answer:
      "Yes. All sites are delivered optimised for Google: we configure Google Search Console for correct crawling, apply technical SEO (loading speed, headings and metadata) and link the business on Google Maps if applicable. The Growth Plan and Business Plan include local SEO positioning at no extra cost. Organic results start to appear between 4 and 12 weeks depending on the competition in your sector and city.",
  },
  {
    question: "How long does website development take?",
    answer:
      "It depends on the project: a landing page is delivered in 3 to 5 business days; a complete corporate site takes 7 to 15 business days. Projects with special features — online stores or booking and reservation systems — have a deadline agreed at the start based on scope. When you confirm your project you receive a detailed schedule with clear delivery dates.",
  },
  {
    question: "Do you work with clients from all over Colombia?",
    answer:
      "Yes, we work with businesses from all over Colombia 100% remotely. We have developed projects for clients in Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Pereira and Villavicencio. The entire process — initial meeting, design, revisions and delivery — is managed via WhatsApp, video call and email. You don't need in-person meetings to start your project.",
  },
  {
    question: "Can I see the site before making the final payment?",
    answer:
      "Yes. We work with split payment: 50% at the start of the project and 50% on delivery. Before the final payment we share a preview link with the finished site so you can review it in detail, request any adjustments you need and give your approval. Only when the result meets your expectations is the final payment made and the site published on your domain.",
  },
  {
    question: "What does the monthly website maintenance include?",
    answer:
      "The monthly maintenance plan includes: security updates against vulnerabilities, automatic weekly backups, content changes (text, images, prices), 24/7 availability monitoring and technical support with a response in less than 24 hours. It also includes periodic review of Google positioning and minor design adjustments. It's the ideal service to keep your digital business active and secure without worrying about the technical side.",
  },
  {
    question: "Why do I need a website if I already have social media?",
    answer:
      "Social media is borrowed. Facebook and Instagram can block you, change the algorithm or simply disappear. Your website is yours, lives on your domain and works even when Meta goes down. Also, a website ranked on Google brings clients who are actively searching for your service — something social media doesn't replicate in the same way. Having both is ideal; relying only on social media is a risk not worth taking.",
  },
  {
    question: "Will the site work well on mobile phones?",
    answer:
      "Yes. All our sites are 100% responsive: they adapt perfectly to phones, tablets and computers. We design mobile-first because over 65% of web traffic in Colombia comes from mobile devices, and it's also a determining factor for Google ranking. A site that doesn't work well on mobile loses clients and positions.",
  },
  {
    question: "Is the investment worth it if my business is small?",
    answer:
      "The size of the business doesn't define whether you need a website — what defines it is whether you have clients searching for you online. If someone in your city searches Google for 'dentist nearby' or 'restaurant in Villavicencio' and you don't appear, that client goes to your competition. With the Growth Plan ($2,000,000, one-time payment), a single new client recovers the entire investment. Most of our clients receive it within the first few weeks.",
  },
  {
    question: "What do I need to have ready to get started?",
    answer:
      "Very little. With your business name, what you do and a few photos (or we use professional-quality images), we can begin. We ask you the right questions in a 20-minute call or chat and from there we take control of the process. You don't need technical knowledge or to prepare anything in advance.",
  },
];

type FaqItem = { question: string; answer: string };

function FAQItem({ faq, index }: { faq: FaqItem; index: number }) {
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

const FAQ_TEXT = {
  ES: {
    badge: "Preguntas Frecuentes",
    heading: "Las dudas más comunes",
    highlight: "respondidas sin rodeos.",
    sub: "Si no encuentras lo que buscas, escríbenos y respondemos en menos de 1 hora.",
    askBtn: "Hacer una pregunta",
    waBtn: "Preguntar por WhatsApp",
    waMsg: "Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios.",
  },
  EN: {
    badge: "FAQ",
    heading: "The most common questions",
    highlight: "answered straight.",
    sub: "If you can't find what you're looking for, write to us and we'll reply in under 1 hour.",
    askBtn: "Ask a question",
    waBtn: "Ask on WhatsApp",
    waMsg: "Hello%2C%20I%20have%20a%20question%20about%20your%20services.",
  },
};

export function FAQ() {
  const lang = useLang();
  const isCOEn = lang.startsWith("en");
  const t = FAQ_TEXT[isCOEn ? "EN" : "ES"];
  const faqs = isCOEn ? FAQS_EN : FAQS_ES;

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
                {t.badge}
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
              {t.heading}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.highlight}
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
              {t.sub}
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
                {t.askBtn}
              </button>
              <a
                href={`https://wa.me/573123198706?text=${t.waMsg}`}
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
                {t.waBtn}
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
