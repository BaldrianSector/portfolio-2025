import React from "react";
import Section from "./Section";

const NotFound = () => {
  return (
    <Section className="bg-dark text-light flex flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold mb-12">404</h1>
      <h2 className="text-2xl font-bold">Something went wrong...</h2>
      <p className="mt-4 italic">
        But every mistake is a learning opportunity, right?
      </p>
    </Section>
  );
};

export default NotFound;
