import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

const ProjectSection = () => {
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await storyblokApi.get("cdn/stories/projects", {
          version: "draft", // ✅ fetch even unpublished changes
        });
        setStory(data.story);
      } catch (err) {
        console.error("Failed to fetch project story:", err);
      }
    }

    fetchProjects();
  }, [storyblokApi]);

  if (!story) return <div className="p-8">Loading projects…</div>;

  return (
    <section className="px-10 flex flex-col items-start max-w-6xl mx-auto py-16">
      <h2 className="text-4xl font-bold mb-6">✦ Featured Projects</h2>

      <p className="text-lg font-medium mb-20 max-w-xl leading-relaxed">
        I obsess over code. My brain is built for problem solving and I always
        put extreme amounts of care into anything I make.
      </p>

      <div className="space-y-20 flex flex-col align-items-start">
        {story.content.body?.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
