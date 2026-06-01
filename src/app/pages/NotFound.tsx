import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada | NexuStudio";
  }, []);

  return (
    <div
      className="min-h-screen bg-zinc-950 flex items-center justify-center px-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <div
          className="text-zinc-800 mb-4 select-none"
          style={{ fontWeight: 800, fontSize: "clamp(6rem, 20vw, 10rem)", letterSpacing: "-0.05em", lineHeight: 1 }}
        >
          404
        </div>
        <h1
          className="text-white mb-3"
          style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.03em" }}
        >
          Esta página no existe
        </h1>
        <p className="text-zinc-400 mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
          La página que buscas fue movida, eliminada o nunca existió.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <a
            href="https://wa.me/573123198706"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20c05a] transition-colors font-semibold text-sm"
          >
            <MessageCircle size={16} />
            Contactar por WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
