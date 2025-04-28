import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;
  const [scrapedContent, setScrapedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article?.url) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/scrape?url=${encodeURIComponent(article.url)}`
        );
        const htmlContent = await res.text();
        setScrapedContent(htmlContent);
      } catch (err) {
        console.error("Scraping failed:", err);
        setError("Failed to load full article content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [article]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <Navbar/>

      {/* Hero Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10 max-w-4xl mt-20 mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex justify-between items-center text-gray-600 mb-6">
          <p className="text-lg">{article.author || "Unknown Author"}</p>
          <p className="text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>
        <img
          src={article.urlToImage || "https://via.placeholder.com/800x400"}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
  {loading ? (
    <p className="text-center text-blue-500 text-xl">Loading full article...</p>
  ) : error ? (
    <p className="text-center text-red-500 text-xl">{error}</p>
  ) : (
    <>
      {/* Horizontal image section */}
      <div className="flex overflow-x-auto space-x-4 py-4 mb-6">
        {Array.from(scrapedContent.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)).map((match, idx) => (
          <img
            key={idx}
            src={match[1]}
            alt={`Article Visual ${idx}`}
            className="h-48 rounded shadow-md flex-shrink-0"
          />
        ))}
      </div>

      {/* Clean text content */}
      <div className="prose prose-lg lg:prose-xl max-w-3xl mx-auto text-gray-800">
        <div
          dangerouslySetInnerHTML={{
            __html: scrapedContent.replace(/<img[^>]*>/g, ""), // remove images from main content
          }}
        />
      </div>

      <div className="text-center mt-8 text-gray-500">
        <p>Article scraped and loaded successfully. Happy reading!</p>
      </div>
    </>
  )}
</div>

    </div>
  );
};

export default ArticleDetail;
