import React, { Dispatch, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  School,
  FileText,
  Bell,
  Settings,
  PoundSterlingIcon,
  User,
  Lock,
  Info,
  Sliders,
  Users as TeamIcon,
} from "lucide-react";

interface SidebarProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setAuth }: SidebarProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-6 rounded-r-3xl shadow-lg overflow-hidden flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mb-8 bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-full">
        <img
          src="/logo icon.png"
          alt="Admin Portal Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Main Sidebar Links */}
      {[
        { name: "Dashboard", to: "/", icon: <Home className="w-6 h-6" /> },
        {
          name: "Users",
          to: "/users",
          icon: <Users className="w-6 h-6" />,
        },
        {
          name: "Schools",
          to: "/schools",
          icon: <School className="w-6 h-6" />,
        },
        {
          name: "Reports",
          to: "/reports",
          icon: <FileText className="w-6 h-6" />,
        },
        {
          name: "Notifications",
          to: "/notifications",
          icon: <Bell className="w-6 h-6" />,
        },
        {
          name: "Transactions",
          to: "/transactions",
          icon: <PoundSterlingIcon className="w-6 h-6" />,
        },
      ].map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center space-x-4 p-3 m-1.5 rounded-lg transition-transform hover:scale-105 ${
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

      {/* Settings Section */}
      <div className="relative mt-4">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700"
        >
          <Settings className="w-6 h-6" />
          <span>Settings</span>
        </button>

        {isSettingsOpen && (
          <div className="bg-blue-900 rounded-lg shadow-lg mt-1 p-4">
            {[
              {
                name: "Profile",
                to: "/settings/profile",
                icon: <User className="w-5 h-5" />,
              },
              {
                name: "Password",
                to: "/settings/password",
                icon: <Lock className="w-5 h-5" />,
              },
              {
                name: "Team",
                to: "/settings/team",
                icon: <TeamIcon className="w-5 h-5" />,
              },
              {
                name: "Details",
                to: "/settings/details",
                icon: <Info className="w-5 h-5" />,
              },
              {
                name: "Appearance",
                to: "/settings/appearance",
                icon: <Sliders className="w-5 h-5" />,
              },
            ].map((submenu) => (
              <NavLink
                key={submenu.name}
                to={submenu.to}
                className={({ isActive }) =>
                  `block rounded-lg mt-1 py-2 px-3 transition-transform ${
                    isActive ? "bg-blue-800 shadow-md" : "hover:bg-blue-700"
                  }`
                }
              >
                {submenu.icon}
                <span>{submenu.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setAuth(false)}
        className="mt-6 w-full p-3 rounded-lg bg-blue-500 text-white font-medium shadow-lg hover:bg-blue-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
