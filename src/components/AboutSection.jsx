import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

  useEffect(() => {
    const animateRole = () => {
      // Fade out
      gsap.to(roleRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Choose a new index (different from current)
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * roles.length);
          } while (nextIndex === currentIndex);

          setCurrentIndex(nextIndex);

          // Fade in
          gsap.fromTo(
            roleRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          );
        },
      });
    };

    const interval = setInterval(animateRole, 4000); // every 4 seconds

    // Initial animation
    gsap.fromTo(roleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });

    return () => clearInterval(interval);
  }, [currentIndex, roles.length]);

  return (
    <div className="flex flex-col items-start mx-10 pt-10">
      <img
        src="/assets/images/Baldrian Portrait.jpg"
        alt="Portrait of Baldrian"
        className="max-w-sm mb-10 shadow-lg"
      />

      <h2 className="text-4xl font-bold mb-4">❖ About me</h2>

      <p className="about-text text-lg font-medium mb-4 max-w-xl leading-relaxed text-gray">
        I’m studying{" "}
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
          ["Unity", "https://unity.com/"],
          ["C#", "https://learn.microsoft.com/en-us/dotnet/csharp/"],
          ["3D‑printing"],
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

      <p
        className="text-lg font-medium max-w-xl leading-relaxed text-gray"
        style={{ minHeight: "4.5rem" }}
      >
        But I’m also{" "}
        <span className="italic" ref={roleRef}>
          {roles[currentIndex]}
        </span>
      </p>
    </div>
  );
};

export default AboutSection;
