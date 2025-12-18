import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";
import gsap from "gsap";
import NotFound from "./NotFound";
import ProjectArticleFooter from "./ProjectArticleFooter";

const ProjectArticle = () => {
  const { slug } = useParams();
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const { data } = await storyblokApi.get("cdn/stories", {
          starts_with: "projects/",
          version: "draft",
          sort_by: "first_published_at:desc",
        });
        if (!isMounted) return;
        setProjects(data?.stories ?? []);
      } catch (err) {
        console.error("Failed to fetch project list:", err);
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [storyblokApi]);

  // Scroll to top instantly whenever navigating to a new project and ensure navbar is visible
  useEffect(() => {
    window.scrollTo(0, 0);
    const nav = document.querySelector("nav");
    if (nav) {
      gsap.to(nav, { y: 0, duration: 0 });
    }
  }, [slug]);

  if (story === null)
    return <div className="loading-element bg-light h-lvh"></div>;
  if (story === false) return <NotFound />;

  const filteredBloks = story.content.body.filter(
    (blok) => blok.component !== "project-card"
  );

  const visibleProjects = projects.filter(
    (project) => project.content?.visible !== false
  );

  const sortedProjects = [...visibleProjects].sort((a, b) => {
    const aPriority = a.content?.priority ?? 9999;
    const bPriority = b.content?.priority ?? 9999;
    return aPriority - bPriority;
  });

  return (
    <article className="pt-32 py-20 px-10 bg-light text-dark flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center max-w-3xl">
        {filteredBloks.map((blok, index) => (
          <div
            key={blok._uid}
            className="w-full opacity-0 translate-y-8 animate-fade-in-up"
            style={{
              animationDelay: "0.25s",
              animationFillMode: "forwards",
            }}
          >
            <StoryblokComponent
              blok={blok}
              isLast={index === filteredBloks.length - 1}
            />
          </div>
        ))}

        {sortedProjects.length > 1 && (
          <ProjectArticleFooter projects={sortedProjects} currentSlug={slug} />
        )}
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
