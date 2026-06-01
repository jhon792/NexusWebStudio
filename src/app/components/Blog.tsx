import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";
import { blogPosts } from "../../data/blog";

export function Blog() {
  return (
    <section id="blog" className="py-28 bg-zinc-50">
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
              <span className="text-zinc-500 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Blog & Noticias</span>
            </div>
            <h2
              className="text-zinc-900"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
            >
              Recursos para hacer crecer
              <br />tu negocio en Internet
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm" style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.7 }}>
            Artículos prácticos sobre marketing digital, SEO y diseño web para ayudarte a vender más en línea.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:border-zinc-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                aria-label={`Leer artículo: ${post.title}`}
              >
                {/* Color bar */}
                <div
                  className="h-1 shrink-0"
                  style={{ background: `linear-gradient(90deg, ${post.accent}, ${post.accent}80)` }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, background: post.accentBg, color: post.accent }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Clock size={12} />
                      <span className="text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                        {post.readTime} min
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "17px", lineHeight: 1.3 }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-zinc-500 mb-6 flex-1"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.65 }}
                  >
                    {post.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 text-sm self-start"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: post.accent }}
                  >
                    Leer artículo completo
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
