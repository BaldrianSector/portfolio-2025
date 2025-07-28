const ContactSection = () => {
  return (
    <div className="flex flex-col items-start mx-10 pt-10">
      <img
        src="/assets/images/Contact Portrait.jpg"
        alt="Portrait of Baldrian"
        className="max-w-sm mb-10 shadow-lg max-h-80 w-auto"
      />

      <h2 className="text-4xl font-bold mb-4">@ Get in contact</h2>

      <p className="about-text text-lg font-medium mb-4 max-w-xl leading-relaxed text-gray">
        I’m always open to new opportunities and collaborations. Whether you
        have a specific project in mind or just want to say hello. Currently,
        I'm searhing for an internship position for the fall of 2025.
      </p>
      <p className="about-text text-lg font-medium mb-4 max-w-xl leading-relaxed text-gray">
        You can contact me directly via email at{" "}
        <a href="mailto:baldriansector@gmail.com">baldriansector@gmail.com</a>{" "}
        or on my phone at <a href="tel:+4527458765">+45 27 45 87 65</a>.
      </p>
      <p className="about-text text-lg font-medium mb-4 max-w-xl leading-relaxed text-gray">
        I’m also available on{" "}
        <a
          href="https://www.linkedin.com/in/baldrian-sector/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        ,{" "}
        <a
          href="https://github.com/baldrian-sector"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        ,{" "}
        <a
          href="https://www.facebook.com/BaldrianSector"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        and{" "}
        <a
          href="https://www.instagram.com/baldrian.jpeg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        .
      </p>
    </div>
  );
};

export default ContactSection;
