import { useStoryblokApi } from "@storyblok/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const storyblokApi = useStoryblokApi();
  const [projects, setProjects] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await storyblokApi.get("cdn/stories", {
          starts_with: "projects/",
          version: "draft",
          sort_by: "first_published_at:desc",
        });
        setProjects(data.stories);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    fetchProjects();
  }, [storyblokApi]);

  useEffect(() => {
    if (!projects.length) return;
    cardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  function getProjectCardData(project) {
    const blok = project.content.body?.find(
      (b) => b.component === "project-card"
    );
    return blok
      ? {
          title: blok.title,
          description: blok.description,
          asset: blok.asset,
          aspect: blok.aspect,
        }
      : {};
  }

  if (!projects.length) return <div className="p-8 bg-light"></div>;

  const visibleProjects = projects.filter(
    (project) => project.content.visible !== false
  );

  const sortedProjects = [...visibleProjects].sort((a, b) => {
    const aPriority = a.content.priority ?? 9999;
    const bPriority = b.content.priority ?? 9999;
    return aPriority - bPriority;
  });

  return (
    <section className="px-10 flex flex-col items-start max-w-6xl mx-auto py-8">
      <h2 className="text-4xl font-bold mb-6">✦ Featured Projects</h2>
      <p className="text-lg font-medium mb-20 max-w-xl leading-relaxed text-gray">
        I obsess over code. My brain is built for problem solving and I always
        put extreme amounts of care into anything I make.
      </p>
      <div className="space-y-20 flex flex-col align-items-start">
        {sortedProjects.map((project, idx) => {
          const cardData = getProjectCardData(project);

          return (
            <div
              key={project.uuid}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="project-card"
            >
              <Link to={`/projects/${project.slug}`}>
                <ProjectCard {...cardData} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectSection;
