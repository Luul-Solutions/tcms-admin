import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  // Mock data
  const schools = [
    {
      name: "FastTrack Academy",
      status: "Active",
      admin: "John Doe",
      contact: "07487872018",
    },
    {
      name: "TechSchool",
      status: "Inactive",
      admin: "Jane Smith",
      contact: "07398742106",
    },
  ];

  const users = [
    { name: "Admin User 1", role: "Admin", status: "Active" },
    { name: "Admin User 2", role: "Admin", status: "Deactivated" },
  ];

  const reports = [
    {
      title: "School Performance Report",
      date: "2024-12-01",
      filters: "All Schools",
    },
    {
      title: "Student Attendance Report",
      date: "2024-11-15",
      filters: "By School",
    },
  ];

  const notifications = [
    { message: "New classes available for enrollment", date: "2024-12-02" },
    { message: "School holiday announcement", date: "2024-11-28" },
  ];

  // State to track visibility of each panel
  const [showSchools, setShowSchools] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showReports, setShowReports] = useState(false);

  return (
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
      </div>
    </div>
  );
};

export default Dashboard;
