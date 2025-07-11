const ArticleHeader = ({ blok }) => {
  const isVideo =
    blok.cover?.filename?.endsWith(".mp4") ||
    blok.cover?.filename?.endsWith(".webm");

  return (
    <header className="text-center">
      {/* Title */}
      {blok.title && <h1 className="text-5xl font-bold mb-4">{blok.title}</h1>}

      {/* Year */}
      {blok.year && (
        <p className="text-lg text-gray-400 mb-2 italic">({blok.year})</p>
      )}

      {/* Description */}
      {blok.description && (
        <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-6">
          {blok.description}
        </p>
      )}

      {/* Cover */}
      {blok.cover?.filename && (
        <div className="mt-8 rounded-xl overflow-hidden">
          {isVideo ? (
            <video
              src={blok.cover.filename}
              controls
              className="w-full rounded-xl"
            />
          ) : (
            <img
              src={blok.cover.filename}
              alt={blok.cover.alt || blok.title}
              className="w-full rounded-xl"
            />
          )}
        </div>
      )}

      {/* Link */}
      {blok.link && blok.link_text && (
        <a
          href={blok.link.url}
          target={blok.link.target || "_blank"}
          rel="noopener noreferrer"
          className="inline-block mt-6 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          {blok.linktext}
        </a>
      )}
    </header>
  );
};

export default ArticleHeader;
