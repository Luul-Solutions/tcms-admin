import React from "react";

const Settings: React.FC = () => {
  return (
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
      </div>
    </div>
  );
};

export default Settings;
