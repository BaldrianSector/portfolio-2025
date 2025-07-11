import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import App from "./App.jsx";

import ProjectCard from "./components/ProjectCard";
import ProjectArticleSection from "./components/ProjectArticle";
import ArticleHeader from "./components/ArticleHeader";
import MediaBlock from "./components/MediaBlock";
import TextBlock from "./components/TextBlock";

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    "project-card": ProjectCard,
    "article-header": ArticleHeader,
    "media-block": MediaBlock,
    "text-block": TextBlock,
  },
  apiOptions: {
    region: "eu",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
