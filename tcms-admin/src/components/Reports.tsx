import React, { useState, useEffect } from "react";
import reportsData from "../Data/reports.json";

interface ReportDetails {
  id: string;
  name: string;
  type: string;
  status: string;
  date: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportDetails[]>(reportsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  console.log("Reports Data:", reportsData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    console.log("Search Term:", term);
    setSearchTerm(term);

    const filteredReports = reportsData.filter(
      (report) =>
        report.name.toLowerCase().includes(term) ||
        report.type.toLowerCase().includes(term),
    );
    setReports(filteredReports);
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = e.target.value;
    console.log("Filter Status:", status);
    setFilterStatus(status);

    if (status === "All") {
      setReports(reportsData);
    } else {
      const filtered = reportsData.filter((report) => report.status === status);
      setReports(filtered);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Reports by Name or Type"
        onChange={handleSearch}
        className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter Reports by Status */}
      <select
        onChange={handleFilterStatusChange}
        className="mb-4 p-3 rounded-lg bg-gray-200 w-full"
      >
        {["All", "Pending", "Completed", "Archived"].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Report List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-gray-900 font-bold text-xl">{report.name}</h2>
            <p>Type: {report.type}</p>
            <p>Status: {report.status}</p>
            <p>Date: {report.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
