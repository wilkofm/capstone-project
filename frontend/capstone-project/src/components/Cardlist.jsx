import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import heartOutline from "@iconify-icons/mdi/heart-outline";
import heartFilled from "@iconify-icons/mdi/heart";
import PopUpWindow from "./PopupWindow";
import popcornIcon from "@iconify-icons/mdi/popcorn";

const CardList = ({
  searchQuery,
  movies: moviesProp,
  likedMovies,
  toggleLike,
}) => {
  const [movies, setMovies] = useState([]);
  const [localLikedMovies, setLocalLikedMovies] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = loggedInUser ? loggedInUser.userId : null;

  // Fetch movies from backend
  useEffect(() => {
    if (moviesProp) {
      setMovies(moviesProp);
    } else {
      const fetchMovies = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/movies");
          const data = await response.json();
          setMovies(data.data || []);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      };

      fetchMovies();
    }
  }, [moviesProp]);

  useEffect(() => {
    if (likedMovies) {
      console.log("Syncing likedMovies to local state:", likedMovies);
      setLocalLikedMovies(likedMovies);
    }
  }, [likedMovies]);

  const likedMoviesState = likedMovies || localLikedMovies || {};
  console.log("Movies in Cardlist:", movies);
  console.log("Liked Movies State:", likedMoviesState);

  const handleToggleLike =
    toggleLike ||
    (async (movieId) => {
      if (!userId) {
        console.error("userId not found in localStorage");
        return;
      }

      const isLiked = likedMoviesState[movieId];
      const url = isLiked
        ? `http://localhost:8080/api/watchlists/remove`
        : `http://localhost:8080/api/watchlists/add`;

      const method = isLiked ? "DELETE" : "POST";

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-type": "application/json " },
          body: JSON.stringify({ userId, movieId }),
        });

        if (response.ok) {
          setLocalLikedMovies((prev) => ({
            ...prev,
            [movieId]: !isLiked,
          }));
        } else {
          console.error("Failed to update watchlist");
        }
      } catch (error) {
        console.error("Error updating watchlist:", error);
      }
    });

  //Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.movieTitle?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  filteredMovies.forEach((movie) => {
    console.log(
      `Movie ID: ${movie.movieId}, Liked: ${
        likedMoviesState[movie.movieId] ? "Yes" : "No"
      }`
    );
  });

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.movieId}
            className="relative group cursor-pointer overflow-hidden shadow-md rounded-lg"
            onClick={() => {
              console.log("Selected movieId:", movie.movieId);
              setSelectedMovieId(movie.movieId);
            }}
          >
            {/* Movie Poster */}
            <img
              src={movie.poster}
              alt={movie.movieTitle}
              className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-200"
            />

            {/* Hover content */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-customInputGray bg-opacity-70 text-white sm:p-4 text-left">
              <h3 className="text-sm sm:text-lg font-bold">
                {movie.movieTitle}
              </h3>
              <p className="text-xs sm:text-sm">{movie.genre}</p>
              <p className="text-xs sm:text-sm">{movie.year}</p>
              <p className="text-sm flex items-center space-x-1">
                <Icon icon={popcornIcon} className="text-lg text-customGold" />
                <span>{movie.imdbRating}</span>
              </p>
              <p className="text-xs sm:text-sm">Director: {movie.director}</p>

              <div className="absolute bottom-2 left-2">
                <Icon
                  icon={
                    likedMoviesState[movie.movieId] ? heartFilled : heartOutline
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(movie.movieId);
                  }}
                  className="text-customGold text-xl sm:text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovieId && (
        <PopUpWindow
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          likedMovies={likedMovies}
          toggleLike={toggleLike}
        />
      )}
    </div>
  );
};

export default CardList;
