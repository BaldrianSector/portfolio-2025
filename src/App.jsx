import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
  const navigate = useNavigate();

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
  }

  // Handle hash scrolling
  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        const sectionId = location.hash.substring(1); // Remove #

        // If we're not on the home page, navigate there first
        if (location.pathname !== "/") {
          navigate("/" + location.hash);
          return;
        }

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(sectionId);
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

    handleHashScroll();
  }, [location, navigate]);

  // Handle navigation from project pages back to home sections
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: element,
            },
            ease: "power2.inOut",
          });
        }
      }, 200); // Slightly longer delay when coming from another page
    }
  }, [location.pathname, location.hash]);

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
              <Section id="hero" className="hero bg-black">
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
