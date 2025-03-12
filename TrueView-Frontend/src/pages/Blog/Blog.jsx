import React from "react";
import logo from "../../assets/logo.png";
import logina1 from "../../assets/logina1.png";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import google from "../../assets/google.png";

export const Blog = () => {
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
        <button className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-white-700">
          Get a demo
        </button>
        <a href="/Login" className="bg-blue-600 text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-700">
          Register
        </a>
      </div>
    </div>


    {/* Section principale - Blog */}
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>

      {/* Bannière principale */}
      <div className="mb-8">
        <img src="https://via.placeholder.com/1200x400" alt="Featured Post" className="w-full h-64 object-cover rounded-lg"/>
        <h2 className="text-2xl font-bold mt-4">The Impact of Technology on the Workplace: How Technology is Changing</h2>
        <div className="flex items-center text-gray-600 mt-2">
          <img src="https://via.placeholder.com/40" alt="Author" className="w-6 h-6 rounded-full"/>
          <span className="ml-2">John Doe</span>
          <span className="ml-4">October 10, 2023</span>
          <span className="ml-4">5 Comments</span>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/400x200" alt="Blog Post" className="w-full h-48 object-cover"/>
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
        <button className="bg-white text-gray-600 px-6 py-2 rounded border  hover:bg-blue-700 hover:text-white">Load More</button>
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
                  <li><a href="#" class="flex items-center space-x-2 hover:underline"><span>📷</span> <span>Instagram</span></a></li>
                  <li><a href="#" class="flex items-center space-x-2 hover:underline"><span>📘</span> <span>Facebook</span></a></li>
                  <li><a href="#" class="flex items-center space-x-2 hover:underline"><span>✖</span> <span>Twitter / X</span></a></li>
                  <li><a href="#" class="flex items-center space-x-2 hover:underline"><span>💼</span> <span>LinkedIn</span></a></li>
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
