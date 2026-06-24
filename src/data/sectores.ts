/* ============================================================================
   SECTORES · Datos para páginas de SEO programático (una landing por profesión).
   - CO (region "CO", COP): /sectores/:slug
   - ES (region "EU", EUR): /es/sectores/:slug
   Cada sector tiene contenido ÚNICO (intro + 4 beneficios + FAQ) para no ser
   thin/doorway content. El slug es único dentro de su región.
   ============================================================================ */

export type SectorRegion = "CO" | "EU";

export interface SectorBenefit {
  title: string;
  text: string;
}

export interface SectorFaq {
  q: string;
  a: string;
}

export interface Sector {
  region: SectorRegion;
  slug: string;
  professionTitle: string;   // "Inmobiliarias"
  geoLabel: string;          // "Colombia" | "España"
  eyebrow: string;           // pequeño rótulo sobre el H1
  title: string;             // <title> / meta
  description: string;       // meta description
  h1: string;
  intro: string;
  benefits: SectorBenefit[];
  faq: SectorFaq[];
}

/** Ruta pública de un sector. */
export function sectorPath(s: Sector): string {
  return s.region === "EU" ? `/es/sectores/${s.slug}` : `/sectores/${s.slug}`;
}

export function findSector(region: SectorRegion, slug: string): Sector | undefined {
  return SECTORS.find((s) => s.region === region && s.slug === slug);
}

// ── COLOMBIA (COP) ───────────────────────────────────────────────────────────
const CO: Sector[] = [
  {
    region: "CO",
    slug: "inmobiliarias",
    professionTitle: "Inmobiliarias",
    geoLabel: "Colombia",
    eyebrow: "Sector inmobiliario",
    title: "Diseño Web para Inmobiliarias en Colombia | Portal de Propiedades | Nexus Studio",
    description:
      "Páginas web para inmobiliarias en Colombia con catálogo de propiedades, filtros por zona y contacto por WhatsApp. Capta más compradores y arrendatarios. Cotiza gratis.",
    h1: "Diseño web para inmobiliarias en Colombia",
    intro:
      "Tus clientes buscan vivienda en Google y redes mucho antes de llamar. Una web inmobiliaria profesional muestra tus propiedades 24/7, deja filtrar por zona y presupuesto, y convierte simples visitas en citas reales.",
    benefits: [
      { title: "Catálogo de propiedades", text: "Fichas con fotos, precio, ubicación y estado; filtros por ciudad, tipo y rango de precio." },
      { title: "Contacto inmediato", text: "Botón de WhatsApp y formulario en cada propiedad para que el interesado te escriba sin fricción." },
      { title: "Posicionamiento local", text: "Apareces cuando buscan 'apartamentos en venta en tu ciudad', con SEO local incluido." },
      { title: "Panel fácil de actualizar", text: "Subes, editas o marcas como vendida una propiedad en minutos, sin depender de nadie." },
    ],
    faq: [
      { q: "¿Puedo cargar yo mismo las propiedades?", a: "Sí. Entregamos un panel sencillo donde subes fotos, precio y datos de cada inmueble y lo publicas al instante." },
      { q: "¿Sirve para venta y arriendo?", a: "Sí, puedes clasificar cada propiedad como venta o arriendo y el visitante filtra por lo que busca." },
    ],
  },
  {
    region: "CO",
    slug: "restaurantes",
    professionTitle: "Restaurantes",
    geoLabel: "Colombia",
    eyebrow: "Restaurantes y gastronomía",
    title: "Diseño Web para Restaurantes en Colombia | Menú y Reservas Online | Nexus Studio",
    description:
      "Webs para restaurantes en Colombia con menú digital, reservas y pedidos por WhatsApp. Llena más mesas y aparece en Google Maps. Cotiza gratis por WhatsApp.",
    h1: "Diseño web para restaurantes en Colombia",
    intro:
      "La mayoría de comensales mira el menú online antes de decidir dónde comer. Una web rápida con tu carta, fotos que dan hambre y reservas en un clic te llena más mesas y reduce las llamadas.",
    benefits: [
      { title: "Menú digital siempre al día", text: "Tu carta con fotos y precios; la cambias cuando quieras sin reimprimir nada." },
      { title: "Reservas y domicilios", text: "Reserva de mesa y pedidos a domicilio directo por WhatsApp, sin comisiones de terceros." },
      { title: "Google Maps y reseñas", text: "Te encuentran al buscar 'restaurante cerca' y conectamos tus reseñas para dar confianza." },
      { title: "Diseño que abre el apetito", text: "Fotografía y diseño cuidados que reflejan la experiencia real de tu local." },
    ],
    faq: [
      { q: "¿Puedo recibir pedidos sin pagar comisión?", a: "Sí. Los pedidos llegan por WhatsApp a tu propio número, sin la comisión de las apps de domicilios." },
      { q: "¿Actualizo yo el menú?", a: "Sí, te dejamos editar platos y precios fácilmente, ideal para cambios de carta o promociones." },
    ],
  },
  {
    region: "CO",
    slug: "constructoras",
    professionTitle: "Constructoras",
    geoLabel: "Colombia",
    eyebrow: "Construcción y arquitectura",
    title: "Diseño Web para Constructoras en Colombia | Portafolio de Obras | Nexus Studio",
    description:
      "Webs corporativas para constructoras y arquitectos en Colombia: portafolio de obras, proyectos en venta y captación de inversionistas. Imagen sólida que genera confianza.",
    h1: "Diseño web para constructoras y arquitectos en Colombia",
    intro:
      "Una constructora se elige por la confianza que transmite. Tu web muestra obras entregadas, proyectos en curso y avances reales, posicionándote como una empresa seria ante compradores e inversionistas.",
    benefits: [
      { title: "Portafolio de obras", text: "Galería de proyectos entregados con fotos, ubicación y ficha técnica que demuestran trayectoria." },
      { title: "Proyectos en venta", text: "Presentas unidades disponibles con planos, renders y formulario para separar." },
      { title: "Confianza corporativa", text: "Diseño profesional con tu trayectoria, certificaciones y equipo para cerrar negocios grandes." },
      { title: "Captación de inversionistas", text: "Formularios e integración con WhatsApp para que compradores e inversionistas te contacten." },
    ],
    faq: [
      { q: "¿Sirve para vivienda y obra civil?", a: "Sí. Estructuramos el sitio según tu enfoque: vivienda, comercial, obra civil o mixto, con secciones a medida." },
      { q: "¿Pueden integrar renders y planos?", a: "Sí, mostramos renders, planos y avances de obra de forma ordenada y atractiva." },
    ],
  },
];

