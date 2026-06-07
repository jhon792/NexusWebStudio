import { useState } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRegion } from "../../hooks/useRegion";
import { CONTACT_SPAIN, type Region4 } from "../../i18n/spainContent";

const WA = "https://wa.me/573123198706?text=Hola%2C%20quiero%20solicitar%20una%20cotizaci%C3%B3n%20gratuita%20para%20mi%20p%C3%A1gina%20web.";

const projectTypesCO = [
  "Landing Page",
  "Sitio Empresarial",
  "Tienda Virtual",
  "Sistema Web Personalizado",
  "Mantenimiento Web",
  "Optimización SEO",
  "Rediseño de Sitio Web",
  "Otro",
];

const projectTypesES = {
  ES: ["Landing Page", "Sitio Corporativo", "Tienda Online", "Sistema de Citas", "Mantenimiento Web", "SEO España", "Rediseño de Sitio Web", "Otro"],
  EN: ["Landing Page", "Corporate Website", "Online Store", "Booking System", "Web Maintenance", "Spain SEO", "Website Redesign", "Other"],
  FR: ["Landing Page", "Site Corporatif", "Boutique en Ligne", "Système de Réservation", "Maintenance Web", "SEO Espagne", "Refonte de Site Web", "Autre"],
  IT: ["Landing Page", "Sito Aziendale", "Negozio Online", "Sistema di Prenotazione", "Manutenzione Web", "SEO Spagna", "Ridisegno Sito Web", "Altro"],
} as const;

const CO_TEXT = {
  available: "Disponible para nuevos proyectos",
  ctaBadge: "Disponible para nuevos proyectos",
  ctaTitle1: "Cada semana que pasa sin web,",
  ctaTitle2: "tu competencia recibe tus clientes.",
  ctaSubtitle: "Solicita tu diagnóstico gratuito hoy. En 24 horas te decimos exactamente qué necesita tu negocio y cuánto costaría. Sin compromiso.",
  ctaBtn: "Quiero mi diagnóstico gratuito",
  ctaBtn2: "Solicitar Cotización",
  formBadge: "Contáctanos",
  formTitle1: "Tu proyecto, en 24 horas tienes",
  formTitle2: "una propuesta real en tu correo.",
  formSubtitle: "Más de 40 negocios colombianos ya confiaron en este proceso. Tú serás el siguiente.",
  labelName: "Nombre completo",
  labelEmail: "Correo electrónico",
  labelPhone: "WhatsApp / Teléfono",
  labelProject: "Tipo de proyecto",
  labelBudget: "Presupuesto aproximado",
  labelMessage: "Cuéntanos sobre tu proyecto",
  placeholderName: "Tu nombre",
  placeholderEmail: "tu@empresa.com",
  placeholderPhone: "Número de contacto",
  placeholderMessage: "Describe tu negocio, qué necesitas y cuáles son tus objetivos...",
  submit: "Quiero mi cotización en 24 horas",
  sending: "Enviando...",
  successTitle: "¡Mensaje recibido!",
  successBody: "Te responderemos en menos de 24 horas con una propuesta personalizada.",
  successBtn: "Escríbenos por WhatsApp",
  errorEmail: "Por favor ingresa un correo electrónico válido.",
  errorMessage: "Por favor describe tu proyecto con al menos 20 caracteres.",
  errorSend: "No se pudo enviar. Por favor escríbenos directamente por WhatsApp.",
  waBtn: "Escríbenos directo por WhatsApp",
  waLabel: "WhatsApp — Respuesta en menos de 2 horas",
  formNote: "Al enviar aceptas que te contactemos sobre tu proyecto. Sin spam.",
};

