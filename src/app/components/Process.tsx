import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRegion } from "../../hooks/useRegion";
import { useLang } from "../../hooks/useLang";
import { PROCESS_SPAIN, type Region4 } from "../../i18n/spainContent";

const STEP_ACCENTS = ["#818cf8", "#a78bfa", "#c084fc", "#818cf8", "#a78bfa", "#c084fc"];

const CO_STEPS_ES = [
  { number: "01", title: "Nos cuentas tu idea",              description: "Hablamos por WhatsApp o formulario. Cuéntanos qué hace tu negocio, a quién va dirigido y qué esperas de tu sitio web. Sin tecnicismos, en tu idioma." },
  { number: "02", title: "Analizamos tu negocio",            description: "Estudiamos tu sector, tu competencia y tu público objetivo para entender cómo tu sitio web puede generar el mayor impacto posible para tu negocio." },
  { number: "03", title: "Diseñamos una propuesta visual",   description: "Creamos una propuesta de diseño personalizada para tu negocio. Ves cómo se verá tu sitio antes de que comience el desarrollo técnico." },
  { number: "04", title: "Desarrollamos tu sitio",           description: "Construimos tu página web con código limpio, carga rápida y todas las funcionalidades acordadas. Te mantenemos informado durante todo el proceso." },
  { number: "05", title: "Publicamos tu página web",         description: "Configuramos el dominio, el hosting y el certificado SSL. Tu sitio queda publicado, visible en Google y funcionando al 100%." },
  { number: "06", title: "Te acompañamos en el lanzamiento", description: "Te explicamos cómo usar y actualizar tu sitio. Resolvemos dudas, ajustamos detalles y te damos soporte para que el lanzamiento sea un éxito." },
];

const CO_STEPS_EN = [
  { number: "01", title: "You tell us your idea",           description: "We talk via WhatsApp or form. Tell us what your business does, who it's aimed at and what you expect from your website. No technical jargon, in plain language." },
  { number: "02", title: "We analyse your business",        description: "We study your sector, your competition and your target audience to understand how your website can generate the greatest possible impact for your business." },
  { number: "03", title: "We design a visual proposal",     description: "We create a personalised design proposal for your business. You see how your site will look before technical development begins." },
  { number: "04", title: "We develop your site",            description: "We build your website with clean code, fast loading and all agreed features. We keep you informed throughout the entire process." },
  { number: "05", title: "We launch your website",          description: "We configure the domain, hosting and SSL certificate. Your site is published, visible on Google and working 100%." },
  { number: "06", title: "We support your launch",          description: "We explain how to use and update your site. We answer questions, adjust details and provide support so your launch is a success." },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const region = useRegion();
  const lang = useLang();
  const isSpain = region !== "CO";
  const r = region as Region4;
  const d = isSpain ? (PROCESS_SPAIN[r] ?? PROCESS_SPAIN.ES) : null;
  const isCOEn = !isSpain && lang.startsWith("en");

  const badge     = d?.badge     ?? (isCOEn ? "Our Process"            : "Nuestro Proceso");
  const heading   = d?.heading   ?? (isCOEn ? "From idea to website in" : "De la idea a la web en");
  const highlight = d?.headingHighlight ?? (isCOEn ? "6 clear steps"   : "6 pasos claros");
  const rawSteps  = d?.steps ?? (isCOEn ? CO_STEPS_EN : CO_STEPS_ES);

  const steps = (rawSteps as readonly { number: string; title: string; description: string }[]).map((s, i) => ({
    ...s,
    accent: STEP_ACCENTS[i],
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const lineScaleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 120, damping: 22 }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24"
      style={{ background: "#09090b" }}
      aria-labelledby="process-heading"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {badge}
            </span>
          </div>
          <h2
            id="process-heading"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {heading}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlight}
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div
            className="absolute left-[28px] top-0 bottom-0 w-px overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(180deg, #6366f1, #a78bfa, #c084fc)",
                scaleY: lineScaleY,
                transformOrigin: "top center",
                boxShadow: "0 0 8px rgba(99,102,241,0.4)",
              }}
            />
          </div>

          {/* Steps */}
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Número */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `${step.accent}15`,
                      border: `2px solid ${step.accent}35`,
                    }}
                    initial={{ scale: 0.3, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 16,
                      delay: index * 0.12 + 0.05,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: step.accent,
                      }}
                    >
                      {step.number}
                    </span>
                  </motion.div>
                </div>

                {/* Contenido */}
                <div className="pt-3 pb-2">
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#fff",
                      marginBottom: 8,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.95rem",
                      lineHeight: 1.72,
                      color: "rgba(255,255,255,0.45)",
                      maxWidth: 520,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
