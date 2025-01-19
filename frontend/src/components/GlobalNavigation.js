import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa'; // Crown icon
import '../styles/GlobalNavigation.css';

function GlobalNavigation() {
  const navigate = useNavigate();

  return (
    <div className="global-navigation">
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/explore')}>Explore</button>

      {/* Premium "Likes Me" Option */}
      <button
        className="premium-button"
        onClick={() => navigate('/pricing')}
      >
        Likes Me <FaCrown className="premium-crown" />
      </button>
    </div>
  );
}

export default GlobalNavigation;
