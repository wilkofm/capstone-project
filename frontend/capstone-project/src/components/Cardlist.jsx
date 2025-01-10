import React, { useEffect, useState } from "react";

const CardList = () => {
  const [movies, setMovies] = useState([]);

  // Fetch movies from backend
  useEffect(() => {
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
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.movieId}
          className="relative group overflow-hidden shadow-md rounded-lg"
        >
          {/* Movie Poster */}
          <img
            src={movie.poster}
            alt={movie.movieTitle}
            className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-200"
          />

          {/* Hover content */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 bg-opacity-80 text-white p-4">
            <h3 className="text-lg font-bold">{movie.movieTitle}</h3>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <p>Rating: {movie.imdbRating}</p>
            <p>Director: {movie.director}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
