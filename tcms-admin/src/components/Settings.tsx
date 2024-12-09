import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Lock,
  Settings as LucideSettings,
  Users,
  Info,
  Sliders,
} from "lucide-react";

const AdminSettings: React.FC = () => {
  return (
    <div className="flex mt-6">
      {/* Sub-sidebar */}
      <div className="w-1/4 bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

        {[
          {
            name: "My Profile",
            to: "/settings/profile",
            icon: <User className="w-6 h-6" />,
          },
          {
            name: "Password",
            to: "/settings/password",
            icon: <Lock className="w-6 h-6" />,
          },
          {
            name: "Team",
            to: "/settings/team",
            icon: <Users className="w-6 h-6" />,
          },
          {
            name: "Details",
            to: "/settings/details",
            icon: <Info className="w-6 h-6" />,
          },
          {
            name: "Appearance",
            to: "/settings/appearance",
            icon: <Sliders className="w-6 h-6" />,
          },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-4 rounded-lg p-2 mt-2 transition-all duration-300 hover:bg-blue-700 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:text-blue-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-6 bg-gray-50 rounded-lg shadow-lg ml-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSettings;
