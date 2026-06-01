import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const projectTypes = [
  "Landing Page",
  "Sitio Empresarial",
  "Sitio Web Premium",
  "Tienda Online (E-commerce)",
  "Aplicación Web",
  "Desarrollo de API",
  "Rediseño de Sitio Web",
  "Mantenimiento y Soporte",
  "Otro",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
    website: "", // honeypot anti-spam — oculto para usuarios reales
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot anti-bot

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (form.message.trim().length < 20) {
      setError("Por favor describe tu proyecto con al menos 20 caracteres.");
      return;
    }

    setError("");
    setSending(true);

    try {
      const FORM_ENDPOINT = "https://formspree.io/f/mbdbvjjz";

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: form.name,
          email: form.email,
          telefono: form.phone,
          tipo_proyecto: form.projectType,
          presupuesto: form.budget,
          mensaje: form.message,
          _subject: `Nuevo contacto: ${form.projectType || "Sin tipo"} — ${form.name}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("No se pudo enviar el mensaje. Por favor escríbenos directamente por WhatsApp.");
      }
    } catch {
      setError("Error de red. Por favor escríbenos directamente por WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all duration-200";
  const labelClass = "block mb-1.5 text-zinc-700 text-sm";

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full mb-6">
            <span
              className="text-zinc-500 text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              Contáctanos
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
            Construyamos algo
            <br />extraordinario juntos
          </h2>
          <p
            className="text-zinc-400 max-w-lg mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7 }}
          >
            Cuéntanos tu proyecto y te respondemos en menos de 24 horas con una propuesta personalizada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* WhatsApp — destacado */}
            <a
              href="https://wa.me/573123198706"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:border-[#25D366]/60 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z"/>
                </svg>
              </div>
              <div>
                <div
                  className="text-[#25D366] text-xs mb-0.5 font-semibold uppercase tracking-wide"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Respuesta inmediata
                </div>
                <div
                  className="text-zinc-900"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px" }}
                >
                  Hablar por WhatsApp
                </div>
                <div className="text-zinc-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  La forma más rápida de contactarnos
                </div>
              </div>
            </a>

            {/* Consulta gratuita info */}
            <div className="flex items-center gap-4 p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#6366f115" }}
              >
                <MessageCircle size={22} style={{ color: "#6366f1" }} />
              </div>
              <div>
                <div className="text-zinc-400 text-xs mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Formulario de contacto
                </div>
                <div
                  className="text-zinc-900"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
                >
                  Cuéntanos tu proyecto
                </div>
                <div className="text-zinc-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  Respuesta en menos de 24 horas
                </div>
              </div>
            </div>

            {/* Response guarantee */}
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
              <CheckCircle2 size={18} className="text-green-500 shrink-0" />
              <p className="text-zinc-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <span style={{ fontWeight: 600 }}>Garantía de respuesta:</span> Respondemos todas las consultas en menos de 24 horas, de lunes a viernes.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3
                    className="text-zinc-900 mb-2"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px" }}
                  >
                    ¡Mensaje recibido!
                  </h3>
                  <p
                    className="text-zinc-400"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
                  >
                    Revisaré los detalles de tu proyecto y te responderé en menos de 24 horas.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 flex flex-col gap-5"
                noValidate
              >
                {/* Campo honeypot — invisible para usuarios, visible para bots */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label htmlFor="website">No llenar este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className={labelClass}
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      Nombre completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className={inputClass}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className={labelClass}
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      Correo electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tu@empresa.com"
                      className={inputClass}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className={labelClass}
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="Tu número de contacto"
                      className={inputClass}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className={labelClass}
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      Tipo de proyecto *
                    </label>
                    <select
                      required
                      className={inputClass + " cursor-pointer"}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    >
                      <option value="">Seleccionar tipo...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={labelClass}
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    Presupuesto aproximado
                  </label>
                  <select
                    className={inputClass + " cursor-pointer"}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  >
                    <option value="">Seleccionar rango...</option>
                    <option>Menos de $600.000 COP</option>
                    <option>$600.000 – $1.000.000 COP</option>
                    <option>$1.000.000 – $2.000.000 COP</option>
                    <option>$2.000.000 – $3.500.000 COP</option>
                    <option>Más de $3.500.000 COP</option>
                    <option>Aún no lo tengo definido</option>
                  </select>
                  {/* Nota visible sobre la forma de pago */}
                  <p
                    className="mt-1.5 text-zinc-400 text-xs flex items-center gap-1.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Forma de pago: <strong className="text-zinc-500">50% al iniciar — 50% al entregar</strong>
                  </p>
                </div>

                <div>
                  <label
                    className={labelClass}
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    Cuéntanos sobre tu proyecto *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe tu negocio, qué necesitas, tus objetivos y cualquier requisito o plazo específico..."
                    className={inputClass + " resize-none"}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar Mensaje
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </>
                  )}
                </button>

                <p
                  className="text-center text-zinc-400 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Al enviar, aceptas que te contactemos sobre tu proyecto. Sin spam, nunca.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
