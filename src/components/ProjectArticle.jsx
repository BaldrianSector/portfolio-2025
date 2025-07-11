import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";

const ProjectArticle = () => {
  const { slug } = useParams();
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data } = await storyblokApi.get(
          `cdn/stories/projects/${slug}`,
          {
            version: "draft",
          }
        );
        setStory(data.story);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setStory(false); // for not found
      }
    }
    fetchProject();
  }, [slug, storyblokApi]);

  if (story === null) return <div className="p-8">Loading…</div>;
  if (story === false) return <div className="p-8">Project not found.</div>;

  return (
    <article className="py-20 px-6 w-screen bg-light text-dark">
      {story.content.body
        .filter((blok) => blok.component !== "project-card") // 👈 Skip project-card
        .map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
    </article>
  );
};

export default ProjectArticle;
