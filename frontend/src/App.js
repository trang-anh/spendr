import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignupProcess from './pages/SignupProcess';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import GlobalNavigation from './components/GlobalNavigation';

function App() {
  const location = useLocation(); // Get the current route path

  // Define routes where the navigation bar should be hidden
  const hideNavigation = location.pathname === '/';

  return (
    <div className="app-container">
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<SignupProcess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Conditionally render navigation */}
      {!hideNavigation && <GlobalNavigation />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
