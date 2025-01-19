import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Pricing from './pages/Pricing.js';
import Explore from './pages/Explore.js';

function App() {
  return (
    <>
      <h1>Hello WORLD</h1>
      {/* Uncomment the following block to use routing */}
      {/* 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
      */}
    </>
  );
}

export default App;
