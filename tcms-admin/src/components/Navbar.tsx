import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white py-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <ul className="flex space-x-4">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Users</li>
          <li className="hover:text-gray-300 cursor-pointer">Schools</li>
          <li className="hover:text-gray-300 cursor-pointer">Settings</li>
          <li className="hover:text-gray-300 cursor-pointer">Reports</li>
          <li className="hover:text-gray-300 cursor-pointer">Notifications</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
