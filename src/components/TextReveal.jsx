import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
}) {
  const containerRef = useRef(null);
  const elementRefs = useRef([]);
  const splitRefs = useRef([]);
  const lines = useRef([]);
  const lastWidth = useRef(window.innerWidth);
  const currentAnimation = useRef(null);

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

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const splitAndAnimate = async () => {
        await waitForFonts();

        // Kill any existing animation
        if (currentAnimation.current) {
          currentAnimation.current.kill();
          currentAnimation.current = null;
        }

        // Revert all splits to restore original innerHTML and allow natural reflow
        splitRefs.current.forEach((split) => split?.revert());
        splitRefs.current = [];
        lines.current = [];
        elementRefs.current = [];

        let elements = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children);
        } else {
          elements = [containerRef.current];
        }

        // Show after setup
        gsap.set(containerRef.current, { visibility: "visible" });

        elements.forEach((element) => {
          elementRefs.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });

          splitRefs.current.push(split);

          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;
          if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent;
            element.style.textIndent = "0";
          }

          lines.current.push(...split.lines);
        });

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay,
        };

        if (animateOnScroll) {
          currentAnimation.current = gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          currentAnimation.current = gsap.to(lines.current, animationProps);
        }
      };

      const handleResize = () => {
        const currentWidth = window.innerWidth;

        // Only fire when under Tailwind's `max-w-xl` (577px)
        if (currentWidth < 577 && currentWidth !== lastWidth.current) {
          // Hide with visibility to maintain layout
          gsap.set(containerRef.current, { visibility: "hidden" });

          // Simply revert and re-split - this allows text to naturally reflow
          splitAndAnimate();
        }

        lastWidth.current = currentWidth;
      };

      splitAndAnimate();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (currentAnimation.current) {
          currentAnimation.current.kill();
        }
        splitRefs.current.forEach((split) => split?.revert());
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
