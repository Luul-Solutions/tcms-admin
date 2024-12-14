import React, { useState } from "react";
import { CheckCircle, Ban, Trash2, Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Schools: React.FC = () => {
  const [schools, setSchools] = useState([
    {
      name: "FastTrack Academy",
      status: "Active",
      adminContact: "admin@fasttrack.com",
      address: "123 Main St",
      phone: "555-1234",
    },
    {
      name: "TechSchool",
      status: "Inactive",
      adminContact: "contact@techschool.com",
      address: "456 Elm St",
      phone: "555-5678",
    },
    {
      name: "Greenwood School",
      status: "Active",
      adminContact: "info@greenwood.com",
      address: "789 Oak St",
      phone: "555-9876",
    },
  ]);
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    adminContact: "",
    phone: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(term) ||
        school.adminContact.toLowerCase().includes(term),
    );
    setFilteredSchools(filtered);
  };

  const handleAddSchool = () => setIsFormVisible(true);
  const handleCloseModal = () => setIsFormVisible(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure new school includes the required 'status' field
    const schoolWithStatus = { ...newSchool, status: "Active" };

    setSchools((prevSchools) => [...prevSchools, schoolWithStatus]);
    setFilteredSchools((prevSchools) => [...prevSchools, schoolWithStatus]);

    setNewSchool({ name: "", address: "", adminContact: "", phone: "" });
    handleCloseModal();
  };

  const handleCheckboxChange = (schoolId: string) => {
    if (selectedSchools.includes(schoolId)) {
      setSelectedSchools(selectedSchools.filter((id) => id !== schoolId));
    } else {
      setSelectedSchools([...selectedSchools, schoolId]);
    }
  };

  const toggleSchoolStatus = (index: number) => {
    setSchools((prevSchools) =>
      prevSchools.map((school, i) =>
        i === index
          ? {
              ...school,
              status: school.status === "Active" ? "Inactive" : "Active",
            }
          : school,
      ),
    );
    setFilteredSchools((prevSchools) =>
      prevSchools.map((school, i) =>
        i === index
          ? {
              ...school,
              status: school.status === "Active" ? "Inactive" : "Active",
            }
          : school,
      ),
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Schools", info: schools.length },
          {
            title: "Active Schools",
            info: schools.filter((school) => school.status === "Active").length,
          },
          {
            title: "Inactive Schools",
            info: schools.filter((school) => school.status === "Inactive")
              .length,
          },
          { title: "Schools Managed", info: 5 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-gray-700 font-bold">{stat.title}</h4>
            <p className="text-gray-600 mt-2 text-xl">{stat.info}</p>
          </motion.div>
        ))}
      </div>

      {/* Search Bar */}
      <motion.input
        type="text"
        placeholder="Search schools by name or admin contact"
        onChange={handleSearch}
        className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Add New School Button */}
      <motion.button
        onClick={handleAddSchool}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ➕ Add New School
      </motion.button>

      {/* School List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school, index) => (
          <motion.div
            key={index}
            className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.02 }}
            layout
          >
            <input
              type="checkbox"
              className="absolute top-4 right-4"
              onChange={() => handleCheckboxChange(school.name)}
            />
            <h2 className="font-bold text-gray-900 text-xl">{school.name}</h2>
            <p>Admin Contact: {school.adminContact}</p>
            <p>Address: {school.address}</p>
            <p>
              Status:{" "}
              <span
                className={`${school.status === "Active" ? "text-green-500" : "text-red-500"}`}
              >
                {school.status}
              </span>
            </p>

            <div className="mt-4 flex justify-between items-center">
              <motion.button
                onClick={() => toggleSchoolStatus(index)}
                className={`px-4 py-2 rounded-lg text-white ${
                  school.status === "Active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {school.status === "Active" ? <Ban /> : <CheckCircle />}
                {school.status === "Active" ? "Deactivate" : "Activate"}
              </motion.button>

              <Link
                to={`/school/edit/${school.name}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Settings />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form for Adding New School */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg w-1/3"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Add New School</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newSchool.name}
                    onChange={handleFormChange}
                    className="w-full p-3 mt-2 rounded-lg bg-gray-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={newSchool.address}
                    onChange={handleFormChange}
                    className="w-full p-3 mt-2 rounded-lg bg-gray-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="adminContact" className="block text-gray-700">
                    Admin Contact
                  </label>
                  <input
                    type="email"
                    id="adminContact"
                    name="adminContact"
                    value={newSchool.adminContact}
                    onChange={handleFormChange}
                    className="w-full p-3 mt-2 rounded-lg bg-gray-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newSchool.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 mt-2 rounded-lg bg-gray-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schools;
