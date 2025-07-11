const MediaBlock = ({ blok }) => {
  if (!blok.asset || !blok.asset.filename) {
    return (
      <div className="bg-gray-800 text-white">
        <p>No media available for this block.</p>
      </div>
    );
  }

  return (
    <figure className="">
      {blok.mediaType === "video" ? (
        <video src={blok.asset.filename} controls className="w-full" />
      ) : (
        <img
          src={blok.asset.filename}
          alt={blok.description || "Media"}
          className="w-full"
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
