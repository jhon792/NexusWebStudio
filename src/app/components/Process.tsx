import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Nos cuentas tu idea",
    description:
      "Hablamos por WhatsApp o formulario. Cuéntanos qué hace tu negocio, a quién va dirigido y qué esperas de tu sitio web. Sin tecnicismos, en tu idioma.",
    accent: "#818cf8",
  },
  {
    number: "02",
    title: "Analizamos tu negocio",
    description:
      "Estudiamos tu sector, tu competencia y tu público objetivo para entender cómo tu sitio web puede generar el mayor impacto posible para tu negocio.",
    accent: "#a78bfa",
  },
  {
    number: "03",
    title: "Diseñamos una propuesta visual",
    description:
      "Creamos una propuesta de diseño personalizada para tu negocio. Ves cómo se verá tu sitio antes de que comience el desarrollo técnico.",
    accent: "#c084fc",
  },
  {
    number: "04",
    title: "Desarrollamos tu sitio",
    description:
      "Construimos tu página web con código limpio, carga rápida y todas las funcionalidades acordadas. Te mantenemos informado durante todo el proceso.",
    accent: "#818cf8",
  },
  {
    number: "05",
    title: "Publicamos tu página web",
    description:
      "Configuramos el dominio, el hosting y el certificado SSL. Tu sitio queda publicado, visible en Google y funcionando al 100%.",
    accent: "#a78bfa",
  },
  {
    number: "06",
    title: "Te acompañamos en el lanzamiento",
    description:
      "Te explicamos cómo usar y actualizar tu sitio. Resolvemos dudas, ajustamos detalles y te damos soporte para que el lanzamiento sea un éxito.",
    accent: "#c084fc",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24" style={{ background: "#09090b" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Nuestro Proceso
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Así{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              trabajamos
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Un proceso claro y transparente. Sabrás exactamente en qué etapa está tu proyecto en todo momento.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[28px] top-0 bottom-0 w-px hidden sm:block"
            style={{ background: "linear-gradient(180deg, rgba(129,140,248,0.4) 0%, rgba(192,132,252,0.1) 100%)" }}
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 sm:gap-8"
              >
                {/* Step number */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                    style={{
                      background: `${step.accent}18`,
                      border: `1px solid ${step.accent}35`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: "14px",
                        color: step.accent,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-2xl p-5 mb-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <a
            href="https://wa.me/573123198706?text=Hola%2C%20quiero%20empezar%20mi%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(99,102,241,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
            </svg>
            Empezar mi proyecto ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
