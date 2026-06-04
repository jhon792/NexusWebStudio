import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Fondo principal -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06040f"/>
      <stop offset="100%" stop-color="#0d0b1e"/>
    </linearGradient>
    <!-- Gradiente del título -->
    <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="45%" stop-color="#a78bfa"/>
      <stop offset="80%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#e879f9"/>
    </linearGradient>
    <!-- Nebulosa izquierda -->
    <radialGradient id="neb1" cx="20%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#4c1d95" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#06040f" stop-opacity="0"/>
    </radialGradient>
    <!-- Nebulosa derecha -->
    <radialGradient id="neb2" cx="85%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#06040f" stop-opacity="0"/>
    </radialGradient>
    <!-- Nebulosa top center -->
    <radialGradient id="neb3" cx="55%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#06040f" stop-opacity="0"/>
    </radialGradient>
    <!-- Glow del badge -->
    <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Fondo -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Grid sutil -->
  <g opacity="0.04">
    ${Array.from({length: 21}, (_, i) => `<line x1="${i*60}" y1="0" x2="${i*60}" y2="${H}" stroke="#818cf8" stroke-width="1"/>`).join('')}
    ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i*63}" x2="${W}" y2="${i*63}" stroke="#818cf8" stroke-width="1"/>`).join('')}
  </g>

  <!-- Nebulosas -->
  <rect width="${W}" height="${H}" fill="url(#neb3)"/>
  <rect width="${W}" height="${H}" fill="url(#neb1)"/>
  <rect width="${W}" height="${H}" fill="url(#neb2)"/>

  <!-- Badge "Nexus Studio" -->
  <rect x="80" y="72" width="200" height="36" rx="18" fill="#6366f1" fill-opacity="0.15" stroke="#6366f1" stroke-opacity="0.4" stroke-width="1"/>
  <circle cx="108" cy="90" r="5" fill="#4ade80"/>
  <text x="122" y="95" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.75)" letter-spacing="0.5">Nexus Studio</text>

  <!-- Título principal línea 1 -->
  <text x="80" y="210" font-family="Inter, Arial, sans-serif" font-size="78" font-weight="800" fill="white" letter-spacing="-3">Diseño Web</text>

  <!-- Título línea 2 con gradiente -->
  <text x="80" y="305" font-family="Inter, Arial, sans-serif" font-size="78" font-weight="800" fill="url(#titleGrad)" letter-spacing="-3">Profesional</text>

  <!-- Subtítulo -->
  <text x="80" y="370" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="400" fill="rgba(255,255,255,0.5)" letter-spacing="0">en Colombia — que genera clientes reales</text>

  <!-- Separador -->
  <line x1="80" y1="420" x2="480" y2="420" stroke="url(#titleGrad)" stroke-width="2" opacity="0.6"/>

  <!-- Badges inferiores -->
  <rect x="80" y="445" width="145" height="34" rx="17" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.3)" stroke-width="1"/>
  <text x="153" y="467" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="600" fill="#818cf8" text-anchor="middle">+40 negocios</text>

  <rect x="238" y="445" width="160" height="34" rx="17" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.3)" stroke-width="1"/>
  <text x="318" y="467" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="600" fill="#818cf8" text-anchor="middle">Entrega en 3-15 días</text>

  <rect x="412" y="445" width="155" height="34" rx="17" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.3)" stroke-width="1"/>
  <text x="490" y="467" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="600" fill="#818cf8" text-anchor="middle">Sin costos ocultos</text>

  <!-- URL dominio -->
  <text x="80" y="558" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.3)" letter-spacing="1">nexsustudio.site</text>

  <!-- Elemento decorativo derecha — círculo / planeta abstracto -->
  <circle cx="980" cy="315" r="220" fill="none" stroke="rgba(129,140,248,0.06)" stroke-width="1"/>
  <circle cx="980" cy="315" r="170" fill="none" stroke="rgba(129,140,248,0.08)" stroke-width="1"/>
  <circle cx="980" cy="315" r="120" fill="rgba(99,102,241,0.07)" stroke="rgba(129,140,248,0.15)" stroke-width="1"/>
  <circle cx="980" cy="315" r="75" fill="rgba(99,102,241,0.12)" stroke="rgba(129,140,248,0.2)" stroke-width="1"/>
  <!-- NS monograma -->
  <text x="980" y="333" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="800" fill="url(#titleGrad)" text-anchor="middle">NS</text>

  <!-- Puntos orbitales -->
  <circle cx="980" cy="145" r="5" fill="#818cf8" opacity="0.7"/>
  <circle cx="1150" cy="315" r="4" fill="#c084fc" opacity="0.6"/>
  <circle cx="980" cy="485" r="4" fill="#60a5fa" opacity="0.5"/>
  <circle cx="810" cy="315" r="3" fill="#a78bfa" opacity="0.5"/>
</svg>
`;

await sharp(Buffer.from(svg))
  .resize(W, H)
  .jpeg({ quality: 92 })
  .toFile('public/og-image.jpg');

console.log('✓ og-image.jpg generada en public/');
