import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import logo from "../images/cinemax-universal-blue-logo.png";

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="w-72" />
      <LoginForm />
      <Link to="/create-account">
        <button className="mt-4 px-4 py-2 bg-customBlue hover:bg-blue-600 rounded">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
