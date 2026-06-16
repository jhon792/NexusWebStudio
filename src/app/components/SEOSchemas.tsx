// ─────────────────────────────────────────────────────────────────────────────
// SEOSchemas.tsx — Datos estructurados Schema.org para Nexus Studio
// Renderiza JSON-LD en <body>; Google lo reconoce igual que en <head>.
// Agregar <SEOSchemas /> en Home.tsx (ya hecho).
// ─────────────────────────────────────────────────────────────────────────────

// ── Rich snippet: acordeón de Preguntas Frecuentes en los resultados de Google
const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta una página web en Colombia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Nexus Studio manejamos tres planes de inversión. El Plan Inicio vale $590.000 COP e incluye landing page profesional lista en 3 a 5 días. El Plan Crecimiento vale $2.000.000 COP e incluye SEO, dominio propio y hosting por un año completo; es el más elegido por negocios colombianos que quieren aparecer en Google. Para proyectos a medida —tiendas virtuales, sistemas de citas o aplicaciones web— el Plan Empresarial parte desde $3.400.000 COP. Todos son pagos únicos sin mensualidades ocultas. Consulta los detalles en https://www.nexsustudio.site.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda el desarrollo de un sitio web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Nexus Studio los tiempos dependen del proyecto: una landing page se entrega en 3 a 5 días hábiles; un sitio empresarial completo toma de 7 a 15 días hábiles. Los proyectos con funcionalidades especiales —tiendas virtuales o sistemas de citas y reservas— tienen un plazo acordado al inicio según el alcance. Al confirmar el proyecto en https://www.nexsustudio.site recibes un cronograma detallado con fechas de entrega claras para que puedas planificar el lanzamiento de tu negocio sin sorpresas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Las páginas web que hacen aparecen en Google?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En Nexus Studio entregamos todos los sitios optimizados para Google. Configuramos el sitio en Google Search Console para rastreo correcto, aplicamos SEO técnico —velocidad de carga, estructura de encabezados y metadatos— y vinculamos el negocio en Google Maps. El Plan Crecimiento y el Plan Empresarial incluyen posicionamiento SEO local como parte del servicio estándar, sin costo adicional. Los resultados orgánicos comienzan a verse entre 4 y 12 semanas según la competencia del sector en tu ciudad colombiana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Nexus Studio trabaja con clientes de toda Colombia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, Nexus Studio trabaja con negocios de toda Colombia de forma 100% remota. Hemos desarrollado proyectos para clientes en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Pereira y Villavicencio, entre otras ciudades. Todo el proceso —reunión inicial, revisiones de diseño, entrega y soporte— se gestiona por WhatsApp, videollamada y correo electrónico. No necesitas reuniones presenciales. Puedes iniciar tu proyecto desde cualquier ciudad del país en https://www.nexsustudio.site.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué incluye el mantenimiento mensual de un sitio web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El plan de mantenimiento mensual de Nexus Studio incluye: actualizaciones de seguridad para proteger el sitio contra vulnerabilidades, copias de seguridad automáticas semanales, cambios de contenido como textos, imágenes y precios, monitoreo de disponibilidad 24/7 para detectar caídas, y soporte técnico con respuesta en menos de 24 horas. También contempla revisión periódica del posicionamiento en Google y ajustes menores de diseño. Es el servicio ideal para mantener tu negocio digital activo, seguro y actualizado sin ocuparte de la parte técnica.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo ver el sitio web antes de hacer el pago final?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Nexus Studio trabaja con un esquema de pago dividido: 50% al inicio del proyecto y 50% al momento de la entrega. Antes del pago final te compartimos un enlace de vista previa con el sitio terminado para que lo revises en detalle, solicites los ajustes que necesites y des tu aprobación. Solo cuando el resultado cumple tus expectativas se realiza el pago final y el sitio se publica en tu dominio. Más información en https://www.nexsustudio.site.",
      },
    },
  ],
};

// ── Listado de servicios indexable por Google (aparece en búsquedas de servicios)
const schemaItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Desarrollo Web — Nexus Studio",
  url: "https://www.nexsustudio.site/#services",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Landing Page de Alto Impacto",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Página web de una sola sección diseñada para captar clientes desde Google Ads o redes sociales en Colombia. El visitante entra, entiende la oferta y toma acción de inmediato. Nexus Studio la diseña orientada a conversión, con llamadas a la acción claras y optimización completa para dispositivos móviles.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Sitio Corporativo Profesional",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Presencia digital completa para empresas en Colombia: secciones de servicios, equipo, portafolio, testimonios y formulario de contacto. Nexus Studio diseña cada sección para transmitir confianza desde la primera visita y convertir visitantes en clientes, tanto B2B como B2C.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Tienda Virtual con Pagos Colombianos",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Tienda online integrada con pasarelas de pago colombianas: PSE, Nequi y tarjetas de crédito. Incluye catálogo de productos, carrito de compras y panel de administración. Nexus Studio diseña tiendas virtuales optimizadas para el comercio electrónico en Colombia, disponibles las 24 horas.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Sistema de Citas y Reservas",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Sistema de agendamiento online para que los clientes reserven citas sin necesidad de llamadas telefónicas. Ideal para clínicas, consultorios, salones de belleza y servicios por turnos en Colombia. Nexus Studio lo integra directamente al sitio web, reduciendo el trabajo administrativo hasta en un 80%.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Posicionamiento en Google SEO",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Configuración técnica del sitio web para aparecer en los primeros resultados de Google cuando alguien busca el servicio en su ciudad colombiana. Nexus Studio aplica SEO local, optimización de Core Web Vitals, y configuración en Google Search Console y Google Maps.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "Mantenimiento y Soporte Continuo",
        url: "https://www.nexsustudio.site/#services",
        description:
          "Servicio mensual que mantiene el sitio actualizado, seguro y funcionando correctamente. Incluye actualizaciones de seguridad, copias de seguridad automáticas, cambios de contenido y soporte técnico con respuesta garantizada en menos de 24 horas. Nexus Studio garantiza la continuidad digital del negocio.",
        provider: { "@id": "https://www.nexsustudio.site/#business" },
        areaServed: { "@type": "Country", name: "Colombia" },
      },
    },
  ],
};

export function SEOSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
    </>
  );
}
