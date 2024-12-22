import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationsData from "../../Data/notifications.json"; // Placeholder for static data

interface NotificationDetails {
  id: string;
  title: string;
  message: string;
  status: string;
  date: string;
  isCritical: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<NotificationDetails[]>(notificationsData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1); // New state for completed notifications pagination
  const notificationsPerPage = 8; // Fixed 8 notifications per page
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  const handleNotificationClick = (id: string, e: React.MouseEvent) => {
    // Only navigate when the notification area (not the button) is clicked
    e.stopPropagation(); // Prevent the event from bubbling to parent elements
    navigate("/dashboard");
  };

  const handleMarkAsCompleted = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "Completed" } : notif
      )
    );
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCompletedPaginationChange = (page: number) => {
    setCompletedPage(page); // Handle pagination for completed notifications
  };

  // Filter notifications based on search term and status filter
  const filteredNotifications = notifications
    .filter(
      (notif) =>
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((notif) => statusFilter === "All" || notif.status === statusFilter);

  const criticalNotifications = filteredNotifications.filter(
    (notif) => notif.isCritical && notif.status !== "Completed"
  );

  const nonCriticalNotifications = filteredNotifications.filter(
    (notif) => !notif.isCritical && notif.status !== "Completed"
  );

  // Completed notifications for the "Completed" filter
  const completedNotifications = filteredNotifications.filter(
    (notif) => notif.status === "Completed"
  );

  // Pagination logic for non-critical notifications
  const totalPages = Math.ceil(nonCriticalNotifications.length / notificationsPerPage);
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = nonCriticalNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Pagination logic for completed notifications
  const completedTotalPages = Math.ceil(completedNotifications.length / notificationsPerPage);
  const indexOfLastCompletedNotification = completedPage * notificationsPerPage;
  const indexOfFirstCompletedNotification =
    indexOfLastCompletedNotification - notificationsPerPage;
  const currentCompletedNotifications = completedNotifications.slice(
    indexOfFirstCompletedNotification,
    indexOfLastCompletedNotification
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-900 font-bold text-2xl mb-4">Notifications</h2>

      <div className="flex items-center space-x-4 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search notifications..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-2/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={handleFilterStatusChange}
          className="w-1/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          <option value="All">All</option>
          <option value="Read">Read</option>
          <option value="Unread">Unread</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Critical Notifications */}
      {criticalNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-red-600 font-bold text-xl mb-2">
            Critical Notifications
          </h3>
          {criticalNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={(e) => handleNotificationClick(notif.id, e)} // stop propagation to prevent navigating
              className="p-4 bg-red-100 rounded-lg shadow cursor-pointer mb-2 hover:bg-red-200 transition"
            >
              <p className="font-medium text-red-900">{notif.title}</p>
              <p className="text-red-700 mt-1">{notif.message}</p>
              <p className="text-red-500 mt-1 text-sm">{notif.date}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the button click from triggering notification click
                  handleMarkAsCompleted(notif.id);
                }}
                disabled={notif.status === "Completed"}
                className={`bg-green-500 text-white p-2 rounded mt-2 ${
                  notif.status === "Completed" ? "cursor-not-allowed" : ""
                }`}
              >
                {notif.status === "Completed" ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Non-Critical Notifications */}
      {currentNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-600 font-bold text-xl mb-2">Others</h3>
          {currentNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={(e) => handleNotificationClick(notif.id, e)} // stop propagation to prevent navigating
              className="p-4 bg-white rounded-lg shadow cursor-pointer mb-2 hover:bg-gray-200 transition"
            >
              <p className="font-medium text-gray-900">{notif.title}</p>
              <p className="text-gray-700 mt-1">{notif.message}</p>
              <p className="text-gray-500 mt-1 text-sm">{notif.date}</p>

              {/* Mark as Completed Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the button click from triggering notification click
                  handleMarkAsCompleted(notif.id);
                }}
                disabled={notif.status === "Completed"}
                className={`mt-2 p-2 rounded ${
                  notif.status === "Completed"
                    ? "bg-gray-300 text-gray-600 cursor-default"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {notif.status === "Completed" ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination for Non-Critical Notifications */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => handlePaginationChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded shadow transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-default"
              : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          }`}
          title={currentPage === 1 ? "You are on the first page" : ""}
        >
          Previous
        </button>

        <button
          onClick={() => handlePaginationChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded shadow transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-default"
              : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          }`}
          title={currentPage === totalPages ? "You are on the last page" : ""}
        >
          Next
        </button>
      </div>

      {/* Completed Notifications */}
      {completedNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-600 font-bold text-xl mb-2">Completed</h3>
          {currentCompletedNotifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 bg-white rounded-lg shadow cursor-pointer mb-2 hover:bg-gray-200 transition"
            >
              <p className="font-medium text-gray-900">{notif.title}</p>
              <p className="text-gray-700 mt-1">{notif.message}</p>
              <p className="text-gray-500 mt-1 text-sm">{notif.date}</p>
              <button
                disabled
                className="bg-gray-300 text-gray-600 p-2 rounded mt-2"
              >
                Completed
              </button>
            </div>
          ))}

          {/* Pagination for Completed Notifications */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleCompletedPaginationChange(completedPage - 1)}
              disabled={completedPage === 1}
              className={`px-4 py-2 rounded shadow transition ${
                completedPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-default"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
              title={completedPage === 1 ? "You are on the first page" : ""}
            >
              Previous
            </button>

            <button
              onClick={() => handleCompletedPaginationChange(completedPage + 1)}
              disabled={completedPage === completedTotalPages}
              className={`px-4 py-2 rounded shadow transition ${
                completedPage === completedTotalPages
                  ? "bg-gray-300 text-gray-500 cursor-default"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
              title={completedPage === completedTotalPages ? "You are on the last page" : ""}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
