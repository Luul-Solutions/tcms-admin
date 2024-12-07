import React from "react";
import { useParams } from "react-router-dom";

const Reports: React.FC = () => {
  const { reportTitle } = useParams(); // Capture the dynamic URL parameter

  // Example mock data (this could be fetched from an API in a real app)
  const reportDetails = {
    title: reportTitle,
    date: "2024-12-01",
    filters: "All Schools",
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Report Details for {reportDetails.title}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        <h3 className="text-2xl font-semibold">Report Information</h3>
        <p>Title: {reportDetails.title}</p>
        <p>Date: {reportDetails.date}</p>
        <p>Filters: {reportDetails.filters}</p>
      </div>
    </div>
  );
};

export default Reports;
