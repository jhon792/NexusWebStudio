import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustSection } from "../components/TrustSection";
import { Services } from "../components/Services";
import { WhySellOnline } from "../components/WhySellOnline";
import { Process } from "../components/Process";
import { WhyMe } from "../components/WhyMe";
import { Blog } from "../components/Blog";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Desarrollo Web Profesional en Colombia | NexuStudio";
  }, []);

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustSection />
        <Services />
        <WhySellOnline />
        <Process />
        <WhyMe />
        <Blog />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
