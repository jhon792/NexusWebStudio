# Especificación — Panel de testimonios con moderación (Nexsu Studio)

> Documento de handoff para construir un sistema de **comentarios/testimonios con
> aprobación** e integrarlo en el proyecto `mio`. Escrito para que otra IA o
> desarrollador lo implemente sin romper lo existente. Stack y rutas son reales.

---

## 0. Contexto del proyecto (LEER ANTES DE CODIFICAR)

- **Stack:** Vite 6 + React + TypeScript + `react-router` (data router en `src/routes.tsx`) + `motion/react` + i18next. Gestor de paquetes: **pnpm**.
- **Render:** SPA **prerenderizada** (build = `vite build && vite build --ssr src/entry-server.tsx --outDir .ssr && node prerender.mjs`). ⇒ El HTML de `/` y `/es` es estático; **cualquier dato dinámico (testimonios aprobados) debe cargarse en el cliente con `useEffect`**, no en SSR.
- **Hosting:** Vercel. Config en `vercel.json` + `middleware.ts` (edge, geo). Headers de seguridad en `vercel.json` y `public/_headers`.
- **Home en vivo:** `/` (Colombia/COP) y `/es` (España/€) renderizan `src/app/components/nexus/NexusLanding.tsx`, que monta `<NexusTestimonials />`.
- **i18n del home:** `src/app/components/nexus/nexus-i18n.ts` (4 idiomas: es/en/fr/it). Hook de contexto: `useNexus()` → `{ t, lang, region }` con `lang ∈ "es"|"en"|"fr"|"it"` y `region ∈ "CO"|"EU"`.
- **Componente a modificar:** `src/app/components/nexus/NexusTestimonials.tsx`.
  - Contrato actual: lee `t.testimonials.items: { quote: string; name: string; role: string }[]` y `t.testimonials.title`.
  - **Ya devuelve `null` si `items` está vacío** (decisión deliberada: no mostrar testimonios inventados). Mantener ese comportamiento: si no hay aprobados, no se muestra la sección.
- ⚠️ **NO reintroducir testimonios falsos.** Todo lo que se muestre debe venir de la base de datos y estar `aprobado`.

---

## 1. Supabase — base de datos

### 1.1 Crear proyecto
- Crear (o reanudar) un proyecto en https://supabase.com/dashboard. Región sugerida: `us-east-2`. Plan Free es suficiente.
- Settings → API → copiar **Project URL** y **anon/publishable key** (la anon es pública; la `service_role` es SECRETA, nunca va al frontend).

### 1.2 Tabla + RLS (ejecutar en SQL Editor)

```sql
-- Tabla de testimonios con moderación
create table public.testimonios (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  rol         text,                         -- "Clínica Dental · Bogotá" (cargo/empresa)
  cita        text not null,
  estrellas   int  not null default 5 check (estrellas between 1 and 5),
  region      text not null default 'CO' check (region in ('CO','EU')),
  lang        text not null default 'es'  check (lang in ('es','en','fr','it')),
  estado      text not null default 'pendiente' check (estado in ('pendiente','aprobado','rechazado')),
  email       text,                         -- opcional, NO se muestra públicamente
  honeypot    text                          -- anti-spam (debe llegar vacío)
);

create index testimonios_estado_idx on public.testimonios (estado);

alter table public.testimonios enable row level security;

-- (A) Cualquiera puede ENVIAR, pero solo en estado 'pendiente' y sin spam
create policy "enviar_testimonio_publico"
  on public.testimonios for insert
  to anon
  with check ( estado = 'pendiente' and coalesce(honeypot,'') = '' );

-- (B) El público solo puede LEER los aprobados
create policy "leer_aprobados_publico"
  on public.testimonios for select
  to anon
  using ( estado = 'aprobado' );

-- (C) El admin (autenticado) puede leer TODO y actualizar el estado
create policy "admin_lee_todo"
  on public.testimonios for select
  to authenticated
  using ( true );

create policy "admin_actualiza"
  on public.testimonios for update
  to authenticated
  using ( true )
  with check ( true );
```

