import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const ArticleHeader = ({ blok }) => {
  const scrollTargetRef = useRef(null);
  const containerRef = useRef(null);

  const handleScrollDown = () => {
    if (scrollTargetRef.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: scrollTargetRef.current.offsetTop - 20,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const elemsToAnimate =
      containerRef.current.querySelectorAll(".animate-item");

    // Animate in with stagger (no need to set initial state, it's in CSS)
    gsap.to(elemsToAnimate, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.25,
    });

    // Animate the cover image separately with a longer delay
    const coverElement = containerRef.current.querySelector(".cover-image");
    if (coverElement) {
      gsap.to(coverElement, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.6,
      });
    }
  }, []);

  const isVideo =
    blok.cover?.filename?.toLowerCase().endsWith(".mp4") ||
    blok.cover?.filename?.toLowerCase().endsWith(".webm");

  return (
    <>
      <header
        className="flex flex-col items-center justify-center"
        ref={containerRef}
      >
        <div>
          <div className="animate-item title-and-year flex justify-between">
            {blok.title && (
              <h1 className="text-3xl sm:text-5xl font-bold">{blok.title}</h1>
            )}
            {blok.year && (
              <p className="text-lg self-end font-reem text-gray">
                ({blok.year})
              </p>
            )}
          </div>

          {blok.description && (
            <p className="animate-item description text-lg py-4 max-w-2xl mx-auto text-gray-300 my-4 text-gray font-normal">
              {blok.description}
            </p>
          )}

          {blok.linktext && (
            <div className="link-section flex justify-between items-center pt-4 pb-10">
              <a
                href={blok.link.url}
                target={blok.link.target || "_blank"}
                rel="noopener noreferrer"
                className="animate-item font-bold font-void text-lg underline underline-offset-4 decoration-2 text-nowrap"
              >
                {blok.linktext}
              </a>
              <span
                className="animate-item hidden xs:block text-xs leading-tight uppercase font-reem cursor-pointer pt-2"
                onClick={handleScrollDown}
              >
                Scroll down <br /> for more
              </span>
              <span
                className="animate-item text-3xl select-none cursor-pointer"
                onClick={handleScrollDown}
              >
                ↓
              </span>
            </div>
          )}
        </div>

        {blok.cover?.filename && (
          <div className="cover-image mt-8 overflow-hidden">
            {isVideo ? (
              <video
                src={blok.cover.filename}
                autoPlay
                muted
                playsInline
                loop
                className="w-full"
              />
            ) : (
              <img
                src={blok.cover.filename}
                alt={blok.cover.alt || blok.title}
                className="w-full"
              />
            )}
          </div>
        )}
      </header>

      {/* The section you scroll to */}
      <div ref={scrollTargetRef}></div>
    </>
  );
};

export default ArticleHeader;
