import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustSection } from "../components/TrustSection";
import { WhySellOnline } from "../components/WhySellOnline";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Process } from "../components/Process";
import { Pricing } from "../components/Pricing";
import { WhyMe } from "../components/WhyMe";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { SEOSchemas } from "../components/SEOSchemas";

export default function Home() {
  useEffect(() => {
    document.title = "Diseño Web Profesional en Colombia | Nexus Studio";
  }, []);

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: "#09090b", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />
      <SEOSchemas />
      <main id="main-content">
        <Hero />
        <TrustSection />
        <WhySellOnline />
        <Services />
        <Projects />
        <Process />
        <Pricing />
        <WhyMe />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
