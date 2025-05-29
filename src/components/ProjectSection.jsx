import { useStoryblokApi, StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';

const ProjectSection = () => {
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await storyblokApi.get('cdn/stories/projects', {
          version: 'draft' // ✅ fetch even unpublished changes
        });
        setStory(data.story);
        console.log("Loaded project story:", data.story);
      } catch (err) {
        console.error("Failed to fetch project story:", err);
      }
    }

    fetchProjects();
  }, [storyblokApi]);

  if (!story) return <div className="p-8">Loading projects…</div>;

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="space-y-12">
        {story.content.body?.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
