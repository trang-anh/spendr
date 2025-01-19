import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import SignupProcess from './pages/SignupProcess';
import GlobalNavigation from './components/GlobalNavigation';
import SpenderTypeDescriptions from './pages/SpenderTypeDescriptions';
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
  const hideNavigation = location.pathname === '/';

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupProcess setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
        <Route path="/spender-types" element={<SpenderTypeDescriptions />} />
      </Routes>

      {/* Show navigation bar unless on the signup page */}
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
