import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react"; // Import arrow icon
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false); // Dropdown for Features
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Dropdown for Profile
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details
  let lastScrollY = window.scrollY;

  const navigate = useNavigate(); // Navigate hook

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); // Set user details
          setIsAuthenticated(true); // Mark as authenticated
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setIsAuthenticated(false); // Handle token expiration or invalid token
        }
      } else {
        setIsAuthenticated(false); // No token means not authenticated
      }
    };

    fetchUserDetails();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsAuthenticated(false); // Reset authentication state
    setUser(null); // Reset user details
    navigate("/"); // Redirect to home page
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${hasScrolled ? "bg-white" : "bg-transparent"} ${
        hasScrolled ? "mt-0" : "mt-8"
      }`}
    >
      <div className="flex items-center px-8 py-4">
        {/* Left Section (Logo + Nav Links) */}
        <div className="flex items-center space-x-17">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="TrueView Logo" className="h-10.5 w-auto ml-10" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-8 text-base font-medium text-[#4B5162]">
            {/* Features with Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setIsFeaturesDropdownOpen(true)}
              onMouseLeave={() => setIsFeaturesDropdownOpen(false)}
            >
              <div className="flex items-center cursor-pointer hover:text-blue-500">
                Features <ChevronDown className="ml-1 h-4 w-4" />
              </div>

              {/* Dropdown Menu */}
              {isFeaturesDropdownOpen && (
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
              <Link to="/checker" className="hover:text-blue-500">
              Checker
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-500">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section (CTA Buttons or Profile Dropdown) */}
        <div className="ml-auto flex items-center space-x-4 mr-16">
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Picture or Initials */}
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              >
                {user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg py-2">
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <button  onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button className="cursor-pointer border border-blue-200 text-blue-500 font-bold text-sm px-7 py-3 rounded-md transition-transform duration-300 hover:scale-105">
                Get a demo
              </button>
              <Link to="/signup">
                <button
                  style={{ backgroundColor: "#387FF5" }}
                  className="cursor-pointer text-white font-bold text-sm px-6 py-3 rounded-md transition-transform duration-300 hover:scale-105"
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
