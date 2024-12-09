import React, { useState } from "react";

const Details: React.FC = () => {
  const [systemName, setSystemName] = useState<string>("Admin Portal");
  const [systemVersion, setSystemVersion] = useState<string>("v1.0.0");

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">System Details</h2>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">System Name</label>
        <input
          type="text"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          placeholder="Enter system name"
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">Version</label>
        <input
          type="text"
          value={systemVersion}
          onChange={(e) => setSystemVersion(e.target.value)}
          placeholder="Enter system version"
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
      </div>

      <button className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
        Save Details
      </button>
    </div>
  );
};

export default Details;
