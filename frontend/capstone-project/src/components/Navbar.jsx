import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/cinemax-universal-blue-logo.png";

const Navbar = ({ userAvatar, onSearch, onLogout }) => {
  return (
    <nav className="flex items-center justify-between bg-customForeground p-4 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Cinemax Logo" className="w-20" />

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/mylist" className="text-white hover:underline">
          My List
        </Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 rounded bg-customInputGray text-white"
      />

      {/* User Avatar */}
      <img
        src={userAvatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border-2 border-customBlue"
      />

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Log Out
      </button>

      {/* Dark Mode Button */}
      <button className="ml-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">
        Dark Mode
      </button>
    </nav>
  );
};

export default Navbar;
