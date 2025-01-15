import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardList from "../components/Cardlist";

const WatchlistPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState({});

  useEffect(() => {
    // Retrieve user info from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);

    if (loggedInUser) {
      fetchWatchlist(loggedInUser.userId);
    }
  }, []);

  const fetchWatchlist = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/watchlists?userId=${userId}`
      );
      const data = await response.json();

      if (data?.data) {
        const liked = {};
        const movies = data.data.map((entry) => {
          liked[entry.movieId] = true;
          return entry.movie;
        });

        setWatchlistMovies(movies);
        setLikedMovies(liked);
      } else {
        console.error("No watchlist data found.");
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); //Clears user info on sign out
    window.location.href = "/";
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleLike = async (movieId) => {
    const isLiked = likedMovies[movieId];

    try {
      const url = isLiked
        ? `http://localhost:8080/api/watchlists/remove`
        : `http://localhost:8080/api/watchlists/add`;

      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId: user.userId, movieId }),
      });

      if (response.ok) {
        if (isLiked) {
          // Remove from the watchlist
          setWatchlistMovies((prev) =>
            prev.filter((movie) => movie.movieId !== movieId)
          );
        } else {
          //  fetch the updated watchlist
          fetchWatchlist(user.userId);
        }

        setLikedMovies((prev) => ({
          ...prev,
          [movieId]: !isLiked,
        }));
      } else {
        console.error("Failed to update watchlist.");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
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
        <CardList
          searchQuery={searchQuery}
          movies={watchlistMovies}
          likedMovies={likedMovies}
          toggleLike={toggleLike}
        />
      </div>
    </div>
  );
};

export default WatchlistPage;
