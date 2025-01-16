import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const HomePage = ({ user, likedMovies, toggleLike }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); //Clears user info on sign out
    window.location.href = "/";
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        userAvatar={user.avatar}
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <div className="pt-8">
        <CardList
          searchQuery={searchQuery}
          likedMovies={likedMovies}
          toggleLike={toggleLike}
        />
      </div>
    </div>
  );
};

export default HomePage;
