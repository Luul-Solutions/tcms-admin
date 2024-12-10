import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usersData from "../users.json";

interface UserDetails {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  school: string;
}

const Users: React.FC = () => {
  const { userName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserDetails[]>(usersData);
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
    const filteredUsers = usersData.filter(
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

  // Future backend integration placeholder
  /*
  const { data: fetchedUsers, error } = useQuery('users', async () => {
    const res = await fetch('https://your-server.com/users.json');
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  });

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);
  */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by name or email"
        onChange={handleSearch}
        value={searchTerm}
        className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all"
          >
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

      {/* Add User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              className="bg-white rounded-lg p-6 shadow-lg w-96"
            >
              <h2 className="font-bold text-lg mb-4">Add New User</h2>
              <form>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={newUser.firstname}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={newUser.fullname}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={newUser.phoneNumber}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <button
                  type="button"
                  onClick={handleCreateUser}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
