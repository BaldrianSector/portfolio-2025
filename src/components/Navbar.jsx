import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = ({ isMenuOpen, handleMenuToggle }) => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Scroll threshold - adjust this value to change when navbar hides
    const SCROLL_THRESHOLD = 28; // Change this number (pixels)
    let isResizing = false;
    let hasScrolled = false; // Track if user has scrolled yet

    // Ensure navbar starts at top position on load
    gsap.set(nav, { y: 0 });

    const updateNavbar = () => {
      // Skip animation if window is being resized or menu is open
      if (isResizing || isMenuOpen) {
        ticking.current = false;
        return;
      }

      const currentScrollY = window.scrollY;

      // Only animate if scroll position actually changed significantly
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDifference < 5) {
        ticking.current = false;
        return;
      }

      // Mark that user has scrolled (prevents initial animation on page load)
      if (!hasScrolled) {
        hasScrolled = true;
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > SCROLL_THRESHOLD
      ) {
        // Scrolling down & past threshold - hide navbar
        gsap.to(nav, {
          y: -100,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (
        currentScrollY < lastScrollY.current ||
        currentScrollY <= SCROLL_THRESHOLD
      ) {
        // Scrolling up or at top - show navbar
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current && !isResizing && !isMenuOpen) {
        requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    const handleResize = () => {
      isResizing = true;
      // Clear the resize flag after a short delay
      setTimeout(() => {
        isResizing = false;
        lastScrollY.current = window.scrollY; // Update scroll position
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="
                fixed top-0 left-0 w-full
                py-10 px-10
                z-30
                mix-blend-difference
                font-reem
                text-white
                pointer-events-none
            "
    >
      <div className="flex h-10 justify-between items-center pointer-events-auto">
        {/* Left Side */}
        <div
          className="flex items-center gap-4"
          onClick={isMenuOpen ? handleMenuToggle : null}
        >
          <a href="/#" className="w-10">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="select-none"
              style={{ filter: "invert(1)" }}
            />
          </a>
          <div className="hidden xs:flex flex-col text-[0.66rem] leading-tight text-nowrap translate-y-[1px]">
            <a href="/#">Coded Designer</a>
            <a href="/#">Copenhagen, Denmark</a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="/#"
            onClick={isMenuOpen ? handleMenuToggle : null}
            className="hidden xs:block uppercase text-[1.75rem] font-reem text-white tracking-tight"
          >
            Baldrian
          </a>
          {/* Menu Toggle */}
          <div
            className="w-[23px] cursor-pointer flex font-reem items-center justify-center text-2xl"
            onClick={handleMenuToggle}
          >
            {/* Hamburger */}
            <div
              className={`absolute transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-0 translate-y-[-10px] rotate-[-5deg]"
                  : "opacity-100"
              } text-white select-none`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M5 12h14M5 6h14M5 18h14"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            {/* Close X */}
            <div
              className={`absolute transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100"
                  : "opacity-0 translate-x-[-5px] translate-y-[10px] rotate-[5deg]"
              } text-white select-none`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
