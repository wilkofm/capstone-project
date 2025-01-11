import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login succesful:", data);

        // Save user info in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        navigate("/home"); //Redirect to HomePage on success
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Incorrect login details");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={handleChange}
        className="mb-2 px-4 py-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-2 px-4 py-2 border rounded"
      />

      <div className="flex space-x-4">
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-customBlue hover:bg-customHoverBlue rounded"
        >
          Log In
        </button>
        <Link to="/create-account">
          <button className="mt-2 px-4 py-2 bg-customBlue hover:bg-customHoverBlue rounded">
            Create Account
          </button>
        </Link>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;
