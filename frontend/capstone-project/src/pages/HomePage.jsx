import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/mylist">
        <button>Go to My List</button>
      </Link>
      {/* add components such as Navbar and MovieCardList here */}
    </div>
  );
};

export default HomePage;
