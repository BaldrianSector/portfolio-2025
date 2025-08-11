import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";
import NotFound from "./NotFound"; // Import your NotFound component

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
        setStory(false);
      }
    }
    fetchProject();
  }, [slug, storyblokApi]);

  // Scroll to top when story loads or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [story, slug]);

  if (story === null)
    return <div className="loading-element bg-light h-lvh"></div>;
  if (story === false) return <NotFound />; // Render NotFound component if story is false

  return (
    <article className="pt-32 py-20 px-10 bg-light text-dark flex flex-col items-center">
      <div className="flex flex-col items-center max-w-3xl">
        {story.content.body
          .filter((blok) => blok.component !== "project-card")
          .map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))}
      </div>
    </article>
  );
};

export default ProjectArticle;
