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

  // Define main navigation items
  const mainNavItems = [
    { name: "Dashboard", to: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Users", to: "/users", icon: <Users className="w-6 h-6" /> },
    { name: "Schools", to: "/schools", icon: <School className="w-6 h-6" /> },
    { name: "Reports", to: "/reports", icon: <FileText className="w-6 h-6" /> },
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
  ];

  // Define settings submenu items
  const settingsSubItems = [
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
  ];

  // Close submenu when an item is clicked
  const handleSubmenuItemClick = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex">
      {/* Main Sidebar */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-6 rounded-r-3xl shadow-lg flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-8 bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-full">
          <img
            src="/logo icon.png"
            alt="Admin Portal Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Main Sidebar Links */}
        {mainNavItems.map((item) => (
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

        {/* Spacer to push Settings to the bottom */}
        <div className="flex-grow"></div>

        {/* Settings Section (Positioned at the Bottom) */}
        <div className="relative">
          {/* Button with hover effect */}
          <button
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)} // Toggle settings menu
          >
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("user"); // Clear authentication state
            setAuth(false); // Update parent state to logout user

            // Placeholder for backend logout logic
            {
              /*
            fetch('/api/logout', {
              method: 'POST',
              credentials: 'include',
            })
              .then(response => response.ok ? setAuth(false) : console.error('Logout failed'))
              .catch(error => console.error('Logout error:', error));
            */
            }
          }}
          className="mt-6 w-full p-3 rounded-lg bg-white text-black font-medium shadow-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Settings Submenu (Appears as a Sub Sidebar next to the Main Sidebar) */}
      {isSettingsOpen && (
        <div
          className="bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64 h-screen p-4 shadow-lg absolute top-0 left-64 z-30 rounded-l-3xl"
          style={{ top: 0, left: 0 }}
        >
          <div className="flex flex-col">
            {settingsSubItems.map((submenu) => (
              <NavLink
                key={submenu.name}
                to={submenu.to}
                onClick={handleSubmenuItemClick} // Close on click
                className={({ isActive }) =>
                  `flex items-center space-x-4 py-2 px-3 rounded-lg transition-transform ${
                    isActive ? "bg-blue-900 shadow-md" : "hover:bg-blue-700"
                  }`
                }
              >
                {submenu.icon}
                <span>{submenu.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
