import React from "react";

const Navbar = ({ menuOpen, handleMenuToggle }) => {
    return (
        <nav className="
            fixed top-0 left-0 w-screen
            flex justify-between items-center
            py-10 px-10
            z-30
            mix-blend-difference
            font-reem
            text-white
        ">
            {/* Left Side */}
            <div className="flex items-center gap-2">
                <a href="">
                    <img
                        src="src/assets/icons/logo.svg"
                        alt="Logo"
                        className="w-10 select-none"
                        style={{ filter: "invert(1)" }}
                    />
                </a>
                <div className="hidden xs:flex flex-col text-xs">
                    <a href="" className="">
                        Coded Designer
                    </a>
                    <a href="" className="">
                        Copenhagen, Denmark
                    </a>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex gap-4 items-center leading-none">
                <a
                    href="#"
                    className="uppercase text-2xl font-[Reem_Kufi,sans-serif] text-white tracking-tight"
                >
                    Baldrian
                </a>
                {/* Menu Toggle */}
                <div
                    className="relative w-12 h-6 cursor-pointer flex items-center justify-center text-2xl"
                    onClick={handleMenuToggle}
                >
                    {/* Hamburger */}
                    <p
                        className={`
                            absolute transition-all duration-300
                            ${menuOpen ? "opacity-0 translate-x-[-5px] translate-y-[-10px] rotate-[-5deg]" : "opacity-100"}
                            text-white select-none
                        `}
                    >
                        ☰
                    </p>
                    {/* Close X */}
                    <p
                        className={`
                            absolute transition-all duration-300
                            ${menuOpen ? "opacity-100 translate-x-[-5px] translate-y-[10px] rotate-[5deg]" : "opacity-0"}
                            text-white select-none
                        `}
                    >
                        ✕
                    </p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
