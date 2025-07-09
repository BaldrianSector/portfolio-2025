import React from "react";

const Section = ({ id, children, className = "" }) => {
  return (
    <section
      id={id}
      className={`my-section ${className} min-h-screen w-full pt-20 pb-20`}
    >
      {children}
    </section>
  );
};

export default Section;
