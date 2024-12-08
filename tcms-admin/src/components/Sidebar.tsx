import React from "react";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
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
=======
import { Home, Users, School, FileText, Bell, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-6 rounded-r-3xl shadow-lg overflow-y-auto flex flex-col">
      {/* Logo with matching background color */}
      <div className="flex justify-center mb-8 bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-full">
        <img
          src="Public/logo icon.png" // Update this path to the correct location where the logo is stored
          alt="Admin Portal Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold mb-12 text-center">TCMS</h1>

      {/* Main Sidebar Links */}
      <nav className="flex-1 flex flex-col space-y-4">
        {[
          { name: "Dashboard", to: "/", icon: <Home className="w-6 h-6" /> },
          {
            name: "Users",
            to: "/user/:userName",
            icon: <Users className="w-6 h-6" />,
          },
          {
            name: "Schools",
            to: "/school/:schoolName",
            icon: <School className="w-6 h-6" />,
          },
          {
            name: "Reports",
            to: "/report/:reportTitle",
            icon: <FileText className="w-6 h-6" />,
          },
          {
            name: "Notifications",
            to: "/notifications",
            icon: <Bell className="w-6 h-6" />,
          },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-4 p-3 rounded-lg transition-transform hover:scale-105 ${
                isActive
                  ? "bg-blue-700 text-blue-300 shadow-md"
                  : "hover:bg-blue-700 hover:text-blue-300"
              }`
            }
          >
            {item.icon}
            <span className="text-lg font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Push "Settings" to the Bottom */}
      <div className="mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 rounded-lg transition-transform hover:scale-105 ${
>>>>>>> 4e17393 ( some changes to dashboard)
              isActive
                ? "bg-blue-700 text-blue-300 shadow-md"
                : "hover:bg-blue-700 hover:text-blue-300"
            }`
          }
        >
          <Settings className="w-6 h-6" />
<<<<<<< HEAD
          <span className="text-lg">Settings</span>
=======
          <span className="text-lg font-medium">Settings</span>
>>>>>>> 4e17393 ( some changes to dashboard)
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
