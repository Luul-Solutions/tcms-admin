import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, School, FileText, Bell, Settings } from "lucide-react"; // Import the Settings icon from Lucide React

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-6 rounded-r-3xl shadow-lg flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h1 className="text-3xl font-bold mb-12 text-center">Admin Portal</h1>
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-700 text-blue-300 shadow-md"
                    : "hover:bg-blue-700 hover:text-blue-300"
                }`
              }
            >
              <Home className="w-6 h-6" />
              <span className="text-lg">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/:userName"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-700 text-blue-300 shadow-md"
                    : "hover:bg-blue-700 hover:text-blue-300"
                }`
              }
            >
              <Users className="w-6 h-6" />
              <span className="text-lg">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school/:schoolName"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-700 text-blue-300 shadow-md"
                    : "hover:bg-blue-700 hover:text-blue-300"
                }`
              }
            >
              <School className="w-6 h-6" />
              <span className="text-lg">Schools</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/report/:reportTitle"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-700 text-blue-300 shadow-md"
                    : "hover:bg-blue-700 hover:text-blue-300"
                }`
              }
            >
              <FileText className="w-6 h-6" />
              <span className="text-lg">Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-700 text-blue-300 shadow-md"
                    : "hover:bg-blue-700 hover:text-blue-300"
                }`
              }
            >
              <Bell className="w-6 h-6" />
              <span className="text-lg">Notifications</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-700 text-blue-300 shadow-md"
                : "hover:bg-blue-700 hover:text-blue-300"
            }`
          }
        >
          <Settings className="w-6 h-6" />
          <span className="text-lg">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
