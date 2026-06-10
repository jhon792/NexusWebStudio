import { hydrateRoot, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import "./styles/index.css";
import "./i18n";

// Cliente: hidrata el HTML prerenderizado (/, /es) o renderiza el shell SPA
// en blanco (app.html → resto de rutas).
const router = createBrowserRouter(routes);
const root = document.getElementById("root")!;
const app = <RouterProvider router={router} />;

if (root.firstChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
