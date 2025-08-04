import React from "react";

const Navbar = ({ isMenuOpen, handleMenuToggle }) => {
  return (
    <nav
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
        <div className="flex items-center gap-4">
          <a href="/#" className="w-10">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="select-none"
              style={{ filter: "invert(1)" }}
            />
          </a>
          <div className="hidden xs:flex flex-col text-[0.66rem] leading-tight">
            <a href="/#">Coded Designer</a>
            <a href="/#">Copenhagen, Denmark</a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="#"
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
