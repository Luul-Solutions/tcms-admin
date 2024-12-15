import React, { useState, useEffect, useRef } from "react";

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
  status: "Pending" | "Paid";
  paymentMethod: string;
  invoiceNo: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const transactionIdRef = useRef<number>(1);

  // Dummy data to simulate transactions
  useEffect(() => {
    const sampleData: Transaction[] = [
      {
        id: 1,
        type: "Return",
        description: "Product return",
        amount: 1500,
        date: "2021-08-19",
        status: "Pending",
        paymentMethod: "Cash",
        invoiceNo: "INV12345",
      },
      {
        id: 2,
        type: "Payoff",
        description: "Order payment",
        amount: 1200,
        date: "2021-08-20",
        status: "Paid",
        paymentMethod: "Cash",
        invoiceNo: "INV12346",
      },
    ];

    setTransactions(sampleData);

    // Example of a backend call (this is commented out)
    /*
    fetch('/api/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
    */
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter((txn) =>
    txn.invoiceNo.includes(searchTerm),
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Transaction Management
      </h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4">
          POS
        </button>

        <button className="bg-green-500 text-white rounded-lg py-2 px-4">
          ➕ Add Transaction
        </button>

        <button className="bg-indigo-500 text-white rounded-lg py-2 px-4">
          Export Orders
        </button>

        <input
          placeholder="Search by Transaction No"
          value={searchTerm}
          onChange={handleSearch}
          className="ml-auto px-4 py-2 rounded-lg bg-gray-100"
        />
      </div>

      {/* Filter by Date Range */}
      <div className="flex gap-4 mt-4">
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg p-2 bg-gray-100"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg p-2 bg-gray-100"
        />
      </div>

      {/* Transaction List */}
      <div className="mt-4 overflow-auto bg-white rounded-lg shadow-lg p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              {[
                "Transaction No",
                "Date",
                "Transaction Type",
                "Amount",
                "Payment Method",
                "Invoice No",
              ].map((header) => (
                <th key={header} className="py-2 bg-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-t text-center">
                  <td className="py-2">{txn.id}</td>
                  <td className="py-2">{txn.date}</td>
                  <td>{txn.type}</td>
                  <td>${txn.amount}</td>
                  <td>{txn.paymentMethod}</td>
                  <td>{txn.invoiceNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
