const HeroSection = () => {
  return (
    <>
      {/* Grid container */}
      <div className="h-full w-full grid self-center py-28 px-24 max-w-[520px]">
        {/* Video wrapper to control overflow */}
        <div className="relative overflow-hidden col-start-1 row-start-1 z-0">
          <video
            src="/assets/videos/bolarbear.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-1/2 left-1/2 w-full h-full object-cover object-[85%_25%] -translate-x-1/2 -translate-y-1/2 py-[-100px] pointer-events-none"
          ></video>
        </div>

        {/* Top-left text */}
        <p className="scramble-text relative self-start justify-self-start -top-11 -left-10 text-white text-lg z-10 col-start-1 row-start-1 max-w-[210px] indent-4 leading-5">
          Design student working at the intersection of programming, technology
          and human interaction.
        </p>

        {/* Bottom-right text */}
        <p className="scramble-text relative self-end justify-self-end -bottom-10 -right-20 text-white text-lg z-10 col-start-1 row-start-1 max-w-[180px] indent-4 leading-5">
          Coding the future, shooting sunsets and{" "}
          <span className="font-playfair italic">
            occasionally jumping out of airplanes.
          </span>
        </p>
      </div>

      <span className="font-reem text-xs absolute bottom-30 left-10">
        Selection of recent
        <br />
        work and projects
      </span>
    </>
  );
};

export default HeroSection;