// ── ESPAÑA (EUR) ─────────────────────────────────────────────────────────────
const ES: Sector[] = [
  {
    region: "EU",
    slug: "clinicas-dentales",
    professionTitle: "Clínicas dentales",
    geoLabel: "España",
    eyebrow: "Sector dental",
    title: "Diseño Web para Clínicas Dentales en España | Cita Online | Nexus Studio",
    description:
      "Páginas web para clínicas dentales en España con cita online, tratamientos y reseñas. Consigue más pacientes desde Google. Pide presupuesto gratis.",
    h1: "Diseño web para clínicas dentales en España",
    intro:
      "Los pacientes eligen dentista por Google y por las reseñas. Una web clara con tus tratamientos, casos reales y cita online convierte esas búsquedas en pacientes sentados en tu sillón.",
    benefits: [
      { title: "Cita online 24/7", text: "El paciente reserva sin llamar; reduces huecos en agenda y carga de recepción." },
      { title: "Tratamientos optimizados", text: "Implantes, ortodoncia o estética dental, cada uno con su página posicionada en Google." },
      { title: "Confianza y reseñas", text: "Casos antes/después, equipo y reseñas de Google que transmiten seguridad." },
      { title: "SEO local", text: "Apareces en 'dentista en tu ciudad' y en el mapa de Google Maps." },
    ],
    faq: [
      { q: "¿Cumple con la normativa de publicidad sanitaria?", a: "Sí, diseñamos el contenido con un enfoque informativo y sobrio, acorde a la publicidad sanitaria en España." },
      { q: "¿Integráis la cita online con mi software?", a: "Podemos integrar un sistema de cita propio o enlazar con la herramienta de gestión que ya uses." },
    ],
  },
  {
    region: "EU",
    slug: "abogados",
    professionTitle: "Abogados",
    geoLabel: "España",
    eyebrow: "Despachos y abogados",
    title: "Diseño Web para Abogados en España | Despachos que Captan Clientes | Nexus Studio",
    description:
      "Webs para abogados y despachos en España: áreas de práctica, casos de éxito y captación de clientes por Google. Imagen seria y profesional. Pide presupuesto gratis.",
    h1: "Diseño web para abogados y despachos en España",
    intro:
      "Cuando alguien tiene un problema legal, busca en Google y confía en quien proyecta solvencia. Una web bien estructurada por áreas de práctica te posiciona como el despacho de referencia y te trae consultas cualificadas.",
    benefits: [
      { title: "Áreas de práctica claras", text: "Una página por especialidad (laboral, penal, mercantil…) optimizada para su búsqueda concreta." },
      { title: "Captación cualificada", text: "Formularios de consulta y WhatsApp que filtran y te traen casos con intención real." },
      { title: "Autoridad y confianza", text: "Equipo, trayectoria y casos de éxito que justifican tus honorarios." },
      { title: "SEO jurídico local", text: "Posicionamos 'abogado laboralista en tu ciudad' y similares de alto valor." },
    ],
    faq: [
      { q: "¿Podéis incluir un blog jurídico?", a: "Sí, el blog es clave en legal: posiciona dudas frecuentes y atrae clientes potenciales mes a mes." },
      { q: "¿Sirve para despacho individual y para firma grande?", a: "Sí, adaptamos la estructura tanto a un abogado independiente como a una firma con varios departamentos." },
    ],
  },
  {
    region: "EU",
    slug: "clinicas-esteticas",
    professionTitle: "Clínicas estéticas",
    geoLabel: "España",
    eyebrow: "Medicina y estética",
    title: "Diseño Web para Clínicas Estéticas en España | Más Reservas | Nexus Studio",
    description:
      "Webs para clínicas estéticas y de medicina estética en España con reserva online, tratamientos y galería de resultados. Atrae clientas de alto valor. Pide presupuesto.",
    h1: "Diseño web para clínicas estéticas en España",
    intro:
      "En estética, la imagen lo es todo. Una web elegante con tus tratamientos, resultados reales y reserva online transmite el nivel de tu clínica y convierte el interés en citas.",
    benefits: [
      { title: "Imagen premium", text: "Diseño cuidado que refleja la calidad de tu clínica desde el primer segundo." },
      { title: "Reserva online", text: "Agenda de citas integrada para tratamientos y primeras consultas." },
      { title: "Galería de resultados", text: "Antes/después y testimonios que disipan dudas y aumentan la conversión." },
      { title: "Tratamientos posicionados", text: "Cada tratamiento con su página para captar la búsqueda específica en Google." },
    ],
    faq: [
      { q: "¿Puedo mostrar antes y después?", a: "Sí, con un diseño elegante y discreto, respetando la normativa de publicidad sanitaria." },
      { q: "¿Incluye reserva de citas?", a: "Sí, integramos un sistema de reserva online o lo conectamos con tu agenda actual." },
    ],
  },
  {
    region: "EU",
    slug: "fisioterapeutas",
    professionTitle: "Fisioterapeutas",
    geoLabel: "España",
    eyebrow: "Fisioterapia y rehabilitación",
    title: "Diseño Web para Fisioterapeutas en España | Cita Online | Nexus Studio",
    description:
      "Páginas web para fisioterapeutas y clínicas de fisioterapia en España con reserva de cita, servicios y reseñas. Llena tu agenda desde Google. Pide presupuesto gratis.",
    h1: "Diseño web para fisioterapeutas en España",
    intro:
      "Quien tiene una lesión busca 'fisioterapeuta cerca de mí' y reserva con el primero que le da confianza. Una web rápida con tus servicios y cita online llena tu agenda sin llamadas.",
    benefits: [
      { title: "Cita online directa", text: "El paciente reserva su sesión en segundos, incluso fuera del horario de la clínica." },
      { title: "Servicios explicados", text: "Fisioterapia deportiva, suelo pélvico, punción seca… cada uno con su página optimizada." },
      { title: "Confianza profesional", text: "Tu formación, instalaciones y reseñas que convencen al nuevo paciente." },
      { title: "SEO local", text: "Posicionas 'fisioterapeuta en tu ciudad o barrio', donde está la demanda real." },
    ],
    faq: [
      { q: "¿Sirve para clínica y para fisio a domicilio?", a: "Sí, adaptamos la web tanto a un centro físico como a servicio a domicilio o mixto." },
      { q: "¿Puedo gestionar la agenda yo?", a: "Sí, eliges un sistema de reservas que controlas tú o lo enlazamos con tu herramienta actual." },
    ],
  },
  {
    region: "EU",
    slug: "psicologos",
    professionTitle: "Psicólogos",
    geoLabel: "España",
    eyebrow: "Psicología y terapia",
    title: "Diseño Web para Psicólogos en España | Terapia Online y Presencial | Nexus Studio",
    description:
      "Webs para psicólogos y centros de psicología en España con cita online, terapias y enfoque cercano. Capta pacientes para sesión online o presencial. Pide presupuesto.",
    h1: "Diseño web para psicólogos en España",
    intro:
      "Pedir ayuda psicológica empieza casi siempre con una búsqueda discreta en Google. Una web cercana y profesional, con tus áreas de terapia y reserva sencilla, transmite confianza y convierte esa búsqueda en una primera sesión.",
    benefits: [
      { title: "Tono cercano y profesional", text: "Diseño y textos que generan confianza y reducen la barrera de dar el primer paso." },
      { title: "Terapia online y presencial", text: "Dejas claro que atiendes por videollamada y/o en consulta, ampliando tu alcance." },
      { title: "Áreas de terapia", text: "Ansiedad, pareja, infantil… cada especialidad con su página posicionada en Google." },
      { title: "Reserva confidencial", text: "Formulario y cita online discretos que respetan la privacidad del paciente." },
    ],
    faq: [
      { q: "¿Puedo ofrecer sesiones por videollamada?", a: "Sí, dejamos claro el servicio online y enlazamos con tu sistema de videollamada y reservas." },
      { q: "¿Se cuida la privacidad?", a: "Sí, diseñamos formularios y avisos legales acordes a la protección de datos en España." },
    ],
  },
  {
    region: "EU",
    slug: "restaurantes",
    professionTitle: "Restaurantes",
    geoLabel: "España",
    eyebrow: "Hostelería y restauración",
    title: "Diseño Web para Restaurantes en España | Menú y Reservas Online | Nexus Studio",
    description:
      "Webs para restaurantes y bares en España con carta digital, reservas y Google Maps. Llena más mesas y reduce comisiones de terceros. Pide presupuesto gratis.",
    h1: "Diseño web para restaurantes en España",
    intro:
      "Antes de reservar mesa, el cliente mira la carta y las fotos online. Una web rápida con tu menú, reservas en un clic y buena presencia en Google Maps te llena el local sin depender de plataformas con comisión.",
    benefits: [
      { title: "Carta digital atractiva", text: "Tu menú con fotos y precios, actualizable al instante para cambios de temporada." },
      { title: "Reservas sin comisión", text: "Reserva de mesa directa, sin pagar a plataformas intermediarias por cada cliente." },
      { title: "Google Maps y reseñas", text: "Apareces en 'restaurantes cerca' y conectamos tus reseñas para atraer comensales." },
      { title: "Identidad de marca", text: "Diseño que refleja el estilo de tu cocina y tu local, de tapas a alta cocina." },
    ],
    faq: [
      { q: "¿Puedo conectar la reserva con mi sistema?", a: "Sí, integramos un sistema de reservas propio o lo enlazamos con el que ya utilices." },
      { q: "¿Actualizo la carta yo mismo?", a: "Sí, te dejamos editar platos, precios y menús del día de forma sencilla." },
    ],
  },
  {
    region: "EU",
    slug: "inmobiliarias",
    professionTitle: "Inmobiliarias",
    geoLabel: "España",
    eyebrow: "Sector inmobiliario",
    title: "Diseño Web para Inmobiliarias en España | Portal de Propiedades | Nexus Studio",
    description:
      "Webs para inmobiliarias en España con buscador de propiedades, filtros y contacto directo. Capta compradores y propietarios desde Google. Pide presupuesto gratis.",
    h1: "Diseño web para inmobiliarias en España",
    intro:
      "El comprador y el inquilino empiezan su búsqueda en internet. Una web inmobiliaria con buscador, fichas atractivas y contacto inmediato capta más interesados y también propietarios que quieren vender o alquilar contigo.",
    benefits: [
      { title: "Buscador de propiedades", text: "Filtros por zona, tipo, precio y habitaciones para que el cliente encuentre rápido." },
      { title: "Fichas que venden", text: "Fotos, planos, características y contacto directo en cada inmueble." },
      { title: "Captación de propietarios", text: "Sección de valoración gratuita que te trae viviendas nuevas para tu cartera." },
      { title: "SEO local", text: "Posicionas 'pisos en venta en tu ciudad o barrio', donde está la demanda." },
    ],
    faq: [
      { q: "¿Puedo importar propiedades desde un CRM inmobiliario?", a: "Sí, podemos conectar con tu CRM o portal para sincronizar la cartera de inmuebles." },
      { q: "¿Sirve para alquiler vacacional?", a: "Sí, adaptamos la web a venta, alquiler de larga estancia o vacacional según tu negocio." },
    ],
  },
  {
    region: "EU",
    slug: "arquitectos",
    professionTitle: "Arquitectos",
    geoLabel: "España",
    eyebrow: "Arquitectura y estudios",
    title: "Diseño Web para Arquitectos en España | Portafolio de Proyectos | Nexus Studio",
    description:
      "Webs para arquitectos y estudios de arquitectura en España: portafolio visual, proyectos y captación de clientes. Diseño a la altura de tu trabajo. Pide presupuesto.",
    h1: "Diseño web para arquitectos y estudios en España",
    intro:
      "Para un arquitecto, la web es su carta de presentación. Un portafolio visual, rápido y elegante demuestra tu nivel y convierte a quien admira tu trabajo en tu próximo cliente.",
    benefits: [
      { title: "Portafolio visual", text: "Tus proyectos con fotografía a gran formato y fichas que cuentan cada obra." },
      { title: "Diseño a tu altura", text: "Una web tan cuidada como tu arquitectura, que transmite criterio y detalle." },
      { title: "Captación de proyectos", text: "Contacto claro para vivienda, reforma o proyecto comercial según tu enfoque." },
      { title: "SEO y prensa", text: "Posicionamos tu estudio y facilitamos que medios y premios encuentren tu trabajo." },
    ],
    faq: [
      { q: "¿Puedo organizar los proyectos por categorías?", a: "Sí, clasificamos por tipología (vivienda, reforma, interiorismo…) para una navegación clara." },
      { q: "¿Optimizáis las imágenes pesadas?", a: "Sí, comprimimos y servimos las fotos en formatos modernos para que cargue rápido sin perder calidad." },
    ],
  },
  {
    region: "EU",
    slug: "peluquerias",
    professionTitle: "Peluquerías y estética",
    geoLabel: "España",
    eyebrow: "Belleza y peluquería",
    title: "Diseño Web para Peluquerías y Centros de Estética en España | Nexus Studio",
    description:
      "Webs para peluquerías, barberías y centros de estética en España con reserva de cita online, servicios y galería. Llena tu agenda desde Google. Pide presupuesto.",
    h1: "Diseño web para peluquerías y centros de estética en España",
    intro:
      "Tus clientes reservan cita desde el móvil. Una web con reserva online, tus servicios y trabajos reales reduce las llamadas, los huecos en agenda y atrae clientela nueva de tu zona.",
    benefits: [
      { title: "Reserva online", text: "El cliente elige servicio, profesional y hora sin llamar; tú reduces huecos." },
      { title: "Galería de trabajos", text: "Cortes, color y tratamientos reales que inspiran y convierten." },
      { title: "Servicios y precios", text: "Carta de servicios clara que filtra y prepara al cliente antes de venir." },
      { title: "SEO local", text: "Apareces en 'peluquería o barbería cerca de mí' en tu barrio o ciudad." },
    ],
    faq: [
      { q: "¿Puedo gestionar la agenda y el personal?", a: "Sí, el sistema de reservas permite gestionar profesionales, servicios y horarios." },
      { q: "¿Sirve para barbería y para centro de estética?", a: "Sí, adaptamos servicios y diseño tanto a barbería como a peluquería o cabina de estética." },
    ],
  },
  {
    region: "EU",
    slug: "gimnasios",
    professionTitle: "Gimnasios y entrenadores",
    geoLabel: "España",
    eyebrow: "Fitness y entrenamiento",
    title: "Diseño Web para Gimnasios y Entrenadores en España | Más Socios | Nexus Studio",
    description:
      "Webs para gimnasios, centros deportivos y entrenadores personales en España: clases, tarifas y altas online. Consigue más socios desde Google. Pide presupuesto.",
    h1: "Diseño web para gimnasios y entrenadores en España",
    intro:
      "Quien quiere ponerse en forma compara gimnasios y entrenadores online. Una web con tus clases, tarifas claras y alta o reserva online convierte esa motivación en socios antes de que cambien de idea.",
    benefits: [
      { title: "Alta y reserva online", text: "Captas al socio en el momento de máxima motivación, sin que tenga que ir a preguntar." },
      { title: "Clases y horarios", text: "Cuadro de clases y servicios (sala, dirigidas, entrenamiento personal) siempre actualizado." },
      { title: "Tarifas transparentes", text: "Planes claros que resuelven la duda principal y aumentan las altas." },
      { title: "SEO local", text: "Posicionas 'gimnasio o entrenador personal en tu ciudad', donde se decide." },
    ],
    faq: [
      { q: "¿Sirve para gimnasio y para entrenador personal?", a: "Sí, adaptamos la web a un centro con instalaciones o a un entrenador personal y online." },
      { q: "¿Puedo vender bonos o planes online?", a: "Sí, podemos integrar venta de bonos, planes y reservas de clases según necesites." },
    ],
  },
];

export const SECTORS: Sector[] = [...CO, ...ES];
