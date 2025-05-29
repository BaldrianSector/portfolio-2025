import { useStoryblokApi } from '@storyblok/react';
import { useEffect, useState } from 'react';

const StoryblokDebug = ({ slug = 'home' }) => {
  const storyblokApi = useStoryblokApi();
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`);
        setStoryData(data.story);
        console.log('Full story object:', data.story); // 🔍 View in console
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    }

    fetchStory();
  }, [storyblokApi, slug]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Storyblok Debug</h1>
      <pre className="text-sm bg-gray-100 p-4 overflow-auto">
        {storyData ? JSON.stringify(storyData, null, 2) : 'Loading...'}
      </pre>
    </main>
  );
};

export default StoryblokDebug;
