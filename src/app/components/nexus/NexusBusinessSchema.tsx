import { useEffect } from "react";
import type { NexusRegion } from "./NexusLangContext";

/* ============================================================================
   NEXUS · Schema de negocio por región.
   - region "CO": no hace nada → se mantiene el @graph estático de index.html
     (LocalBusiness con dirección de Villavicencio).
   - region "EU": retira ese @graph del DOM (para no declarar una dirección
     colombiana en la página de España) e inyecta un schema de España con
     areaServed: Spain. NO se inventa una dirección/NAP español: el negocio
     está físicamente en Colombia y atiende España en remoto, así que solo se
     declara el ÁREA servida, no una sede falsa.
   ============================================================================ */

const COLOMBIA_GRAPH_ID = "ld-graph-co";
const ORIGIN = "https://www.nexsustudio.site";

const SPAIN_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: "Nexus Studio",
      description: "Diseño y desarrollo web profesional para empresas en España",
      inLanguage: "es-ES",
      publisher: { "@id": `${ORIGIN}/#business-es` },
    },
    {
      "@type": ["Organization", "ProfessionalService", "WebDesigner"],
      "@id": `${ORIGIN}/#business-es`,
      name: "Nexus Studio",
      url: `${ORIGIN}/es`,
      logo: {
        "@type": "ImageObject",
        url: `${ORIGIN}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
      image: `${ORIGIN}/og-image.jpg`,
      email: "contacto@nexsustudio.site",
      telephone: "+573123198706",
      description:
        "Nexus Studio: diseño y desarrollo web profesional para empresas en España. Páginas web desde 390 €, SEO incluido y entrega rápida. Atención remota en español, inglés, francés e italiano.",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      slogan: "Diseño web que genera clientes para tu negocio",
      // Área de servicio (no es una sede): país España + principales ciudades.
      // Ajusta esta lista a las ciudades reales que quieras atacar.
      areaServed: [
        { "@type": "Country", name: "Spain" },
        { "@type": "City", name: "Madrid" },
        { "@type": "City", name: "Barcelona" },
        { "@type": "City", name: "Valencia" },
        { "@type": "City", name: "Sevilla" },
      ],
      serviceType: "Diseño web y posicionamiento SEO",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+573123198706",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English", "French", "Italian"],
          areaServed: "ES",
        },
      ],
      sameAs: [
        "https://wa.me/573123198706",
        "https://www.tiktok.com/@nexus_studio2",
        "https://www.instagram.com/nexsustudio",
        "https://www.facebook.com/nexsustudio",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Planes de Diseño Web — España",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Plan Esencial — Presencia Web Profesional" },
            price: "390",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Plan Autoridad — Web con SEO y Captación de Clientes" },
            price: "790",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Plan Dominio — Desarrollo Web a Medida" },
            price: "1490",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
  ],
};

export function NexusBusinessSchema({ region }: { region: NexusRegion }) {
  useEffect(() => {
    if (region !== "EU") return;
    // Retira el @graph colombiano del index.html estático y memoriza su
    // posición para restaurarlo al desmontar (la SPA no recarga la página).
    const node = document.getElementById(COLOMBIA_GRAPH_ID);
    const parent = node?.parentNode ?? null;
    const next = node?.nextSibling ?? null;
    node?.remove();
    return () => {
      if (node && parent) parent.insertBefore(node, next);
    };
  }, [region]);

  if (region !== "EU") return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SPAIN_GRAPH) }}
    />
  );
}

export default NexusBusinessSchema;
