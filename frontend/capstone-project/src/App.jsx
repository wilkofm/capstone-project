import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";
import CreateAccountForm from "./components/CreateAccountForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [likedMovies, setLikedMovies] = useState({});

  useEffect(() => {
    // Retrieve user info from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);

    if (loggedInUser) {
      fetchLikedMovies(loggedInUser.userId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchLikedMovies(user.userId);
    }
  }, [user]);

  const fetchLikedMovies = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/watchlists?userId=${userId}`
      );
      const data = await response.json();

      if (data?.data) {
        const liked = {};
        data.data.forEach((entry) => {
          liked[entry.movieId] = true;
        });
        console.log("Fetched liked movies:", liked);
        setLikedMovies(liked);
      } else {
        console.error("No watchlist data found");
      }
    } catch (error) {
      console.error("Failed to fetch liked movies:", error);
    }
  };

  const toggleLike = async (movieId) => {
    const isLiked = likedMovies[movieId];

    try {
      const url = isLiked
        ? `http://localhost:8080/api/watchlists/${user.userId}/${movieId}`
        : `http://localhost:8080/api/watchlists/add`;

      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: !isLiked
          ? JSON.stringify({ userId: user.userId, movieId })
          : null,
      });

      if (response.ok) {
        setLikedMovies((prev) => ({
          ...prev,
          [movieId]: !isLiked,
        }));
        console.log(
          `Movie ID ${movieId} ${
            isLiked ? "removed from" : "added to"
          } watchlist`
        );
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setUser={setUser} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <HomePage
                user={user}
                likedMovies={likedMovies}
                toggleLike={toggleLike}
                setUser={setUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mylist"
          element={
            <ProtectedRoute user={user}>
              <WatchlistPage
                user={user}
                likedMovies={likedMovies}
                toggleLike={toggleLike}
                setUser={setUser}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/create-account" element={<CreateAccountForm />} />
      </Routes>
    </Router>
  );
}

export default App;
