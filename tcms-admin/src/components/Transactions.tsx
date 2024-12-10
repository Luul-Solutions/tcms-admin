import React, { useState, useEffect, useRef } from "react";

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

  const transactionIdRef = useRef(0);

  // Load transactions from JSON file (Placeholder)
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetch("/data/transactions.json");
        const data: any[] = await response.json();

        // Ensure proper types are enforced
        const formattedData: Transaction[] = data.map((txn) => ({
          ...txn,
          status: txn.status as "Pending" | "Paid",
        }));

        setTransactions(formattedData);
        transactionIdRef.current = Math.max(
          0,
          ...formattedData.map((txn) => txn.id),
        );
      } catch (error) {
        console.error("Failed to load transactions from JSON", error);
      }
    };

    loadTransactions();

    /*
    // Placeholder for fetching transactions from backend API
    try {
      const response = await fetch("/api/transactions");
      const data: Transaction[] = await response.json();
      setTransactions(data);
      transactionIdRef.current = Math.max(0, ...data.map((txn) => txn.id));
    } catch (error) {
      console.error("Failed to fetch transactions from backend", error);
    }
    */
  }, []);

  // Add a new transaction
  const handleAddTransaction = async () => {
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

    /*
    // Placeholder for sending a new transaction to the backend
    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
    } catch (error) {
      console.error("Failed to add transaction to the backend", error);
    }
    */

    /*
    // Placeholder for updating transactions in the backend JSON
    try {
      const updatedTransactions = [...transactions, newTransaction];
      await fetch("/data/transactions.json", {
        method: "PUT",
        body: JSON.stringify(updatedTransactions),
      });
    } catch (error) {
      console.error("Failed to update JSON file with new transaction", error);
    }
    */
  };

  // Remove a transaction
  const handleRemoveTransaction = async (id: number) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));

    /*
    // Placeholder for removing a transaction from the backend
    try {
      await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to remove transaction from backend", error);
    }
    */

    /*
    // Placeholder to update backend JSON after removing transaction
    try {
      const filteredTransactions = transactions.filter((txn) => txn.id !== id);
      await fetch("/data/transactions.json", {
        method: "PUT",
        body: JSON.stringify(filteredTransactions),
      });
    } catch (error) {
      console.error("Failed to update transactions in backend JSON", error);
    }
    */
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Transactions</h2>

      {/* Transaction Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-bold text-gray-800 mb-2 text-lg">
          Add Transaction
        </h4>

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