> Nota: no se da permiso de DELETE a nadie por API (rechazar = `estado='rechazado'`).
> Si se quiere borrar de verdad, hacerlo desde el dashboard.

### 1.3 Usuario admin (autenticación)
- Authentication → **desactivar "Allow new users to sign up"** (para que solo exista el dueño).
- Authentication → Users → **Add user** → crear el usuario del fundador (email + contraseña). Ese será el login del panel `/admin`.
- (Opcional, más estricto) cambiar las policies (C) para exigir un email concreto:
  `using ( (auth.jwt() ->> 'email') = 'tu-correo@dominio.com' )`.

---

## 2. Variables de entorno + CSP (paso CRÍTICO de integración)

### 2.1 Env (Vite expone solo variables con prefijo `VITE_`)
Añadir a `.env.local` (local) **y** a las env vars del proyecto en Vercel:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...   (o sb_publishable_...)
```
Documentarlas también en `.env.example`.

### 2.2 ⚠️ Content-Security-Policy — hay que permitir Supabase
El sitio tiene CSP estricta en **DOS** sitios; en ambos hay que añadir el dominio de Supabase a `connect-src`, o el navegador **bloqueará** todas las llamadas:
- `index.html` → meta `Content-Security-Policy` → en `connect-src` añadir `https://*.supabase.co wss://*.supabase.co`.
- `vercel.json` → header `Content-Security-Policy` → mismo cambio en `connect-src`.
- (`public/_headers` también tiene CSP; mantener los tres en sync.)

---

## 3. Cliente de Supabase

```bash
pnpm add @supabase/supabase-js
```

`src/lib/supabase.ts`:
```ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Cliente único para el navegador (anon key — pública por diseño).
export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export type Testimonio = {
  id: string;
  nombre: string;
  rol: string | null;
  cita: string;
  estrellas: number;
  region: "CO" | "EU";
  lang: "es" | "en" | "fr" | "it";
  estado: "pendiente" | "aprobado" | "rechazado";
  created_at: string;
};
```

---

## 4. Formulario público "Deja tu opinión"

Crear `src/app/components/nexus/TestimonialForm.tsx`. Requisitos:
- Campos: **nombre** (req), **rol/empresa** (opcional, ej. "Clínica Dental · Bogotá"), **estrellas** (1–5, default 5), **cita/opinión** (req, mín. 20 caracteres), **email** (opcional).
- Campo **honeypot** oculto (input `name="honeypot"` con `display:none` / `tabindex=-1`); si llega con valor, se ignora (lo bloquea la policy A).
- Al enviar: `await supabase.from('testimonios').insert({ nombre, rol, cita, estrellas, email, honeypot, region, lang })` tomando `region` y `lang` de `useNexus()`.
- Mensaje de éxito: *"¡Gracias! Tu opinión se revisará antes de publicarse."* (dejar claro que NO aparece al instante → coincide con la moderación).
- Textos en los 4 idiomas (ver §7). Estilo: usar las clases `nx-*` y variables CSS del tema (ver `nexus-theme.css`) para que combine.
- Dónde montarlo: dentro de `NexusLanding.tsx`, cerca de `<NexusTestimonials />` o en `ConversionFunnel`. Es público (sin login).

---

## 5. Mostrar testimonios reales aprobados

Modificar `src/app/components/nexus/NexusTestimonials.tsx`:
- Quitar la lectura desde i18n (`t.testimonials.items`) como fuente de datos (el `title` sí puede seguir desde i18n).
- En `useEffect` (solo cliente), cargar aprobados:
  ```ts
  const [items, setItems] = useState<Testimonio[]>([]);
  useEffect(() => {
    supabase.from('testimonios')
      .select('*')
      .eq('estado', 'aprobado')
      // opcional: mostrar por público → .eq('region', region)
      .order('created_at', { ascending: false })
      .limit(9)
      .then(({ data }) => setItems(data ?? []));
  }, [region]);
  ```
