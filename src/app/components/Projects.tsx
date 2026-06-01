import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "MedClinic Pro",
    category: "Clínica Médica",
    description: "Portal completo de gestión de pacientes con reservas online, recordatorios automatizados y sistema de historial clínico para una clínica multiespecialidad.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    result: "+340% citas en línea",
    image: "https://images.unsplash.com/photo-1589554881701-3902036d4d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBsdXh1cnklMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgwMTYxNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    accent: "#6366f1",
  },
  {
    title: "LexFirm Digital",
    category: "Firma de Abogados",
    description: "Presencia digital premium para un bufete boutique con páginas de casos de éxito, portal de clientes y embudos de captación de consultas calificadas.",
    tags: ["Next.js", "Tailwind", "Sanity CMS"],
    result: "+180% consultas calificadas",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdlYnNpdGUlMjBsYXB0b3AlMjBzY3JlZW4lMjBtb2Rlcm58ZW58MXx8fHwxNzgwMTYxNjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    accent: "#10b981",
  },
  {
    title: "AesthetiQ Clinic",
    category: "Clínica Estética",
    description: "Sitio web de marca de lujo para una clínica estética de alto nivel con catálogo de tratamientos, galerías antes/después y sistema de citas automatizado.",
    tags: ["React", "Framer Motion", "Calendly API"],
    result: "+260% reservas de consultas",
    image: "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkZW50YWwlMjBjbGluaWMlMjBsdXh1cnklMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgwMTYxNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    accent: "#f59e0b",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-28 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full mb-6">
              <span
                className="text-zinc-500 text-sm"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Portafolio
              </span>
            </div>
            <h2
              className="text-zinc-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Proyectos que generan
              <br />resultados reales
            </h2>
          </div>
          <p
            className="text-zinc-400 max-w-sm"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
          >
            Cada proyecto es un caso de éxito: sitios web que se convierten en activos de negocio y generan ingresos medibles.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group grid lg:grid-cols-2 gap-0 bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                i % 2 === 1 ? "lg:flex lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-72 lg:h-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span
                    className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#18181b" }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3
                  className="text-zinc-900 mb-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-zinc-500 mb-6"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
                >
                  {project.description}
                </p>

                {/* Result highlight */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6 self-start"
                  style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}25` }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={project.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: project.accent,
                    }}
                  >
                    {project.result}
                  </span>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-xs"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="inline-flex items-center gap-2 text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer self-start group/btn"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px" }}
                >
                  Ver Caso de Éxito
                  <ArrowUpRight
                    size={16}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
