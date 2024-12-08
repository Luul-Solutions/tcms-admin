import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Schools from "./components/Schools";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-8 bg-gray-100 min-h-screen overflow-auto">
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
