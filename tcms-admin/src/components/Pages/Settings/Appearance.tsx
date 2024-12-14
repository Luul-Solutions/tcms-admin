import React, { useState } from "react";

const Appearance: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const [sidebarColor, setSidebarColor] = useState<string>("#1E3A8A");
  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    "from-blue-900 to-blue-800",
  );
  const [textColor, setTextColor] = useState<string>("text-gray-900");

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Appearance</h2>

      {/* Theme Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Theme</h3>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Sidebar Color */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Sidebar Color</h3>
        <input
          type="color"
          value={sidebarColor}
          onChange={(e) => setSidebarColor(e.target.value)}
          className="w-full mt-2 rounded-lg"
        />
      </div>

      {/* Background Gradient Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">
          Background Gradient
        </h3>
        <select
          value={backgroundGradient}
          onChange={(e) => setBackgroundGradient(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        >
          <option value="from-blue-900 to-blue-800">Blue Gradient</option>
          <option value="from-green-400 to-blue-500">Green to Blue</option>
          <option value="from-yellow-400 to-red-500">Warm Gradient</option>
        </select>
      </div>

      {/* Text Color */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Text Color</h3>
        <select
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        >
          <option value="text-gray-900">Default</option>
          <option value="text-gray-50">Light Text</option>
          <option value="text-blue-800">Blue Text</option>
        </select>
      </div>

      {/* Preview Area */}
      <div
        className={`mt-6 p-4 rounded-lg shadow-md ${backgroundGradient}`}
        style={{ color: textColor }}
      >
        <h4 className="text-xl font-bold">Preview</h4>
        <p>
          This is a preview area where you can see the changes applied to the
          interface.
        </p>
        <p>Customize everything according to your preference!</p>
      </div>
    </div>
  );
};

export default Appearance;
