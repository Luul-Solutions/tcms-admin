import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [username, setUsername] = useState<string>("johndoe123");
  const [profilePic, setProfilePic] = useState<string>("/default-profile.png");
  const [message, setMessage] = useState<string>("");

  const handleSaveProfile = () => {
    setMessage("Profile updated locally!");

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
  };

  /*
  // Commented out backend integration for later use

  const saveProfileToServer = async () => {
    try {
      const response = await axios.post("https://api.example.com/user-profile", {
        name,
        email,
        username,
        profilePic,
      });

      if (response.status === 200) {
        setMessage("Profile updated on the server!");
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      setMessage("Failed to update profile.");
    }
  };
  */

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">User Profile</h2>

      {/* Profile Picture */}
      <div className="mb-4 flex items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="ml-4 bg-gray-100 rounded-lg p-2"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="font-semibold text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="font-semibold text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="font-semibold text-gray-700">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      {message && <p className="mt-2 text-red-500">{message}</p>}

      <button
        onClick={handleSaveProfile}
        className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save Profile
      </button>

      {/*
      <button
        onClick={saveProfileToServer}
        className="mt-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
      >
        Save to Server
      </button>
      */}
    </div>
  );
};

export default Profile;
