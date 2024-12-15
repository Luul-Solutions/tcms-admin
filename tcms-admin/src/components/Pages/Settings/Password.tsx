import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

const Password: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("Password updated successfully!");
      // For now, store it in localStorage (temporary solution)
      localStorage.setItem("newPassword", newPassword);
    }
  };

  /*
  // Commented out backend integration for later use

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await axios.post("https://api.example.com/update-password", {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Password updated successfully!");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      setMessage("Password update failed. Please try again.");
    }
  };

  const handleBackendChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      updatePassword(currentPassword, newPassword);
    }
  };
  */

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-100"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-100"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mt-2 p-2 rounded-lg bg-gray-100"
      />

      {message && <p className="mt-2 text-red-500">{message}</p>}

      {/* Save Password Button */}
      <button
        onClick={handleChangePassword}
        className="mt-4 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
      >
        Save Password
      </button>

      {/* Future backend integration button */}
      {/*
      <button
        onClick={handleBackendChangePassword}
        className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save to Server
      </button>
      */}
    </div>
  );
};

export default Password;
