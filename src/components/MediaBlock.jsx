const MediaBlock = ({ blok }) => {
  if (!blok.asset || !blok.asset.filename) {
    return (
      <div className="bg-gray-800 text-dark underline">
        <p>No media available for this block.</p>
      </div>
    );
  }

  const filename = blok.asset.filename;
  const ext = filename.split(".").pop()?.toLowerCase();
  const isVideo = ext === "mp4" || ext === "webm";
  const mimeType =
    ext === "mp4" ? "video/mp4" : ext === "webm" ? "video/webm" : "";

  return (
    <figure className="-mx-10 md:max-w-3xl">
      {isVideo ? (
        <video
          className="w-full max-w-full block"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={filename} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={filename}
          alt={blok.description || "Media"}
          className="w-full max-w-full block"
        />
      )}
      {blok.description && (
        <figcaption className="mt-2 text-sm text-gray-400">
          {blok.description}
        </figcaption>
      )}
    </figure>
  );
};

export default MediaBlock;
