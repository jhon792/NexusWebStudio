/* ============================================================================
   NEXUS · Características de los planes — IGUALES para Colombia y España.
   Colombia y España prestan los mismos servicios; lo único que cambia es el
   precio (COP vs EUR, gestionado en NexusLangContext).

   · Presencia Esencial NO incluye SEO técnico/indexación (sí SSL + ficha de
     Google) y muestra una lista «Lo que NO incluye» para que el salto a
     Autoridad Profesional se perciba mayor.
   ============================================================================ */

import type { NexusLang } from "./nexus-i18n";

export const PLAN_FEATURES: Record<NexusLang, Record<string, string[]>> = {
  es: {
    esencial: [
      "Diseño web responsive hasta 2 secciones",
      "SSL incluido + formulario de contacto",
      "Ficha de Google Business (apareces en Google Maps)",
      "Velocidad optimizada (Lighthouse +90)",
      "WhatsApp Business integrado",
      "Entrega en 1–3 días hábiles",
      "Soporte técnico 30 días",
    ],
    autoridad: [
      "Todo lo del plan Esencial incluido",
      "SEO técnico + indexación en Google (Analytics + Search Console)",
      "Hasta 8 páginas + blog optimizado para SEO",
      "SEO avanzado por sector (clínicas, abogados…)",
      "Copy de conversión (CRO) incluido por nuestro equipo",
      "Dominio .com propio + hosting 1 año",
      "Formularios avanzados de captura de leads",
      "Posicionamiento local en Google Maps",
      "Sabes cuántas personas visitan tu web",
      "FAQ con datos estructurados (rich results)",
      "GEO SEO: visible en ChatGPT, Gemini y Claude",
      "Soporte y ajustes durante 60 días",
    ],
    dominio: [
      "Sistema de citas o reservas online",
      "Tienda virtual para vender tus productos",
      "Automatizaciones que trabajan por ti",
      "Integración con tus herramientas actuales",
      "Panel para gestionar tu contenido",
      "GEO SEO: visible en ChatGPT, Gemini y Claude",
      "Posicionamiento avanzado en Google",
      "Soporte prioritario dedicado 6 meses",
    ],
  },
  en: {
    esencial: [
      "Responsive web design up to 2 sections",
      "SSL included + contact form",
      "Google Business profile (you appear on Google Maps)",
      "Optimised speed (Lighthouse +90)",
      "WhatsApp Business integrated",
      "Delivery in 1–3 business days",
      "30-day technical support",
    ],
    autoridad: [
      "Everything in the Essential plan",
      "Technical SEO + Google indexing (Analytics + Search Console)",
      "Up to 8 pages + SEO-optimised blog",
      "Advanced SEO by sector (clinics, lawyers…)",
      "Conversion copy (CRO) included by our team",
      "Your own .com domain + 1-year hosting",
      "Advanced lead-capture forms",
      "Local positioning on Google Maps",
      "Know how many people visit your website",
      "FAQ with structured data (rich results)",
      "GEO SEO: visible on ChatGPT, Gemini & Claude",
      "Support and adjustments for 60 days",
    ],
    dominio: [
      "Online appointment or booking system",
      "Online store to sell your products",
      "Automations that work for you",
      "Integration with your current tools",
      "Panel to manage your content",
      "GEO SEO: visible on ChatGPT, Gemini & Claude",
      "Advanced Google positioning",
      "Dedicated priority support for 6 months",
    ],
  },
  fr: {
    esencial: [
      "Design web responsive jusqu'à 2 sections",
      "SSL inclus + formulaire de contact",
      "Fiche Google Business (vous apparaissez sur Google Maps)",
      "Vitesse optimisée (Lighthouse +90)",
      "WhatsApp Business intégré",
      "Livraison en 1–3 jours ouvrés",
      "Support technique 30 jours",
    ],
    autoridad: [
      "Tout le plan Essentiel inclus",
      "SEO technique + indexation Google (Analytics + Search Console)",
      "Jusqu'à 8 pages + blog optimisé SEO",
      "SEO avancé par secteur (cliniques, avocats…)",
      "Copy de conversion (CRO) inclus par notre équipe",
      "Votre domaine .com + hébergement 1 an",
      "Formulaires avancés de capture de leads",
      "Positionnement local sur Google Maps",
      "Vous savez combien de personnes visitent votre site",
      "FAQ avec données structurées (rich results)",
      "GEO SEO : visible sur ChatGPT, Gemini et Claude",
      "Support et ajustements pendant 60 jours",
    ],
    dominio: [
      "Système de rendez-vous ou réservation en ligne",
      "Boutique en ligne pour vendre vos produits",
      "Automatisations qui travaillent pour vous",
      "Intégration avec vos outils actuels",
      "Panneau pour gérer votre contenu",
      "GEO SEO : visible sur ChatGPT, Gemini et Claude",
      "Positionnement avancé sur Google",
      "Support prioritaire dédié 6 mois",
    ],
  },
  it: {
    esencial: [
      "Design web responsive fino a 2 sezioni",
      "SSL incluso + modulo di contatto",
      "Scheda Google Business (appari su Google Maps)",
      "Velocità ottimizzata (Lighthouse +90)",
      "WhatsApp Business integrato",
      "Consegna in 1–3 giorni lavorativi",
      "Supporto tecnico 30 giorni",
    ],
    autoridad: [
      "Tutto il piano Essenziale incluso",
      "SEO tecnico + indicizzazione Google (Analytics + Search Console)",
      "Fino a 8 pagine + blog ottimizzato SEO",
      "SEO avanzato per settore (cliniche, avvocati…)",
      "Copy di conversione (CRO) incluso dal nostro team",
      "Dominio .com tuo + hosting 1 anno",
      "Moduli avanzati di acquisizione lead",
      "Posizionamento locale su Google Maps",
      "Sai quante persone visitano il tuo sito",
      "FAQ con dati strutturati (rich results)",
      "GEO SEO: visibile su ChatGPT, Gemini e Claude",
      "Supporto e modifiche per 60 giorni",
    ],
    dominio: [
      "Sistema di appuntamenti o prenotazioni online",
      "Negozio online per vendere i tuoi prodotti",
      "Automazioni che lavorano per te",
      "Integrazione con i tuoi strumenti attuali",
      "Pannello per gestire i tuoi contenuti",
      "GEO SEO: visibile su ChatGPT, Gemini e Claude",
      "Posizionamento avanzato su Google",
      "Supporto prioritario dedicato 6 mesi",
    ],
  },
};

