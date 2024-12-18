import React, { useEffect, useState } from "react";
import { CheckCircle, Ban, Trash2, Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getSchools } from "../../services/auth";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";



const Schools: React.FC = () => {
  const { data, isError, isLoading, error } = useQuery(
    "getSchools",
    getSchools
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
      setupFee: "",          // Required for Step 2
  subscriptionPlan: "",  // Required for Step 2
  paymentMethod: "",     // Required for Step 2
  alternatePhone:"",
  PaymentPlan: "",
  subscriptionFrequency: "",  // For monthly/quarterly options
  discountedPrice: "", 
  bankName: "",
  accountNumber: "",
  sortCode: "",
  iban: "",
  paypalEmail: "",
  routingNumber: "",
  country: "",  
  });
 
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        : [...prev, schoolName]
    );
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>Error loading schools</p>;

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
        {currentStep && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg w-1/3 flex flex-col relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setCurrentStep(0)}
                className="absolute top-2 right-2 text-black font-bold text-xl w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4">Add New School</h2>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                  <>
                    <h3 className="text-xl mb-4">Step 1: Basic Details</h3>

                    <input
                      type="text"
                      name="name"
                      placeholder="School Name"
                      value={newSchool.name}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                      required
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={newSchool.address}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={newSchool.phone}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                      required
                    />

                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto mt-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                      Next
                    </button>
                  </>
                )}

                {/* Step 2: Payment Details */}
                {currentStep === 2 && (
                  <>
                    <h3 className="text-xl mb-4">Step 2: Payment Details</h3>

                    <input
                      type="number"
                      name="setupFee"
                      placeholder="Setup Fee"
                      value={newSchool.setupFee}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                      required
                    />

                    <div>
                      <label htmlFor="PaymentPlan" className="font-semibold">
                        Payment Plan
                      </label>
                      <select
                        name="PaymentPlan"
                        value={newSchool.PaymentPlan}
                        onChange={handleFormChange}
                        className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                        required
                      >
                        <option value="">Select</option>
                        <option value="subscription">Subscription Plan</option>
                        <option value="onboarding">Onboarding Fee</option>
                        <option value="standard">Pay In Full</option>
                        <option value="premium">Discounted Price</option>
                      </select>
                    </div>

                    {newSchool.PaymentPlan === "subscription" && (
                      <div>
                        <label
                          htmlFor="subscriptionFrequency"
                          className="font-semibold"
                        >
                          Subscription Frequency
                        </label>
                        <select
                          name="subscriptionFrequency"
                          value={newSchool.subscriptionFrequency}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        >
                          <option value="">Select</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                        </select>
                      </div>
                    )}

                    {newSchool.PaymentPlan === "onboarding" && (
                      <div>
                        <label
                          htmlFor="onboardingFee"
                          className="font-semibold"
                        >
                          Onboarding Fee
                        </label>
                        <select
                          name="onboardingFee"
                          value={newSchool.onboardingFee}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        >
                          <option value="">Select</option>
                          <option value="one-time">One-off Payment</option>
                        </select>
                      </div>
                    )}

                    {newSchool.PaymentPlan === "premium" && (
                      <div>
                        <label
                          htmlFor="discountedPrice"
                          className="font-semibold"
                        >
                          Discounted Price
                        </label>
                        <input
                          type="number"
                          name="discountedPrice"
                          placeholder="Enter discounted price"
                          value={newSchool.discountedPrice}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="paymentMethod" className="font-semibold">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={newSchool.paymentMethod}
                        onChange={handleFormChange}
                        className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                        required
                      >
                        <option value="">Select Payment Method</option>
                        <option value="bankTransfer">Bank Transfer</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                      </select>
                    </div>

                    {/* PayPal Details */}
                    {newSchool.paymentMethod === "paypal" && (
                      <div>
                        <h4 className="text-lg text-gray-700 font-semibold mt-4 mb-2">
                          PayPal Details
                        </h4>

                        <input
                          type="email"
                          name="paypalEmail"
                          placeholder="PayPal Email"
                          value={newSchool.paypalEmail}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    )}

                    {(newSchool.paymentMethod === "bankTransfer" ||
                      newSchool.paymentMethod === "creditCard") && (
                      <div>
                        <h4 className="text-lg text-gray-700 font-semibold mt-4 mb-2">
                          Bank Details
                        </h4>

                        <input
                          type="text"
                          name="bankName"
                          placeholder="Bank Name"
                          value={newSchool.bankName}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        />

                        <input
                          type="text"
                          name="accountNumber"
                          placeholder="Account Number"
                          value={newSchool.accountNumber}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        />

                        {/* Conditional Fields for Sort Code, IBAN, Routing Number */}
                        {newSchool.country === "GB" && (
                          <input
                            type="text"
                            name="sortCode"
                            placeholder="Sort Code"
                            value={newSchool.sortCode}
                            onChange={handleFormChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                            required
                          />
                        )}

                        {newSchool.country !== "GB" && (
                          <input
                            type="text"
                            name="iban"
                            placeholder="IBAN"
                            value={newSchool.iban}
                            onChange={handleFormChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                            required
                          />
                        )}

                        {newSchool.country === "US" && (
                          <input
                            type="text"
                            name="routingNumber"
                            placeholder="Routing Number"
                            value={newSchool.routingNumber}
                            onChange={handleFormChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                            required
                          />
                        )}
                      </div>
                    )}
                    {/* PayPal Details */}
                    {newSchool.paymentMethod === "paypal" && (
                      <div>
                        <h4 className="text-lg text-gray-700 font-semibold mt-4 mb-2">
                          PayPal Details
                        </h4>

                        <input
                          type="email"
                          name="paypalEmail"
                          placeholder="PayPal Email"
                          value={newSchool.paypalEmail}
                          onChange={handleFormChange}
                          className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={prevStep}
                      className="ml-auto mt-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto mt-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                      Next
                    </button>
                  </>
                )}

                {/* Step 3: Additional Contact Details */}
                {currentStep === 3 && (
                  <>
                    <h3 className="text-xl mb-4">
                      Step 3: Additional Contact Details
                    </h3>

                    <select
                      name="assignedAdmin"
                      value={newSchool.assignedAdmin}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                    >
                      <option value="">Select Assigned Admin</option>
                      <option value="admin1">John Doe</option>
                      <option value="admin2">Jane Smith</option>
                    </select>

                    <input
                      type="tel"
                      name="alternatePhone"
                      placeholder="Alternate Phone Number"
                      value={newSchool.alternatePhone}
                      onChange={handleFormChange}
                      className="w-full p-3 mb-4 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                    />

                    <button
                      type="button"
                      onClick={prevStep}
                      className="ml-auto mt-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="ml-auto mt-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
                    >
                      Submit
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

 export default Schools;
