import { renderToString } from "react-dom/server";
import {
  createStaticHandler, createStaticRouter, StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import { takeSsrHead, type SsrHeadData } from "./seo-head";
import "./i18n";

export interface RenderResult {
  html: string;
  head: SsrHeadData | null;
}

/**
 * Renderiza una ruta a HTML estático (prerender). Devuelve el HTML del árbol de
 * la app (para inyectar en <div id="root">) y el head capturado por usePageSEO
 * (canonical/title/og por ruta, que prerender.mjs escribe en el HTML estático).
 */
export async function render(url: string): Promise<RenderResult> {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request("http://localhost" + url));

  if (context instanceof Response) {
    throw new Error(`Prerender abortado: ${url} respondió con redirect/Response`);
  }

  const router = createStaticRouter(dataRoutes, context);
  const html = renderToString(
    <StaticRouterProvider router={router} context={context} hydrate={false} />
  );
  return { html, head: takeSsrHead() };
}
