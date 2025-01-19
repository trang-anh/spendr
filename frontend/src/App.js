import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import SignupProcess from './pages/SignupProcess';
import GlobalNavigation from './components/GlobalNavigation';
import SpenderTypeDescriptions from './pages/SpenderTypeDescriptions';
import Pricing from './pages/Pricing';
import './styles/App.css'

function App() {
  const [user, setUser] = useState({
    username: 'Richie Bucks',
    profileImage: '/images/richie.jpg',
    memberType: 'Base Member',
    spenderType: 'YOLO',
    location: 'New York',
    age: 25,
    gender: 'Male',
    sexuality: 'Heterosexual',
    matches: [
      { name: 'Emily R.', type: 'YOLO', avatar: '/images/emily.jpg' },
      { name: 'John D.', type: 'Investor', avatar: '/images/john.jpg' },
    ],
  });

  const location = useLocation();
  const navigate = useNavigate();
  const hideNavigation = location.pathname === '/';

  return (
    <div className="app-container">
      {/* Global Header with Logo */}
      <div className="app-header">
        <img
          src='/images/Spendr logo <3 $ only.png' // Replace with the correct path to your logo
          alt="Spendr Logo"
          className="app-logo"
          onClick={() => navigate('/')} // Navigate to home page
        />
      </div>

      {/* Main Content */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<SignupProcess setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
          <Route path="/spender-types" element={<SpenderTypeDescriptions />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>

      {/* Global Navigation */}
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
