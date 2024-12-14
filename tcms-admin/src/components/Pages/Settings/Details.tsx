import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

const Details: React.FC = () => {
  const [systemName, setSystemName] = useState<string>("Admin Portal");
  const [systemVersion, setSystemVersion] = useState<string>("v1.0.0");
  const [message, setMessage] = useState<string>("");

  const handleSaveDetails = () => {
    setMessage("System details updated successfully!");
    // Temporary storage example
    localStorage.setItem("systemName", systemName);
    localStorage.setItem("systemVersion", systemVersion);
  };

  /*
  // Commented out backend integration for future use

  const saveSystemDetails = async () => {
    try {
      await axios.post("https://api.example.com/system-details", {
        systemName,
        systemVersion,
      });
      setMessage("Details saved to the server successfully!");
    } catch (error) {
      console.error("Failed to save system details:", error);
      setMessage("Failed to save system details.");
    }
  };
  */

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">System Details</h2>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">System Name</label>
        <input
          type="text"
          placeholder="Enter system name"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">Version</label>
        <input
          type="text"
          placeholder="Enter system version"
          value={systemVersion}
          onChange={(e) => setSystemVersion(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      {message && <p className="mt-2 text-green-500">{message}</p>}

      <button
        onClick={handleSaveDetails}
        className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save Details
      </button>

      {/* Future backend integration */}
      {/*
      <button
        onClick={saveSystemDetails}
        className="mt-4 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
      >
        Save to Server
      </button>
      */}
    </div>
  );
};

export default Details;
