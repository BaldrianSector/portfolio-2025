import ReactMarkdown from "react-markdown";

const TextBlock = ({ blok, isLast = false }) => (
  <div
    className={`prose prose-invert article-text text-lg max-w-2xl mx-auto text-dark font-normal ${
      isLast ? "pt-12 mt-4" : "py-12 my-4"
    }`}
  >
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        ),
      }}
    >
      {blok.text}
    </ReactMarkdown>
  </div>
);

export default TextBlock;