- **Mantener:** `if (items.length === 0) return null;` (no mostrar la sección vacía).
- Mapear `item.cita`/`item.nombre`/`item.rol`/`item.estrellas` a la tarjeta existente.
- Las fotos: ya no hay fotos reales por testimonio → usar iniciales/avatar generado (no fotos de stock que parezcan personas reales que no son).

---

## 6. Panel admin `/admin`

### 6.1 Ruta
En `src/routes.tsx`, dentro de `children` de `RootLayout`, añadir:
```ts
{ path: "admin", lazy: page(() => import("./app/pages/Admin")) },
```
- `/admin` **no** debe prerenderizarse ni indexarse. Añadir `<meta name="robots" content="noindex,nofollow">` (vía el hook `usePageSEO`) y NO incluirlo en `sitemap.xml`. El rewrite de `vercel.json` ya manda rutas desconocidas a `app.html`, así que `/admin` funciona como ruta cliente.

### 6.2 Página `src/app/pages/Admin.tsx`
- **Si no hay sesión:** formulario de login → `supabase.auth.signInWithPassword({ email, password })`.
- **Si hay sesión:** 
  - Listar pendientes: `supabase.from('testimonios').select('*').eq('estado','pendiente').order('created_at')`.
  - Cada fila con botones **Aprobar** (`update({estado:'aprobado'})`) y **Rechazar** (`update({estado:'rechazado'})`).
  - (Opcional) pestañas: Pendientes / Aprobados / Rechazados.
  - Botón **Cerrar sesión** (`supabase.auth.signOut()`).
- La seguridad real la dan las **RLS** (un anónimo no puede leer pendientes ni actualizar aunque conozca la URL). El login es solo la puerta de la UI.

---

## 7. Textos i18n (4 idiomas)
El proyecto soporta es/en/fr/it. Añadir las cadenas del formulario y del panel en `nexus-i18n.ts` (siguiendo el patrón existente) o en un bloque nuevo. Mínimo: título del formulario, labels, placeholder, botón enviar, mensaje de éxito/error. El panel `/admin` puede ir solo en español (lo usa el dueño).

---

## 8. Build, verificación y deploy
1. `pnpm install` (trae `@supabase/supabase-js`).
2. `pnpm run build:spa` → debe compilar sin errores.
3. Probar en local (`pnpm run dev`): enviar una opinión → ver que entra como `pendiente` en Supabase → entrar a `/admin`, loguear, aprobar → recargar home → debe aparecer.
4. Configurar las env vars en Vercel (Production + Preview).
5. `vercel deploy --prod` (proyecto `mio`, scope `jhon-palencia-s-projects`).
6. Verificar en vivo: CSP no bloquea Supabase (revisar consola del navegador), el flujo completo funciona.

---

## 9. Checklist de seguridad (no saltarse)
- [ ] RLS **activado** en `testimonios` (sin RLS, cualquiera puede leer/editar todo).
- [ ] El frontend usa **solo** la `anon`/publishable key, nunca la `service_role`.
- [ ] Signups de Supabase Auth **desactivados**; admin creado a mano.
- [ ] `connect-src` de la CSP incluye `https://*.supabase.co` en los 3 sitios (index.html, vercel.json, _headers).
- [ ] `/admin` con `noindex` y fuera del sitemap.
- [ ] Honeypot + `min length` en la cita para reducir spam (considerar Turnstile/captcha si llega spam).
- [ ] Moderación por defecto: nada se publica sin pasar a `aprobado`.

---

## 10. Qué NO romper al integrar
- No reintroducir contenido inventado (testimonios, "+40 negocios", "90% recuperan", "+200 proyectos"). Ya se limpiaron en 4 idiomas.
- Mantener `NexusTestimonials` devolviendo `null` cuando no hay aprobados.
- No tocar el `middleware.ts` ni el enrutado CO/EU (ya resuelto: Europa→/es €, resto→/ COP, crawlers excluidos).
- Mantener el prerender: los datos dinámicos se cargan en cliente, no en SSR.
- Si cambias la lista de países europeos, recuerda que está duplicada en `middleware.ts` y `src/geo-europe.ts` (deben coincidir).
```
