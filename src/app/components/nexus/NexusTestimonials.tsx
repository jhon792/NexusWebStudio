import { motion } from "motion/react";
import { useNexus } from "./NexusLangContext";
import "./NexusTestimonials.css";

/* Fotos (no traducibles). Sustituir por fotos de clientes reales cuando existan. */
const PHOTOS = [
  "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?auto=format&q=75&fit=crop&w=112&h=112",
  "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=112&h=112",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=112&h=112",
];

function Stars() {
  return (
    <span className="nx-tst__stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function NexusTestimonials() {
  const { t } = useNexus();
  const data = t.testimonials;

  return (
    <section className="nx nx-tst" id="nx-testimonials" aria-labelledby="nx-tst-title">
      <h2 className="nx-tst__title" id="nx-tst-title">{data.title}</h2>

      <div className="nx-tst__grid">
        {data.items.map((item, i) => (
          <motion.figure
            key={item.name}
            className="nx-tst__item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="nx-tst__quote">{item.quote}</blockquote>
            <Stars />
            <figcaption className="nx-tst__person">
              <div className="nx-tst__avatar">
                <img src={PHOTOS[i]} loading="lazy" decoding="async" alt={item.name} width={52} height={52} />
              </div>
              <div>
                <div className="nx-tst__name">{item.name}</div>
                <p className="nx-tst__role">{item.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default NexusTestimonials;
