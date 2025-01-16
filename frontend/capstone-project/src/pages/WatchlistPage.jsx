import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const WatchlistPage = ({ user, likedMovies, toggleLike }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWatchlist(user.userId);
    }
  }, [user]);

  const fetchWatchlist = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/watchlists?userId=${userId}`
      );
      const data = await response.json();

      if (data?.data) {
        const movies = data.data.map((entry) => entry.movie);
        setWatchlistMovies(movies);
      } else {
        console.error("No watchlist data found.");
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  const handleToggleLike = async (movieId) => {
    const wasLiked = likedMovies[movieId]; //Captures the state before calling toggleLike
    await toggleLike(movieId);

    // If the movie was liked and is now unliked, it will remove it from watchlistMovies
    if (wasLiked) {
      setWatchlistMovies((prev) =>
        prev.filter((movie) => movie.movieId !== movieId)
      );
    }
  };

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
          movies={watchlistMovies}
          likedMovies={likedMovies}
          toggleLike={handleToggleLike}
        />
      </div>
    </div>
  );
};

export default WatchlistPage;
