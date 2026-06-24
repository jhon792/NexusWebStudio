/* Colector de <head> para SSR/prerender. usePageSEO inyecta el head por JS en el
   cliente (effect), pero en el prerender el effect no corre. Aquí capturamos los
   valores durante el render del servidor para que prerender.mjs los escriba en el
   HTML estático (canonical/title/og correctos sin depender de que Google ejecute JS). */

export interface SsrHeadData {
  title: string;
  description: string;
  canonical: string;
  ogLocale?: string;
  htmlLang?: string;
  alternates?: { hreflang: string; href: string }[];
}

let head: SsrHeadData | null = null;

/** Llamado por usePageSEO durante el render del servidor. */
export function setSsrHead(h: SsrHeadData) {
  head = h;
}

/** Llamado por entry-server tras renderToString; devuelve y limpia. */
export function takeSsrHead(): SsrHeadData | null {
  const h = head;
  head = null;
  return h;
}
