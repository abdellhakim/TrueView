import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import sparkleIcon from "../../assets/AI.png";
import bgImage from "../../assets/Grid.png";

export const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Failed to fetch articles", err));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, visibleCount + 1);

  return (
    <div className="font-sans">
      <Navbar />

      <main className="mx-auto max-w-[1400px]">
        {/* Header Section */}
        <section
          className="flex flex-col items-center justify-center text-center h-[70vh] pt-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div data-aos="fade-up">
            <span className="text-md bg-white px-4 py-2 rounded-full inline-flex items-center space-x-2 border border-gray-300 shadow-md">
              <img src={sparkleIcon} alt="sparkle icon" className="h-4 w-4" />
              <span className="text-[#4B5162] font-semibold text-sm">Explore verified articles</span>
            </span>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <h1 className="text-5xl font-bold mb-6 text-center mt-6">Blog</h1>
          </div>
        </section>

        {/* Featured Article Section */}
        {featuredArticle && (
          <section className="relative mb-10 px-6 md:px-20">
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden">
              <Link
                to={`/article/0`}
                state={{ article: featuredArticle }}
                className="block w-full h-full"
              >
                <img
                  src={featuredArticle.urlToImage || "https://via.placeholder.com/1200x600"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white flex flex-col justify-end">
                  <span className="bg-yellow-500 text-black px-3 py-1 text-sm rounded-md w-fit">Featured</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">{featuredArticle.title}</h2>
                  <div className="flex items-center text-gray-300 mt-2 text-sm">
                    <img src="https://via.placeholder.com/40" alt="Author" className="w-6 h-6 rounded-full border border-white" />
                    <span className="ml-2">
                      {(!featuredArticle.author || featuredArticle.author.trim().toLowerCase() === "author")
                        ? "Unknown"
                        : featuredArticle.author.trim()}
                    </span>

                    <span className="ml-4">{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
          {otherArticles.map((article, i) => (
            <Link
              key={i}
              to={`/article/${i + 1}`}
              state={{ article }}
              className="bg-white shadow rounded-lg overflow-hidden transition hover:scale-105 duration-200"
            >
              <img
                src={article.urlToImage || "https://via.placeholder.com/400x200"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-blue-600">{article.source?.name || "News"}</span>
                <h3 className="text-xl font-bold mt-2">{article.title}</h3>
                <div className="flex items-center text-gray-600 mt-2 text-sm">
                  <img src="https://via.placeholder.com/40" alt="Author" className="w-6 h-6 rounded-full" />
                  <span className="ml-2">
                    {(!article.author || article.author.trim().toLowerCase() === "author")
                      ? "Unknown"
                      : article.author.trim()}
                  </span>

                  <span className="ml-4">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {visibleCount + 1 < articles.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-white text-gray-600 px-6 py-2 rounded border hover:bg-blue-700 hover:text-white"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-16">
        <p>©2025 TrueView. All rights reserved.</p>
      </footer>
    </div>
  );
};
