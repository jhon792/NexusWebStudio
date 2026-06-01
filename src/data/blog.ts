export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: number;
  image: string;
  accent: string;
  accentBg: string;
  sections: BlogSection[];
  related: string[]; // slugs de artículos relacionados
}

export interface BlogSection {
  type: "heading" | "paragraph" | "list" | "callout";
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-atraer-clientes-por-internet",
    title: "Cómo atraer más clientes por Internet en 2025",
    description: "Descubre las estrategias más efectivas para captar clientes en línea sin gastar una fortuna en publicidad.",
    category: "Marketing Digital",
    date: "2025-05-15",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    accent: "#6366f1",
    accentBg: "#eef2ff",
    sections: [
      {
        type: "paragraph",
        text: "En 2025, la presencia digital ya no es opcional: es el canal principal de captación de clientes para la mayoría de los negocios. Sin embargo, muchas empresas cometen el error de pensar que tener un sitio web es suficiente. La clave está en combinar una web profesional con una estrategia clara de atracción de clientes.",
      },
      {
        type: "heading",
        text: "1. Optimiza tu sitio para Google (SEO local)",
      },
      {
        type: "paragraph",
        text: "El 97% de los consumidores buscan en Google antes de comprar. Si tu negocio no aparece en los primeros resultados, estás perdiendo clientes. El SEO local te permite aparecer cuando alguien busca 'desarrollador web en Bogotá' o 'tienda online Colombia'.",
      },
      {
        type: "list",
        items: [
          "Crea un perfil completo en Google Business Profile",
          "Incluye tu ciudad y región en los títulos y meta descripciones",
          "Genera reseñas auténticas de clientes satisfechos",
          "Publica contenido relevante para tu área geográfica",
        ],
      },
      {
        type: "heading",
        text: "2. WhatsApp Business como canal de conversión",
      },
      {
        type: "paragraph",
        text: "WhatsApp tiene más de 40 millones de usuarios activos en Colombia. Un botón de WhatsApp visible en tu sitio web puede aumentar tu tasa de contacto hasta un 35%. La clave es responder en menos de 2 horas — la velocidad de respuesta es un factor decisivo.",
      },
      {
        type: "heading",
        text: "3. Contenido que educa y convierte",
      },
      {
        type: "paragraph",
        text: "Un blog con artículos útiles para tu audiencia genera tráfico orgánico de forma constante. No necesitas publicar todos los días: 2-3 artículos al mes de alta calidad pueden posicionarte como autoridad en tu sector y atraer clientes que buscan exactamente lo que ofreces.",
      },
      {
        type: "callout",
        text: "Conclusión: La clave está en combinar SEO, velocidad de respuesta y contenido de valor. Un sitio web profesional es el fundamento — el resto se construye encima.",
      },
    ],
    related: ["posicionamiento-en-google-guia-empresas", "diseno-web-afecta-ventas"],
  },
  {
    slug: "posicionamiento-en-google-guia-empresas",
    title: "Posicionamiento en Google: Guía completa para empresas",
    description: "Todo lo que necesitas saber para que tu empresa aparezca en los primeros resultados de búsqueda de Google.",
    category: "SEO",
    date: "2025-05-10",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&q=80",
    accent: "#10b981",
    accentBg: "#ecfdf5",
    sections: [
      {
        type: "paragraph",
        text: "El SEO (Search Engine Optimization) es el conjunto de técnicas que permiten que tu sitio web aparezca en los primeros resultados de Google cuando alguien busca tus productos o servicios. No es magia: es metodología, tiempo y técnica.",
      },
      {
        type: "heading",
        text: "Los 3 pilares del SEO moderno",
      },
      {
        type: "list",
        items: [
          "SEO Técnico: velocidad, estructura, accesibilidad, indexación",
          "Contenido: artículos relevantes, palabras clave, intención de búsqueda",
          "Autoridad: enlaces externos de calidad (backlinks)",
        ],
      },
      {
        type: "heading",
        text: "Core Web Vitals: la métrica que Google prioriza",
      },
      {
        type: "paragraph",
        text: "Desde 2021, Google mide la 'experiencia de página' como factor de posicionamiento. Los Core Web Vitals incluyen: Largest Contentful Paint (velocidad de carga), First Input Delay (interactividad) y Cumulative Layout Shift (estabilidad visual). Un sitio web profesional debe superar 90/100 en Google Lighthouse.",
      },
      {
        type: "heading",
        text: "Palabras clave que realmente convierten",
      },
      {
        type: "paragraph",
        text: "No todas las búsquedas tienen el mismo valor. Las palabras clave con intención comercial (como 'precio desarrollo web Bogotá' o 'contratar diseñador web Colombia') traen usuarios listos para comprar. Estas son las que debes priorizar.",
      },
      {
        type: "callout",
        text: "El SEO es una inversión a largo plazo. Los resultados llegan entre 3 y 6 meses, pero una vez que posicionas bien, el tráfico es gratuito y constante.",
      },
    ],
    related: ["como-atraer-clientes-por-internet", "diseno-web-afecta-ventas"],
  },
  {
    slug: "diseno-web-afecta-ventas",
    title: "¿Por qué el diseño de tu web afecta directamente tus ventas?",
    description: "El 75% de los usuarios juzga la credibilidad de una empresa por su sitio web. Descubre cómo mejorar el tuyo.",
    category: "Diseño Web",
    date: "2025-05-05",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    accent: "#f59e0b",
    accentBg: "#fffbeb",
    sections: [
      {
        type: "paragraph",
        text: "Tienes entre 3 y 7 segundos para causar una buena primera impresión en línea. Si tu sitio web parece desactualizado, lento o poco profesional, el visitante se irá antes de leer lo que ofreces — y probablemente vaya directo a la competencia.",
      },
      {
        type: "heading",
        text: "El efecto directo en las ventas",
      },
      {
        type: "list",
        items: [
          "Un diseño limpio y profesional aumenta la confianza en un 75%",
          "La velocidad de carga afecta la tasa de rebote: 1 segundo más = 7% menos conversiones",
          "Un CTA claro y visible puede aumentar los contactos en un 200%",
          "El diseño mobile-first es crítico: más del 60% del tráfico es móvil",
        ],
      },
      {
        type: "heading",
        text: "Los 5 errores de diseño que cuestan clientes",
      },
      {
        type: "list",
        items: [
          "Texto difícil de leer (fuentes pequeñas, colores sin contraste)",
          "Sin botón de WhatsApp o formulario visible",
          "Imágenes de baja calidad o stock fotográfico genérico",
          "Navegación confusa sin jerarquía clara",
          "No tener llamados a la acción (CTA) en cada sección",
        ],
      },
      {
        type: "callout",
        text: "Un buen diseño no es un gasto: es una inversión que se recupera cuando los visitantes se convierten en clientes.",
      },
    ],
    related: ["como-atraer-clientes-por-internet", "optimizacion-conversiones-ventas"],
  },
  {
    slug: "como-crear-tienda-online-exitosa",
    title: "Cómo crear una tienda online exitosa: guía paso a paso",
    description: "Los elementos clave que toda tienda online necesita para convertir visitantes en compradores reales.",
    category: "E-commerce",
    date: "2025-04-28",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    accent: "#3b82f6",
    accentBg: "#eff6ff",
    sections: [
      {
        type: "paragraph",
        text: "El e-commerce en Colombia creció un 35% en 2024 y la tendencia se acelera en 2025. Sin embargo, el 80% de las tiendas online fallan en su primer año. La diferencia entre las que sobreviven y las que cierran está en la experiencia de usuario, la confianza y el proceso de pago.",
      },
      {
        type: "heading",
        text: "Elementos obligatorios en una tienda online",
      },
      {
        type: "list",
        items: [
          "Certificado SSL (https) — sin esto, los clientes no comprarán",
          "Pasarelas de pago locales: PSE, Wompi, PayU, Mercado Pago",
          "Fotos profesionales de productos — fondo blanco, múltiples ángulos",
          "Descripciones de producto claras con beneficios (no solo características)",
          "Política de devoluciones visible y clara",
          "Proceso de checkout en máximo 3 pasos",
        ],
      },
      {
        type: "heading",
        text: "El checkout: donde se pierden el 70% de las ventas",
      },
      {
        type: "paragraph",
        text: "El abandono de carrito es el mayor enemigo del e-commerce. Las principales causas: proceso de pago complicado, sin opción de compra como invitado, costos de envío inesperados y falta de confianza. Un checkout optimizado puede recuperar entre el 20% y el 35% de esas ventas perdidas.",
      },
      {
        type: "callout",
        text: "Una tienda online no es solo un catálogo digital: es un vendedor que trabaja 24/7. Inviértele el mismo cuidado que a tu negocio físico.",
      },
    ],
    related: ["optimizacion-conversiones-ventas", "diseno-web-afecta-ventas"],
  },
  {
    slug: "optimizacion-conversiones-ventas",
    title: "Optimización de conversiones: duplica tus ventas sin más tráfico",
    description: "Pequeños cambios en tu sitio web que pueden tener un impacto enorme en tus resultados de venta.",
    category: "Ventas Online",
    date: "2025-04-20",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    accent: "#ef4444",
    accentBg: "#fef2f2",
    sections: [
      {
        type: "paragraph",
        text: "La optimización de conversiones (CRO) parte de un principio simple: en vez de gastar más en publicidad para traer más tráfico, optimizamos el sitio web para que más visitantes actuales se conviertan en clientes. Es la estrategia con el mayor ROI en marketing digital.",
      },
      {
        type: "heading",
        text: "¿Qué es una 'conversión'?",
      },
      {
        type: "paragraph",
        text: "Depende de tu objetivo: puede ser que alguien complete un formulario, te escriba por WhatsApp, haga una compra o agende una cita. Todo se puede medir y mejorar.",
      },
      {
        type: "heading",
        text: "10 cambios que aumentan conversiones inmediatamente",
      },
      {
        type: "list",
        items: [
          "Botón de WhatsApp visible en todas las páginas",
          "CTA principal en el primer scroll (arriba del doblez)",
          "Testimonios reales con nombre, foto y resultado específico",
          "Garantía visible (devolución, satisfacción)",
          "Formulario con máximo 4 campos",
          "Velocidad de carga menor a 2 segundos",
          "Número de teléfono clickeable en móvil",
          "Urgencia real (disponibilidad limitada, oferta por tiempo)",
          "Preguntas frecuentes cerca del botón de compra/contacto",
          "Chat en vivo o respuesta automática de WhatsApp",
        ],
      },
      {
        type: "callout",
        text: "Mejorar la tasa de conversión del 1% al 2% duplica tus ventas sin invertir un peso más en publicidad.",
      },
    ],
    related: ["diseno-web-afecta-ventas", "como-atraer-clientes-por-internet"],
  },
  {
    slug: "tendencias-tecnologicas-negocios-2025",
    title: "Tendencias tecnológicas que todo negocio debe conocer en 2025",
    description: "Las innovaciones que están transformando la forma en que las empresas se conectan con sus clientes.",
    category: "Tendencias",
    date: "2025-04-12",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    accent: "#8b5cf6",
    accentBg: "#f5f3ff",
    sections: [
      {
        type: "paragraph",
        text: "El ritmo de cambio tecnológico se ha acelerado. Las empresas que no adoptan las herramientas digitales correctas van perdiendo terreno frente a competidores más ágiles. Estas son las tendencias que ya están marcando la diferencia en 2025.",
      },
      {
        type: "heading",
        text: "1. Inteligencia Artificial en el servicio al cliente",
      },
      {
        type: "paragraph",
        text: "Los chatbots con IA pueden responder el 80% de las preguntas frecuentes de forma instantánea, 24/7. Integrados con WhatsApp, reducen el tiempo de respuesta y liberan al equipo humano para consultas complejas.",
      },
      {
        type: "heading",
        text: "2. Sitios web como activos de negocio",
      },
      {
        type: "paragraph",
        text: "La tendencia es tratar el sitio web no como un gasto sino como un activo que genera retorno medible. Empresas que miden sus conversiones web toman mejores decisiones de marketing y crecen más rápido.",
      },
      {
        type: "heading",
        text: "3. Mobile-first por defecto",
      },
      {
        type: "paragraph",
        text: "El 68% del tráfico web en Colombia viene de dispositivos móviles. Google indexa primero la versión móvil de los sitios. Un sitio que no está perfectamente optimizado para móvil pierde ranking y clientes.",
      },
      {
        type: "heading",
        text: "4. Privacidad y confianza como ventaja competitiva",
      },
      {
        type: "paragraph",
        text: "Los usuarios son cada vez más conscientes de su privacidad. Sitios con políticas claras, consentimiento de cookies y HTTPS generan más confianza y por tanto más conversiones.",
      },
      {
        type: "callout",
        text: "No necesitas adoptar todas las tendencias a la vez. Prioriza las que tienen mayor impacto en tus clientes actuales y tu modelo de negocio.",
      },
    ],
    related: ["como-atraer-clientes-por-internet", "posicionamiento-en-google-guia-empresas"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.related
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 2);
}
