import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Pages/Sidebar";
import Dashboard from "./components/Pages/Dashboard";
import Schools from "./components/Pages/Schools";
import Users from "./components/Pages/Users";
import Reports from "./components/Pages/Reports";
import Notifications from "./components/Pages/Notifications";
import Transactions from "./components/Pages/Transactions";
import Login from "./components/Pages/Login";

import Appearance from "./components/Pages/Settings/Appearance";
import Password from "./components/Pages/Settings/Password";
import Team from "./components/Pages/Settings/Team";
import Details from "./components/Pages/Settings/Details";
import Profile from "./components/Pages/Settings/Profile";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("Auth state loaded from local storage:", !!user);
    setAuth(!!user);
  }, []);

  console.log("Auth state:", auth);

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex h-screen bg-gray-100">
          {!auth ? (
            <Login setAuth={setAuth} />
          ) : (
            <>
              <Sidebar setAuth={setAuth} />
              <div className="p-8 min-h-screen flex-1 bg-gray-100 overflow-auto">
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
    </ErrorBoundary>
  );
};

export default App;
