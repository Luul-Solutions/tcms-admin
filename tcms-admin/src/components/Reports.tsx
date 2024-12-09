import React, { useState } from "react";

interface ReportDetails {
  id: string;
  name: string;
  type: string;
  status: string;
  date: string;
}

const mockReports: ReportDetails[] = [
  {
    id: "1",
    name: "Attendance Report",
    type: "Attendance",
    status: "Pending",
    date: "2023-11-10",
  },
  {
    id: "2",
    name: "Monthly Revenue Report",
    type: "Finance",
    status: "Completed",
    date: "2023-11-09",
  },

];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportDetails[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredReports = mockReports.filter(
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
    setFilterStatus(status);
    if (status === "All") {
      setReports(mockReports);
    } else {
      const filtered = mockReports.filter((report) => report.status === status);
      setReports(filtered);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading Report ID: ${reportId}`);
  };

  const handleArchiveReport = (reportId: string) => {
    alert(`Archiving Report ID: ${reportId}`);
  };

  const handleDeleteReport = (reportId: string) => {
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
    alert(`Report ID ${reportId} has been deleted.`);
  };

  const handleAddReport = () => {
    alert("Redirect to 'Generate New Report' form.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Reports", info: mockReports.length },
          {
            title: "Pending Reports",
            info: mockReports.filter((r) => r.status === "Pending").length,
          },
          {
            title: "Completed Reports",
            info: mockReports.filter((r) => r.status === "Completed").length,
          },
          { title: "Archived Reports", info: 10 },
        ].map((stat) => (
          <div
            key={stat.title}
            className="p-4 bg-white rounded-lg shadow-lg text-center"
          >
            <h4 className="text-gray-700 font-bold">{stat.title}</h4>
            <p className="text-gray-600 mt-2 text-xl">{stat.info}</p>
          </div>
        ))}
      </div>

      {/* Report Search Panel */}
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

      {/* Add New Report Shortcut */}
      <button
        onClick={handleAddReport}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        ➕ Generate New Report
      </button>

      {/* Report List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-gray-900 font-bold text-xl">{report.name}</h2>
            <p>
              <span className="font-medium text-gray-700">Type:</span>{" "}
              {report.type}
            </p>
            <p>
              <span className="font-medium text-gray-700">Status:</span>{" "}
              {report.status}
            </p>
            <p>
              <span className="font-medium text-gray-700">Date:</span>{" "}
              {report.date}
            </p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleDownloadReport(report.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Download
              </button>
              <button
                onClick={() => handleArchiveReport(report.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
              >
                Archive
              </button>
              <button
                onClick={() => handleDeleteReport(report.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
