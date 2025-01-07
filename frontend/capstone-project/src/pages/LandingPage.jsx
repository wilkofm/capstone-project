import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); //replace with API call to backend
  };

  return (
    <div>
      <h1>CineMax</h1>
      <Link to="/home">
        <button>Go to Home</button>
      </Link>
      <br />
      <Link to="/mylist">
        <button>Go to My List</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
      <button>Create Account</button>
    </div>
  );
};

export default LandingPage;
