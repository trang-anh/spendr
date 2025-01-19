import React from 'react';

function DashboardHeader({ username, profileImage, memberType }) {
  return (
    <header className="dashboard-header">
      <div className="profile">
        <img src={profileImage} alt={`${username}'s profile`} className="profile-image" />
        <div className="profile-info">
          <h1>Welcome back</h1>
          <h2>{username}</h2>
          <p>{memberType}</p>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
