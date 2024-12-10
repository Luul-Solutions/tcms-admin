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
import Transactions from "./components/Transactions";
import Login from "./components/Login";

import Appearance from "./components/Settings/Appearance";
import Password from "./components/Settings/Password";
import Team from "./components/Settings/Team";
import Details from "./components/Settings/Details";
import Profile from "./components/Settings/Profile";

const App: React.FC = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setAuth(!!user);
  }, []);

  return (
    <Router>
      <div className="flex">
        {!auth ? (
          <Login setAuth={setAuth} />
        ) : (
          <>
            {/* Sidebar Component */}
            <Sidebar setAuth={setAuth} />

            {/* Main content area */}
            <div className="p-8 min-h-screen flex-1 bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard setAuth={setAuth} />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/users" element={<Users />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/appearance" element={<Appearance />} />
                <Route path="/settings/password" element={<Password />} />
                <Route path="/settings/team" element={<Team />} />
                <Route path="/settings/details" element={<Details />} />
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
