import React, { useEffect, useState } from "react";
import { CheckCircle, Ban, Trash2, Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getSchools } from "../../services/getSchools";
import { useQuery } from "react-query";
import Loading from "../Loading";
import CreateSchool from "../school/CreateSchool";

const Schools: React.FC = () => {
  const { data, isError, isLoading, error } = useQuery(
    "getSchools",
    getSchools,
    {
      staleTime: 0,
    },
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    adminContact: "",
    phone: "",
    assignedAdmin: "",
    logo: "",
    setupFee: "", // Required for Step 2
    subscriptionPlan: "", // Required for Step 2
    paymentMethod: "", // Required for Step 2
    alternatePhone: "",
    PaymentPlan: "",
    subscriptionFrequency: "", // For monthly/quarterly options
    discountedPrice: "",
    bankName: "",
    accountNumber: "",
    sortCode: "",
    iban: "",
    paypalEmail: "",
    routingNumber: "",
    country: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const handleCloseModal = () => {
    setIsFormVisible(false);
    setCurrentStep(1);
  };
  const saveProgress = () => {
    localStorage.setItem("newSchoolProgress", JSON.stringify(newSchool));
    alert("Progress saved successfully!");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/add-school",
        newSchool,
        {
          headers: {
            // Optionally include Authorization headers if needed
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.status === 200) {
        alert("School added successfully!");
        handleCloseModal(); // Close the modal or reset form
      }
    } catch (error: unknown) {
      console.error("Failed to add the school:", error);

      // Type guard for AxiosError
      if (isAxiosError(error)) {
        // Handle Axios-specific error
        alert(
          `Failed to add the school: {error.response?.data.message || error.response?.data}`,
        );
      } else {
        // Handle other types of errors (network issues, unexpected errors)
        alert("Failed to add the school. Please try again.");
      }
    }
  };

  // Type guard to check if the error is an AxiosError
  function isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
  }

  const handleCheckboxChange = (schoolName: string) => {
    setSelectedSchools((prev) =>
      prev.includes(schoolName)
        ? prev.filter((name) => name !== schoolName)
        : [...prev, schoolName],
    );
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
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p className="text-center text-red-400 text-xl">{String(error)}</p>;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Schools", info: data.count },
          {
            title: "Active Schools",
            info: data.rows.filter(
              (school: { planStatus: string }) =>
                school.planStatus === "active",
            ).length,
          },
          {
            title: "Inactive Schools",
            info: data.rows.filter(
              (school: { planStatus: string }) =>
                school.planStatus === "inactive",
            ).length,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-gray-700 font-bold">{stat.title}</h4>
            <p className="text-gray-600 mt-2 text-xl">{stat.info}</p>
          </motion.div>
        ))}
      </div>
      {/* Add New School Button */}
      <motion.button
        onClick={() => setIsFormVisible(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        ➕ Add New School
      </motion.button>
      {/* School List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.rows.map((school: any, index: number) => (
          <motion.div
            key={index}
            className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl"
          >
            <input
              type="checkbox"
              className="absolute top-4 right-4"
              onChange={() => handleCheckboxChange(school.name)}
            />
            <h2 className="font-bold text-gray-900 text-xl">{school.name}</h2>
            <p>Admin Contact: {school.email}</p>
            <p>Address: {school.address}</p>
            <p>
              Status:{" "}
              <span
                className={`${
                  school.planStatus === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {school.planStatus}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
      {/* Modal Form */}(
      <AnimatePresence>
        {isFormVisible && <CreateSchool handleCloseModal={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
};

export default Schools;
