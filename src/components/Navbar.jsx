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
      <div className="flex justify-between items-center pointer-events-auto">
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
          <div className="hidden xs:flex flex-col text-[0.65rem] leading-tight">
            <a href="/#">Coded Designer</a>
            <a href="/#">Copenhagen, Denmark</a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="uppercase text-[1.55rem] font-reem text-white tracking-tight"
          >
            Baldrian
          </a>
          {/* Menu Toggle */}
          <div
            className="w-[18px] cursor-pointer flex items-center justify-center text-2xl"
            onClick={handleMenuToggle}
          >
            {/* Hamburger */}
            <p
              className={`absolute transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-0 translate-y-[-10px] rotate-[-5deg]"
                  : "opacity-100"
              } text-white select-none`}
            >
              ☰
            </p>
            {/* Close X */}
            <p
              className={`absolute transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100"
                  : "opacity-0 translate-x-[-5px] translate-y-[10px] rotate-[5deg]"
              } text-white select-none`}
            >
              ✕
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
