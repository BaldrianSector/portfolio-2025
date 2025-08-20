import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const roles = [
    "a portrait and travel photographer.",
    "a licensed skydiver with more than 100 jumps.",
    "a professional wind tunnel instructor.",
    "an avid rock climber.",
    "an escape room and puzzle game enthusiast.",
    "a programming teacher at the Danish National School of Performing Arts.",
    "up for new challenges.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const roleRef = useRef(null);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const lastWidth = useRef(window.innerWidth);

  useEffect(() => {
    let interval;

    const animateRole = () => {
      gsap.to(roleRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);

          gsap.fromTo(
            roleRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );
        },
      });
    };

    const startAnimation = (isInitial = false) => {
      // clear any existing loop before starting
      clearInterval(interval);

      // fade in current role on mount or keep current on resize
      if (isInitial) {
        gsap.fromTo(
          roleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 }
        );
      } else {
        // On resize, ensure the current role is visible without animation
        gsap.set(roleRef.current, { opacity: 1 });
      }

      // start looping
      interval = setInterval(animateRole, 4000);
    };

    // Initial start
    startAnimation(true);

    // restart on resize but keep current role
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Only fire when under Tailwind's `max-w-xl` (577px)
      if (currentWidth < 577) {
        startAnimation(false);

        if (currentWidth !== lastWidth.current) {
          // Trigger the container animation on resize if it has already been animated
          if (hasAnimatedRef.current) {
            createContainerAnimation();
          }
        }
      }

      lastWidth.current = currentWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [roles.length]);

  const createContainerAnimation = () => {
    // Kill existing timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial states
    gsap.set(".about-roles-container", {
      height: "26px",
      marginBottom: "46px",
    });
    gsap.set(".about-roles-content", { y: "100%" });

    // Create new timeline
    timelineRef.current = gsap
      .timeline()
      .to(".about-roles-content", {
        delay: 0.7,
        y: "0%",
        duration: 1,
        ease: "power4.out",
      })
      .set(".about-roles-container", {
        delay: 2,
        height: "100%",
        duration: 0,
        marginBottom: "0px",
      });
  };

  useEffect(() => {
    // Set initial states
    gsap.set(".about-roles-container", {
      height: "26px",
      marginBottom: "46px",
    });
    gsap.set(".about-roles-content", { y: "100%" });

    // Create ScrollTrigger that fires the animation
    ScrollTrigger.create({
      trigger: ".about-title", // Fire animation along with TextReveal for title
      start: "top 75%",
      once: true,
      onEnter: () => {
        hasAnimatedRef.current = true;
        createContainerAnimation();
      },
    });

    return () => {
      // Clean up ScrollTrigger and timeline
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          trigger.trigger.classList?.contains("about-roles-container")
        ) {
          trigger.kill();
        }
      });
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-start mx-10 pt-10 max-w-xl w-full">
      <img
        src="/assets/images/Baldrian Portrait.jpg"
        alt="Portrait of Baldrian"
        className="w-full max-w-sm mb-10 shadow-lg"
      />

      <TextReveal animateOnScroll={true} delay={0.2}>
        <h2 className="about-title text-4xl font-bold mb-4">❖ About me</h2>

        <p className="about-text text-lg font-medium mb-4 max-w-xl leading-relaxed text-gray">
          I'm studying{" "}
          <a
            href="https://www.dmjx.dk/uddannelser/coded-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coded Design
          </a>{" "}
          at the Danish School of Media and Journalism. I work with a variety of
          tools including —{" "}
          {[
            [
              "JavaScript",
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            ],
            ["Figma", "https://www.figma.com/"],
            ["Processing", "https://processing.org/"],
            ["Three.js", "https://threejs.org/"],
            ["React", "https://reactjs.org/"],
            ["Vue", "https://vuejs.org/"],
            ["StoryBlok", "https://www.storyblok.com/"],
            ["Unity", "https://unity.com/"],
            ["C#", "https://learn.microsoft.com/en-us/dotnet/csharp/"],
            ["Generative AI"],
            ["Python", "https://www.python.org/"],
            ["Java", "https://www.oracle.com/java/"],
            ["QLab", "https://qlab.app/"],
            ["TouchDesigner", "https://derivative.ca/"],
          ].map(([name, url], index, array) => (
            <span key={name}>
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              ) : (
                <span>{name}</span>
              )}
              {index < array.length - 2 ? ", " : ""}
              {index === array.length - 2 ? " and " : ""}
            </span>
          ))}
          .
        </p>
      </TextReveal>
      <div className="about-roles-container overflow-hidden">
        <p
          className="about-roles-content text-lg font-medium max-w-xl leading-relaxed text-gray"
          style={{ minHeight: "4.5rem" }}
        >
          But I'm also{" "}
          <span className="italic" ref={roleRef}>
            {roles[currentIndex]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
