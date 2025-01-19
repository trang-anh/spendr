import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCompass, FaCog } from 'react-icons/fa';
import '../styles/GlobalNavigation.css';

function GlobalNavigation() {
  return (
    <nav className="global-navigation">
      <NavLink to="/dashboard" className="nav-item" activeClassName="active">
        <FaHome />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/explore" className="nav-item" activeClassName="active">
        <FaCompass />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/settings" className="nav-item" activeClassName="active">
        <FaCog />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default GlobalNavigation;
