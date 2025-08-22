import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const splitRefs = useRef([]);
  const lines = useRef([]);

  const waitForFonts = async () => {
    try {
      await document.fonts.ready;

      const customFonts = ["Inter", "Reem Kufi", "Playfair Display"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`18px ${fontFamily}`);
      });

      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return true;
    } catch (error) {
      console.warn("Font loading check failed, proceeding anyway:", error);
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useEffect(() => {
    const splitAndAnimate = async () => {
      await waitForFonts();

      // Revert previous splits
      splitRefs.current.forEach((split) => split?.revert());
      splitRefs.current = [];
      lines.current = [];

      const selectors = [".scramble-text-content", ".mini-description-content"];

      selectors.forEach((selector) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });

          splitRefs.current.push(split);
          lines.current.push(...split.lines);

          // Preserve indent if needed
          const computedStyle = window.getComputedStyle(el);
          const textIndent = computedStyle.textIndent;
          if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent;
            el.style.textIndent = "0";
          }
        });
      });

      // Reset initial state
      gsap.set(".item-video", {
        scale: 0,
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        y: "0%",
      });
      gsap.set(lines.current, { y: "100%" });
      gsap.set("nav", { y: "-100%" });

      // Timeline
      gsap.defaults({ duration: 0.8, ease: "power3.out" });
      const tl = gsap.timeline({ paused: true, delay: 0.5 });

      tl.from("#hero", {
        autoAlpha: 0,
        duration: 0,
      });

      tl.to(".item-video", {
        scale: 1,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.2,
        y: "0%",
      })
        .to("nav", { y: "0%", duration: 1.2 }, "<")
        .to(
          lines.current.filter((line) =>
            line.closest(".scramble-text-content")
          ),
          { y: "0%", stagger: 0.2 },
          "<0.5"
        )
        .to(
          lines.current.filter((line) =>
            line.closest(".mini-description-content")
          ),
          { y: "0%", duration: 1.2 },
          ">-2.5"
        );
      tl.play();
    };

    // Initial animation
    splitAndAnimate();
  }, []);

  return (
    <>
      {/* Grid container */}
      <div className="hero-wrapper h-full w-full grid self-center py-28 px-24 max-w-[520px]">
        {/* Video wrapper */}
        <div className="item-video relative overflow-hidden col-start-1 row-start-1 z-0">
          <video
            src="/assets/videos/bolarbear.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-1/2 left-1/2 w-full h-full object-cover object-[85%_25%] -translate-x-1/2 -translate-y-1/2 py-[-100px] pointer-events-none"
          ></video>
        </div>

        {/* Top-left text */}
        <div className="scramble-text relative self-start justify-self-start -top-11 -left-10 z-10 col-start-1 row-start-1 max-w-[220px] overflow-hidden">
          <p className="scramble-text-content text-white text-lg leading-5">
            Design student working at the intersection of programming,
            technology and human interaction.
          </p>
        </div>

        {/* Bottom-right text */}
        <div className="scramble-text relative self-end justify-self-end -bottom-10 -right-20 z-10 col-start-1 row-start-1 max-w-[180px] overflow-hidden">
          <p className="scramble-text-content text-white text-lg leading-5">
            Coding the future, shooting sunsets and{" "}
            <span className="font-playfair italic">
              occasionally jumping out of airplanes.
            </span>
          </p>
        </div>
      </div>

      {/* Mini description */}
      <div className="mini-description font-reem text-xs absolute bottom-30 left-10 overflow-hidden">
        <span className="mini-description-content block">
          Selection of recent
          <br />
          work and projects
        </span>
      </div>
    </>
  );
};

export default HeroSection;
