import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">CineMax</h1>
      <Link to="/home">
        <button>Go to Home</button>
      </Link>
      <br />
      <Link to="/mylist">
        <button>Go to My List</button>
      </Link>
      <LoginForm />
      <Link to="/create-account">
        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
