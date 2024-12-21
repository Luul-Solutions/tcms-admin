import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usersData from "../../users.json";

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
    surname: "",
    email: "",
    phoneNumber: "",
    school: "",
    role: "",
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
      surname: "",
      email: "",
      phoneNumber: "",
      school: "",
      role: "",
    });
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = () => {
    if (
      newUser.firstname &&
      newUser.surname &&
      newUser.email &&
      newUser.phoneNumber &&
      newUser.school &&
      newUser.role
    ) {
      const newUserEntry = {
        id: Date.now().toString(),
        name: `${newUser.firstname} ${newUser.surname}`,
        role: newUser.role,
        status: "Active",
        email: newUser.email,
        school: newUser.school,
      };
      setUsers((prevUsers) => [...prevUsers, newUserEntry]);
      handleModalClose();
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar and Add User Button Container */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          onChange={handleSearch}
          value={searchTerm}
          className="w-3/4 p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-8"
        />
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add New User
        </button>
      </div>

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
            <p>School: {user.school}</p>
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
                  name="surname"
                  placeholder="Surname"
                  value={newUser.surname}
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
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={newUser.phoneNumber}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="school"
                  placeholder="School"
                  value={newUser.school}
                  onChange={handleNewUserChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={newUser.role}
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface CreateUserProps {
//   setAuth: (auth: boolean) => void;
// }

// const CreateUser: React.FC<CreateUserProps> = ({ setAuth }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     surname: "",
//     email: "",
//     phoneNumber: "",
//     school: "",
//     role: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     // Placeholder for form submission logic (e.g., API call)
//   };

//   const handleLogout = () => {
//     setAuth(false);
//     navigate("/");
//   };

//   return (
//     <div className="flex bg-gray-100 h-full min-h-screen p-6">
//       <div className="w-full max-w-3xl mx-auto">
//         {/* Form Container */}
//         <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-gray-700 text-2xl font-semibold mb-6">
//             Create New User
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* First Name */}
//             <div>
//               <label className="block text-gray-600 mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter first name"
//                 required
//               />
//             </div>

//             {/* Surname */}
//             <div>
//               <label className="block text-gray-600 mb-1">Surname</label>
//               <input
//                 type="text"
//                 name="surname"
//                 value={formData.surname}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter surname"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-gray-600 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-gray-600 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter phone number"
//                 required
//               />
//             </div>

//             {/* School */}
//             <div>
//               <label className="block text-gray-600 mb-1">School</label>
//               <input
//                 type="text"
//                 name="school"
//                 value={formData.school}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Enter school name"
//                 required
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-gray-600 mb-1">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               >
//                 <option value="">Select a role</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Teacher">Teacher</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateUser;
