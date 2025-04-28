import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import sparkleIcon from "../../assets/AI.png";
import bgImage from "../../assets/Grid.png";
import playIcon from "../../assets/play.png";
import Icon1 from "../../assets/Icon1.png";
import Icon2 from "../../assets/Icon2.png";
import Icon3 from "../../assets/Icon3.png";
import video from "../../assets/videoScreen.png";
import articleDefaultImg from "../../assets/article-listing.jpg";           

const FeatureCard = ({ icon, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shortText = text.length > 120 ? text.slice(0, 120) + "..." : text;

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer bg-white p-4 rounded-lg rounded-2xl border border-transparent transition-all duration-300 hover:border-blue-500 hover:shadow-[0_50px_180px_-30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
    >
      <h3 className="font-bold flex items-center gap-3 mb-2">
        <img src={icon} alt={`${title} icon`} className="h-6 w-6" />
        {title}
      </h3>
      <p className="text-gray-500 text-base text-left">
        {isOpen ? text : shortText}
      </p>
    </div>
  );
};

export const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/news")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched articles:", data);
      
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setArticles(selected);
      })
      
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);
  
  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="flex flex-col items-center justify-center text-center h-screen pt-2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div data-aos="fade-up">
          <span className="text-md bg-white px-4 py-2 rounded-full flex items-center space-x-2 border border-gray-300 shadow-md mt-18">
            <img src={sparkleIcon} alt="sparkle icon" className="h-4 w-4" />
            <span className="text-[#4B5162] font-semibold">AI-Powered News Verification</span>
          </span>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <h1 className="text-5xl font-bold mt-8 leading-snug">
            TrueView – Unmasking the Truth <br /> with AI
          </h1>
        </div>
        <div data-aos="fade-up" data-aos-delay="600">
          <p className="text-[#4B5162] max-w-2xl mt-4">
          Online News Consultation and Racism Detection in Texts <br />
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            style={{ backgroundColor: "#387FF5" }} 
            className="cursor-pointer inline-flex items-center text-white font-bold text-md px-7 py-3 rounded-lg transition-transform duration-300 hover:scale-105">
            Get Started
          </button>
          <button className="cursor-pointer bg-white inline-flex items-center border border-gray-300 px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105 space-x-3">
            <img src={playIcon} alt="Play icon" className="h-6 w-6" />
            <span className="text-[#4B5162] font-semibold">Watch Demo</span>
          </button>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="flex justify-center">
        <div>
          <img src={video} alt="video screen" className="h-max w-max cursor-pointer" />
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center my-16 px-8 mt-36" data-aos="fade-up">
        <span className="text-md bg-white px-3 py-2 rounded-full inline-flex items-center space-x-2 border border-gray-300 shadow-md">
          <img src={sparkleIcon} alt="sparkle icon" className="h-4 w-4" />
          <span className="text-[#4B5162] font-semibold">Our Approach</span>
        </span>

        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold mt-5">Enhancing News Verification <br />with AI-Powered Analysis</h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <p className="text-[#4B5162] max-w-3xl mx-auto mt-4">
            TrueView displays verified information and assists in detecting racist language in texts.<br /> helping users avoid harmful or offensive content
          </p>
        </div>
        <div className="mt-8 space-x-4">
          <button
            style={{ backgroundColor: "#387FF5" }} 
            className="cursor-pointer inline-flex items-center text-white font-bold text-md px-7 py-3 rounded-lg transition-transform duration-300 hover:scale-105">
            Get a demo
          </button>
          <button className="cursor-pointer border border-gray-300 px-7 py-3 rounded-lg transition-transform duration-300 hover:scale-105">
            <span className="text-[#4B5162] font-semibold">Research</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-26 max-w-6xl mx-auto w-full px-4">
          <FeatureCard
            icon={Icon3}
            title="AI-Driven Racism Detection"
            text="Leverage the power of machine learning with TrueView. Our custom-trained ML model analyzes text to accurately detect signs of racism, helping create a safer and more respectful digital environment."
          />
          <FeatureCard
            icon={Icon2}
            title="Cross-Platform Verification & Content Safeguarding"
            text="TrueView seamlessly combines trusted news sources with advanced racism detection. Our system cross-references reputable fact-checking databases and news outlets while employing a robust ML model to identify racist language, ensuring you access verified, respectful, and accurate information."
          />
          <FeatureCard
            icon={Icon1}
            title="Instant Insights"
            text="In the fast-paced world of information, every second counts. TrueView processes news articles and web links in real-time, giving you instant feedback on their reliability."
          />
        </div>
      </section>

      {/* Blog Section */}
      <section className="my-16 px-8 mt-46 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-5xl font-bold text-left pl-4">Blog</h2>
            <span className="text-md bg-white px-4 py-2 rounded-full inline-flex items-center space-x-2 border border-gray-300 shadow-md">
              <img src={sparkleIcon} alt="sparkle icon" className="h-4 w-4" />
              <span className="text-[#4B5162] font-semibold text-sm">Explore verified articles</span>
            </span>
          </div>
          <Link to="/blog">
            <button
              style={{ backgroundColor: "#387FF5" }}
              className="cursor-pointer inline-flex items-center text-white font-bold text-md px-7 py-3 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              View More
            </button>
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-lg">Loading articles...</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-7 mt-6 max-w-7xl mx-auto rounded-lg">
            {articles.slice(0, 3).map((article, index) => (
              <Link
                key={index}
                to={`/article/${index}`}
                state={{ article }}
              >
                <div className="cursor-pointer bg-white p-3 rounded-lg border border-grey-500 hover:shadow-xl transition">
                  <img
                    src={article.urlToImage || articleDefaultImg}
                    alt={article.title}
                    className="rounded-md w-full h-48 object-cover mb-4"
                  />
                  <span className="text-sm text-blue-500 mt-2 inline-block">{article.source?.name}</span>
                  <h3 className="font-bold mt-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm">
                    By {article.author || "Unknown"} |{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>



      {/* FAQ Section */}
      <section id="faq" className="my-20 px-8 max-w-4xl mx-auto mt-45">
        <div className="flex items-center space-x-8 mb-10">
          <span className="text-md bg-white px-4 py-2 rounded-full inline-flex items-center space-x-2 border border-gray-300 shadow-md">
            <img src={sparkleIcon} alt="sparkle icon" className="h-4 w-4" />
            <span className="text-[#4B5162] font-semibold text-sm">FAQ</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <details className="group rounded-lg p-4 hover:shadow-md transition">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800 group-open:text-blue-600">
              What is TrueView?
            </summary>
            <p className="text-gray-600 mt-2">
            TrueView is an AI-powered platform that analyzes news content, detects racism in text, verifies sources, and offers real-time credibility insights using machine learning and web scraping.
            </p>
          </details>

          <details className="group rounded-lg p-4 hover:shadow-md transition">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800 group-open:text-blue-600">
            How does TrueView ensure safe and reliable content?
            </summary>
            <p className="text-gray-600 mt-2">
            TrueView ensures safe and reliable content by using a machine learning model (SVM) to detect racism in text. 
            NewsAPI is used to retrieve and display verified news from trusted sources.
            </p>
          </details>

          <details className="group rounded-lg p-4 hover:shadow-md transition">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800 group-open:text-blue-600">
              Can I detect racism in any text or article?
            </summary>
            <p className="text-gray-600 mt-2">
            Yes! Simply paste the text into TrueView, and the system will analyze it for racist language using a machine learning model and classify it accordingly.
            </p>
          </details>

          <details className="group rounded-lg p-4 hover:shadow-md transition">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800 group-open:text-blue-600">
              Is TrueView free to use?
            </summary>
            <p className="text-gray-600 mt-2">
              We offer both a free basic version and a premium plan with additional features like deep analysis 
              and API access.
            </p>
          </details>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-16">
        <p>©2025 TrueView. All rights reserved.</p>
      </footer>
    </div>
  );
};
