import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";
import NotFound from "./NotFound";

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
  if (story === false) return <NotFound />;

  const filteredBloks = story.content.body.filter(
    (blok) => blok.component !== "project-card"
  );

  return (
    <article className="pt-32 py-20 px-10 bg-light text-dark flex flex-col items-center">
      <div className="flex flex-col items-center max-w-3xl">
        {filteredBloks.map((blok) => (
          <div
            key={blok._uid}
            className="w-full opacity-0 translate-y-8 animate-fade-in-up"
            style={{
              animationDelay: "0.25s",
              animationFillMode: "forwards",
            }}
          >
            <StoryblokComponent blok={blok} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </article>
  );
};

export default ProjectArticle;
