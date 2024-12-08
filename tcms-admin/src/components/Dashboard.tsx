import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const cards = [
    { title: "Schools", info: "5 Active Schools" },
    { title: "Users", info: "20 Active Users" },
    { title: "Reports", info: "10 Pending Reports" },
    { title: "Notifications", info: "5 New Alerts" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const recentActivities = [
    { action: "Added New User", timestamp: "2023-12-01 10:15" },
    { action: "Generated Report", timestamp: "2023-11-30 16:45" },
    { action: "Updated Content", timestamp: "2023-11-28 14:30" },
    { action: "System Restart", timestamp: "2023-11-25 09:00" },
  ];

  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-50">
      {/* Search Panel */}
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search users, reports, metrics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quick Access Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {[
          { title: "Add New User", action: "/add-user" },
          { title: "Generate Report", action: "/generate-report" },
          { title: "Update Content", action: "/update-content" },
          { title: "View Analytics", action: "/analytics" },
        ].map((shortcut, idx) => (
          <Link
            key={idx}
            to={shortcut.action}
            className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out text-center"
          >
            <h4 className="font-bold text-lg">{shortcut.title}</h4>
          </Link>
        ))}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative p-6 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out group"
          >
            <div className="group-hover:translate-y-1 group-hover:scale-105 transition-all">
              <h4 className="font-bold text-gray-800 text-xl">{card.title}</h4>
              <p className="text-gray-600 mt-2 text-sm">{card.info}</p>
            </div>

            {/* Interactive Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 opacity-0 group-hover:opacity-40 transition-all duration-500"></div>

            <div className="absolute inset-0 flex items-end justify-end p-2">
              <Link
                to={`/${card.title.toLowerCase()}`}
                className="inline-block bg-blue-600 text-white rounded-full py-1 px-2 text-xs hover:bg-blue-700 transform transition-all duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Logs */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h4 className="font-bold text-gray-800 text-lg mb-4">
          Recent Activities
        </h4>
        {recentActivities.map((activity, idx) => (
          <div
            key={idx}
            className="flex justify-between py-3 border-t items-center hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <span className="text-gray-700">{activity.action}</span>
            <span className="text-gray-500 text-sm">{activity.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Calendar Integration Placeholder */}
      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <h4 className="font-bold text-gray-800 text-lg mb-4">
          Upcoming Events
        </h4>
        <div className="space-y-2">
          {[
            { title: "Team Meeting", date: "Dec 5, 2023" },
            { title: "Report Deadline", date: "Dec 10, 2023" },
            { title: "Content Review", date: "Dec 15, 2023" },
          ].map((event, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition-all duration-300"
            >
              <p>
                <strong>{event.title}</strong> - <span>{event.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
