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
    <div className="flex items-center justify-center">
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default LandingPage;
