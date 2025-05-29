import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

import Navbar from './components/Navbar';
import ProjectSection from './components/ProjectSection';

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();

  return (
    <div ref={container} className="App">
      <Navbar />
      <ProjectSection />
    </div>
  );
}

export default App;
