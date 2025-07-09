const ProjectCard = ({ title, description, asset, aspect }) => {
  const url = asset?.filename || null;
  const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false;

  // Map aspect ratio values to Tailwind classes
  const aspectClassMap = {
    "aspect-video": "aspect-video",
    "aspect-square": "aspect-square",
    "aspect-[4/3]": "aspect-[4/3]",
    "aspect-auto": "aspect-auto",
  };

  const aspectClass = aspectClassMap[aspect] || "aspect-video";

  const mediaClassName =
    "w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 mb-4";

  return (
    <div className="max-w-xl cursor-pointer">
      <div className={`overflow-hidden ${aspectClass}`}>
        {url &&
          (isVideo ? (
            <video
              src={url}
              autoPlay
              muted
              loop
              playsInline
              className={mediaClassName}
            />
          ) : (
            <img
              src={url}
              alt={title || "Project image"}
              className={mediaClassName}
            />
          ))}
      </div>

      <div className="font-inter leading-normal">
        <h3 className="text-l font-semibold pt-4">
          {title || "Untitled project"}
        </h3>
        <p className="text-l text-gray font-medium">
          {description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
