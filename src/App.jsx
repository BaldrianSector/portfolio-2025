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

  // GSAP animation for footer
  useEffect(() => {
    gsap.set(".footer-text", {
      autoAlpha: 0,
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show footer when user is near bottom (within 48px)
      if (documentHeight - scrollPosition < 48) {
        gsap.to(".footer-text", {
          autoAlpha: 1,
          duration: 2.5,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Main content wrapper with sticky footer setup */}
      <main className="relative min-h-[100vh] z-10">
        <Routes>
          {/* Home and all sections */}
          <Route
            path="/"
            element={
              <>
                <Section
                  id="hero"
                  className="hero bg-black !min-h-[max(812px,100svh)]"
                >
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
      </main>

      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-0 bg-black text-light flex items-center justify-center m-0 h-12">
        <p className="footer-text text-xs font-reem">
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
