import React from "react";
import Section from "./Section";

const NotFound = () => {
  return (
    <Section className="bg-dark text-light flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Something went wrong...</h2>
      <p className="mt-4 italic">
        But every mistake is a learning opportunity, right?
      </p>
    </Section>
  );
};

export default NotFound;
