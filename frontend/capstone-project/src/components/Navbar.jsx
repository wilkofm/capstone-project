import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../images/cinemax-universal-blue-logo.png";

const Navbar = ({ userAvatar, onSearch, setUser }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setDarkMode(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    window.location.href = "/";
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
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
            className={`text-sm sm:text-base ${
              location.pathname === "/home" ? "text-customGold" : "text-white"
            } hover:text-customGold`}
          >
            Home
          </Link>
          <Link
            to="/mylist"
            className={`text-sm sm:text-base ${
              location.pathname === "/mylist" ? "text-customGold" : "text-white"
            } hover:text-customGold`}
          >
            My List
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-[200px] md:max-w-[300px] lg:max-w-[400px]">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-full bg-customInputGray text-white text-sm sm:text-base pr-10"
          />
          {searchQuery && (
            <Icon
              icon="mdi:close"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg cursor-pointer hover:text-customGold"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      <div className="relative flex items-center space-x-1 sm:space-x-2">
        {/* User Avatar */}
        <div className="relative">
          <img
            src={userAvatar || "https://via.placeholder.com/50"}
            alt="User Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-500 cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-customForeground shadow-lg rounded-lg">
              <ul className="py-2 text-sm text-white">
                <li
                  className="flex items-center px-4 py-2 hover:bg-customInputGray hover:text-customGold cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  <Icon
                    icon={
                      darkMode ? "mdi:weather-night" : "mdi:white-balance-sunny"
                    }
                    className="text-xl mr-2"
                  />
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </li>
                <li
                  className="flex items-center px-4 py-2 hover:bg-customInputGray hover:text-customGold cursor-pointer"
                  onClick={handleLogout}
                >
                  <Icon icon="mdi:logout" className="text-xl mr-2" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
