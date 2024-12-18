import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { getSchools } from "../../services/auth"; // Function to fetch schools

interface School {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  schoolId: string;
  amount: number;
  date: string;
}

const Transactions: React.FC = () => {
  const {
    data: schools,
    isLoading,
    isError,
  } = useQuery("getSchools", getSchools);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("");

  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchoolId(event.target.value);
  };

  const handleAddTransaction = async (event: React.FormEvent) => {
    event.preventDefault();

    // Assuming we have a form with an amount and schoolId (from the state)
    const transactionData = {
      amount: 100, // Example amount
      schoolId: selectedSchoolId,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        transactionData,
      );
      alert("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction", error);
      alert("Failed to add transaction");
    }
  };

  if (isLoading) return <div>Loading schools...</div>;
  if (isError) return <div>Error loading schools</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Add New Transaction Form */}
      <form onSubmit={handleAddTransaction} className="space-y-4">
        <div>
          <label htmlFor="school" className="block text-gray-700 font-medium">
            Select School
          </label>
          <select
            id="school"
            value={selectedSchoolId}
            onChange={handleSchoolChange}
            className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg"
            required
          >
            <option value="">-- Select a School --</option>
            {schools?.rows.map((school: School) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg"
            placeholder="Amount"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Transaction
          </button>
        </div>
      </form>

      {/* Display Existing Transactions */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Existing Transactions</h2>
        {/* Display all transactions, assuming transactions have schoolId linked */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-4 text-left">Transaction ID</th>
              <th className="border p-4 text-left">School</th>
              <th className="border p-4 text-left">Amount</th>
              <th className="border p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this with actual transaction data */}
            {[
              { id: "1", schoolId: "123", amount: 100, date: "2024-12-01" },
              { id: "2", schoolId: "456", amount: 200, date: "2024-12-05" },
            ].map((transaction: Transaction) => (
              <tr key={transaction.id}>
                <td className="border p-4">{transaction.id}</td>
                <td className="border p-4">
                  {/* Find the school name from the selected schoolId */}
                  {
                    schools?.rows.find(
                      (school: School) => school.id === transaction.schoolId,
                    )?.name
                  }
                </td>
                <td className="border p-4">{transaction.amount}</td>
                <td className="border p-4">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
 