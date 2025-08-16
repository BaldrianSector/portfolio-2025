import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  HashRouter as Router, // Changed from BrowserRouter to HashRouter
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import ProjectArticle from "./components/ProjectArticle";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import MenuOverlay from "./components/MenuOverlay";
import NotFound from "./components/NotFound";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

function AppLayout() {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
  }

  // Handle section scrolling with query parameters
  useEffect(() => {
    const handleSectionScroll = () => {
      const urlParams = new URLSearchParams(location.search);
      const section = urlParams.get("section");

      if (section && location.pathname === "/") {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: element,
              },
              ease: "power2.inOut",
            });
          }
        }, 100);
      }
    };

    handleSectionScroll();
  }, [location]);

  // Handle navigation from project pages back to home sections
  useEffect(() => {
    if (location.pathname === "/" && location.search) {
      const urlParams = new URLSearchParams(location.search);
      const section = urlParams.get("section");

      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: element,
              },
              ease: "power2.inOut",
            });
          }
        }, 200);
      }
    }
  }, [location.pathname, location.search]);

  return (
    <div ref={container} className="App">
      <Navbar isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <MenuOverlay
        isMenuOpen={isMenuOpen}
        handleMenuToggle={handleMenuToggle}
      />

      <Routes>
        {/* Home and all sections */}
        <Route
          path="/"
          element={
            <>
              <Section id="hero" className="hero bg-black min-h-[780px]">
                <HeroSection />
              </Section>
              <Section id="projects" className="projects bg-light text-black">
                <ProjectSection />
              </Section>
              <Section id="about" className="about bg-black">
                <AboutSection />
              </Section>
              <Section id="contact" className="contact bg-light text-black">
                <ContactSection />
              </Section>
            </>
          }
        />

        {/* Project detail page */}
        <Route path="/projects/:slug" element={<ProjectArticle />} />

        {/* Fallback for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="bg-black text-light p-4 text-center">
        <p className="text-sm font-reem">
          © {new Date().getFullYear()} Made with 💙 in Copenhagen
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
