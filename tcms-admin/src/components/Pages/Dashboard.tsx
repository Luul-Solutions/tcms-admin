import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define the Transaction interface for TypeScript
interface Transaction {
  id: number;
  message: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
  details?: string; // Additional field to hold transaction details
}

// Define the Props interface for the Dashboard component
interface DashboardProps {
  setAuth: (auth: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      id: 1,
      message: "Payment for school fees",
      amount: 500,
      date: "01/12/2024",
      status: "Paid",
      details: "Paid by student John Doe for the term fees.",
    },
    {
      id: 2,
      message: "Purchase of textbooks",
      amount: 1200,
      date: "28/11/2024",
      status: "Pending",
      details: "Pending delivery of textbooks from supplier.",
    },
    {
      id: 3,
      message: "Bus transportation charges",
      amount: 800,
      date: "27/11/2024",
      status: "Paid",
      details: "Transportation cost for 20 students.",
    },
  ]);

  const [expandedTransactions, setExpandedTransactions] = useState<number[]>(
    [],
  );
  const navigate = useNavigate();

  const totalRevenue = 50000;
  const totalExpenses = 15000;
  const pendingPayments = 10;

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  const toggleTransactionDetails = (id: number) => {
    setExpandedTransactions((prev) =>
      prev.includes(id)
        ? prev.filter((transactionId) => transactionId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions from the backend...");

        // Placeholder backend call (Commented out)
        // const response = await fetch('/api/transactions');
        // const data = await response.json();
        // setRecentTransactions(data);

        setTimeout(() => {
          console.log("Transactions loaded.");
        }, 1500);
      } catch (error) {
        console.error("Failed to load transactions from backend", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex bg-gray-100 h-full min-h-screen p-6">
      {/* Left Column */}
      <div className="w-3/4 pr-4">
        {/* Search Bar */}
        <div className="p-4 bg-white rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users, reports, metrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Schools", info: "5 Active Schools" },
            { title: "Users", info: "20 Active Users" },
            { title: "Reports", info: "10 Pending Reports" },
            { title: "Notifications", info: "5 New Alerts" },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transform hover:scale-105 transition"
            >
              <h3 className="text-gray-700 text-lg font-semibold">
                {card.title}
              </h3>
              <p className="text-blue-600 mt-2">{card.info}</p>
            </div>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Total Revenue",
              value: `£${totalRevenue}`,
              bg: "bg-blue-500",
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
              bg: "bg-yellow-500",
              text: "text-white",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bg} ${stat.text} p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition`}
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-gray-700 text-lg font-semibold mb-4">
            Recent Activities
          </h3>
          {[
            { action: "Added New User", timestamp: "01/12/2023 10:15" },
            { action: "Generated Report", timestamp: "30/11/2023 16:45" },
            { action: "Updated Content", timestamp: "28/11/2023 14:30" },
            { action: "System Restart", timestamp: "25/11/2023 09:00" },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="py-3 border-b last:border-0 hover:bg-gray-50 rounded transition"
            >
              <div className="flex justify-between">
                <p className="text-gray-600">{activity.action}</p>
                <p className="text-gray-500 text-sm">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Transactions */}
      <div className="w-1/4">
        <div className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition">
          <h3 className="text-gray-700 text-lg font-semibold mb-4">
            Transactions & Payments
          </h3>

          {recentTransactions.map((txn) => (
            <div
              key={txn.id}
              className={`p-4 mb-4 rounded-lg shadow-md ${
                txn.status === "Paid"
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : "bg-yellow-100 border-l-4 border-yellow-600"
              } hover:bg-gray-50 transition`}
            >
              <p>{txn.message}</p>
              <p className="text-gray-600 mt-1">
                Date: {txn.date} | Status: {txn.status}
              </p>

              <button
                onClick={() => toggleTransactionDetails(txn.id)}
                className="text-blue-500 mt-2"
              >
                {expandedTransactions.includes(txn.id)
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {expandedTransactions.includes(txn.id) && (
                <p className="mt-2 text-gray-700">{txn.details}</p>
              )}
            </div>
          ))}

          <Link
            to="/transactions"
            className="block text-center bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            View All Transactions
          </Link>

          <button
            onClick={handleLogout}
            className="w-full blue text-white py-2 rounded-lg mt-6 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
