import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const HomePage = ({ user, likedMovies, toggleLike, setUser }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (!user || !user.avatar) {
    //This ensures the user is available before rendering the page
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
        userAvatar={user?.avatar}
        onSearch={handleSearch}
        setUser={setUser}
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
