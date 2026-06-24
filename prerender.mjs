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

// Rutas a prerenderizar (home + páginas de sector; todas eager → hidratación limpia).
const ROUTES = [
  "/",
  "/es",
  // Sectores Colombia (COP)
  "/sectores/inmobiliarias",
  "/sectores/restaurantes",
  "/sectores/constructoras",
  // Sectores España (EUR)
  "/es/sectores/clinicas-dentales",
  "/es/sectores/abogados",
  "/es/sectores/clinicas-esteticas",
  "/es/sectores/fisioterapeutas",
  "/es/sectores/psicologos",
  "/es/sectores/restaurantes",
  "/es/sectores/inmobiliarias",
  "/es/sectores/arquitectos",
  "/es/sectores/peluquerias",
  "/es/sectores/gimnasios",
];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
if (!template.includes(ROOT_TAG)) {
  throw new Error(`No se encontró ${ROOT_TAG} en dist/index.html`);
}

const escAttr = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Escribe en el HTML estático el head por ruta (canonical/title/og/hreflang). */
function applyHead(html, head) {
  if (!head) return html;
  const t = escAttr(head.title);
  const d = escAttr(head.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${head.canonical}$2`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${head.canonical}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`);
  if (head.ogLocale)
    html = html.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${head.ogLocale}$2`);
  if (head.htmlLang)
    html = html.replace(/(<html lang=")[^"]*(")/, `$1${head.htmlLang}$2`);
  if (head.alternates && head.alternates.length) {
    const links = head.alternates
      .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
      .join("");
    html = html.replace("</head>", `${links}</head>`);
  }
  return html;
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
  const { html: appHtml, head } = await render(url);
  let rawHtml = template.replace(ROOT_TAG, `<div id="root">${appHtml}</div>`);
  rawHtml = applyHead(rawHtml, head);
  const html = await beasties.process(rawHtml);
  const outPath = url === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, url.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`✓ prerender+CSS ${url} → ${path.relative(dist, outPath)} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log("✓ shell SPA → app.html");