export function Contact() {
  const { pathname } = useLocation();
  const region = useRegion();
  const isSpain = pathname.startsWith("/en");
  const r = region as Region4;

  const t = isSpain ? (CONTACT_SPAIN[r] ?? CONTACT_SPAIN.ES) : CO_TEXT;

  const budgetOptions = isSpain
    ? [
        "Plan Esencial — 390 €",
        "Plan Profesional — 790 €",
        "Plan Premium — 1.490 €",
        "Más de 1.490 €",
        "Aún no lo tengo definido",
      ]
    : [
        "Menos de $600.000 COP",
        "$600.000 – $1.000.000 COP",
        "$1.000.000 – $2.000.000 COP",
        "$2.000.000 – $3.500.000 COP",
        "Más de $3.500.000 COP",
        "Aún no lo tengo definido",
      ];

  const projectTypes = isSpain ? (projectTypesES[r] ?? projectTypesES.ES) : projectTypesCO;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
    website: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError(t.errorEmail);
      return;
    }
    if (form.message.trim().length < 20) {
      setError(t.errorMessage);
      return;
    }

    setError("");
    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre:       form.name,
          email:        form.email,
          phone:        form.phone,
          project_type: form.projectType,
          budget:       form.budget,
          message:      form.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(t.errorSend);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* CTA Final Banner */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #09090b 0%, #0d0b1e 50%, #09090b 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                {t.ctaBadge}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                color: "#fff",
                marginBottom: "20px",
              }}
            >
              {t.ctaTitle1}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.ctaTitle2}
              </span>
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "520px",
                margin: "0 auto 36px",
              }}
            >
              {t.ctaSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://wa.me/573123198706?text=Hola%2C%20quiero%20el%20diagn%C3%B3stico%20gratuito%20de%20mi%20p%C3%A1gina%20web."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 cursor-pointer group"
                style={{
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#fff",
                  textDecoration: "none",
                  boxShadow: "0 10px 36px rgba(37,211,102,0.35)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                </svg>
                {t.ctaBtn}
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 cursor-pointer group transition-all duration-200"
                style={{
                  padding: "16px 32px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {t.ctaBtn2}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="py-20" style={{ background: "#09090b", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div id="contact-form" className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                {t.formBadge}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#fff",
                marginBottom: "14px",
              }}
            >
              {t.formTitle1}
              {" "}{t.formTitle2}
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                maxWidth: "440px",
                margin: "0 auto",
              }}
            >
              {t.formSubtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                style={{
                  background: "rgba(37,211,102,0.08)",
                  border: "1px solid rgba(37,211,102,0.2)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#25D366" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.05 2C6.495 2 2 6.495 2 12.05c0 1.87.51 3.622 1.397 5.126L2 22l4.981-1.305A10.02 10.02 0 0 0 12.05 22C17.605 22 22 17.505 22 11.95 22 6.495 17.605 2 12.05 2zm0 18.333a8.28 8.28 0 0 1-4.222-1.154l-.302-.18-3.133.82.838-3.063-.198-.313A8.283 8.283 0 0 1 3.667 11.95c0-4.62 3.763-8.383 8.383-8.383 4.62 0 8.383 3.763 8.383 8.383 0 4.62-3.763 8.383-8.383 8.383z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", color: "#4ade80", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "2px" }}>
                    {t.waLabel}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", color: "#fff" }}>
                    {t.waBtn}
                  </div>
                </div>
              </a>

              <div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}
              >
                <CheckCircle2 size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  <strong style={{ color: "rgba(255,255,255,0.75)" }}>
                    {isSpain ? (r === "EN" ? "Response guarantee:" : r === "FR" ? "Garantie de réponse :" : r === "IT" ? "Garanzia di risposta:" : "Garantía de respuesta:") : "Garantía de respuesta:"}
                  </strong>{" "}
                  {isSpain ? (r === "EN" ? "We respond to all enquiries in less than 24 hours." : r === "FR" ? "Nous répondons à toutes les demandes en moins de 24 heures." : r === "IT" ? "Rispondiamo a tutte le richieste in meno di 24 ore." : "Respondemos todas las consultas en menos de 24 horas.") : "Respondemos todas las consultas en menos de 24 horas."}
                </p>
              </div>

              <div
                className="p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "12px" }}>
                  {isSpain ? (r === "EN" ? "What type of business?" : r === "FR" ? "Quel type d'entreprise ?" : r === "IT" ? "Che tipo di azienda?" : "¿Para qué tipo de negocio?") : "¿Para qué tipo de negocio?"}
                </p>
                {(isSpain
                  ? (r === "EN"
                      ? ["Clinics → +online appointments", "Restaurants → reservations, no calls", "Schools → more enrollments", "Service companies → more enquiries", "Entrepreneurs → professional presence"]
                      : r === "FR"
                        ? ["Cliniques → +rendez-vous en ligne", "Restaurants → réservations sans appels", "Écoles → plus d'inscriptions", "Sociétés de services → plus de demandes", "Entrepreneurs → présence professionnelle"]
                        : r === "IT"
                          ? ["Cliniche → +appuntamenti online", "Ristoranti → prenotazioni senza chiamate", "Scuole → più iscrizioni", "Aziende di servizi → più richieste", "Imprenditori → presenza professionale"]
                          : ["Clínicas y consultorios → +citas online", "Restaurantes → reservas sin llamadas", "Despachos → captación de clientes", "Empresas de servicios → más consultas", "Emprendedores → presencia profesional"]
                    )
                  : ["Clínicas y consultorios → +citas online", "Restaurantes → reservas sin llamadas", "Escuelas → más inscripciones", "Empresas de servicios → más consultas", "Emprendedores → presencia profesional"]
                ).map((item) => (
                  <div key={item} className="flex items-start gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#818cf8" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </div>
                ))}
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
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)" }}
                    >
                      <CheckCircle2 size={32} style={{ color: "#22c55e" }} />
                    </div>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#fff", marginBottom: "8px" }}>
                      {t.successTitle}
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)" }}>
                      {t.successBody}
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl p-8 flex flex-col gap-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  noValidate
                >
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                    <input
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
                      <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                        {t.labelName} *
                      </label>
                      <input
                        required
                        type="text"
                        name="from_name"
                        placeholder={t.placeholderName}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                        {t.labelEmail} *
                      </label>
                      <input
                        required
                        type="email"
                        name="from_email"
                        placeholder={t.placeholderEmail}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                        {t.labelPhone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t.placeholderPhone}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                        {t.labelProject} *
                      </label>
                      <select
                        required
                        name="project_type"
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: form.projectType ? "#fff" : "rgba(255,255,255,0.35)",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        <option value="" style={{ background: "#18181b" }}>
                          {isSpain ? (r === "EN" ? "Select type..." : r === "FR" ? "Sélectionner..." : r === "IT" ? "Selezionare..." : "Seleccionar tipo...") : "Seleccionar tipo..."}
                        </option>
                        {(projectTypes as readonly string[]).map((pt) => (
                          <option key={pt} value={pt} style={{ background: "#18181b" }}>{pt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                      {t.labelBudget}
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: form.budget ? "#fff" : "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      <option value="" style={{ background: "#18181b" }}>
                        {isSpain ? (r === "EN" ? "Select range..." : r === "FR" ? "Sélectionner..." : r === "IT" ? "Selezionare..." : "Seleccionar rango...") : "Seleccionar rango..."}
                      </option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} style={{ background: "#18181b" }}>{opt}</option>
                      ))}
                    </select>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>
                      {isSpain
                        ? (r === "EN" ? "Payment: " : r === "FR" ? "Paiement : " : r === "IT" ? "Pagamento: " : "Forma de pago: ")
                        : "Forma de pago: "}
                      <strong style={{ color: "rgba(255,255,255,0.5)" }}>
                        {isSpain
                          ? (r === "EN" ? "50% to start · 50% on delivery" : r === "FR" ? "50% au départ · 50% à la livraison" : r === "IT" ? "50% all'inizio · 50% alla consegna" : "50% al iniciar · 50% al entregar")
                          : "50% al iniciar · 50% al entregar"}
                      </strong>
                    </p>
                  </div>

                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>
                      {t.labelMessage} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      placeholder={t.placeholderMessage}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  {error && (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#f87171", textAlign: "center" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                    }}
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t.submit}
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                    {t.formNote}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
