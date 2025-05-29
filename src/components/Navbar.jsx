const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black font-reem">
      {/* Left side */}
      <div className="left-side flex items-center gap-2">
        <a href="">
          <img
            src="src/assets/icons/logo.svg"
            alt="Logo"
            className="nav-item align-self-center w-11"
          />
        </a>
        <div className="hidden xs:flex flex-col leading-non text-xs">
          <a href="">
            <span className="nav-item">Coded Designer</span>
          </a>
          <a href="">
            <span className="nav-item">Copenhagen, Denmark</span>
          </a>
        </div>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center leading-none">
        <div className="Name">
          <a href="#" className="nav-item uppercase text-3xl">
            Baldrian
          </a>
        </div>

        {/* Menu toggle */}
        <div className="menu-toggle cursor-pointer flex items-center justify-center text-3xl">
          <p id="menu-open" className="">☰</p>
          <p id="menu-close" className="hidden">✕</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;