import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  {
    label: "01 Home",
    href: "#hero",
    img: "/assets/images/Standing-Portrait.jpg",
  },
  { label: "02 Projects", href: "#projects", img: "/assets/images/img-2.jpg" },
  { label: "03 About", href: "#about", img: "/assets/images/img-3.jpg" },
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
  const navigate = useNavigate();
  const location = useLocation();

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

    // Close the menu first
    handleMenuToggle();

    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      // Already on home page, navigate with hash
      navigate(href);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="menu-overlay z-20 fixed top-0 left-0 w-screen"
      style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
    >
      <div className="menu-content flex justify-center items-center">
        <div className="menu-items flex gap-10 w-full px-10">
          <div className="col-lg flex-1 hidden md:flex justify-center items-center">
            <div className="menu-preview-img h-full overflow-hidden">
              <img
                src="/assets/images/Standing-Portrait.jpg"
                alt=""
                className="w-full h-full object-cover object-[60%_20%]"
              />
            </div>
          </div>
          <div className="col-sm flex-1 flex flex-col short-sm:!flex-row gap-10 short-sm:!gap-20">
            <div className="menu-links flex flex-col gap-2 text-nowrap short-md:!gap-0 short-sm:!leading-[1]">
              {links.map((link) => (
                <div className="link" key={link.label}>
                  <a
                    href={link.href}
                    data-img={link.img}
                    className="text-3xl block short-sm:!text-2xl"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
            <div className="menu-socials flex flex-col gap-2 short-sm:pt-3 short-sm:!gap-[1.0rem] short-sm:!leading-[1.2]">
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
          <a href="mailto:baldriansector@gmail.com" className="text-nowrap">
            Email me
          </a>
        </div>
        <div className="col-sm flex gap-4">
          <a href="tel:+4527458765" className="text-nowrap">
            Call me
          </a>
          <a href="/assets/documents/Baldrian Sector - Resume 2025.pdf">
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}
