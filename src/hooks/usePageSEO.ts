import { useEffect } from "react";

interface PageSEOOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
}

const DEFAULTS = {
  title: "Diseño Web en Colombia | Bogotá, Medellín, Villavicencio | Nexus Studio",
  description: "Diseño web en Bogotá, Medellín y Villavicencio. Nexus Studio crea sitios que generan clientes para tu negocio colombiano. ¡Cotiza gratis!",
  canonical: "https://www.nexsustudio.site/",
};

export function usePageSEO({ title, description, canonical, ogTitle, ogDescription }: PageSEOOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, value: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = value;
    };

    setMeta("description", description);
    setLink("canonical", canonical);
    setMeta("og:url", canonical, "property");
    setMeta("og:title", ogTitle ?? title, "property");
    setMeta("og:description", ogDescription ?? description, "property");

    return () => {
      document.title = DEFAULTS.title;
      setMeta("description", DEFAULTS.description);
      setLink("canonical", DEFAULTS.canonical);
      setMeta("og:url", DEFAULTS.canonical, "property");
      setMeta("og:title", DEFAULTS.title, "property");
      setMeta("og:description", DEFAULTS.description, "property");
    };
  }, [title, description, canonical, ogTitle, ogDescription]);
}
