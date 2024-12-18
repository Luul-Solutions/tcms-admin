import React, { useState, useEffect, useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

  // State for new report form
  const [newReport, setNewReport] = useState({
    name: "",
    type: "",
    status: "Pending" as "Pending" | "Completed" | "Archived",
    date: "",
  });

  useEffect(() => {
    try {
      const validatedReports = transformReportsData(reportsData);
      setReports(validatedReports);
    } catch (error) {
      console.error("Error transforming reports data:", error);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterStatus(e.target.value);
  };

  const handleAddReport = () => {
    const newId = (reports.length + 1).toString();
    const reportToAdd = {
      id: newId,
      name: newReport.name,
      type: newReport.type,
      status: newReport.status,
      date: newReport.date,
    };

    setReports([...reports, reportToAdd]);
    setNewReport({ name: "", type: "", status: "Pending", date: "" });
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

  // Function to generate and download PDF
  const generatePDF = () => {
    const input = document.getElementById("report-list");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("reports.pdf");
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Report Form */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newReport.name}
            onChange={(e) =>
              setNewReport({ ...newReport, name: e.target.value })
            }
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Type"
            value={newReport.type}
            onChange={(e) =>
              setNewReport({ ...newReport, type: e.target.value })
            }
            className="p-3 border rounded-lg"
          />
          <input
            type="date"
            value={newReport.date}
            onChange={(e) =>
              setNewReport({ ...newReport, date: e.target.value })
            }
            className="p-3 border rounded-lg"
          />
          <select
            value={newReport.status}
            onChange={(e) =>
              setNewReport({
                ...newReport,
                status: e.target.value as "Pending" | "Completed" | "Archived",
              })
            }
            className="p-3 border rounded-lg"
          >
            {ALLOWED_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddReport}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Report
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 rounded-lg border w-full"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="p-3 border rounded-lg"
        >
          {["All", ...ALLOWED_STATUSES].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* PDF Download Button */}
      <div className="mb-4 text-right">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>

      {/* Reports List */}
      <div
        id="report-list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentReports.map((report) => (
          <div key={report.id} className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{report.name}</h2>
            <p>Type: {report.type}</p>
            <p>Status: {report.status}</p>
            <p>Date: {report.date}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200">
          Page {currentPage} of {totalPages}
        </span>
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
