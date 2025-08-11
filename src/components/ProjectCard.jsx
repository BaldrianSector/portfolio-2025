import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProjectCard = ({ title, description, asset, aspect }) => {
  const cardRef = useRef();
  const url = asset?.filename || null;
  const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false;

  const aspectClass = aspect || "aspect-video";

  const mediaClassName =
    "w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const textElements = [card.querySelector("h3"), card.querySelector("p")];

    // Set initial state
    gsap.set(textElements, { y: "-100%", opacity: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(textElements, {
            y: "0%",
            delay: 0.55,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="max-w-xl cursor-pointer">
      <div className={`overflow-hidden ${aspectClass}`}>
        {url &&
          (isVideo ? (
            <video
              src={url}
              autoPlay
              muted
              playsInline
              loop
              className={mediaClassName}
            />
          ) : (
            <img
              src={url}
              alt={title || "Project image"}
              className={mediaClassName}
            />
          ))}
      </div>

      <div className="font-inter leading-normal">
        <h3 className="text-l font-semibold pt-4">
          {title || "Untitled project"}
        </h3>
        <p className="text-l text-gray font-medium">
          {description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
