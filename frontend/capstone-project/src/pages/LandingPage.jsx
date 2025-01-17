import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import logo from "../images/cinemax-universal-blue-logo.png";

const LandingPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); //replace with API call to backend
  };

  return (
    <div className="border border-customForeground p-6 rounded-lg shadow-md bg-gray-800 max-w-sm mx-auto flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="w-72" />
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default LandingPage;
