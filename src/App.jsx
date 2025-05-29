import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'

gsap.registerPlugin(useGSAP)

function App() {
  const [count, setCount] = useState(0)
  const container = useRef()

  useGSAP(() => {
    gsap.from('.header', { y: -10, opacity: 0 , duration: 2, ease: 'power1.inOut' })
  }, { scope: container })

  return (
    <>
      <div ref={container} className="App">
        <Navbar />
        <div>
          <h1 className="header text-3xl font-bold underline">
            Hello world!
          </h1>

          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
