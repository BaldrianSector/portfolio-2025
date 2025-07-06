import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./App.css";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectSection from "./components/ProjectSection";
import MenuOverlay from "./components/MenuOverlay";

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
    console.log("handleMenuToggle() called");
  }

  return (
    <div ref={container} className="App">
      <Navbar isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <MenuOverlay open={isMenuOpen} onClose={handleMenuToggle} />
      <Section className="hero w-full bg-dark pt-40 pb-40"></Section>
      <Section className="projects bg-light pt-40 pb-40">
        <ProjectSection />
      </Section>
    </div>
  );
}

export default App;
