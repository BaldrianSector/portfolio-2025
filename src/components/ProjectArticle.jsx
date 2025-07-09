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
    <article className="max-w-3xl mx-auto py-20 px-6 w-screen h-screen bg-dark">
      <h1 className="text-4xl font-bold mb-6">{story.content.title}</h1>
      {story.content.cover && (
        <img
          src={story.content.cover.filename}
          alt={story.content.cover.alt || story.content.title}
          className="mb-8 rounded-xl max-w-full"
        />
      )}
      <StoryblokComponent blok={story.content} />
    </article>
  );
};

export default ProjectArticle;
