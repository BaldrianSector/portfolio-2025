import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const socials = [
  { name: "GitHub", url: "https://github.com/BaldrianSector" },
  { name: "Instagram", url: "https://www.instagram.com/baldrian.jpeg/" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/baldrian-sector-227042269/",
  },
  { name: "Facebook", url: "https://www.facebook.com/BaldrianSector" },
];

const links = [
  { label: "01 Home", href: "#hero", img: "/assets/images/img-1.jpg" },
  { label: "02 Projects", href: "#projects", img: "/assets/images/img-2.jpg" },
  { label: "03 About me", href: "#about", img: "/assets/images/img-3.jpg" },
  { label: "04 Contact", href: "#contact", img: "/assets/images/img-4.jpg" },
];

export default function MenuOverlay({ open, onClose }) {
  const overlayRef = useRef();

  useEffect(() => {
    if (open) {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        ease: "power4.inOut",
      });
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
      });
    }
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className="menu-overlay z-20 fixed top-0 left-0 w-screen h-screen bg-[#0f0f0f]"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div className="menu-content flex justify-center items-center h-full">
        <div className="menu-items flex gap-10 w-full px-10">
          <div className="col-lg flex-1 hidden md:flex justify-center items-center">
            <div className="menu-preview-img w-1/2 h-full overflow-hidden">
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
                    className="text-3xl"
                    onClick={onClose}
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
    </div>
  );
}
