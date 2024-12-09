import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Ban, Trash2, Info, Settings } from "lucide-react";

const Schools: React.FC = () => {
  const [schools, setSchools] = useState([
    { name: "FastTrack Academy", status: "Active", adminContact: "admin@fasttrack.com", address: "123 Main St", phone: "555-1234" },
    { name: "TechSchool", status: "Inactive", adminContact: "contact@techschool.com", address: "456 Elm St", phone: "555-5678" },
  ]);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    adminContact: "",
    phone: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null); // To control the modal visibility and selected school

  const addSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSchool.name.trim() !== "" && newSchool.address.trim() !== "" && newSchool.adminContact.trim() !== "") {
      setSchools([...schools, { ...newSchool, status: "Inactive" }]);
      setNewSchool({ name: "", address: "", adminContact: "", phone: "" }); // Reset form
      setIsFormVisible(false); // Hide form after submission
    }
  };

  const toggleSchoolStatus = (index: number) => {
    setSchools((prevSchools) =>
      prevSchools.map((school, i) =>
        i === index
          ? { ...school, status: school.status === "Active" ? "Inactive" : "Active" }
          : school
      )
    );
  };

  const deleteSchool = (index: number) => {
    setSchools((prevSchools) => prevSchools.filter((_, i) => i !== index));
  };

  const viewDetails = (school: any) => {
    setSelectedSchool(school);
  };

  const closeDetails = () => {
    setSelectedSchool(null);
  };

  return (
    <div className="flex-1 p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Add School Section */}
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg">
        <h4 className="font-bold text-xl mb-4">Add New School</h4>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          {isFormVisible ? "Cancel" : "Add School"}
        </button>

        {/* Form Card */}
        {isFormVisible && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h4 className="font-bold text-xl mb-4">School Information</h4>
            <form onSubmit={addSchool} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700">School Name</label>
                <input
                  type="text"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">Address</label>
                <input
                  type="text"
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">Admin Contact</label>
                <input
                  type="email"
                  value={newSchool.adminContact}
                  onChange={(e) => setNewSchool({ ...newSchool, adminContact: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700">Phone (optional)</label>
                <input
                  type="text"
                  value={newSchool.phone}
                  onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
              >
                Add School
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Schools List - Table Format */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h4 className="font-bold text-xl text-gray-800 mb-6">List of Schools</h4>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-6 border-b">Name</th>
              <th className="py-3 px-6 border-b">Status</th>
              <th className="py-3 px-6 border-b">Admin Contact</th>
              <th className="py-3 px-6 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6">{school.name}</td>
                <td className="py-4 px-6">
                  <span
                    className={`font-semibold ${
                      school.status === "Active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {school.status}
                  </span>
                </td>
                <td className="py-4 px-6">{school.adminContact}</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-3 items-center justify-center">
                    {/* Toggle Status */}
                    <button
                      onClick={() => toggleSchoolStatus(index)}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        school.status === "Active"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white shadow transition`}
                    >
                      {school.status === "Active" ? <Ban /> : <CheckCircle />}
                      <span>{school.status === "Active" ? "Deactivate" : "Activate"}</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteSchool(index)}
                      className="flex items-center space-x-2 p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow transition"
                    >
                      <Trash2 />
                    </button>

                    {/* View Details */}
                    <button
                      onClick={() => viewDetails(school)}
                      className="flex items-center space-x-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                    >
                      <Info />
                    </button>

                    {/* Edit */}
                    <Link
                      to={`/school/edit/${school.name}`}
                      className="flex items-center space-x-2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
                    >
                      <Settings />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* School Details Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-bold text-xl mb-4">{selectedSchool.name} Details</h3>
            <p className="mb-2"><strong>Address:</strong> {selectedSchool.address}</p>
            <p className="mb-2"><strong>Phone:</strong> {selectedSchool.phone}</p>
            <p className="mb-2"><strong>Admin Contact:</strong> {selectedSchool.adminContact}</p>
            <button
              onClick={closeDetails}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Metrics Section */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <h4 className="font-bold text-xl text-gray-800 mb-6">Metrics Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
            <h5 className="font-bold text-lg">Students</h5>
            <p className="text-2xl font-semibold">150</p>
          </div>
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg">
            <h5 className="font-bold text-lg">Teachers</h5>
            <p className="text-2xl font-semibold">20</p>
          </div>
          <div className="p-6 bg-purple-500 text-white rounded-lg shadow-lg">
            <h5 className="font-bold text-lg">Performance</h5>
            <p className="text-2xl font-semibold">85%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schools;
