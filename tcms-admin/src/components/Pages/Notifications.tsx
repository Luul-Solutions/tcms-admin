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
  const [notificationsPerPage] = useState(8); // Show 8 notifications per page
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  const handleNotificationClick = (id: string) => {
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

  const filteredNotifications = notifications
    .filter(
      (notif) =>
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((notif) => statusFilter === "All" || notif.status === statusFilter);

  const criticalNotifications = filteredNotifications.filter(
    (notif) => notif.isCritical
  );

  const nonCriticalNotifications = filteredNotifications.filter(
    (notif) => !notif.isCritical
  );

  // Pagination logic for 8 notifications per page
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = nonCriticalNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Total pages calculation
  const totalPages = Math.ceil(nonCriticalNotifications.length / notificationsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-900 font-bold text-2xl mb-4">Notifications</h2>

      <input
        type="text"
        placeholder="Search Notifications"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4"
      />

      <select
        value={statusFilter}
        onChange={handleFilterStatusChange}
        className="p-2 mb-4"
      >
        <option value="All">All</option>
        <option value="Read">Read</option>
        <option value="Unread">Unread</option>
        <option value="Completed">Completed</option>
      </select>

      {criticalNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-red-600 font-bold text-xl mb-2">
            Critical Notifications
          </h3>
          {criticalNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.id)}
              className="p-4 bg-red-100 rounded-lg shadow cursor-pointer mb-2 hover:bg-red-200 transition"
            >
              <p className="font-medium text-red-900">{notif.title}</p>
              <p className="text-red-700 mt-1">{notif.message}</p>
              <p className="text-red-500 mt-1 text-sm">{notif.date}</p>
              <button
                onClick={() => handleMarkAsCompleted(notif.id)}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      )}

      {nonCriticalNotifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-600 font-bold text-xl mb-2">Others</h3>
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id)}
                className="p-4 bg-white rounded-lg shadow cursor-pointer mb-2 hover:bg-gray-200 transition"
              >
                <p className="font-medium text-gray-900">{notif.title}</p>
                <p className="text-gray-700 mt-1">{notif.message}</p>
                <p className="text-gray-500 mt-1 text-sm">{notif.date}</p>
                <button
                  onClick={() => handleMarkAsCompleted(notif.id)}
                  className="bg-green-500 text-white p-2 rounded mt-2"
                >
                  Mark as Completed
                </button>
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-4">
        {/* Conditionally render Previous button */}
        {currentPage > 1 && (
          <button
            onClick={() => handlePaginationChange(currentPage - 1)}
            className="p-2 bg-blue-500 text-white"
          >
            Previous
          </button>
        )}

        {/* Conditionally render Next button */}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePaginationChange(currentPage + 1)}
            className="p-2 bg-blue-500 text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Notifications;
