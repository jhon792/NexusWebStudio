import { useEffect } from "react";
import { setSsrHead } from "../seo-head";

/** Una variante hreflang: idioma/región → URL absoluta. */
interface Alternate {
  hreflang: string;
  href: string;
}

interface PageSEOOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  /** og:locale (p. ej. "es_ES" | "es_CO"). */
  ogLocale?: string;
  /** Valor para <html lang> (p. ej. "es-ES" | "es-CO"). */
  htmlLang?: string;
  /** Clúster hreflang. Cada página debe listar todas las variantes, incluida ella misma. */
  alternates?: Alternate[];
}

const DEFAULTS = {
  title: "Diseño Web en Colombia | Bogotá, Medellín, Villavicencio | Nexus Studio",
  description: "Diseño web en Bogotá, Medellín y Villavicencio. Nexus Studio crea sitios que generan clientes para tu negocio colombiano. ¡Cotiza gratis!",
  canonical: "https://www.nexsustudio.site/",
};

const HREFLANG_FLAG = "data-managed-hreflang";

export function usePageSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogLocale,
  htmlLang,
  alternates,
}: PageSEOOptions) {
  // SSR/prerender: el effect no corre en el servidor, así que capturamos el head
  // de forma síncrona para que prerender.mjs lo escriba en el HTML estático.
  if (typeof window === "undefined") {
    setSsrHead({ title, description, canonical, ogLocale, htmlLang, alternates });
  }

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
    if (ogLocale) setMeta("og:locale", ogLocale, "property");

    // hreflang — se purgan los previos y se inyecta el clúster actual, marcado
    // con data-managed-hreflang para poder limpiarlo sin tocar otros <link>.
    document.querySelectorAll(`link[${HREFLANG_FLAG}]`).forEach((n) => n.remove());
    for (const alt of alternates ?? []) {
      const el = document.createElement("link");
      el.rel = "alternate";
      el.setAttribute("hreflang", alt.hreflang);
      el.href = alt.href;
      el.setAttribute(HREFLANG_FLAG, "");
      document.head.appendChild(el);
    }

    const prevHtmlLang = document.documentElement.lang;
    if (htmlLang) document.documentElement.lang = htmlLang;

    return () => {
      document.title = DEFAULTS.title;
      setMeta("description", DEFAULTS.description);
      setLink("canonical", DEFAULTS.canonical);
      setMeta("og:url", DEFAULTS.canonical, "property");
      setMeta("og:title", DEFAULTS.title, "property");
      setMeta("og:description", DEFAULTS.description, "property");
      document.querySelectorAll(`link[${HREFLANG_FLAG}]`).forEach((n) => n.remove());
      if (htmlLang) document.documentElement.lang = prevHtmlLang;
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogLocale, htmlLang, JSON.stringify(alternates)]);
}
