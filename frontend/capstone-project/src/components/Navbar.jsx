import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../images/cinemax-universal-blue-logo.png";

const Navbar = ({ userAvatar, onSearch, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center bg-customForeground p-2 shadow-md z-50">
      <div className="flex items-center space-x-4 flex-grow">
        {/* Logo */}
        <img src={logo} alt="Cinemax Logo" className="w-16 md:w-20 shrink-0" />

        {/* Navigation Links */}
        <div className="flex space-x-4 min-w-max">
          <Link
            to="/home"
            className="text-white text-sm sm:text-base hover:text-customGold"
          >
            Home
          </Link>
          <Link
            to="/mylist"
            className="text-white text-sm sm:text-base hover:text-customGold"
          >
            My List
          </Link>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-customInputGray text-white text-sm sm:text-base flex-grow max-w-[200px] md:max-w-[300px] lg:max-w-[400px] min-w-[100px]"
        />
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* User Avatar */}
        <img
          src={userAvatar || "https://via.placeholder.com/50"}
          alt="User Avatar"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-500 shrink-0"
        />

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-customForeground hover:bg-customInputGray text-white hover:text-customGold text-sm sm:text-base"
        >
          <Icon
            icon="mdi:logout"
            className="text-xl sm:text-2xl hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Dark Mode Button */}
        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 sm:px-4 sm:py-2 text-white hover:text-customGold rounded-full text-sm sm:text-base"
        >
          <Icon
            icon={darkMode ? "mdi:weather-night" : "mdi:white-balance-sunny"}
            className="text-xl sm:text-2xl hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
