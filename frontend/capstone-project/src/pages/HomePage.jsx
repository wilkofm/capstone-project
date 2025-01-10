import React from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const HomePage = () => {
  // Placeholder avatar URL
  const userAvatar = "https://via.placeholder.com/100.png?text=Avatar";

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
    // Implement search functionality later
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Implement logout functionality
  };

  return (
    <div className="min-h-screen">
      <Navbar
        userAvatar={userAvatar}
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <CardList />
    </div>
  );
};

export default HomePage;
