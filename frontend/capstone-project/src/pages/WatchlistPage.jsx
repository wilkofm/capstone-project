import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const WatchlistPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Retrieve user info from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); //Clears user info on sign out
    window.location.href = "/";
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
        userAvatar={user.avatar}
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <div className="pt-8">
        <CardList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default WatchlistPage;
