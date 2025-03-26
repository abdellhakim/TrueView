import React from "react";
import Navbar from '../../components/Navbar';

export const Home = () => {
  return (
    
    <div className="font-sans text-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen pt-20">
      <div data-aos="fade-up">
          <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">✨ AI-Powered News Verification</span>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <h1 className="text-4xl font-bold mt-4">TrueView – Unmasking the Truth with AI</h1>
        </div>
        <div data-aos="fade-up" data-aos-delay="600">
          <p className="text-gray-600 max-w-2xl mt-4">Analyze news articles and links to evaluate their credibility using AI-powered text analysis and source verification.</p>
        </div>
        <div className="mt-6 space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105">Get Started</button>
          <button className="border border-gray-500 px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105">Watch Demo</button>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="flex justify-center my-16">
        <div className="bg-blue-500 text-white p-6 rounded-lg w-[80%] text-center shadow-lg">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg">▶ Watch TrueView in Action</button>
          <p className="mt-2">5 mins – Play video</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center my-16 px-8">
        <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">✨ Our Approach</span>
        <div data-aos="fade-up">
        <h2 className="text-3xl font-bold mt-4">Enhancing News Verification with AI-Powered Analysis</h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
        <p className="text-gray-600 max-w-3xl mx-auto mt-4">TrueView helps you detect misinformation and evaluate news credibility in real-time.</p>
        </div>
        <div className="mt-6 space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Get a demo</button>
          <button className="border border-gray-500 px-6 py-3 rounded-lg">Research</button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="font-bold">🧠 AI-Powered Analysis</h3>
            <p className="text-gray-600 mt-2">Harness AI to analyze text and detect bias in news articles.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="font-bold">🔗 Cross-Source Verification</h3>
            <p className="text-gray-600 mt-2">Integrates with fact-checking platforms like Google Fact Check API.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="font-bold">⚡ Instant Insights</h3>
            <p className="text-gray-600 mt-2">Processes news in real-time to provide credibility ratings.</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="my-16 px-8">
        <h2 className="text-3xl font-bold text-center">Blog</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
          {/* Blog Card */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <img src="https://via.placeholder.com/300" alt="Blog Post" className="rounded-lg" />
              <span className="text-sm text-blue-500 mt-2 inline-block">Technology</span>
              <h3 className="font-bold mt-2">The Impact of Technology on the Workplace</h3>
              <p className="text-gray-600 text-sm">By Author Name | August 20, 2022</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="border border-gray-500 px-6 py-3 rounded-lg">View More</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="my-16 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-6">
          {["What is TrueView?", "How does it verify news credibility?", "Can I analyze any article?"].map((question, i) => (
            <details key={i} className="border-b py-3">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="text-gray-600 mt-2">Here is a brief answer to the question.</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-16">
        <p>©2025 TrueView. All rights reserved.</p>
      </footer>
    </div>
  );
};
