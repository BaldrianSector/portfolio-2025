import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const links = [
  { label: "01 Home", href: "#hero", img: "/assets/images/img-1.jpg" },
  { label: "02 Projects", href: "#projects", img: "/assets/images/img-2.jpg" },
  { label: "03 About me", href: "#about", img: "/assets/images/img-3.jpg" },
  { label: "04 Contact", href: "#contact", img: "/assets/images/img-4.jpg" },
];

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/baldrian-sector-227042269/",
  },
  { name: "Instagram", url: "https://www.instagram.com/baldrian.jpeg/" },
  { name: "Facebook", url: "https://www.facebook.com/BaldrianSector" },
  { name: "GitHub", url: "https://github.com/BaldrianSector" },
];

export default function MenuOverlay({ isMenuOpen, handleMenuToggle }) {
  const overlayRef = useRef();

  useEffect(() => {
    if (isMenuOpen) {
      // Animate overlay open
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        duration: 1,
        ease: "power4.inOut",
      });

      // Animate all links and socials
      gsap.set([".link a", ".social a"], { y: "-100%", opacity: 0 });
      gsap.to([".link a", ".social a"], {
        y: "0%",
        delay: 0.75,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    } else {
      // Animate overlay close
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();

    // Find the target element
    const target = document.querySelector(href);

    if (target) {
      // Close the menu first
      handleMenuToggle();

      // Add a small delay to let the menu close, then scroll
      setTimeout(() => {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 0, // Adjust if you have a fixed header
          },
          ease: "power3.out",
        });
      }, 100);
    } else {
      console.error("❌ Target element not found for:", href);
      console.log(
        "🔍 All elements with IDs:",
        Array.from(document.querySelectorAll("[id]")).map((el) => `#${el.id}`)
      );
    }
  };

  return (
    <div
      ref={overlayRef}
      className="menu-overlay z-20 fixed top-0 left-0 w-screen h-screen bg-[#0f0f0f]"
      style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
    >
      <div className="menu-content flex justify-center items-center h-full">
        <div className="menu-items flex gap-10 w-full px-10">
          <div className="col-lg flex-1 hidden md:flex justify-center items-center">
            <div className="menu-preview-img h-full overflow-hidden">
              <img
                src="/assets/images/img-1.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="col-sm flex-1 flex flex-col gap-10">
            <div className="menu-links flex flex-col gap-2">
              {links.map((link) => (
                <div className="link" key={link.label}>
                  <a
                    href={link.href}
                    data-img={link.img}
                    className="text-3xl block"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
            <div className="menu-socials flex flex-col gap-2">
              {socials.map((social) => (
                <div className="social" key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="menu-footer flex justify-between px-10 pb-6">
        <div className="col-lg">
          <a href="mailto:baldriansector@gmail.com">Email me</a>
        </div>
        <div className="col-sm flex gap-4">
          <a href="#">Origin</a>
          <a href="#">Resume</a>
        </div>
      </div>
    </div>
  );
}
