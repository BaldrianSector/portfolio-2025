import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProjectArticleFooter = ({ projects, currentSlug }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const animatedItems = containerRef.current.querySelectorAll(
      ".footer-animate"
    );

    gsap.fromTo(
      animatedItems,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, [currentSlug, projects.length]);

  if (!projects?.length) return null;

  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  );
  if (currentIndex === -1) return null;

  // Loop across the entire collection so navigation never dead-ends.
  const previousProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <footer ref={containerRef} className="w-full pt-10">
      <div className="w-full mt-10 pt-2 flex justify-center">
        <div className="flex flex-row flex-nowrap gap-12 justify-between w-full max-w-2xl">
          <ProjectNavText
            label="Previous"
            project={previousProject}
            direction="prev"
          />
          <ProjectNavText
            label="Next"
            project={nextProject}
            direction="next"
            alignRight
          />
        </div>
      </div>
    </footer>
  );
};

function ProjectNavText({ label, project, direction = "next", alignRight }) {
  const headerBlok = project.content?.body?.find(
    (blok) => blok.component === "article-header"
  );

  const title = headerBlok?.title || project.name;
  const year = headerBlok?.year || project.content?.year;
  const arrow = direction === "next" ? "→" : "←";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`footer-animate group flex flex-col gap-2 text-gray-500 max-w-sm ${
        alignRight ? "md:text-right items-end text-right" : ""
      }`}
      aria-label={`${label}: ${title}`}
    >
      <div className="text-[11px] uppercase tracking-[0.4em] font-reem text-gray flex items-center gap-2">
        {direction === "prev" && (
          <span className="text-base leading-none">{arrow}</span>
        )}
        <span>{label}</span>
        {direction === "next" && (
          <span className="text-base leading-none">{arrow}</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-dark ">{title}</h3>

      {year && (
        <span className="font-reem tracking-[0.3em] text-gray-400">
          ({year})
        </span>
      )}
    </Link>
  );
}

export default ProjectArticleFooter;
