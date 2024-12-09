import React, { useState } from "react";

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
  status: "Pending" | "Paid";
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("School Fees");
  const [status, setStatus] = useState<"Pending" | "Paid">("Pending");

  const transactionIdRef = React.useRef(0);

  // Function to add a new transaction
  const handleAddTransaction = () => {
    if (description.trim() === "" || amount <= 0) return;

    const newTransaction: Transaction = {
      id: transactionIdRef.current++,
      type,
      description,
      amount,
      date: new Date().toISOString().split("T")[0],
      status,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setDescription("");
    setAmount(0);
    setType("School Fees");
    setStatus("Pending");
  };

  // Function to remove a transaction
  const handleRemoveTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Transactions</h2>

      {/* Transaction Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-bold text-gray-800 mb-2 text-lg">
          Add Transaction
        </h4>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Transaction Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>School Fees</option>
            <option>Admin Fees</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Pending" | "Paid")}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>

          <button
            onClick={handleAddTransaction}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-green-600 transition"
          >
            ➕ Add Transaction
          </button>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300"
          >
            <div className="space-y-2">
              <p className="font-bold text-gray-900 text-lg">{txn.type}</p>
              <p className="text-gray-600 mt-1">
                Description: {txn.description}
              </p>
              <p className="text-gray-700 mt-1 font-bold">
                Amount: £{txn.amount}
              </p>
              <p className="text-gray-500 mt-1 text-sm">Date: {txn.date}</p>
              <p
                className={`mt-2 rounded-full p-1 text-sm ${
                  txn.status === "Paid"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {txn.status}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveTransaction(txn.id)}
              className="mt-4 bg-red-500 text-white rounded-lg py-1 px-2 hover:bg-red-600 transition"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
