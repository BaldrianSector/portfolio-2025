import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./App.css";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import MenuOverlay from "./components/MenuOverlay";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

function App() {
  const container = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <div ref={container} className="App">
      <Navbar isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <MenuOverlay
        isMenuOpen={isMenuOpen}
        handleMenuToggle={handleMenuToggle}
      />
      <Section id="hero" className="hero bg-dark">
        <HeroSection />
      </Section>
      <Section id="projects" className="projects bg-light">
        <ProjectSection />
      </Section>
      <Section id="about" className="about bg-dark">
        This is the about section. It contains information about the portfolio,
        the designer, and their work.
      </Section>
      <Section id="contact" className="contact bg-light">
        This is the contact section. It contains a form or contact information
        for reaching out to the designer.
      </Section>
      <footer className="bg-dark text-white p-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Baldrian Sector. Made with ❤️ in
          Copenhagen.
        </p>
      </footer>
    </div>
  );
}

export default App;
