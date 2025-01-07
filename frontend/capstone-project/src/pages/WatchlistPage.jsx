import React from "react";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  return (
    <div>
      <h1>Watchlist Page</h1>
      <Link to="/home">
        <button>Go to Home</button>
        {/* add watchlist functionality here */}
      </Link>
    </div>
  );
};

export default WatchlistPage;
