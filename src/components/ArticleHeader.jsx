import { useRef } from "react";
import gsap from "gsap";

const ArticleHeader = ({ blok }) => {
  const scrollTargetRef = useRef(null);

  const handleScrollDown = () => {
    if (scrollTargetRef.current) {
      gsap.to(window, {
        duration: 1,
        scrollTo: scrollTargetRef.current.offsetTop - 20,
        ease: "power2.out",
      });
    }
  };

  const isVideo =
    blok.cover?.filename?.toLowerCase().endsWith(".mp4") ||
    blok.cover?.filename?.toLowerCase().endsWith(".webm");

  return (
    <>
      <header className="flex flex-col items-center justify-center">
        <div>
          <div className="title-and-year flex justify-between">
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
            <p className="text-lg py-4 max-w-2xl mx-auto text-gray-300 my-4 text-gray font-normal">
              {blok.description}
            </p>
          )}

          {blok.linktext && (
            <div className="flex justify-between items-center pt-4 pb-10">
              <a
                href={blok.link.url}
                target={blok.link.target || "_blank"}
                rel="noopener noreferrer"
                className="font-bold font-void text-lg underline underline-offset-4 decoration-2"
              >
                {blok.linktext}
              </a>
              <span
                className="text-xs leading-tight uppercase font-reem cursor-pointer"
                onClick={handleScrollDown}
              >
                Scroll down <br /> for more
              </span>
              <span
                className="text-3xl select-none cursor-pointer"
                onClick={handleScrollDown}
              >
                ↓
              </span>
            </div>
          )}
        </div>

        {blok.cover?.filename && (
          <div className="mt-8 overflow-hidden">
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
