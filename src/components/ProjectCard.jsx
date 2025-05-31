const ProjectCard = ({ blok }) => {
  const url = blok.asset?.filename || null;
  const isVideo = url ? /\.(mp4|webm|mov)$/i.test(url) : false;

  return (
    <div className="p-6">
      {url && (
        isVideo ? (
          <video
            src={url}
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto mb-4 rounded shadow-md aspect-video object-cover"
          />
        ) : (
          <img
            src={url}
            alt={blok.title || "Project image"}
            className="mx-auto mb-6 rounded shadow-md aspect-video object-cover"
          />
        )
      )}
      
      <div className="font-inter leading-none">
        <h3 className="text-xl font-semibold mb-2">{blok.title || "Untitled project"}</h3>
        <p className="text-xl text-gray font-medium">
          {blok.description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
