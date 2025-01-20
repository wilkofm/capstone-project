import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import logo from "../images/cinemax-universal-blue-logo.png";

const LandingPage = ({ setUser }) => {
  return (
    <div className="flex items-center justify-center">
      <LoginForm setUser={setUser} />
    </div>
  );
};

export default LandingPage;
