const ProjectCard = ({ title, description, asset }) => {
  const url = asset?.filename || null;
  const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false;

  const mediaClassName =
    "w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 mb-4";

  return (
    <div className="max-w-xl cursor-pointer">
      <div className="overflow-hidden">
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
        <h3 className="text-l font-semibold">{title || "Untitled project"}</h3>
        <p className="text-l text-gray font-medium">
          {description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
