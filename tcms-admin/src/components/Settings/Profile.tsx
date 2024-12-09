import React, { useState } from "react";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [username, setUsername] = useState<string>("johndoe123");
  const [profilePic, setProfilePic] = useState<string>("/default-profile.png");

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

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

      {/* Profile Picture Section */}
      <div className="mb-4 flex items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
