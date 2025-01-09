import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
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
        console.log("Account created succesfully:", data);
        navigate("/home"); //directs to HomePage
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="border border-customForeground p-6 rounded-lg shadow-md bg-gray-800 max-w-sm mx-auto flex flex-col items-center justify-center">
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
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
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

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-bold text-white">
            Select an Avatar
          </h3>
          <div className="flex space-x-4">
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

        <button
          type="submit"
          className="px-4 py-2 bg-customBlue hover:bg-customHoverBlue rounded text-white"
        >
          Create Account
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreateAccountForm;
