const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="text-lg font-semibold tracking-tight">Baldrian</div>
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <a href="#about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:underline">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
