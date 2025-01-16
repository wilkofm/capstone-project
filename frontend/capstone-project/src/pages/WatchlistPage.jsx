import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const WatchlistPage = ({ user, likedMovies, toggleLike, setUser }) => {
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
          movies={watchlistMovies}
          likedMovies={likedMovies}
          toggleLike={handleToggleLike}
        />
      </div>
    </div>
  );
};

export default WatchlistPage;
