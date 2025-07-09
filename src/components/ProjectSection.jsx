import { useStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await storyblokApi.get("cdn/stories/projects", {
          version: "draft",
        });
        setStory(data.story);
      } catch (err) {
        console.error("Failed to fetch project story:", err);
      }
    }
    fetchProjects();
  }, [storyblokApi]);

  // GSAP animation effect
  useEffect(() => {
    if (!story) return;

    cardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Clean up triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [story]);

  if (!story) return <div className="p-8">Loading projects…</div>;

  return (
    <section className="px-10 flex flex-col items-start max-w-6xl mx-auto py-16">
      <h2 className="text-4xl font-bold mb-6">✦ Featured Projects</h2>

      <p className="text-lg font-medium mb-20 max-w-xl leading-relaxed">
        I obsess over code. My brain is built for problem solving and I always
        put extreme amounts of care into anything I make.
      </p>

      <div className="space-y-20 flex flex-col align-items-start">
        {story.content.body?.map((blok, idx) => (
          <div
            key={blok._uid}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="project-card" // You can use this for styling
          >
            <StoryblokComponent blok={blok} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
