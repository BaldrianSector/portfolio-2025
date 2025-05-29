const ProjectCard = ({ blok }) => {
  const url = blok.asset?.filename;

  if (!url) return null;

  const isVideo = /\.(mp4|webm|mov)$/i.test(url);

  return (
    <div className="p-6 border rounded shadow-md text-center">
      {isVideo ? (
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
          alt={blok.title || "Project media"}
          className="mx-auto mb-4 rounded shadow-md aspect-video object-cover"
        />
      )}
      <h3 className="text-xl font-bold mb-2">{blok.title}</h3>
      <p className="text-gray-700">{blok.description}</p>
    </div>
  );
};

export default ProjectCard;
