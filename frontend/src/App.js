import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Settings from './pages/Settings'; // Create this placeholder file
import GlobalNavigation from './components/GlobalNavigation';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <GlobalNavigation />
      </div>
    </Router>
  );
}

export default App;
