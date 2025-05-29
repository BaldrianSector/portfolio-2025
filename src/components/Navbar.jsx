const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black">
      {/* Left side */}
      <div className="left-side flex items-center gap-2">
        <a href="">
          <img
            src="/⌥.svg"
            alt="Baldrian Sector Logo"
            className="nav-item align-self-center w-6 h-6"
          />
        </a>
        <div className="flex flex-col leading-none">
          <a href="">
            <span className="nav-item reem text-xs">Coded Designer</span>
          </a>
          <a href="">
            <span className="nav-item reem text-xs">Copenhagen, Denmark</span>
          </a>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side flex gap-4 items-center">
        <div className="Name">
          <a href="#" className="nav-item reem uppercase">
            Baldrian
          </a>
        </div>
      </div>

      {/* Menu toggle */}
      <div className="menu-toggle flex gap-2 items-center">
        <p id="menu-open" className="nav-item font-bold cursor-pointer">
          ☰
        </p>
        <p id="menu-close" className="font-bold cursor-pointer hidden">
          ✕
        </p>
      </div>
    </nav>
  );
};

export default Navbar;