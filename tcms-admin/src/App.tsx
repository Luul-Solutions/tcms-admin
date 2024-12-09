import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Schools from "./components/Schools";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Notifications from "./components/Notifications";
import AdminSettings from "./components/Settings";
import Profile from "./components/Settings/Profile";
import Password from "./components/Settings/Password";
import Team from "./components/Settings/Team";
import Details from "./components/Settings/Details";
import Appearance from "./components/Settings/Appearance";
import Transactions from "./components/Transactions";
import Login from "./components/Login";

const App: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {!auth ? (
          <Login setAuth={setAuth} />
        ) : (
          <>
            <Sidebar setAuth={setAuth} />
            <div className="flex-1 p-8 bg-gray-100 min-h-screen overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard setAuth={undefined} />} />
                <Route path="/school/:schoolName" element={<Schools />} />
                <Route path="/user/:userName" element={<Users />} />
                <Route path="/report/:reportTitle" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/password" element={<Password />} />
                <Route path="/settings/team" element={<Team />} />
                <Route path="/settings/details" element={<Details />} />
                <Route path="/settings/appearance" element={<Appearance />} />
                <Route path="/transactions" element={<Transactions />} />
                {/* Redirect unknown routes to Dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
