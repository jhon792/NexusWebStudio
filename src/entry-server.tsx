import { renderToString } from "react-dom/server";
import {
  createStaticHandler, createStaticRouter, StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import "./i18n";

/**
 * Renderiza una ruta a HTML estático (prerender). Se usa solo para `/` y `/es`
 * (la home eager, sin rutas `lazy` → hidratación limpia). Devuelve el HTML del
 * árbol de la app para inyectar dentro de <div id="root">.
 */
export async function render(url: string): Promise<string> {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request("http://localhost" + url));

  if (context instanceof Response) {
    throw new Error(`Prerender abortado: ${url} respondió con redirect/Response`);
  }

  const router = createStaticRouter(dataRoutes, context);
  return renderToString(
    <StaticRouterProvider router={router} context={context} hydrate={false} />
  );
}
