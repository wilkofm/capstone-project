import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import logo from "../images/cinemax-universal-blue-logo.png";

const LoginForm = ({ setUser }) => {
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
        setUser(data.user);
        navigate("/home"); //Redirect to HomePage on success
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError(errorData.message || "Incorrect login details");
      }
    } catch (err) {
      console.error("Network or other error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-sm h-[440px] flex flex-col justify-between border border-gray-500 rounded-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src={logo} alt="CineMax Logo" className="w-72 h-auto" />
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-sm text-gray-200">
            Enter your details below to log in
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userName" className="text-left">
                  Username
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Your username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="text-sm border border-gray-500 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-left">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="text-sm border border-gray-500 rounded-md"
                />
              </div>
              <Button
                type="submit"
                className="w-full text-sm hover:text-customGold"
              >
                Log In
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="mt-4 text-center text-sm">
              Dont&apos;t have an account?{" "}
              <Link to="/create-account" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
