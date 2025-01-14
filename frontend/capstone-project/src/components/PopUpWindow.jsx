import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import starFilled from "@iconify-icons/mdi/star";
import starOutline from "@iconify-icons/mdi/star-outline";
import playCircleIcon from "@iconify-icons/mdi/play-circle";
import closeIcon from "@iconify-icons/mdi/close";
import popcornIcon from "@iconify-icons/mdi/popcorn";
import heartFilled from "@iconify-icons/mdi/heart";
import heartOutline from "@iconify-icons/mdi/heart-outline";

const PopUpWindow = ({ movieId, onClose, likedMovies, toggleLike }) => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = loggedInUser ? loggedInUser.userId : null;

  // Fetch movie details and reviews
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        console.error("Invalid movieId");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/${movieId}`
        );
        const data = await response.json();

        if (data?.data) {
          setMovie(data.data || {});
          setReviews(data.data.reviews || []);
        } else {
          console.error("Movie data not found in API response");
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Handle star rating selection
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  // Submit review
  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      alert("Please provide both a rating and review.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/reviews/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          movieId,
          rating,
          review: reviewText,
        }),
      });

      if (response.ok) {
        const updatedMovieResponse = await fetch(
          `http://localhost:8080/api/movies/${movieId}`
        );

        const updatedMovieData = await updatedMovieResponse.json();

        if (updatedMovieData?.data) {
          setMovie(updatedMovieData.data || {});
          setReviews(updatedMovieData.data.reviews || []);
        } else {
          console.error("Failed to fetch updated movie details.");
        }

        setRating(0);
        setReviewText("");
      } else {
        console.error("Failed to submit review:", error);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-customForeground rounded-lg p-6 w-full max-w-[90vw] md:max-w-4xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] text-white">
        {/* Movie details */}
        <div className="w-full m:w-1/2 pr-4 overflow-y-auto">
          <div className="flex items-start space-x-4">
            <img
              src={movie.poster}
              alt={movie.movieTitle}
              className="w-1/2 rounded-lg"
            />
            <div className="space-y-2 text-left">
              <h2 className="text-2xl font-bold">{movie.movieTitle}</h2>
              <p>{movie.year}</p>
              <p className="text-sm flex items-center space-x-1">
                <Icon icon={popcornIcon} className="text-lg text-customGold" />
                <span>{movie.imdbRating}</span>
              </p>
              <p className="text-sm"> Director: {movie.director}</p>
              <p className="text-sm"> Cast: {movie.cast}</p>
              <p className="text-sm mt-2">{movie.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-customInputGray text-white hover:text-customGold rounded-full flex items-center space-x-2"
                onClick={() => window.open(movie.trailer, "_blank")}
              >
                <Icon icon={playCircleIcon} className="text-xl sm:text-2xl" />
                <span className="hidden sm:inline">Trailer</span>
              </button>

              {/* Toggle Like button */}
              <div className="mt-4 flex items-center space-x-2">
                <Icon
                  icon={likedMovies[movie.movieId] ? heartFilled : heartOutline}
                  onClick={() => toggleLike(movie.movieId)}
                  className="text-customGold text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
                />
                <span className="text-sm">
                  {likedMovies[movie.movieId]
                    ? "Added to Watchlist"
                    : "Add to Watchlist"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 pl-4 overflow-y-auto">
          {/* Review form */}
          <h3 className="text-xl font-bold text-left">Leave A Review</h3>
          <div className="flex mt-4">
            {[...Array(10)].map((_, index) => (
              <Icon
                key={index}
                icon={index < rating ? starFilled : starOutline}
                className="text-customGold cursor-pointer"
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
          <textarea
            className="mt-4 w-full p-2 text-sm border rounded"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <div className="flex flex-col items-start">
            <button
              className="mt-1 px-4 py-2 bg-customBlue text-white hover:text-customGold text-sm rounded-full"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>

          {/* Reviews */}
          <h3 className="text-xl font-bold mt-6 text-left">Reviews</h3>
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li key={index} className="mt-4">
                  <div className="flex justify-between items-center">
                    <strong className="text-sm">
                      {review.user?.userName || `User ${review.userId}`}
                    </strong>
                    <div className="flex">
                      {[...Array(10)].map((_, idx) => (
                        <Icon
                          key={idx}
                          icon={idx < review.rating ? starFilled : starOutline}
                          className="text-customGold"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-left">{review.review}</p>
                </li>
              ))
            ) : (
              <p className="text-left text-sm mt-2">
                No reviews for this movie.
              </p>
            )}
          </ul>
        </div>

        <button
          className="absolute top-4 right-4 text-xl font-bold rounded-full"
          onClick={onClose}
        >
          <Icon icon={closeIcon} className="text-xl hover:text-customGold" />
        </button>
      </div>
    </div>
  );
};

export default PopUpWindow;
