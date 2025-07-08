const HeroSection = () => {
  return (
    <>
      {/* Grid container */}
      <div className="min-w-[300px] min-h-[500px] grid">
        {/* Video wrapper to control overflow */}
        <div className="relative w-full h-full overflow-hidden col-start-1 row-start-1 z-0">
          <video
            src="/assets/videos/bolarbear.mp4"
            autoPlay
            muted
            loop
            className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
          ></video>
        </div>

        {/* Top-left text */}
        <p className="scramble-text self-start justify-self-start -top-10 -left-10 text-white text-lg z-10 col-start-1 row-start-1 max-w-[210px] indent-4 leading-5">
          Design student working at the intersection of programming, technology
          and human interaction.
        </p>

        {/* Bottom-right text */}
        <p className="scramble-text self-end justify-self-end -bottom-10 -right-18 text-white text-lg z-10 col-start-1 row-start-1 max-w-[180px] indent-4 leading-5">
          Coding the future, shooting sunsets and{" "}
          <span className="playfair">
            occasionally jumping out of airplanes.
          </span>
        </p>
      </div>

      <span className="reem text-xs absolute bottom-30 left-10">
        Selection of recent
        <br />
        work and projects
      </span>
    </>
  );
};

export default HeroSection;