/* «Lo que NO incluye» — solo Presencia Esencial (refuerza el upsell). */
export const PLAN_NOT_INCLUDED_TITLE: Record<NexusLang, string> = {
  es: "Lo que NO incluye este plan",
  en: "What this plan does NOT include",
  fr: "Ce que ce plan N'INCLUT PAS",
  it: "Cosa NON include questo piano",
};

export const PLAN_NOT_INCLUDED: Record<NexusLang, Record<string, string[]>> = {
  es: {
    esencial: [
      "SEO técnico avanzado + indexación en Google",
      "Blog optimizado para SEO",
      "Dominio propio + hosting incluido",
      "Posicionamiento en Google Maps",
      "Landing de captación por servicio",
    ],
  },
  en: {
    esencial: [
      "Advanced technical SEO + Google indexing",
      "SEO-optimised blog",
      "Own domain + hosting included",
      "Google Maps positioning",
      "Lead-capture landing per service",
    ],
  },
  fr: {
    esencial: [
      "SEO technique avancé + indexation Google",
      "Blog optimisé SEO",
      "Domaine propre + hébergement inclus",
      "Positionnement sur Google Maps",
      "Landing de capture par service",
    ],
  },
  it: {
    esencial: [
      "SEO tecnico avanzato + indicizzazione Google",
      "Blog ottimizzato SEO",
      "Dominio proprio + hosting incluso",
      "Posizionamento su Google Maps",
      "Landing di acquisizione per servizio",
    ],
  },
};
