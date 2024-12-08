import React from "react";

const Settings: React.FC = () => {
  return (
<<<<<<< HEAD
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Settings
        </h2>

        {/* Profile Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Profile Information
          </h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
              Save Changes
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Change Password
          </h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="current-password" className="block text-gray-600 mb-1">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-gray-600 mb-1">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
              Update Password
            </button>
          </form>
        </div>

        {/* Preferences Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Application Preferences
          </h3>
          <form className="space-y-6">
            <div className="flex items-center space-x-4">
              <input
                id="notifications"
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
              />
              <label htmlFor="notifications" className="text-gray-700">
                Enable Notifications
              </label>
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
              Save Preferences
            </button>
          </form>
        </div>
=======
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="font-medium text-gray-700">Theme</label>
          <select className="ml-4 p-2 rounded border">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Notifications</label>
          <input type="checkbox" className="ml-4" />
          Enable Email Notifications
        </div>

        <div>
          <label className="font-medium text-gray-700">Language</label>
          <select className="ml-4 p-2 rounded border">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Save Changes
        </button>
>>>>>>> 4e17393 ( some changes to dashboard)
      </div>
    </div>
  );
};

export default Settings;
