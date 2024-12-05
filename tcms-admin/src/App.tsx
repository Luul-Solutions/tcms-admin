
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './components/Pages/DashboardPage';
import SchoolsPage from './components/Pages/SchoolsPage';
import UsersPage from './components/Pages/UsersPage';
import ReportsPage from './components/Pages/ReportsPage';
import NotificationsPage from './components/Pages/NotificationsPage';
import SettingsPage from './components/Pages/SettingsPage';
import LoginPage from './components/Pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="schools" element={<SchoolsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
