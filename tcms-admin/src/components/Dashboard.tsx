import React from "react";

const Dashboard: React.FC = () => {
  // Data for Schools, Users, and Reports Panel (mock data)
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

  return (
    <div className="p-8">
      {/* Schools Panel */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Schools Panel</h3>
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h4 className="text-xl font-semibold">List of Schools</h4>
          <table className="w-full text-left mt-4">
            <thead>
              <tr>
                <th className="border-b p-2">School Name</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Admin Contact</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{school.name}</td>
                  <td className="border-b p-2">{school.status}</td>
                  <td className="border-b p-2">{school.contact}</td>
                  <td className="border-b p-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management Panel */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">User Management Panel</h3>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-xl font-semibold">Admins</h4>
          <table className="w-full text-left mt-4">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Role</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{user.name}</td>
                  <td className="border-b p-2">{user.role}</td>
                  <td className="border-b p-2">{user.status}</td>
                  <td className="border-b p-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports Panel */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Reports Panel</h3>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-xl font-semibold">Generate Reports</h4>
          <ul className="mt-4">
            {reports.map((report, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{report.title}</span>
                <span className="text-gray-500">{report.date}</span>
                <button className="bg-blue-500 text-white px-4 py-1 rounded">
                  Export
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Notifications Panel</h3>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-xl font-semibold">Manage Notifications</h4>
          <ul className="mt-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{notification.message}</span>
                <span className="text-gray-500">{notification.date}</span>
              </li>
            ))}
          </ul>
          <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
            Create Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
