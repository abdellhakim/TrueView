import React, { useState } from "react";
import logo from "../../assets/logo.png";
import postcard from "../../assets/postcard.png";
import Rectangle38 from "../../assets/Rectangle 38.png";




export const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Fonction pour charger plus d'articles
  const loadMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
  }

  
  return (
    <div className="font-sans">
    {/* En-tête */}
    
    <div className="container mx-auto flex justify-between items-center p-4">
      <div className="flex items-center space-x-8">
        <a href="/Home" >
          <img src={logo} alt="TrueView-logo" className="w-[150px]" />
        </a>
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Blog</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">FAQ</a>
        </nav>
      </div>
      <div className="flex space-x-2">
        <a href="" className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover: border-black">
          Get a demo
        </a>
        <a href="/Login" className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700">
          Register
        </a>
      </div>
    </div>


    {/* Section principale - Blog */}
    <main className="mx-auto max-w-[1400px] p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>

      {/* Bannière principale */}
      <div className="relative mb-8">
        <a href="#">
          <img src={postcard} alt="postcard" className="w-full h-[500px] object-cover rounded-lg" />
        </a>

        {/* Superposition de contenu */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-lg">
          {/* Badge Technology */}
          <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md">Technology</span>

          {/* Titre de l'article */}
          <h2 className="text-2xl font-bold mt-2">The Impact of Technology on the Workplace: How Technology is Changing</h2>

          {/* Infos de l'auteur */}
          <div className="flex items-center text-gray-300 mt-2">
            <img src="https://via.placeholder.com/40" alt="Author" className="w-6 h-6 rounded-full border border-white" />
            <span className="ml-2">Tracey Wilson</span>
            <span className="ml-4">August 20, 2022</span>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(visiblePosts)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={Rectangle38} alt="Blog Post" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <span className="text-sm text-blue-600">Technology</span>
              <h3 className="text-xl font-bold mt-2">The Impact of Technology on the Workplace</h3>
              <div className="flex items-center text-gray-600 mt-2">
                <img src="https://via.placeholder.com/40" alt="Author" className="w-6 h-6 rounded-full"/>
                <span className="ml-2">John Doe</span>
                <span className="ml-4">October 10, 2023</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton de chargement */}
      <div className="flex justify-center mt-8">
        <button onClick={loadMorePosts} className="bg-white text-gray-600 px-6 py-2 rounded border  hover:bg-blue-700 hover:text-white">Load More</button>
      </div>
    </main>

    {/* Pied de page */}
    <footer class="bg-white-100 text-gray-700 py-10">

      <div class="w-full border-t border-gray-300 mt-8 pt-4 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
{/*           
          <!-- About Section --> */}
          <div>
              <h4 class="text-lg font-semibold mb-3">About TrueView</h4>
              <ul class="space-y-2">
                  <li><a href="#" class="hover:underline">Company Overview</a></li>
                  <li><a href="#" class="hover:underline">Careers</a></li>
                  <li><a href="#" class="hover:underline">Press & Media</a></li>
                  <li><a href="#" class="hover:underline">Testimonials</a></li>
              </ul>
          </div>

          {/* <!-- Resources Section --> */}
          <div>
              <h4 class="text-lg font-semibold mb-3">Resources</h4>
              <ul class="space-y-2">
                  <li><a href="#" class="hover:underline">Blog</a></li>
                  <li><a href="#" class="hover:underline">Help Center</a></li>
                  <li><a href="#" class="hover:underline">Webinars & Events</a></li>
                  <li><a href="#" class="hover:underline">Case Studies</a></li>
              </ul>
          </div>

          {/* <!-- Support & Contact Section --> */}
          <div >
              
              <h4 class="text-lg font-semibold mb-3">Support & Contact</h4>
              <ul class="space-y-2">
                  <li><a href="#" class="hover:underline">Contact Us</a></li>
                  <li><a href="#" class="hover:underline">Technical Support</a></li>
                  <li><a href="#" class="hover:underline">Feedback</a></li>
                  <li><a href="#" class="hover:underline">Community Forum</a></li>
              </ul>
          </div>

          {/* <!-- Social Media Section --> */}
          <div>
              <h4 class="text-lg font-semibold mb-3">Connect</h4>
              <ul class="space-y-2">
                  <li><a href="https://www.instagram.com/" class="flex items-center space-x-2 hover:underline"><span>📷</span> <span>Instagram</span></a></li>
                  <li><a href="https://www.facebook.com/" class="flex items-center space-x-2 hover:underline"><span>📘</span> <span>Facebook</span></a></li>
                  <li><a href="https://x.com/?lang=fr" class="flex items-center space-x-2 hover:underline"><span>✖</span> <span>Twitter / X</span></a></li>
                  <li><a href="https://www.linkedin.com/" class="flex items-center space-x-2 hover:underline"><span>💼</span> <span>LinkedIn</span></a></li>
              </ul>
          </div>

      </div>

      {/* <!-- Footer Bottom Section --> */}
      <div class="mt-8 border-t border-gray-300 pt-4 ">
          <p class="text-sm">©2025 TrueView - All rights reserved.</p>
          <div class="mt-2 flex justify-end space-x-4 text-sm">
              <a href="#" class="hover:underline">Term of use</a>
              <a href="#" class="hover:underline">Privacy policy</a>
              <a href="#" class="hover:underline">Security</a>
          </div>
      </div>
    </footer>

  </div>
  )
}
