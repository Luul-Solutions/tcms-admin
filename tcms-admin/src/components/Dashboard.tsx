import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Dashboard: React.FC<{ setAuth: any }> = ({ setAuth }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cards = [
    { title: "Schools", info: "5 Active Schools" },
    { title: "Users", info: "20 Active Users" },
    { title: "Reports", info: "10 Pending Reports" },
    { title: "Notifications", info: "5 New Alerts" },
  ];

  const totalRevenue = 50000; // In pounds (£)
  const totalExpenses = 15000;
  const pendingPayments = 10;

  const recentTransactions = [
    {
      id: 1,
      message: "Payment for school fees",
      amount: 500,
      date: "01/12/2024",
      status: "Paid",
    },
    {
      id: 2,
      message: "Purchase of textbooks",
      amount: 1200,
      date: "28/11/2024",
      status: "Pending",
    },
    {
      id: 3,
      message: "Bus transportation charges",
      amount: 800,
      date: "27/11/2024",
      status: "Paid",
    },
  ];

  const recentActivities = [
    { action: "Added New User", timestamp: "01/12/2023 10:15" },
    { action: "Generated Report", timestamp: "30/11/2023 16:45" },
    { action: "Updated Content", timestamp: "28/11/2023 14:30" },
    { action: "System Restart", timestamp: "25/11/2023 09:00" },
  ];

  const handleLogout = () => {
    setAuth(false); // Clear authentication state
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex bg-light-blue-50 h-full min-h-screen p-6">
      {/* Left Column */}
      <div className="w-3/4 pr-4">
        {/* Search Bar */}
        <div className="p-4 bg-white rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users, reports, metrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-light-blue-400"
          />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              <CardContent>
                <Typography variant="h6" className="text-gray-700">
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-light-blue-600 mt-2"
                >
                  {card.info}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Total Revenue",
              value: `£${totalRevenue}`,
              bg: "bg-indigo-500",
              text: "text-white",
            },
            {
              title: "Total Expenses",
              value: `£${totalExpenses}`,
              bg: "bg-purple-500",
              text: "text-white",
            },
            {
              title: "Pending Payments",
              value: pendingPayments,
              bg: "bg-amber-500",
              text: "text-white",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bg} ${stat.text} p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition`}
            >
              <Typography variant="h6">{stat.title}</Typography>
              <Typography variant="h4" className="mt-2">
                {stat.value}
              </Typography>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Typography variant="h6" className="text-gray-700 mb-4">
            Recent Activities
          </Typography>
          {recentActivities.map((activity, idx) => (
            <div
              key={idx}
              className="py-3 border-b last:border-0 hover:bg-gray-50 rounded transition"
            >
              <div className="flex justify-between">
                <Typography className="text-gray-600">
                  {activity.action}
                </Typography>
                <Typography className="text-gray-500 text-sm">
                  {activity.timestamp}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Transactions */}
      <div className="w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <Typography variant="h6" className="text-gray-700 mb-4">
            Transactions & Payments
          </Typography>

          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 mb-4 rounded-lg shadow-md ${
                transaction.status === "Paid"
                  ? "bg-light-blue-100 border-l-4 border-light-blue-600"
                  : "bg-yellow-100 border-l-4 border-yellow-600"
              } hover:bg-light-blue-200 transition`}
            >
              <Typography className="text-gray-700">
                {transaction.message}
              </Typography>
              <Typography className="text-gray-600 text-sm mt-1">
                Date: {transaction.date} | Status: {transaction.status}
              </Typography>
              <Typography variant="h6" className="text-gray-900 mt-2 font-bold">
                £{transaction.amount}
              </Typography>
            </div>
          ))}

          <Button
            component={Link}
            to="/transactions"
            color="primary"
            variant="contained"
            className="w-full mt-4"
          >
            View All Transactions
          </Button>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            color="secondary"
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
