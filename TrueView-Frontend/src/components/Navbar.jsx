import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Import arrow icon
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      if (window.scrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-white transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${hasScrolled ? "mt-0" : "mt-8"}`}
    >
      <div className="flex items-center px-8 py-4">
        {/* Left Section (Logo + Nav Links) */}
        <div className="flex items-center space-x-17">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="TrueView Logo" className="h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-8">
            {/* Features with Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center cursor-pointer hover:text-blue-500">
                Features <ChevronDown className="ml-1 h-4 w-4" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/feature1">Feature 1</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/feature2">Feature 2</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/feature3">Feature 3</Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/blog" className="hover:text-blue-500">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-blue-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-500">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

       {/* Right Section (CTA Buttons) */}
        <div className="ml-auto flex space-x-4">
            <Link to="/signup" className="hover:text-blue-500">
              <button className="border border-blue-600 text-blue-600 font-bold px-4 py-2 rounded-lg hover:cursor-pointer transition-transform duration-300 hover:scale-105">
                Get a demo
              </button>
                
            </Link>
              <Link to="/signup" className="hover:text-white">
              <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition-transform hover:cursor-pointer duration-300 hover:scale-105">
                Register
              </button>
              </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
