import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateAccountForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatarUrl) => {
    setFormData({ ...formData, avatar: avatarUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form fields
    if (!formData.userName.trim()) {
      setError("Username is required");
      return;
    }
    if (!formData.emailId.trim()) {
      setError("Email is required");
      return;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }
    if (!formData.avatar) {
      setError("Please select an avatar");
      return;
    }

    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Full API Response:", data);

        const user = data.data;
        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          console.log(
            "User stored in localStorage:",
            localStorage.getItem("LoggedInUser")
          );
          setUser(user);
          navigate("/home"); //directs to HomePage
        } else {
          console.error("User data missing from API response");
          setError("Failed to create account. Please try again.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full max-w-sm h-[440px] flex flex-col justify-between border border-gray-500 rounded-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src={logo} alt="CineMax Logo" className="w-72 h-auto" />
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription className="text-sm text-gray-100">
            Fill in the fields below to sign up
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
                  placeholder="Choose a username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="text-sm border border-gray-500 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailId" className="text-left">
                  Email
                </Label>
                <Input
                  id="emailId"
                  name="emailId"
                  type="email"
                  placeholder="Your email"
                  value={formData.emailId}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="text-sm border border-gray-500 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label>Choose an Avatar</Label>
                <div className="flex space-x-2">
                  {[
                    "https://i.pinimg.com/564x/6c/ef/b4/6cefb4fdc44d7d9bfb2ab40a33ff1fed.jpg",
                    "https://i.pinimg.com/564x/53/fd/19/53fd19f9155a544f8460ac45ed84645b.jpg",
                    "https://i.pinimg.com/564x/08/d0/b4/08d0b43663283f5bef12e7688b035170.jpg",
                    "https://i.pinimg.com/originals/f6/aa/24/f6aa2407d3ca6532e0304d6cd0e9291d.jpg",
                  ].map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Avatar"
                      onClick={() => handleAvatarSelect(url)}
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                        formData.avatar === url
                          ? "border-customBlue"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-sm hover:text-customGold"
              >
                Create Account
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAccountForm;
