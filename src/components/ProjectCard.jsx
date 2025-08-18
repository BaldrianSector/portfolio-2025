import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ProjectCard = ({ title, description, asset, aspect }) => {
  const cardRef = useRef();
  const textRef = useRef();
  const mediaRef = useRef();
  const url = asset?.filename || null;
  const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false;

  const aspectClass = aspect || "aspect-video";
  const mediaClassName =
    "w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg";

  const splitRefs = useRef([]);
  const lines = useRef([]);

  useEffect(() => {
    const textBlock = textRef.current;
    const mediaBlock = mediaRef.current;
    if (!textBlock) return;

    splitRefs.current = [];
    lines.current = [];

    const textElements = [
      textBlock.querySelector("h3"),
      textBlock.querySelector("p"),
    ];

    const waitForLoad = async () => {
      // Wait for fonts
      await document.fonts.ready;

      // Wait for media to load
      const mediaElements = cardRef.current.querySelectorAll("img, video");
      const mediaPromises = Array.from(mediaElements).map(
        (el) =>
          new Promise((resolve) => {
            if (el.complete || el.readyState >= 2) resolve();
            else el.onload = el.onloadeddata = el.onerror = resolve;
          })
      );
      await Promise.all(mediaPromises);

      // Animate media
      if (mediaBlock) {
        gsap.set(mediaBlock, { y: -40 });
        gsap.to(mediaBlock, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaBlock,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Split lines and wrap
      textElements.forEach((el) => {
        if (!el) return;

        const split = SplitText.create(el, {
          type: "lines",
          linesClass: "line-child",
        });
        splitRefs.current.push(split);

        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "overflow-hidden";
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        lines.current.push(...split.lines);
      });

      // Animate all text lines together
      gsap.set(lines.current, { yPercent: 100 });
      gsap.to(lines.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textBlock,
          start: "top 80%",
          once: true,
        },
      });
    };

    waitForLoad();

    return () => {
      splitRefs.current.forEach((split) => {
        if (split) split.revert();
      });
    };
  }, []);

  return (
    <div ref={cardRef} className="max-w-xl cursor-pointer">
      <div ref={mediaRef} className={`overflow-hidden ${aspectClass}`}>
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

      <div ref={textRef} className="font-inter leading-normal">
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
