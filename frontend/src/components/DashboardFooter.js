import React from 'react';
import { FaHeart, FaUserFriends, FaStar } from 'react-icons/fa';

function DashboardFooter({ navigateTo }) {
  return (
    <footer className="dashboard-footer">
      <button onClick={() => navigateTo('likes')}>
        <FaHeart />
        <span>Likes</span>
      </button>
      <button onClick={() => navigateTo('signup')}>
        <FaUserFriends />
        <span>Liked Me</span>
      </button>
      <button onClick={() => navigateTo('pricing')}>
        <FaStar />
        <span>Top Picks</span>
      </button>
    </footer>
  );
}

export default DashboardFooter;
