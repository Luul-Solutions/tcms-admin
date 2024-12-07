import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import Dashboard from "./components/Dashboard"; // Dashboard component
import Schools from "./components/Schools"; // School details component
import Users from "./components/Users"; // User details component
import Reports from "./components/Reports"; // Report details component
import Notifications from "./components/Notifications"; // Notifications component
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-8 ml-64 bg-gray-100 min-h-screen">
          {/* Adjusted the layout to accommodate the sidebar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/school/:schoolName" element={<Schools />} />
            <Route path="/user/:userName" element={<Users />} />
            <Route path="/report/:reportTitle" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
