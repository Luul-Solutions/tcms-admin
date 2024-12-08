import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, School, FileText, Bell, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-6 rounded-r-3xl shadow-lg overflow-y-auto flex flex-col">
      {/* Logo with matching background color */}
      <div className="flex justify-center mb-8 bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-full">
        <img
          src="public/logo icon.png" // Update this path to the correct location where the logo is stored
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
              isActive
                ? "bg-blue-700 text-blue-300 shadow-md"
                : "hover:bg-blue-700 hover:text-blue-300"
            }`
          }
        >
          <Settings className="w-6 h-6" />
          <span className="text-lg font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
