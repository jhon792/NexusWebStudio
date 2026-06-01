import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Comenzamos con un análisis profundo de tu negocio, objetivos y audiencia objetivo. Investigamos a tu competencia, definimos el alcance del proyecto y trazamos una estrategia alineada con tus metas.",
    duration: "1–2 días",
    deliverable: "Brief y alcance del proyecto",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Creamos mockups en alta fidelidad y prototipos interactivos. Cada decisión visual es intencional — optimizada para claridad, coherencia de marca y conversión máxima.",
    duration: "3–5 días",
    deliverable: "Mockups UI y prototipo",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Código limpio y de alto rendimiento construido con tecnologías modernas. Priorizamos velocidad, accesibilidad y escalabilidad — sin atajos que generen deuda técnica.",
    duration: "1–4 semanas",
    deliverable: "Sitio web funcional completo",
  },
  {
    number: "04",
    title: "Lanzamiento",
    description: "Pruebas rigurosas en dispositivos, navegadores y métricas de rendimiento. Cuando todo está perfecto, gestionamos el despliegue, configuración del dominio y certificado SSL.",
    duration: "2–3 días",
    deliverable: "Sitio web en producción",
  },
  {
    number: "05",
    title: "Soporte Continuo",
    description: "Nunca te dejamos solo después del lanzamiento. Ofrecemos mantenimiento continuo, monitoreo de rendimiento, actualizaciones de contenido y soporte prioritario cuando lo necesitas.",
    duration: "Continuo",
    deliverable: "Soporte y actualizaciones mensuales",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-6">
            <span
              className="text-zinc-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              ¿Cómo trabajamos?
            </span>
          </div>
          <h2
            className="text-zinc-900 mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Un proceso probado, cada vez
          </h2>
          <p
            className="text-zinc-400 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            Sin sorpresas. Sin fechas incumplidas. Un flujo de trabajo claro y estructurado que te mantiene informado en cada etapa.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent" />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex items-start gap-8 lg:gap-16 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div
                    className={`bg-zinc-50 border border-zinc-100 rounded-2xl p-7 hover:border-zinc-200 hover:shadow-lg transition-all duration-300 ${
                      i % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                      <div
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white text-xs"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 800 }}
                      >
                        {step.number}
                      </div>
                      <h3
                        className="text-zinc-900"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "18px" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className="text-zinc-500 mb-4"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
                    >
                      {step.description}
                    </p>
                    <div className={`flex items-center gap-4 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                        <span className="text-zinc-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          {step.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-zinc-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          {step.deliverable}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-zinc-900" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
