import React from "react";

const Section = ({ children, className = "" }) => {
    return (
        <section className={`my-section ${className} min-h-screen w-full`}>
            {children}
        </section>
    );
};

export default Section;