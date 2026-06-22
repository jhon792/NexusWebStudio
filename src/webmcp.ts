/* ============================================================================
   WebMCP — Model Context Protocol para la Web (experimental)
   Registro PROGRESIVO de una herramienta para agentes de IA que implementen
   `navigator.modelContext`. En navegadores actuales la API no existe, así que
   esto es un no-op total (cero coste, cero riesgo). Prepara el sitio para el
   "agentic browsing": un agente puede solicitar un presupuesto sin rellenar
   el formulario manualmente.
   ============================================================================ */

const WA_NUMBER = "573123198706";

export function registerWebMCP(): void {
  try {
    const mc = (navigator as unknown as { modelContext?: { registerTool?: (t: unknown) => void } }).modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;

    mc.registerTool({
      name: "request_quote",
      description:
        "Solicita un presupuesto gratuito de diseño/desarrollo web a Nexus Studio. " +
        "Recoge sector, objetivo, email y WhatsApp del usuario y abre una conversación " +
        "de WhatsApp con el resumen. Requiere consentimiento del usuario.",
      inputSchema: {
        type: "object",
        properties: {
          sector: { type: "string", description: "Sector del negocio (estética, dental, legal, otro)." },
          goal: { type: "string", description: "Objetivo principal (citas, autoridad, SEO, rediseño)." },
          email: { type: "string", description: "Email de contacto del usuario." },
          whatsapp: { type: "string", description: "Número de WhatsApp del usuario." },
        },
        required: ["email", "whatsapp"],
      },
      async execute(input: { sector?: string; goal?: string; email: string; whatsapp: string }) {
        const msg =
          `Nuevo lead — Sector: ${input.sector || "negocio"}. ` +
          `Objetivo: ${input.goal || "captar clientes"}. ` +
          `Email: ${input.email}. WhatsApp: ${input.whatsapp}.`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
        return { content: [{ type: "text", text: "Solicitud enviada a Nexus Studio por WhatsApp." }] };
      },
    });
  } catch {
    /* API experimental ausente o con otra forma — se ignora sin afectar a la página. */
  }
}
