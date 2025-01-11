import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/cinemax-universal-blue-logo.png";

const Navbar = ({ userAvatar, onSearch, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-customForeground p-2 shadow-md z-50">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img src={logo} alt="Cinemax Logo" className="w-20" />

        {/* Navigation Links */}
        <Link to="/home" className="text-white hover:text-customGold">
          Home
        </Link>
        <Link to="/mylist" className="text-white hover:text-customGold">
          My List
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 rounded-full bg-customInputGray text-white"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <img
          src={userAvatar || "https://via.placeholder.com/50"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-500"
        />

        {/* Logout Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-full bg-customForeground hover:bg-customInputGray text-white hover:text-customGold"
          >
            Sign Out
          </button>
        </div>

        {/* Dark Mode Button */}
        <button className="ml-4 px-4 py-2 bg-customForeground hover:bg-customInputGray text-white hover:text-customGold rounded-full">
          Dark Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
