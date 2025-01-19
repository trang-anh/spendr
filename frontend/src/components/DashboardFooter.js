import React from 'react';
import { FaHeart, FaUserFriends, FaStar } from 'react-icons/fa';

function DashboardFooter({ navigateTo }) {
  const handleLikes = () => {
    navigateTo('likes');
  };

  const handleLikedMe = () => {
    // Always redirect to Pricing Page
    window.location.href = '/pricing';
  };

  const handleTopPicks = () => {
    navigateTo('explore'); // Navigate to the Explore Page
  };

  return (
    <footer className="dashboard-footer">
      <button onClick={handleLikes}>
        <FaHeart />
        <span>Likes</span>
      </button>
      <button onClick={handleLikedMe} className="premium-feature">
        <FaUserFriends />
        <span>Liked Me</span>
        <span className="premium-badge">Premium</span>
      </button>
      <button onClick={handleTopPicks}>
        <FaStar />
        <span>Top Picks</span>
      </button>
    </footer>
  );
}

export default DashboardFooter;
