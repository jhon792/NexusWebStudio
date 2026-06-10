// Prerender a medida (RR7): genera HTML estático para / y /es, y un shell SPA
// en blanco (app.html) para el resto de rutas. Se ejecuta tras los dos builds
// de Vite (cliente + SSR). NO depende de un navegador.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Beasties from "beasties";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "dist");
const ROOT_TAG = '<div id="root"></div>';

// Rutas a prerenderizar (solo home eager → hidratación limpia).
const ROUTES = ["/", "/es"];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
if (!template.includes(ROOT_TAG)) {
  throw new Error(`No se encontró ${ROOT_TAG} en dist/index.html`);
}

// Shell SPA en blanco para rutas no prerenderizadas (Vercel reescribe a /app.html).
fs.writeFileSync(path.join(dist, "app.html"), template);

const serverEntry = pathToFileURL(path.join(__dirname, ".ssr", "entry-server.js")).href;
const { render } = await import(serverEntry);

// Inlinea el CSS crítico above-the-fold y difiere el resto → quita el bloqueo de
// render (el cuello del FCP tras prerenderizar). Solo en / y /es.
const beasties = new Beasties({
  path: dist,
  publicPath: "/",
  preload: "swap",
  pruneSource: false,
  logLevel: "silent",
});

for (const url of ROUTES) {
  const appHtml = await render(url);
  const rawHtml = template.replace(ROOT_TAG, `<div id="root">${appHtml}</div>`);
  const html = await beasties.process(rawHtml);
  const outPath = url === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, url.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`✓ prerender+CSS ${url} → ${path.relative(dist, outPath)} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log("✓ shell SPA → app.html");
