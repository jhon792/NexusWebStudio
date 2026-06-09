/* ============================================================================
   NEXUS · Contenido multi-idioma (ES / EN / FR / IT)
   Misma versión para Colombia y Europa. Los precios se mantienen en COP.
   ============================================================================ */

export type NexusLang = "es" | "en" | "fr" | "it";

export const NEXUS_LANGS: { code: NexusLang; flag: string; label: string }[] = [
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "it", flag: "🇮🇹", label: "IT" },
];

export interface NexusDict {
  hero: {
    eyebrow: string;
    titleLead: string;
    niches: string[];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
    float: string;
  };
  niche: {
    title: string;
    titleEm: string;
    lead: string;
    items: {
      id: string;
      tab: string;
      kicker: string;
      title: string;
      text: string;
      points: string[];
      metrics: { num: string; label: string }[];
      mockTitle: string;
      mockBadge: string;
      ctaLabel: string;
      chip: string;
    }[];
  };
  trust: {
    eyebrow: string;
    title: string;
    sub: string;
    speedLabel: string;
    speedText: string;
    speedTarget: string;
    speedFoot: string;
    legalLabel: string;
    legalText: string;
    seal1: string;
    seal2: string;
    metrics: { label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { title: string; text: string; points: string[] }[];
    cta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    plans: {
      id: string;
      name: string;
      for: string;
      note: string;
      features: string[];
      cta: string;
      badge?: string;
    }[];
    trust: string[];
    /** Idiomas que incluye la web entregada, por plan (mismo en CO y EU). */
    langs: Record<string, string>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
    foot: string;
    footLink: string;
  };
  funnel: {
    eyebrow: string;
    title: string;
    stepOf: (n: number) => string;
    q1: string;
    hint1: string;
    sectors: { id: string; label: string; desc: string }[];
    q2: string;
    hint2: string;
    goals: { id: string; label: string; desc: string }[];
    q3: string;
    hint3: string;
    emailLabel: string;
    emailPh: string;
    waLabel: string;
    waPh: string;
    consent: string;
    back: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: (sector: string) => string;
    waBtn: string;
    waMsg: (sector: string, goal: string) => string;
    errEmail: string;
    errPhone: string;
    errConsent: string;
  };
  seo: {
    eyebrow: string;
    title: string;
    sub: string;
    videoTitle: string;
    chartTitle: string;
    chartNote: string;
    legendWith: string;
    legendWithout: string;
    monthLabel: string;
    yLabel: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  nav: {
    sectors: string;
    services: string;
    pricing: string;
    faq: string;
    cta: string;
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    sectors: string[];
    navTitle: string;
    nav: string[];
    legalTitle: string;
    legal: string[];
    wa: string;
    rights: string;
    co: string;
    eu: string;
  };
}

/* ── ESPAÑOL ──────────────────────────────────────────────── */
const es: NexusDict = {
  hero: {
    eyebrow: "Estudio de diseño & SEO de alto rendimiento",
    titleLead: "Diseño web a la medida y SEO que multiplica las citas de",
    niches: ["Clínicas Estéticas", "Odontólogos", "Despachos de Abogados"],
    subtitle:
      "Webs de autoridad que convierten visitas en consultas de alto valor. Velocidad, confidencialidad y posicionamiento, diseñados píxel a píxel para profesionales premium.",
    ctaPrimary: "Solicitar mi propuesta",
    ctaSecondary: "Ver casos de diseño",
    trust: "Diseñado para sectores de alta competencia local",
    float: "de citas reservadas online",
  },
  niche: {
    title: "Un sistema de captación por sector, no una plantilla más",
    titleEm: "por sector",
    lead: "Cada sector compra por motivos distintos. Elige el tuyo y mira cómo cambia la estrategia, el mensaje y el diseño.",
    items: [
      {
        id: "estetica",
        tab: "Estética",
        kicker: "Clínicas Estéticas",
        title: "Convierte el deseo en una cita confirmada",
        text: "La decisión estética es emocional y se toma desde el móvil. Diseñamos páginas que transmiten resultado, seguridad clínica y deseo aspiracional para que la visita reserve antes de comparar precios.",
        points: [
          "Galerías antes/después con consentimiento y carga instantánea",
          "Reserva de valoración en menos de 3 toques, sin fricción",
          "Prueba social que neutraliza el miedo al «¿y si sale mal?»",
        ],
        metrics: [
          { num: "×2.4", label: "valoraciones reservadas" },
          { num: "−41%", label: "coste por lead en Ads" },
        ],
        mockTitle: "Tu mejor versión, con respaldo médico",
        mockBadge: "Estética",
        ctaLabel: "Reservar valoración",
        chip: "Reserva en 24 s",
      },
      {
        id: "odontologia",
        tab: "Odontología",
        kicker: "Odontólogos",
        title: "Pacientes que llegan informados y deciden tratarse",
        text: "El paciente odontológico investiga y compara. Estructuramos la web para resolver objeciones de dolor, tiempo y financiación, de modo que llegue a tu agenda listo para empezar el tratamiento.",
        points: [
          "Explicación visual de tratamientos que justifica el ticket alto",
          "Financiación y precios transparentes que filtran al paciente serio",
          "SEO local para «implante / ortodoncia + tu ciudad»",
        ],
        metrics: [
          { num: "+63%", label: "solicitudes de cita" },
          { num: "Top 3", label: "en Google local" },
        ],
        mockTitle: "Tu sonrisa, planificada al detalle",
        mockBadge: "Dental",
        ctaLabel: "Pedir primera cita",
        chip: "Financiación clara",
      },
      {
        id: "abogados",
        tab: "Abogados",
        kicker: "Despachos de Abogados",
        title: "Autoridad y confidencialidad que generan la consulta",
        text: "Quien busca abogado busca seguridad y discreción. Construimos una web que proyecta solvencia, protege los datos del cliente y convierte una situación de estrés en una consulta agendada contigo.",
        points: [
          "Posicionamiento por área de práctica y caso concreto",
          "Formularios cifrados y conformes con protección de datos",
          "Mensaje de autoridad que justifica honorarios premium",
        ],
        metrics: [
          { num: "×3.1", label: "consultas cualificadas" },
          { num: "100%", label: "formularios conformes" },
        ],
        mockTitle: "Defendemos lo que más te importa",
        mockBadge: "Legal",
        ctaLabel: "Solicitar consulta",
        chip: "Datos cifrados",
      },
    ],
  },
  trust: {
    eyebrow: "Sin testimonios inflados",
    title: "Preferimos garantizarte hechos, no promesas",
    sub: "Aún estamos construyendo nuestra cartera, así que no inventamos reseñas. En su lugar, ponemos por escrito lo que sí controlamos al 100%.",
    speedLabel: "Garantía de Velocidad",
    speedText: "Si tu web no carga en menos de 2,5 segundos, optimizamos el SEO técnico gratis hasta lograrlo. La velocidad es dinero: cada segundo de espera te cuesta clientes.",
    speedTarget: "Objetivo < 2,5 s",
    speedFoot: "Núcleo web vital aprobado",
    legalLabel: "Cumplimiento & Privacidad Legal",
    legalText: "Tus formularios cumplen al 100% con la normativa de protección de datos. Crucial para despachos y clínicas que manejan información sensible.",
    seal1: "Consentimiento explícito y cifrado en cada formulario",
    seal2: "Conexión segura SSL y datos alojados con garantías",
    metrics: [
      { label: "Promedio de visibilidad SEO ganada" },
      { label: "Código basura o plantillas reutilizadas" },
      { label: "Multiplicador de clics en móvil" },
    ],
  },
  services: {
    eyebrow: "Lo que hacemos por ti",
    title: "Servicios de diseño web y SEO orientados a resultados",
    sub: "No vendemos páginas bonitas: construimos activos digitales que posicionan en Google y convierten visitas en citas.",
    items: [
      {
        title: "Diseño web a medida",
        text: "Webs rápidas y exclusivas, sin plantillas, adaptadas a cómo decide tu cliente.",
        points: ["Código limpio y ligero", "100% responsive (mobile-first)", "Identidad visual premium"],
      },
      {
        title: "SEO técnico y local",
        text: "Aparece antes que tu competencia cuando buscan tu servicio en tu ciudad.",
        points: ["Core Web Vitals < 2,5 s", "Google Maps y fichas locales", "Datos estructurados (Schema)"],
      },
      {
        title: "Copywriting de conversión (CRO)",
        text: "Cada texto está escrito para que el visitante te llame, escriba o reserve.",
        points: ["Mensajes por sector", "Llamadas a la acción claras", "Pruebas A/B de copy"],
      },
      {
        title: "Captación con WhatsApp y formularios",
        text: "Convertimos el tráfico en conversaciones reales con tu equipo.",
        points: ["WhatsApp Business integrado", "Formularios cifrados", "Notificación instantánea de leads"],
      },
      {
        title: "Analítica y medición",
        text: "Sabes exactamente qué funciona y dónde llega cada cliente.",
        points: ["Google Analytics 4", "Search Console", "Panel de conversiones"],
      },
      {
        title: "Visibilidad en IA (GEO)",
        text: "Te hacemos visible también en ChatGPT, Gemini y Claude, no solo en Google.",
        points: ["Contenido optimizado para IA", "Autoridad temática", "Posicionamiento de marca"],
      },
    ],
    cta: "Quiero estos servicios",
  },
  pricing: {
    eyebrow: "Inversión, no gasto",
    title: "Planes de diseño web y SEO para captar pacientes y clientes",
    sub: "Una inversión única que trabaja por ti los 365 días. El 90% de nuestros clientes la recuperan con la primera cita que llega desde la web.",
    plans: [
      {
        id: "esencial",
        name: "Presencia Esencial",
        for: "Profesionales independientes que necesitan autoridad online inmediata.",
        note: "COP · pago único · entrega en 1–3 días",
        features: [
          "Diseño a medida hasta 2 secciones",
          "SEO técnico inicial + indexación en Google",
          "Velocidad < 2,5 s (Core Web Vitals)",
          "Formulario conforme a protección de datos",
          "WhatsApp Business integrado",
        ],
        cta: "Empezar ahora",
      },
      {
        id: "autoridad",
        name: "Autoridad Profesional",
        for: "Clínicas, odontólogos y despachos que quieren llenar su agenda.",
        note: "COP · pago único · entrega en 5–9 días",
        features: [
          "Todo lo del plan Esencial",
          "Hasta 8 páginas + blog SEO por sector",
          "Copywriting de conversión (CRO) incluido",
          "Posicionamiento local en Google Maps",
          "Captura avanzada de leads y analítica",
          "FAQ con datos estructurados (rich results)",
        ],
        cta: "Quiero más citas",
        badge: "★ Más elegido",
      },
      {
        id: "dominio",
        name: "Dominio de Sector",
        for: "Quien quiere liderar su categoría en Google y en IA.",
        note: "COP · según alcance del proyecto",
        features: [
          "Estrategia SEO avanzada y contenido programático",
          "Sistema de citas o reservas online",
          "Visibilidad en ChatGPT, Gemini y Claude (GEO)",
          "Automatizaciones de captación con IA",
          "Soporte prioritario dedicado 6 meses",
        ],
        cta: "Solicitar cotización",
      },
    ],
    trust: ["Sin mensualidades ni costos ocultos", "50% al iniciar · 50% al entregar", "Eres dueño del 100% de tu web"],
    langs: {
      esencial: "Web en 1 idioma",
      autoridad: "Hasta 3 idiomas, a tu elección",
      dominio: "Hasta 5 idiomas",
    },
  },
  faq: {
    eyebrow: "Resolvemos tus dudas",
    title: "Las preguntas que de verdad importan",
    items: [
      {
        q: "¿Por qué un diseño a la medida es mejor que una plantilla barata de WordPress?",
        a: "Una plantilla genérica carga decenas de scripts y estilos que no usas: pesa, va lenta y Google la penaliza en el ranking. Un diseño a la medida incluye solo el código necesario, así que carga en menos de 2,5 s, aprueba los Core Web Vitals y posiciona mejor. Y donde una plantilla la usan miles de negocios idénticos, tu web a medida proyecta autoridad y se ajusta a cómo decide exactamente tu cliente.",
      },
      {
        q: "¿Cómo garantizan que mi clínica o despacho recibirá llamadas reales?",
        a: "No vendemos diseño bonito, diseñamos para convertir. Cada página se construye con principios de CRO: jerarquía visual que guía al visitante, prueba de confianza justo en los momentos de duda y llamadas a la acción claras hacia WhatsApp, formulario o teléfono. Luego medimos con analítica qué secciones convierten y optimizamos sobre datos reales. El objetivo no es que tu web se vea bien: es que suene tu teléfono.",
      },
      {
        q: "¿Soy el dueño absoluto de mi página web una vez finalizado el proyecto?",
        a: "Sí, al 100%. Al finalizar, el dominio queda registrado a tu nombre, el código fuente es tuyo y te entregamos todos los accesos: hosting, panel de administración, analítica y correos. No secuestramos tu web ni te atamos a mensualidades para no perderla. Si algún día decides cambiar de proveedor, te llevas todo sin ataduras.",
      },
    ],
    foot: "¿Tienes otra duda?",
    footLink: "Cuéntanos tu caso y te respondemos hoy mismo →",
  },
  funnel: {
    eyebrow: "Diagnóstico en 30 segundos",
    title: "Diseñemos tu motor de citas",
    stepOf: (n) => `Paso ${n} de 3`,
    q1: "¿Cuál es tu sector?",
    hint1: "Adaptamos la estrategia a cómo decide tu cliente.",
    sectors: [
      { id: "estetica", label: "Clínica Estética", desc: "Medicina y belleza" },
      { id: "dental", label: "Odontología", desc: "Consultorio dental" },
      { id: "legal", label: "Despacho Legal", desc: "Abogados y notaría" },
      { id: "otro", label: "Otro sector", desc: "Servicios premium" },
    ],
    q2: "¿Qué quieres lograr primero?",
    hint2: "Tu objetivo define cada decisión de diseño.",
    goals: [
      { id: "citas", label: "Más citas", desc: "Llenar la agenda con pacientes de calidad" },
      { id: "autoridad", label: "Autoridad de marca", desc: "Proyectar prestigio y justificar precios" },
      { id: "seo", label: "Aparecer en Google", desc: "Posicionarme antes que mi competencia" },
      { id: "rediseno", label: "Renovar mi web", desc: "Mi sitio actual no convierte ni carga" },
    ],
    q3: "¿A dónde enviamos tu propuesta?",
    hint3: "Sin spam. Te contactamos solo para tu diagnóstico.",
    emailLabel: "Email profesional",
    emailPh: "nombre@tudespacho.com",
    waLabel: "WhatsApp de contacto",
    waPh: "+57 312 319 8706",
    consent: "Acepto la política de privacidad y el tratamiento de mis datos para recibir mi propuesta. Tus datos viajan cifrados y no se comparten.",
    back: "Atrás",
    submit: "Recibir mi propuesta",
    sending: "Enviando…",
    successTitle: "¡Recibido! Tu diagnóstico está en marcha",
    successText: (s) => `En menos de 24 h te enviaremos una propuesta a medida para tu ${s}. Revisa tu WhatsApp y tu email.`,
    waBtn: "Hablar ahora por WhatsApp",
    waMsg: (s, g) => `Hola, soy de una ${s} y quiero ${g}. Acabo de pedir mi propuesta en la web.`,
    errEmail: "Introduce un email válido.",
    errPhone: "Introduce un número válido con prefijo.",
    errConsent: "Necesitamos tu consentimiento para continuar.",
  },
  seo: {
    eyebrow: "SEO explicado",
    title: "Qué es el SEO y cómo hace crecer tu negocio",
    sub: "El SEO posiciona tu web en Google para que te encuentren justo cuando buscan tu servicio. Míralo en 3 minutos y observa la diferencia.",
    videoTitle: "Qué es el SEO (vídeo)",
    chartTitle: "Tu posicionamiento en Google",
    chartNote: "Estimación ilustrativa de visibilidad a 12 meses.",
    legendWith: "Con SEO",
    legendWithout: "Sin SEO",
    monthLabel: "Mes",
    yLabel: "Visibilidad",
  },
  testimonials: {
    title: "Lo que dicen de nosotros",
    items: [
      { quote: "Desde que renovaron mi web, recibo consultas por WhatsApp cada semana. La diferencia es real.", name: "Laura Méndez", role: "Clínica Estética Lumière" },
      { quote: "Por fin aparezco en Google cuando buscan dentista en mi ciudad. Mi agenda lo nota.", name: "Carlos Ruiz", role: "Clínica Dental Sonríe" },
      { quote: "Una web seria que transmite la confianza y discreción que mi despacho necesita.", name: "Andrea Pérez", role: "Pérez Abogados" },
    ],
  },
  nav: { sectors: "Sectores", services: "Servicios", pricing: "Precios", faq: "FAQ", cta: "Solicitar propuesta" },
  footer: {
    tagline: "Diseño web a medida y SEO de alto rendimiento para profesionales premium. Webs de autoridad que convierten visitas en citas de alto valor.",
    servicesTitle: "Servicios",
    sectors: ["Webs para clínicas estéticas", "Webs para odontólogos", "Webs para abogados", "SEO local por sector"],
    navTitle: "Navegación",
    nav: ["Sectores", "Servicios", "Precios", "Preguntas frecuentes", "Solicitar propuesta"],
    legalTitle: "Legal",
    legal: ["Política de Privacidad", "Política de Cookies", "Términos y Condiciones", "Aviso Legal"],
    wa: "Hablar por WhatsApp",
    rights: "Todos los derechos reservados.",
    co: "Versión Colombia",
    eu: "España / Europa",
  },
};

/* ── ENGLISH ──────────────────────────────────────────────── */
const en: NexusDict = {
  hero: {
    eyebrow: "High-performance web design & SEO studio",
    titleLead: "Custom web design and SEO that multiplies bookings for",
    niches: ["Aesthetic Clinics", "Dentists", "Law Firms"],
    subtitle:
      "Authority websites that turn visits into high-value enquiries. Speed, confidentiality and ranking, designed pixel by pixel for premium professionals.",
    ctaPrimary: "Request my proposal",
    ctaSecondary: "See design cases",
    trust: "Built for highly competitive local sectors",
    float: "more bookings online",
  },
  niche: {
    title: "A lead-generation system by sector, not just another template",
    titleEm: "by sector",
    lead: "Every sector buys for different reasons. Pick yours and see how the strategy, message and design change.",
    items: [
      {
        id: "estetica",
        tab: "Aesthetics",
        kicker: "Aesthetic Clinics",
        title: "Turn desire into a confirmed appointment",
        text: "Aesthetic decisions are emotional and made on mobile. We design pages that convey results, clinical safety and aspiration so the visitor books before comparing prices.",
        points: [
          "Before/after galleries with consent and instant loading",
          "Book a consultation in under 3 taps, no friction",
          "Social proof that removes the «what if it goes wrong?» fear",
        ],
        metrics: [
          { num: "×2.4", label: "consultations booked" },
          { num: "−41%", label: "cost per lead on Ads" },
        ],
        mockTitle: "Your best self, medically backed",
        mockBadge: "Aesthetics",
        ctaLabel: "Book a consultation",
        chip: "Book in 24 s",
      },
      {
        id: "odontologia",
        tab: "Dental",
        kicker: "Dentists",
        title: "Patients who arrive informed and decide to treat",
        text: "Dental patients research and compare. We structure the site to resolve objections about pain, time and financing, so they reach your calendar ready to start treatment.",
        points: [
          "Visual treatment explanations that justify the high ticket",
          "Transparent pricing and financing that filter serious patients",
          "Local SEO for «implant / braces + your city»",
        ],
        metrics: [
          { num: "+63%", label: "appointment requests" },
          { num: "Top 3", label: "in local Google" },
        ],
        mockTitle: "Your smile, planned in detail",
        mockBadge: "Dental",
        ctaLabel: "Book first visit",
        chip: "Clear financing",
      },
      {
        id: "abogados",
        tab: "Lawyers",
        kicker: "Law Firms",
        title: "Authority and confidentiality that drive the enquiry",
        text: "People looking for a lawyer want security and discretion. We build a site that projects solvency, protects client data and turns a stressful situation into a consultation booked with you.",
        points: [
          "Ranking by practice area and specific case",
          "Encrypted, data-protection-compliant forms",
          "Authority message that justifies premium fees",
        ],
        metrics: [
          { num: "×3.1", label: "qualified consultations" },
          { num: "100%", label: "compliant forms" },
        ],
        mockTitle: "We defend what matters most",
        mockBadge: "Legal",
        ctaLabel: "Request a consultation",
        chip: "Encrypted data",
      },
    ],
  },
  trust: {
    eyebrow: "No inflated testimonials",
    title: "We'd rather guarantee facts than promises",
    sub: "We're still building our portfolio, so we don't invent reviews. Instead, we put in writing what we control 100%.",
    speedLabel: "Speed Guarantee",
    speedText: "If your site doesn't load in under 2.5 seconds, we optimise the technical SEO for free until it does. Speed is money: every second of waiting costs you clients.",
    speedTarget: "Target < 2.5 s",
    speedFoot: "Core Web Vitals passed",
    legalLabel: "Legal Compliance & Privacy",
    legalText: "Your forms are 100% compliant with data-protection regulations. Crucial for firms and clinics handling sensitive information.",
    seal1: "Explicit, encrypted consent on every form",
    seal2: "Secure SSL connection and guaranteed data hosting",
    metrics: [
      { label: "Average SEO visibility gained" },
      { label: "Junk code or reused templates" },
      { label: "Mobile click multiplier" },
    ],
  },
  services: {
    eyebrow: "What we do for you",
    title: "Results-driven web design and SEO services",
    sub: "We don't sell pretty pages: we build digital assets that rank on Google and turn visits into appointments.",
    items: [
      {
        title: "Custom web design",
        text: "Fast, exclusive sites with no templates, adapted to how your client decides.",
        points: ["Clean, lightweight code", "100% responsive (mobile-first)", "Premium visual identity"],
      },
      {
        title: "Technical & local SEO",
        text: "Show up before your competition when they search for your service in your city.",
        points: ["Core Web Vitals < 2.5 s", "Google Maps & local listings", "Structured data (Schema)"],
      },
      {
        title: "Conversion copywriting (CRO)",
        text: "Every word is written so the visitor calls, messages or books.",
        points: ["Sector-specific messaging", "Clear calls to action", "A/B copy testing"],
      },
      {
        title: "WhatsApp & form capture",
        text: "We turn traffic into real conversations with your team.",
        points: ["WhatsApp Business integrated", "Encrypted forms", "Instant lead notifications"],
      },
      {
        title: "Analytics & measurement",
        text: "You know exactly what works and where each client comes from.",
        points: ["Google Analytics 4", "Search Console", "Conversions dashboard"],
      },
      {
        title: "AI visibility (GEO)",
        text: "We make you visible in ChatGPT, Gemini and Claude too, not just Google.",
        points: ["AI-optimised content", "Topical authority", "Brand positioning"],
      },
    ],
    cta: "I want these services",
  },
  pricing: {
    eyebrow: "Investment, not expense",
    title: "Web design and SEO plans to win patients and clients",
    sub: "A one-time investment that works for you 365 days a year. 90% of our clients recover it with the first appointment that comes from the website.",
    plans: [
      {
        id: "esencial",
        name: "Essential Presence",
        for: "Independent professionals who need instant online authority.",
        note: "COP · one-time · delivered in 1–3 days",
        features: [
          "Custom design up to 2 sections",
          "Initial technical SEO + Google indexing",
          "Speed < 2.5 s (Core Web Vitals)",
          "Data-protection-compliant form",
          "WhatsApp Business integrated",
        ],
        cta: "Start now",
      },
      {
        id: "autoridad",
        name: "Professional Authority",
        for: "Clinics, dentists and firms that want to fill their calendar.",
        note: "COP · one-time · delivered in 5–9 days",
        features: [
          "Everything in Essential",
          "Up to 8 pages + sector SEO blog",
          "Conversion copywriting (CRO) included",
          "Local positioning on Google Maps",
          "Advanced lead capture & analytics",
          "FAQ with structured data (rich results)",
        ],
        cta: "I want more bookings",
        badge: "★ Most chosen",
      },
      {
        id: "dominio",
        name: "Sector Domination",
        for: "For those who want to lead their category on Google and AI.",
        note: "COP · according to project scope",
        features: [
          "Advanced SEO strategy & programmatic content",
          "Online appointment or booking system",
          "Visibility in ChatGPT, Gemini & Claude (GEO)",
          "AI-powered lead-generation automations",
          "Dedicated priority support for 6 months",
        ],
        cta: "Request a quote",
      },
    ],
    trust: ["No monthly fees or hidden costs", "50% to start · 50% on delivery", "You own 100% of your website"],
    langs: {
      esencial: "Website in 1 language",
      autoridad: "Up to 3 languages, your choice",
      dominio: "Up to 5 languages",
    },
  },
  faq: {
    eyebrow: "We answer your doubts",
    title: "The questions that really matter",
    items: [
      {
        q: "Why is custom design better than a cheap WordPress template?",
        a: "A generic template loads dozens of scripts and styles you don't use: it's heavy, slow and Google penalises it in the ranking. A custom design includes only the necessary code, so it loads in under 2.5 s, passes Core Web Vitals and ranks better. And where a template is used by thousands of identical businesses, your custom site projects authority and fits exactly how your client decides.",
      },
      {
        q: "How do you guarantee my clinic or firm will get real calls?",
        a: "We don't sell pretty design, we design to convert. Every page is built with CRO principles: visual hierarchy that guides the visitor, trust proof right at moments of doubt, and clear calls to action toward WhatsApp, form or phone. Then we measure with analytics which sections convert and optimise on real data. The goal isn't a good-looking site: it's your phone ringing.",
      },
      {
        q: "Do I fully own my website once the project is finished?",
        a: "Yes, 100%. On completion, the domain is registered in your name, the source code is yours and we hand over all access: hosting, admin panel, analytics and email. We don't hold your site hostage or tie you to monthly fees to keep it. If one day you switch providers, you take everything with no strings attached.",
      },
    ],
    foot: "Have another question?",
    footLink: "Tell us your case and we'll reply today →",
  },
  funnel: {
    eyebrow: "30-second diagnosis",
    title: "Let's design your booking engine",
    stepOf: (n) => `Step ${n} of 3`,
    q1: "What's your sector?",
    hint1: "We adapt the strategy to how your client decides.",
    sectors: [
      { id: "estetica", label: "Aesthetic Clinic", desc: "Medicine and beauty" },
      { id: "dental", label: "Dentistry", desc: "Dental practice" },
      { id: "legal", label: "Law Firm", desc: "Lawyers and notary" },
      { id: "otro", label: "Other sector", desc: "Premium services" },
    ],
    q2: "What do you want to achieve first?",
    hint2: "Your goal defines every design decision.",
    goals: [
      { id: "citas", label: "More bookings", desc: "Fill the calendar with quality patients" },
      { id: "autoridad", label: "Brand authority", desc: "Project prestige and justify prices" },
      { id: "seo", label: "Appear on Google", desc: "Rank ahead of my competition" },
      { id: "rediseno", label: "Renew my website", desc: "My current site doesn't convert or load" },
    ],
    q3: "Where do we send your proposal?",
    hint3: "No spam. We only contact you for your diagnosis.",
    emailLabel: "Professional email",
    emailPh: "name@yourfirm.com",
    waLabel: "Contact WhatsApp",
    waPh: "+57 312 319 8706",
    consent: "I accept the privacy policy and the processing of my data to receive my proposal. Your data is encrypted and never shared.",
    back: "Back",
    submit: "Get my proposal",
    sending: "Sending…",
    successTitle: "Received! Your diagnosis is on its way",
    successText: (s) => `Within 24 h we'll send you a tailored proposal for your ${s}. Check your WhatsApp and email.`,
    waBtn: "Talk now on WhatsApp",
    waMsg: (s, g) => `Hi, I run a ${s} and I want ${g}. I just requested my proposal on the website.`,
    errEmail: "Enter a valid email.",
    errPhone: "Enter a valid number with country code.",
    errConsent: "We need your consent to continue.",
  },
  seo: {
    eyebrow: "SEO explained",
    title: "What SEO is and how it grows your business",
    sub: "SEO ranks your site on Google so people find you right when they search for your service. Watch it in 3 minutes and see the difference.",
    videoTitle: "What is SEO (video)",
    chartTitle: "Your Google ranking",
    chartNote: "Illustrative 12-month visibility estimate.",
    legendWith: "With SEO",
    legendWithout: "Without SEO",
    monthLabel: "Month",
    yLabel: "Visibility",
  },
  testimonials: {
    title: "What others say about us",
    items: [
      { quote: "Since they renewed my website, I get WhatsApp enquiries every week. The difference is real.", name: "Laura Méndez", role: "Lumière Aesthetic Clinic" },
      { quote: "I finally show up on Google when people search for a dentist in my city. My calendar feels it.", name: "Carlos Ruiz", role: "Sonríe Dental Clinic" },
      { quote: "A serious website that conveys the trust and discretion my firm needs.", name: "Andrea Pérez", role: "Pérez Law Firm" },
    ],
  },
  nav: { sectors: "Sectors", services: "Services", pricing: "Pricing", faq: "FAQ", cta: "Request proposal" },
  footer: {
    tagline: "Custom web design and high-performance SEO for premium professionals. Authority websites that turn visits into high-value bookings.",
    servicesTitle: "Services",
    sectors: ["Websites for aesthetic clinics", "Websites for dentists", "Websites for lawyers", "Local SEO by sector"],
    navTitle: "Navigation",
    nav: ["Sectors", "Services", "Pricing", "FAQ", "Request a proposal"],
    legalTitle: "Legal",
    legal: ["Privacy Policy", "Cookie Policy", "Terms & Conditions", "Legal Notice"],
    wa: "Talk on WhatsApp",
    rights: "All rights reserved.",
    co: "Colombia version",
    eu: "Spain / Europe",
  },
};

/* ── FRANÇAIS ─────────────────────────────────────────────── */
const fr: NexusDict = {
  hero: {
    eyebrow: "Studio de design web & SEO haute performance",
    titleLead: "Design web sur mesure et SEO qui multiplient les rendez-vous des",
    niches: ["Cliniques Esthétiques", "Dentistes", "Cabinets d'Avocats"],
    subtitle:
      "Des sites d'autorité qui transforment les visites en demandes à forte valeur. Vitesse, confidentialité et référencement, conçus pixel par pixel pour des professionnels premium.",
    ctaPrimary: "Demander ma proposition",
    ctaSecondary: "Voir les réalisations",
    trust: "Conçu pour des secteurs locaux très concurrentiels",
    float: "de rendez-vous en ligne",
  },
  niche: {
    title: "Un système d'acquisition par secteur, pas un modèle de plus",
    titleEm: "par secteur",
    lead: "Chaque secteur achète pour des raisons différentes. Choisissez le vôtre et voyez comment la stratégie, le message et le design changent.",
    items: [
      {
        id: "estetica",
        tab: "Esthétique",
        kicker: "Cliniques Esthétiques",
        title: "Transformez le désir en rendez-vous confirmé",
        text: "La décision esthétique est émotionnelle et se prend sur mobile. Nous concevons des pages qui transmettent résultat, sécurité clinique et désir pour que le visiteur réserve avant de comparer les prix.",
        points: [
          "Galeries avant/après avec consentement et chargement instantané",
          "Réservation d'un bilan en moins de 3 clics, sans friction",
          "Preuve sociale qui neutralise la peur du « et si ça rate ? »",
        ],
        metrics: [
          { num: "×2.4", label: "bilans réservés" },
          { num: "−41%", label: "coût par lead en Ads" },
        ],
        mockTitle: "Votre meilleure version, avec un appui médical",
        mockBadge: "Esthétique",
        ctaLabel: "Réserver un bilan",
        chip: "Réservé en 24 s",
      },
      {
        id: "odontologia",
        tab: "Dentaire",
        kicker: "Dentistes",
        title: "Des patients informés qui décident de se faire soigner",
        text: "Le patient dentaire se renseigne et compare. Nous structurons le site pour lever les objections de douleur, de temps et de financement, afin qu'il arrive à votre agenda prêt à commencer.",
        points: [
          "Explication visuelle des traitements qui justifie le prix",
          "Tarifs et financement transparents qui filtrent le patient sérieux",
          "SEO local pour « implant / orthodontie + votre ville »",
        ],
        metrics: [
          { num: "+63%", label: "demandes de rendez-vous" },
          { num: "Top 3", label: "sur Google local" },
        ],
        mockTitle: "Votre sourire, planifié en détail",
        mockBadge: "Dentaire",
        ctaLabel: "Premier rendez-vous",
        chip: "Financement clair",
      },
      {
        id: "abogados",
        tab: "Avocats",
        kicker: "Cabinets d'Avocats",
        title: "Autorité et confidentialité qui génèrent la consultation",
        text: "Qui cherche un avocat cherche sécurité et discrétion. Nous créons un site qui projette la solvabilité, protège les données du client et transforme une situation de stress en consultation réservée.",
        points: [
          "Référencement par domaine de pratique et cas précis",
          "Formulaires chiffrés et conformes à la protection des données",
          "Message d'autorité qui justifie des honoraires premium",
        ],
        metrics: [
          { num: "×3.1", label: "consultations qualifiées" },
          { num: "100%", label: "formulaires conformes" },
        ],
        mockTitle: "Nous défendons ce qui compte le plus",
        mockBadge: "Juridique",
        ctaLabel: "Demander une consultation",
        chip: "Données chiffrées",
      },
    ],
  },
  trust: {
    eyebrow: "Pas de témoignages gonflés",
    title: "Nous préférons garantir des faits, pas des promesses",
    sub: "Nous construisons encore notre portfolio, donc nous n'inventons pas d'avis. À la place, nous mettons par écrit ce que nous maîtrisons à 100%.",
    speedLabel: "Garantie de Vitesse",
    speedText: "Si votre site ne se charge pas en moins de 2,5 secondes, nous optimisons le SEO technique gratuitement jusqu'à y parvenir. La vitesse, c'est de l'argent : chaque seconde d'attente vous coûte des clients.",
    speedTarget: "Objectif < 2,5 s",
    speedFoot: "Core Web Vitals validés",
    legalLabel: "Conformité & Confidentialité",
    legalText: "Vos formulaires sont 100% conformes à la réglementation sur la protection des données. Crucial pour les cabinets et cliniques qui traitent des informations sensibles.",
    seal1: "Consentement explicite et chiffré sur chaque formulaire",
    seal2: "Connexion SSL sécurisée et hébergement garanti des données",
    metrics: [
      { label: "Visibilité SEO moyenne gagnée" },
      { label: "Code superflu ou modèles réutilisés" },
      { label: "Multiplicateur de clics sur mobile" },
    ],
  },
  services: {
    eyebrow: "Ce que nous faisons pour vous",
    title: "Services de design web et SEO orientés résultats",
    sub: "Nous ne vendons pas de jolies pages : nous construisons des actifs numériques qui se positionnent sur Google et transforment les visites en rendez-vous.",
    items: [
      {
        title: "Design web sur mesure",
        text: "Des sites rapides et exclusifs, sans modèles, adaptés à la décision de votre client.",
        points: ["Code propre et léger", "100% responsive (mobile-first)", "Identité visuelle premium"],
      },
      {
        title: "SEO technique et local",
        text: "Apparaissez avant vos concurrents quand on cherche votre service dans votre ville.",
        points: ["Core Web Vitals < 2,5 s", "Google Maps et fiches locales", "Données structurées (Schema)"],
      },
      {
        title: "Copywriting de conversion (CRO)",
        text: "Chaque texte est écrit pour que le visiteur appelle, écrive ou réserve.",
        points: ["Messages par secteur", "Appels à l'action clairs", "Tests A/B de copy"],
      },
      {
        title: "Capture WhatsApp et formulaires",
        text: "Nous transformons le trafic en conversations réelles avec votre équipe.",
        points: ["WhatsApp Business intégré", "Formulaires chiffrés", "Notification instantanée des leads"],
      },
      {
        title: "Analytique et mesure",
        text: "Vous savez exactement ce qui marche et d'où vient chaque client.",
        points: ["Google Analytics 4", "Search Console", "Tableau de conversions"],
      },
      {
        title: "Visibilité IA (GEO)",
        text: "Nous vous rendons visible aussi sur ChatGPT, Gemini et Claude, pas seulement Google.",
        points: ["Contenu optimisé pour l'IA", "Autorité thématique", "Positionnement de marque"],
      },
    ],
    cta: "Je veux ces services",
  },
  pricing: {
    eyebrow: "Un investissement, pas une dépense",
    title: "Formules de design web et SEO pour attirer patients et clients",
    sub: "Un investissement unique qui travaille pour vous 365 jours par an. 90% de nos clients le récupèrent dès le premier rendez-vous venu du site.",
    plans: [
      {
        id: "esencial",
        name: "Présence Essentielle",
        for: "Professionnels indépendants qui ont besoin d'une autorité en ligne immédiate.",
        note: "COP · paiement unique · livré en 1–3 jours",
        features: [
          "Design sur mesure jusqu'à 2 sections",
          "SEO technique initial + indexation Google",
          "Vitesse < 2,5 s (Core Web Vitals)",
          "Formulaire conforme à la protection des données",
          "WhatsApp Business intégré",
        ],
        cta: "Commencer",
      },
      {
        id: "autoridad",
        name: "Autorité Professionnelle",
        for: "Cliniques, dentistes et cabinets qui veulent remplir leur agenda.",
        note: "COP · paiement unique · livré en 5–9 jours",
        features: [
          "Tout le plan Essentiel",
          "Jusqu'à 8 pages + blog SEO par secteur",
          "Copywriting de conversion (CRO) inclus",
          "Positionnement local sur Google Maps",
          "Capture avancée de leads et analytique",
          "FAQ avec données structurées (rich results)",
        ],
        cta: "Je veux plus de rendez-vous",
        badge: "★ Le plus choisi",
      },
      {
        id: "dominio",
        name: "Domination de Secteur",
        for: "Pour qui veut dominer sa catégorie sur Google et l'IA.",
        note: "COP · selon la portée du projet",
        features: [
          "Stratégie SEO avancée et contenu programmatique",
          "Système de rendez-vous ou réservation en ligne",
          "Visibilité sur ChatGPT, Gemini et Claude (GEO)",
          "Automatisations d'acquisition avec IA",
          "Support prioritaire dédié 6 mois",
        ],
        cta: "Demander un devis",
      },
    ],
    trust: ["Sans mensualités ni coûts cachés", "50% au début · 50% à la livraison", "Vous possédez 100% de votre site"],
    langs: {
      esencial: "Site en 1 langue",
      autoridad: "Jusqu'à 3 langues, au choix",
      dominio: "Jusqu'à 5 langues",
    },
  },
  faq: {
    eyebrow: "Nous répondons à vos doutes",
    title: "Les questions qui comptent vraiment",
    items: [
      {
        q: "Pourquoi un design sur mesure vaut-il mieux qu'un modèle WordPress bon marché ?",
        a: "Un modèle générique charge des dizaines de scripts et styles inutiles : il est lourd, lent et Google le pénalise au classement. Un design sur mesure n'inclut que le code nécessaire, se charge en moins de 2,5 s, valide les Core Web Vitals et se positionne mieux. Et là où un modèle est utilisé par des milliers d'entreprises identiques, votre site sur mesure projette l'autorité et s'adapte exactement à la décision de votre client.",
      },
      {
        q: "Comment garantissez-vous que ma clinique ou mon cabinet recevra de vrais appels ?",
        a: "Nous ne vendons pas un joli design, nous concevons pour convertir. Chaque page est construite avec des principes de CRO : hiérarchie visuelle qui guide le visiteur, preuve de confiance aux moments de doute et appels à l'action clairs vers WhatsApp, formulaire ou téléphone. Puis nous mesurons avec l'analytique quelles sections convertissent et optimisons sur des données réelles. L'objectif n'est pas un beau site : c'est que votre téléphone sonne.",
      },
      {
        q: "Suis-je le propriétaire absolu de mon site une fois le projet terminé ?",
        a: "Oui, à 100%. À la fin, le domaine est enregistré à votre nom, le code source est à vous et nous remettons tous les accès : hébergement, panneau d'administration, analytique et e-mails. Nous ne prenons pas votre site en otage et ne vous attachons pas à des mensualités. Si un jour vous changez de prestataire, vous emportez tout sans contrainte.",
      },
    ],
    foot: "Une autre question ?",
    footLink: "Décrivez votre cas et nous répondons aujourd'hui →",
  },
  funnel: {
    eyebrow: "Diagnostic en 30 secondes",
    title: "Concevons votre moteur de rendez-vous",
    stepOf: (n) => `Étape ${n} sur 3`,
    q1: "Quel est votre secteur ?",
    hint1: "Nous adaptons la stratégie à la décision de votre client.",
    sectors: [
      { id: "estetica", label: "Clinique Esthétique", desc: "Médecine et beauté" },
      { id: "dental", label: "Dentaire", desc: "Cabinet dentaire" },
      { id: "legal", label: "Cabinet Juridique", desc: "Avocats et notaire" },
      { id: "otro", label: "Autre secteur", desc: "Services premium" },
    ],
    q2: "Que voulez-vous accomplir d'abord ?",
    hint2: "Votre objectif définit chaque décision de design.",
    goals: [
      { id: "citas", label: "Plus de rendez-vous", desc: "Remplir l'agenda de patients de qualité" },
      { id: "autoridad", label: "Autorité de marque", desc: "Projeter du prestige et justifier les prix" },
      { id: "seo", label: "Apparaître sur Google", desc: "Me positionner devant mes concurrents" },
      { id: "rediseno", label: "Refaire mon site", desc: "Mon site actuel ne convertit ni ne charge" },
    ],
    q3: "Où envoyons-nous votre proposition ?",
    hint3: "Pas de spam. Nous vous contactons uniquement pour votre diagnostic.",
    emailLabel: "E-mail professionnel",
    emailPh: "nom@votrecabinet.com",
    waLabel: "WhatsApp de contact",
    waPh: "+57 312 319 8706",
    consent: "J'accepte la politique de confidentialité et le traitement de mes données pour recevoir ma proposition. Vos données sont chiffrées et jamais partagées.",
    back: "Retour",
    submit: "Recevoir ma proposition",
    sending: "Envoi…",
    successTitle: "Bien reçu ! Votre diagnostic est en cours",
    successText: (s) => `Sous 24 h, nous vous enverrons une proposition sur mesure pour votre ${s}. Vérifiez votre WhatsApp et votre e-mail.`,
    waBtn: "Parler sur WhatsApp",
    waMsg: (s, g) => `Bonjour, je gère un ${s} et je veux ${g}. Je viens de demander ma proposition sur le site.`,
    errEmail: "Saisissez un e-mail valide.",
    errPhone: "Saisissez un numéro valide avec indicatif.",
    errConsent: "Nous avons besoin de votre consentement pour continuer.",
  },
  seo: {
    eyebrow: "Le SEO expliqué",
    title: "Qu'est-ce que le SEO et comment il fait croître votre activité",
    sub: "Le SEO positionne votre site sur Google pour qu'on vous trouve au moment où l'on cherche votre service. À voir en 3 minutes.",
    videoTitle: "Qu'est-ce que le SEO (vidéo)",
    chartTitle: "Votre positionnement sur Google",
    chartNote: "Estimation illustrative de visibilité sur 12 mois.",
    legendWith: "Avec SEO",
    legendWithout: "Sans SEO",
    monthLabel: "Mois",
    yLabel: "Visibilité",
  },
  testimonials: {
    title: "Ce qu'ils disent de nous",
    items: [
      { quote: "Depuis qu'ils ont refait mon site, je reçois des demandes sur WhatsApp chaque semaine. La différence est réelle.", name: "Laura Méndez", role: "Clinique Esthétique Lumière" },
      { quote: "J'apparais enfin sur Google quand on cherche un dentiste dans ma ville. Mon agenda le ressent.", name: "Carlos Ruiz", role: "Clinique Dentaire Sonríe" },
      { quote: "Un site sérieux qui transmet la confiance et la discrétion dont mon cabinet a besoin.", name: "Andrea Pérez", role: "Pérez Avocats" },
    ],
  },
  nav: { sectors: "Secteurs", services: "Services", pricing: "Tarifs", faq: "FAQ", cta: "Demander une proposition" },
  footer: {
    tagline: "Design web sur mesure et SEO haute performance pour professionnels premium. Des sites d'autorité qui transforment les visites en rendez-vous à forte valeur.",
    servicesTitle: "Services",
    sectors: ["Sites pour cliniques esthétiques", "Sites pour dentistes", "Sites pour avocats", "SEO local par secteur"],
    navTitle: "Navigation",
    nav: ["Secteurs", "Services", "Tarifs", "FAQ", "Demander une proposition"],
    legalTitle: "Légal",
    legal: ["Politique de Confidentialité", "Politique de Cookies", "Conditions Générales", "Mentions Légales"],
    wa: "Parler sur WhatsApp",
    rights: "Tous droits réservés.",
    co: "Version Colombie",
    eu: "Espagne / Europe",
  },
};

/* ── ITALIANO ─────────────────────────────────────────────── */
const it: NexusDict = {
  hero: {
    eyebrow: "Studio di design web & SEO ad alte prestazioni",
    titleLead: "Design web su misura e SEO che moltiplicano gli appuntamenti di",
    niches: ["Cliniche Estetiche", "Dentisti", "Studi Legali"],
    subtitle:
      "Siti di autorità che trasformano le visite in richieste ad alto valore. Velocità, riservatezza e posizionamento, progettati pixel per pixel per professionisti premium.",
    ctaPrimary: "Richiedi la mia proposta",
    ctaSecondary: "Vedi i casi di design",
    trust: "Pensato per settori locali molto competitivi",
    float: "di appuntamenti online",
  },
  niche: {
    title: "Un sistema di acquisizione per settore, non l'ennesimo modello",
    titleEm: "per settore",
    lead: "Ogni settore compra per motivi diversi. Scegli il tuo e guarda come cambiano strategia, messaggio e design.",
    items: [
      {
        id: "estetica",
        tab: "Estetica",
        kicker: "Cliniche Estetiche",
        title: "Trasforma il desiderio in un appuntamento confermato",
        text: "La decisione estetica è emotiva e si prende da mobile. Progettiamo pagine che trasmettono risultato, sicurezza clinica e desiderio affinché il visitatore prenoti prima di confrontare i prezzi.",
        points: [
          "Gallerie prima/dopo con consenso e caricamento istantaneo",
          "Prenotazione di una visita in meno di 3 tap, senza attrito",
          "Riprova sociale che neutralizza la paura del «e se va male?»",
        ],
        metrics: [
          { num: "×2.4", label: "visite prenotate" },
          { num: "−41%", label: "costo per lead su Ads" },
        ],
        mockTitle: "La tua versione migliore, con supporto medico",
        mockBadge: "Estetica",
        ctaLabel: "Prenota una visita",
        chip: "Prenoti in 24 s",
      },
      {
        id: "odontologia",
        tab: "Odontoiatria",
        kicker: "Dentisti",
        title: "Pazienti informati che decidono di curarsi",
        text: "Il paziente odontoiatrico si informa e confronta. Strutturiamo il sito per superare le obiezioni su dolore, tempo e finanziamento, così arriva alla tua agenda pronto a iniziare.",
        points: [
          "Spiegazione visiva dei trattamenti che giustifica il prezzo",
          "Prezzi e finanziamenti trasparenti che filtrano il paziente serio",
          "SEO locale per «impianto / ortodonzia + la tua città»",
        ],
        metrics: [
          { num: "+63%", label: "richieste di appuntamento" },
          { num: "Top 3", label: "su Google locale" },
        ],
        mockTitle: "Il tuo sorriso, pianificato nei dettagli",
        mockBadge: "Dentale",
        ctaLabel: "Prima visita",
        chip: "Finanziamento chiaro",
      },
      {
        id: "abogados",
        tab: "Avvocati",
        kicker: "Studi Legali",
        title: "Autorità e riservatezza che generano la consulenza",
        text: "Chi cerca un avvocato cerca sicurezza e discrezione. Costruiamo un sito che proietta solidità, protegge i dati del cliente e trasforma una situazione di stress in una consulenza prenotata con te.",
        points: [
          "Posizionamento per area di pratica e caso specifico",
          "Moduli cifrati e conformi alla protezione dei dati",
          "Messaggio di autorità che giustifica onorari premium",
        ],
        metrics: [
          { num: "×3.1", label: "consulenze qualificate" },
          { num: "100%", label: "moduli conformi" },
        ],
        mockTitle: "Difendiamo ciò che conta di più",
        mockBadge: "Legale",
        ctaLabel: "Richiedi una consulenza",
        chip: "Dati cifrati",
      },
    ],
  },
  trust: {
    eyebrow: "Nessuna recensione gonfiata",
    title: "Preferiamo garantirti fatti, non promesse",
    sub: "Stiamo ancora costruendo il nostro portfolio, quindi non inventiamo recensioni. Mettiamo invece per iscritto ciò che controlliamo al 100%.",
    speedLabel: "Garanzia di Velocità",
    speedText: "Se il tuo sito non si carica in meno di 2,5 secondi, ottimizziamo il SEO tecnico gratis finché non ci riusciamo. La velocità è denaro: ogni secondo di attesa ti costa clienti.",
    speedTarget: "Obiettivo < 2,5 s",
    speedFoot: "Core Web Vitals superati",
    legalLabel: "Conformità & Privacy",
    legalText: "I tuoi moduli sono conformi al 100% alle normative sulla protezione dei dati. Fondamentale per studi e cliniche che trattano informazioni sensibili.",
    seal1: "Consenso esplicito e cifrato su ogni modulo",
    seal2: "Connessione SSL sicura e hosting dati garantito",
    metrics: [
      { label: "Visibilità SEO media guadagnata" },
      { label: "Codice inutile o modelli riutilizzati" },
      { label: "Moltiplicatore di clic su mobile" },
    ],
  },
  services: {
    eyebrow: "Cosa facciamo per te",
    title: "Servizi di design web e SEO orientati ai risultati",
    sub: "Non vendiamo pagine carine: costruiamo asset digitali che si posizionano su Google e trasformano le visite in appuntamenti.",
    items: [
      {
        title: "Design web su misura",
        text: "Siti veloci ed esclusivi, senza modelli, adattati a come decide il tuo cliente.",
        points: ["Codice pulito e leggero", "100% responsive (mobile-first)", "Identità visiva premium"],
      },
      {
        title: "SEO tecnico e locale",
        text: "Appari prima dei concorrenti quando cercano il tuo servizio nella tua città.",
        points: ["Core Web Vitals < 2,5 s", "Google Maps e schede locali", "Dati strutturati (Schema)"],
      },
      {
        title: "Copywriting di conversione (CRO)",
        text: "Ogni testo è scritto perché il visitatore chiami, scriva o prenoti.",
        points: ["Messaggi per settore", "Call to action chiare", "Test A/B del copy"],
      },
      {
        title: "Acquisizione con WhatsApp e moduli",
        text: "Trasformiamo il traffico in conversazioni reali con il tuo team.",
        points: ["WhatsApp Business integrato", "Moduli cifrati", "Notifica istantanea dei lead"],
      },
      {
        title: "Analitica e misurazione",
        text: "Sai esattamente cosa funziona e da dove arriva ogni cliente.",
        points: ["Google Analytics 4", "Search Console", "Dashboard conversioni"],
      },
      {
        title: "Visibilità AI (GEO)",
        text: "Ti rendiamo visibile anche su ChatGPT, Gemini e Claude, non solo su Google.",
        points: ["Contenuti ottimizzati per l'AI", "Autorità tematica", "Posizionamento del brand"],
      },
    ],
    cta: "Voglio questi servizi",
  },
  pricing: {
    eyebrow: "Un investimento, non una spesa",
    title: "Piani di design web e SEO per acquisire pazienti e clienti",
    sub: "Un investimento una tantum che lavora per te 365 giorni l'anno. Il 90% dei nostri clienti lo recupera con il primo appuntamento arrivato dal sito.",
    plans: [
      {
        id: "esencial",
        name: "Presenza Essenziale",
        for: "Professionisti indipendenti che hanno bisogno di autorità online immediata.",
        note: "COP · pagamento unico · consegna in 1–3 giorni",
        features: [
          "Design su misura fino a 2 sezioni",
          "SEO tecnico iniziale + indicizzazione Google",
          "Velocità < 2,5 s (Core Web Vitals)",
          "Modulo conforme alla protezione dei dati",
          "WhatsApp Business integrato",
        ],
        cta: "Inizia ora",
      },
      {
        id: "autoridad",
        name: "Autorità Professionale",
        for: "Cliniche, dentisti e studi che vogliono riempire l'agenda.",
        note: "COP · pagamento unico · consegna in 5–9 giorni",
        features: [
          "Tutto il piano Essenziale",
          "Fino a 8 pagine + blog SEO per settore",
          "Copywriting di conversione (CRO) incluso",
          "Posizionamento locale su Google Maps",
          "Acquisizione avanzata di lead e analitica",
          "FAQ con dati strutturati (rich results)",
        ],
        cta: "Voglio più appuntamenti",
        badge: "★ Il più scelto",
      },
      {
        id: "dominio",
        name: "Dominio di Settore",
        for: "Per chi vuole guidare la propria categoria su Google e sull'AI.",
        note: "COP · in base alla portata del progetto",
        features: [
          "Strategia SEO avanzata e contenuti programmatici",
          "Sistema di appuntamenti o prenotazioni online",
          "Visibilità su ChatGPT, Gemini e Claude (GEO)",
          "Automazioni di acquisizione con AI",
          "Supporto prioritario dedicato 6 mesi",
        ],
        cta: "Richiedi un preventivo",
      },
    ],
    trust: ["Senza mensilità né costi nascosti", "50% all'inizio · 50% alla consegna", "Possiedi il 100% del tuo sito"],
    langs: {
      esencial: "Sito in 1 lingua",
      autoridad: "Fino a 3 lingue, a tua scelta",
      dominio: "Fino a 5 lingue",
    },
  },
  faq: {
    eyebrow: "Rispondiamo ai tuoi dubbi",
    title: "Le domande che contano davvero",
    items: [
      {
        q: "Perché un design su misura è meglio di un modello WordPress economico?",
        a: "Un modello generico carica decine di script e stili che non usi: è pesante, lento e Google lo penalizza nel ranking. Un design su misura include solo il codice necessario, si carica in meno di 2,5 s, supera i Core Web Vitals e si posiziona meglio. E dove un modello è usato da migliaia di attività identiche, il tuo sito su misura proietta autorità e si adatta esattamente a come decide il tuo cliente.",
      },
      {
        q: "Come garantite che la mia clinica o studio riceverà chiamate reali?",
        a: "Non vendiamo un bel design, progettiamo per convertire. Ogni pagina è costruita con principi di CRO: gerarchia visiva che guida il visitatore, prova di fiducia nei momenti di dubbio e call to action chiare verso WhatsApp, modulo o telefono. Poi misuriamo con l'analitica quali sezioni convertono e ottimizziamo su dati reali. L'obiettivo non è un sito bello: è far squillare il tuo telefono.",
      },
      {
        q: "Sono il proprietario assoluto del mio sito una volta finito il progetto?",
        a: "Sì, al 100%. Alla fine, il dominio è registrato a tuo nome, il codice sorgente è tuo e ti consegniamo tutti gli accessi: hosting, pannello di amministrazione, analitica ed e-mail. Non teniamo in ostaggio il tuo sito né ti leghiamo a mensilità. Se un giorno cambi fornitore, porti via tutto senza vincoli.",
      },
    ],
    foot: "Hai un altro dubbio?",
    footLink: "Raccontaci il tuo caso e ti rispondiamo oggi →",
  },
  funnel: {
    eyebrow: "Diagnosi in 30 secondi",
    title: "Progettiamo il tuo motore di appuntamenti",
    stepOf: (n) => `Passo ${n} di 3`,
    q1: "Qual è il tuo settore?",
    hint1: "Adattiamo la strategia a come decide il tuo cliente.",
    sectors: [
      { id: "estetica", label: "Clinica Estetica", desc: "Medicina e bellezza" },
      { id: "dental", label: "Odontoiatria", desc: "Studio dentistico" },
      { id: "legal", label: "Studio Legale", desc: "Avvocati e notaio" },
      { id: "otro", label: "Altro settore", desc: "Servizi premium" },
    ],
    q2: "Cosa vuoi ottenere per primo?",
    hint2: "Il tuo obiettivo definisce ogni decisione di design.",
    goals: [
      { id: "citas", label: "Più appuntamenti", desc: "Riempire l'agenda di pazienti di qualità" },
      { id: "autoridad", label: "Autorità di marca", desc: "Proiettare prestigio e giustificare i prezzi" },
      { id: "seo", label: "Apparire su Google", desc: "Posizionarmi davanti ai concorrenti" },
      { id: "rediseno", label: "Rinnovare il sito", desc: "Il mio sito non converte né carica" },
    ],
    q3: "Dove inviamo la tua proposta?",
    hint3: "Niente spam. Ti contattiamo solo per la tua diagnosi.",
    emailLabel: "Email professionale",
    emailPh: "nome@tuostudio.com",
    waLabel: "WhatsApp di contatto",
    waPh: "+57 312 319 8706",
    consent: "Accetto la privacy policy e il trattamento dei miei dati per ricevere la mia proposta. I tuoi dati sono cifrati e mai condivisi.",
    back: "Indietro",
    submit: "Ricevi la mia proposta",
    sending: "Invio…",
    successTitle: "Ricevuto! La tua diagnosi è in corso",
    successText: (s) => `Entro 24 h ti invieremo una proposta su misura per il tuo ${s}. Controlla WhatsApp ed email.`,
    waBtn: "Parla ora su WhatsApp",
    waMsg: (s, g) => `Ciao, gestisco uno ${s} e voglio ${g}. Ho appena richiesto la mia proposta sul sito.`,
    errEmail: "Inserisci un'email valida.",
    errPhone: "Inserisci un numero valido con prefisso.",
    errConsent: "Ci serve il tuo consenso per continuare.",
  },
  seo: {
    eyebrow: "SEO spiegato",
    title: "Cos'è il SEO e come fa crescere la tua attività",
    sub: "Il SEO posiziona il tuo sito su Google così ti trovano proprio quando cercano il tuo servizio. Guardalo in 3 minuti.",
    videoTitle: "Cos'è il SEO (video)",
    chartTitle: "Il tuo posizionamento su Google",
    chartNote: "Stima illustrativa di visibilità a 12 mesi.",
    legendWith: "Con SEO",
    legendWithout: "Senza SEO",
    monthLabel: "Mese",
    yLabel: "Visibilità",
  },
  testimonials: {
    title: "Cosa dicono di noi",
    items: [
      { quote: "Da quando hanno rinnovato il mio sito, ricevo richieste su WhatsApp ogni settimana. La differenza è reale.", name: "Laura Méndez", role: "Clinica Estetica Lumière" },
      { quote: "Finalmente compaio su Google quando cercano un dentista nella mia città. La mia agenda lo sente.", name: "Carlos Ruiz", role: "Clinica Dentale Sonríe" },
      { quote: "Un sito serio che trasmette la fiducia e la discrezione di cui il mio studio ha bisogno.", name: "Andrea Pérez", role: "Pérez Avvocati" },
    ],
  },
  nav: { sectors: "Settori", services: "Servizi", pricing: "Prezzi", faq: "FAQ", cta: "Richiedi proposta" },
  footer: {
    tagline: "Design web su misura e SEO ad alte prestazioni per professionisti premium. Siti di autorità che trasformano le visite in appuntamenti ad alto valore.",
    servicesTitle: "Servizi",
    sectors: ["Siti per cliniche estetiche", "Siti per dentisti", "Siti per avvocati", "SEO locale per settore"],
    navTitle: "Navigazione",
    nav: ["Settori", "Servizi", "Prezzi", "FAQ", "Richiedi una proposta"],
    legalTitle: "Legale",
    legal: ["Privacy Policy", "Cookie Policy", "Termini e Condizioni", "Note Legali"],
    wa: "Parla su WhatsApp",
    rights: "Tutti i diritti riservati.",
    co: "Versione Colombia",
    eu: "Spagna / Europa",
  },
};

export const NEXUS_DICT: Record<NexusLang, NexusDict> = { es, en, fr, it };
