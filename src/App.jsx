import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './App.css'
import { useStoryblokApi } from '@storyblok/react';
import { useEffect, useState } from 'react';


import Navbar from './components/Navbar'

gsap.registerPlugin(useGSAP)

function App() {
  const container = useRef();
  const storyblokApi = useStoryblokApi();
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const { data } = await storyblokApi.get(`cdn/stories/home`);
        setStoryData(data.story);
        console.log("Full story object:", data.story); // 🔍 see structure in console
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    }

    fetchStory();
  }, [storyblokApi]);

  return (
    <div ref={container} className="App">
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Storyblok Debug</h1>
        <pre className="text-sm bg-gray-100 p-4 overflow-auto">
          {storyData ? JSON.stringify(storyData, null, 2) : 'Loading...'}
        </pre>
      </main>
    </div>
  );
}

export default App;