import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import { getBlogPost, getRelatedPosts, BlogSection } from "../../data/blog";

const WA = "https://wa.me/573123198706";

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          key={i}
          className="text-zinc-900 mt-10 mb-4"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}
        >
          {section.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={i}
          className="text-zinc-600 mb-5"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.8 }}
        >
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mb-5 pl-5 space-y-2">
          {section.items?.map((item, j) => (
            <li
              key={j}
              className="text-zinc-600"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400 mr-2.5 mb-0.5 align-middle" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          key={i}
          className="my-8 p-6 bg-zinc-950 rounded-2xl"
        >
          <p
            className="text-zinc-300"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.75 }}
          >
            💡 {section.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | NexuStudio Blog`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) return <Navigate to="/" replace />;

  const related = getRelatedPosts(post);
  const formattedDate = new Date(post.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      {/* Header */}
      <header className="border-b border-zinc-100 bg-white/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">NS</span>
            </div>
            <span className="text-zinc-900 hidden sm:block font-semibold text-sm">NexuStudio</span>
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* Schema.org para el artículo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "datePublished": post.date,
              "dateModified": post.date,
              "author": {
                "@type": "Person",
                "name": "NexuStudio",
                "url": "https://ns.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "NexuStudio",
                "url": "https://ns.com"
              },
              "image": post.image,
              "url": `https://ns.com/blog/${post.slug}`,
              "mainEntityOfPage": `https://ns.com/blog/${post.slug}`,
            }),
          }}
        />

        {/* Hero del artículo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
          </div>
        </motion.div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-6">
          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mt-8 mb-6"
          >
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: post.accentBg, color: post.accent }}
            >
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
              <Clock size={14} />
              <span>{post.readTime} min de lectura</span>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-zinc-900 mb-6"
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </motion.h1>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-lg mb-10 pb-10 border-b border-zinc-100"
            style={{ lineHeight: 1.7 }}
          >
            {post.description}
          </motion.p>

          {/* Cuerpo del artículo */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {post.sections.map((section, i) => renderSection(section, i))}
          </motion.article>

          {/* CTA después del artículo */}
          <div className="mt-12 bg-zinc-950 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p
                className="text-white mb-1"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "18px" }}
              >
                ¿Listo para llevar tu negocio al siguiente nivel?
              </p>
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                Solicita una cotización sin costo y sin compromiso.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                to="/#contact"
                className="px-5 py-3 bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors text-sm font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Solicitar cotización
              </Link>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-colors text-sm font-semibold inline-flex items-center gap-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Artículos relacionados */}
          {related.length > 0 && (
            <div className="mt-16 mb-16">
              <h3
                className="text-zinc-900 mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
              >
                Artículos relacionados
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="group bg-zinc-50 rounded-2xl p-5 border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-lg mb-3 self-start"
                      style={{ background: rel.accentBg, color: rel.accent }}
                    >
                      {rel.category}
                    </span>
                    <h4
                      className="text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", lineHeight: 1.3 }}
                    >
                      {rel.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs mt-auto pt-3">
                      <Clock size={12} />
                      <span>{rel.readTime} min</span>
                      <ArrowRight size={12} className="ml-auto group-hover:translate-x-0.5 transition-transform" style={{ color: rel.accent }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-zinc-100 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-sm">© 2025 NexuStudio. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacidad" className="text-zinc-500 hover:text-zinc-900 transition-colors">Privacidad</Link>
            <Link to="/cookies" className="text-zinc-500 hover:text-zinc-900 transition-colors">Cookies</Link>
            <Link to="/#contact" className="text-zinc-500 hover:text-zinc-900 transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
