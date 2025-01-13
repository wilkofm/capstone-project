import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import starFilled from "@iconify-icons/mdi/star";
import starOutline from "@iconify-icons/mdi/star-outline";

const PopUpWindow = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = loggedInUser ? loggedInUser.userId : null;

  // Fetch movie details and reviews
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/${movieId}`
        );
        const data = await response.json();
        setMovie(data.movie);
        setReviews(data.reviews || []);
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
        const newReview = await response.json();
        setReviews((prev) => [newReview, ...prev]);
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
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl flex">
        {/* Movie details */}
        <div className="w-1/2 pr-4">
          <img
            src={movie.poster}
            alt={movie.movieTitle}
            className="w-full rounded-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{movie.movieTitle}</h2>
          <p>{movie.year}</p>
          <p> Rating: {movie.imdbRating}</p>
          <p> Director: {movie.director}</p>
          <p> Cast: {movie.cast}</p>
          <p className="mt-2">{movie.description}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.open(movie.trailer, "_blank")}
          >
            Watch Trailer
          </button>

          {/* Reviews */}
          <h3 className="text-xl font-bold mt-6">Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mt-2">
                <p>
                  <strong>User {review.userId}:</strong> {review.review}
                </p>
                <div className="flex">
                  {[...Array(10)].map((_, index) => (
                    <Icon
                      key={index}
                      icon={index < review.rating ? starFilled : starOutline}
                      className="text-customGold"
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Review form */}
        <div className="w-1/2 pl-4">
          <h3 className="text-xl font-bold">Leave A Review</h3>
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
            className="mt-4 w-full p-2 border rounded"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            className="mt-4 px-4 py-2 bg-customBlue text-white rounded"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={onClose}
        >
          &times
        </button>
      </div>
    </div>
  );
};

export default PopUpWindow;
