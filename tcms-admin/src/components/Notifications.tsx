import React, { useState } from "react";

interface Notification {
  message: string;
  date: string;
}

const Notifications: React.FC = () => {
  // State to hold notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { message: "New classes available for enrollment", date: "2024-12-02" },
    { message: "School holiday announcement", date: "2024-11-28" },
  ]);

  // State to hold new notification input
  const [newMessage, setNewMessage] = useState("");

  // Function to add a new notification
  const handleAddNotification = () => {
    if (newMessage.trim() === "") return;

    const newNotification: Notification = {
      message: newMessage,
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    setNotifications([newNotification, ...notifications]);
    setNewMessage(""); // Clear input
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Notifications Panel
      </h3>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-gray-500 text-sm">{notification.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>

      {/* Add New Notification */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter new notification"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddNotification}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Add Notification
        </button>
      </div>
    </div>
  );
};

export default Notifications;
