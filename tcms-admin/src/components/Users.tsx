import React from "react";
import { useParams } from "react-router-dom";

const Users: React.FC = () => {
  const { userName } = useParams(); // Capture the dynamic URL parameter

  // Example mock data (this could be fetched from an API in a real app)
  const userDetails = {
    name: userName,
    role: "Admin",
    status: "Active",
    email: `${'userName'.toLowerCase()}@example.com`,
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        User Details for {userDetails.name}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        <h3 className="text-2xl font-semibold">User Information</h3>
        <p>Name: {userDetails.name}</p>
        <p>Role: {userDetails.role}</p>
        <p>Status: {userDetails.status}</p>
        <p>Email: {userDetails.email}</p>
      </div>
    </div>
  );
};

export default Users;
