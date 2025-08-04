import ReactMarkdown from "react-markdown";

const TextBlock = ({ blok }) => (
  <div className="prose prose-invert article-text text-lg py-12 max-w-2xl mx-auto my-4 text-dark font-normal">
    <ReactMarkdown>{blok.text}</ReactMarkdown>
  </div>
);

export default TextBlock;
