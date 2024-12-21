import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState<UserDetails[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : mockUsers;
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkActionModalOpen, setIsBulkActionModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState("");
  const [newUser, setNewUser] = useState({
    firstname: "",
    surname: "",
    role: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredUsers = users.filter(
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
      surname: "",
      role: "",
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
    if (
      !newUser.firstname ||
      !newUser.surname ||
      !newUser.role ||
      !newUser.email
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const newUserDetails: UserDetails = {
      id: (users.length + 1).toString(), // Generate a new unique ID
      name: `${newUser.firstname} ${newUser.surname}`,
      role: newUser.role,
      status: "Active", // Default status for new users
      email: newUser.email,
      school: "Unassigned", // Default school for new users
    };

    setUsers((prevUsers) => [...prevUsers, newUserDetails]); // Add the new user to the state
    alert(`User Created: ${newUserDetails.name}`);
    handleModalClose(); // Close the modal
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user,
    );
    setUsers(updatedUsers);
  };

  const handleBulkAction = (action: string) => {
    setBulkActionType(action);
    setIsBulkActionModalOpen(true);
  };

  const executeBulkAction = () => {
    if (bulkActionType === "Activate") {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: "Active" }
            : user,
        ),
      );
    } else if (bulkActionType === "Deactivate") {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id)
            ? { ...user, status: "Inactive" }
            : user,
        ),
      );
    }
    setIsBulkActionModalOpen(false);
    setSelectedUsers([]);
    alert(`${bulkActionType} action completed on selected accounts.`);
  };

  const handleUserSelectionFromDropdown = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const userId = e.target.value;
    if (userId && !selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  function handleCheckboxChange(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      </div>

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

      {/* Search Bar and Add User Button */}
      <div className="flex items-center mb-4 space-x-6">
        <input
          type="text"
          placeholder="Search users by name or email"
          onChange={handleSearch}
          value={searchTerm}
          className="flex-grow p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          style={{ marginLeft: "1.5cm" }}
        >
          ➕ Add New User
        </button>
      </div>

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
                className={`$ {
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

      {isBulkActionModalOpen && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            >
              <h2 className="text-xl font-bold mb-4">
                {bulkActionType} Accounts
              </h2>
              <div className="mb-4">
                <h3 className="text-gray-700 font-semibold">Selected Users:</h3>
                {selectedUsers.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {selectedUsers.map((id) => {
                      const user = users.find((u) => u.id === id);
                      return user ? <li key={id}>{user.name}</li> : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-600">No users selected.</p>
                )}
                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">
                    Select User:
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    onChange={handleUserSelectionFromDropdown}
                  >
                    <option value="">-- Select a User --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsBulkActionModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={executeBulkAction}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Confirm
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



