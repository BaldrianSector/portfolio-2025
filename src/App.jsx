import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

import Navbar from './components/Navbar';
import Section from './components/Section';
import ProjectSection from './components/ProjectSection';

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();

  return (
    <div ref={container} className="App">
      

      <Navbar />
      <Section className="hero w-full bg-dark pt-40 pb-40">
      
      </Section>
      <Section className="projects bg-light pt-40 pb-40">
        <ProjectSection />
      </Section>
    </div>
  );
}

export default App;
