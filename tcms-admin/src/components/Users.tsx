import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface UserDetails {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  school: string;
}

const mockUsers: UserDetails[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Admin",
    status: "Active",
    email: "alice@example.com",
    school: "Central School",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Admin",
    status: "Inactive",
    email: "bob@example.com",
    school: "Lincoln High",
  },
  {
    id: "3",
    name: "Charlie Brown",
    role: "Admin",
    status: "Active",
    email: "charlie@example.com",
    school: "Greenwood",
  },
];

const Users: React.FC = () => {
  const { userName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserDetails[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstname: "",
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredUsers = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
    setUsers(filteredUsers);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewUser({
      firstname: "",
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = () => {
    alert(`User Created: ${JSON.stringify(newUser, null, 2)}`);
    handleModalClose();
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user,
    );
    setUsers(updatedUsers);
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert("No users selected.");
      return;
    }
    alert(`${action} action performed on users: ${selectedUsers.join(", ")}`);
    setSelectedUsers([]);
  };

  const handleCheckboxChange = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Users", info: users.length },
          {
            title: "Active Users",
            info: users.filter((user) => user.status === "Active").length,
          },
          {
            title: "Inactive Users",
            info: users.filter((user) => user.status === "Inactive").length,
          },
          { title: "Schools Managed", info: 5 },
        ].map((stat) => (
          <div
            className="p-4 bg-white rounded-lg shadow-lg text-center"
            key={stat.title}
          >
            <h4 className="text-gray-700 font-bold">{stat.title}</h4>
            <p className="text-gray-600 mt-2 text-xl">{stat.info}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by name or email"
        onChange={handleSearch}
        value={searchTerm}
        className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Add New User Shortcut */}
      <button
        onClick={handleAddUser}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        ➕ Add New User
      </button>

      {/* Bulk Actions Dropdown */}
      <div className="mb-4">
        <button
          onClick={() => handleBulkAction("Activate")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          🔄 Bulk Activate
        </button>
        <button
          onClick={() => handleBulkAction("Deactivate")}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          🔄 Bulk Deactivate
        </button>
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all"
          >
            <input
              type="checkbox"
              className="absolute top-4 right-4"
              onChange={() => handleCheckboxChange(user.id)}
            />
            <h2 className="font-bold text-gray-900 text-xl">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>
              Status:{" "}
              <span
                className={`${
                  user.status === "Active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </span>
            </p>

            {/* Role Dropdown */}
            <select
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
              className="mt-2 w-full rounded-lg bg-gray-100"
            >
              {["Admin", "Manager"].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8 }} // Smooth transition (0.8 seconds)
              className="bg-white p-6 shadow-lg w-1/3 h-full"
            >
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleNewUserChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={newUser.fullname}
                  onChange={handleNewUserChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={handleNewUserChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Users;
