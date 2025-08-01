const ArticleHeader = ({ blok }) => {
  const isVideo =
    blok.cover?.filename?.toLowerCase().endsWith(".mp4") ||
    blok.cover?.filename?.toLowerCase().endsWith(".webm");

  return (
    <header className="flex flex-col items-center justify-center ">
      <div className="">
        <div className="title-and-year flex  justify-between">
          {/* Title */}
          {blok.title && (
            <h1 className="text-4xl sm:text-5xl font-bold">{blok.title}</h1>
          )}
          {/* Year */}
          {blok.year && (
            <p className="text-lg self-end font-reem text-gray">
              ({blok.year})
            </p>
          )}
        </div>
        {/* Description */}
        {blok.description && (
          <p className="text-lg py-4 max-w-2xl mx-auto text-gray-300 my-4 text-gray font-normal">
            {blok.description}
          </p>
        )}
        {/* Link */}
        {blok.linktext && (
          <div className="flex justify-between items-center pt-4 pb-10">
            <a
              href={blok.link.url}
              target={blok.link.target || "_blank"}
              rel="noopener noreferrer"
              className="font-bold font-void text-lg underline underline-offset-4 decoration-2"
            >
              {blok.linktext}
            </a>
            <span className="text-xs leading-tight uppercase font-reem">
              Scroll down <br /> for more
            </span>
            <span className="text-3xl">↓</span>
          </div>
        )}
      </div>

      {/* Cover */}
      {blok.cover?.filename && (
        <div className="mt-8 overflow-hidden">
          {isVideo ? (
            <video
              src={blok.cover.filename}
              autoPlay
              muted
              loop
              className="w-full"
            />
          ) : (
            <img
              src={blok.cover.filename}
              alt={blok.cover.alt || blok.title}
              className="w-full"
              loop
            />
          )}
        </div>
      )}
    </header>
  );
};

export default ArticleHeader;
