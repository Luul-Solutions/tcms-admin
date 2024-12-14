import React, { useState, useEffect, useMemo } from "react";
import reportsData from "../../Data/reports.json";

const ALLOWED_STATUSES = ["Pending", "Completed", "Archived"] as const;

interface ReportDetails {
  id: string;
  name: string;
  type: string;
  status: "Pending" | "Completed" | "Archived";
  date: string;
}

const transformReportsData = (data: any[]): ReportDetails[] => {
  return data
    .filter(
      (item) =>
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.type === "string" &&
        ALLOWED_STATUSES.includes(item.status as any) &&
        typeof item.date === "string",
    )
    .map((item) => ({
      ...item,
      status: item.status as "Pending" | "Completed" | "Archived",
    }));
};

const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reportsPerPage] = useState<number>(10);

  useEffect(() => {
    try {
      const validatedReports = transformReportsData(reportsData);
      setReports(validatedReports);
    } catch (error) {
      console.error("Error transforming reports data:", error);
    }

    // Example of a backend call (this is commented out)
    /*
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => {
        const validatedReports = transformReportsData(data);
        setReports(validatedReports);
      })
      .catch(error => console.error("Error fetching reports:", error));
    */
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = e.target.value;
    setFilterStatus(status);
  };

  const handleStatusChange = (
    id: string,
    currentStatus: "Pending" | "Completed" | "Archived",
  ) => {
    let nextStatus: "Pending" | "Completed" | "Archived";

    if (currentStatus === "Pending") nextStatus = "Completed";
    else if (currentStatus === "Completed") nextStatus = "Archived";
    else nextStatus = "Archived";

    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, status: nextStatus } : report,
    );
    setReports(updatedReports);
  };

  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm) ||
          report.type.toLowerCase().includes(searchTerm),
      );
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((report) => report.status === filterStatus);
    }

    return filtered;
  }, [searchTerm, filterStatus, reports]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700 mb-2">
          Search Reports
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or type"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="filter-status" className="block text-gray-700 mb-2">
          Filter by Status
        </label>
        <select
          id="filter-status"
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="w-full p-3 rounded-lg bg-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {["All", ...ALLOWED_STATUSES].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentReports.map((report) => (
          <div
            key={report.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-lg font-bold text-gray-800">{report.name}</h2>
            <p className="text-sm text-gray-600">Type: {report.type}</p>
            <p
              className={`text-sm font-medium ${
                report.status === "Completed"
                  ? "text-green-600"
                  : report.status === "Pending"
                    ? "text-yellow-600"
                    : "text-gray-500"
              }`}
            >
              Status: {report.status}
            </p>
            <p className="text-sm text-gray-500">Date: {report.date}</p>

            {report.status !== "Archived" && (
              <button
                onClick={() => handleStatusChange(report.id, report.status)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Mark as {report.status === "Pending" ? "Completed" : "Archived"}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reports;
