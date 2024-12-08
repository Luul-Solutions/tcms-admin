import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const cards = [
    { title: "Schools", info: "5 Active Schools" },
    { title: "Users", info: "20 Active Users" },
    { title: "Reports", info: "10 Pending Reports" },
    { title: "Notifications", info: "5 New Alerts" },
  ];

  // State to track visibility of each panel
  const [showSchools, setShowSchools] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showReports, setShowReports] = useState(false);

  return (
<<<<<<< HEAD
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
      {/* Schools Panel */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Schools Panel</h3>
        <button
          onClick={() => setShowSchools(!showSchools)}
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          {showSchools ? "Hide Details" : "View Details"}
        </button>
        {showSchools && (
          <div className="space-y-4 mt-4">
            {schools.map((school, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h4 className="text-xl font-semibold">{school.name}</h4>
                <p className="text-gray-600">Status: {school.status}</p>
                <p className="text-gray-600">Admin: {school.admin}</p>
                <p className="text-gray-600">Contact: {school.contact}</p>
                <Link
                  to={`/school/${school.name}`}
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Management Panel */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          User Management Panel
        </h3>
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          {showUsers ? "Hide Details" : "View Details"}
        </button>
        {showUsers && (
          <div className="space-y-4 mt-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h4 className="text-xl font-semibold">{user.name}</h4>
                <p className="text-gray-600">Role: {user.role}</p>
                <p className="text-gray-600">Status: {user.status}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/user/${user.name}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700">
                    Deactivate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reports Panel */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Reports Panel</h3>
        <button
          onClick={() => setShowReports(!showReports)}
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          {showReports ? "Hide Details" : "View Details"}
        </button>
        {showReports && (
          <div className="space-y-4 mt-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h4 className="text-xl font-semibold">{report.title}</h4>
                <p className="text-gray-600">Date: {report.date}</p>
                <p className="text-gray-600">Filters: {report.filters}</p>
                <Link
                  to={`/report/${report.title}`}
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
                >
                  Export
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl shadow-md p-6 col-span-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Notifications Panel
        </h3>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-gray-500">{notification.date}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700">
          Create Broadcast
        </button>
=======
    <div className="flex-1 p-6 space-y-6 bg-gray-100">
      {/* Dashboard Cards at the Top */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 group"
          >
            <div className="group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300 ease-in-out">
              <h4 className="font-semibold text-gray-800 text-lg">
                {card.title}
              </h4>
              <p className="text-gray-600 mt-2">{card.info}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                to={`/${card.title.toLowerCase()}`}
                className="inline-block bg-blue-600 text-white rounded-full py-1 px-2 text-xs hover:bg-blue-700 transition-all duration-200"
              >
                View Details
              </Link>
            </div>

            {/* Double Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
          </div>
        ))}
>>>>>>> 4e17393 ( some changes to dashboard)
      </div>
    </div>
  );
};

export default Dashboard;
