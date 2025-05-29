import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

import Navbar from './components/Navbar';

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();

  return (
    <div ref={container} className="App">
      <Navbar />
    </div>
  );
}

export default App;
