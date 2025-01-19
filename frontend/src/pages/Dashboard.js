import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpendingTypeCard from '../components/SpendingTypeCard';
import RecentMatchesSection from '../components/RecentMatchesSection';
import { FaCog } from 'react-icons/fa'; // Settings icon
import '../styles/Dashboard.css';

function Dashboard({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultUser = {
    username: 'Richie Bucks',
    profileImage: '/images/richie.jpg',
    memberType: 'Base Member',
    spenderType: 'YOLO',
    location: 'Boston, MA',
    age: 25,
    gender: 'Male',
    sexuality: 'Heterosexual',
    matches: [
      { name: 'Emily R.', type: 'YOLO', avatar: '/images/emily.jpg' },
      { name: 'John D.', type: 'Investor', avatar: '/images/john.jpg' },
      { name: 'Sara P.', type: 'Deal Hunter', avatar: '/images/sara.jpg' },
    ],
  };

  const currentUser = user || location.state || defaultUser;

  return (
    <div className="dashboard-container">
      {/* Settings Icon */}
      <div className="settings-icon" onClick={() => navigate('/settings')}>
        <FaCog />
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <img
          src={currentUser.profileImage || '/default-profile.png'}
          alt="Profile"
          className="large-profile-image"
        />
        <h2 className="username">{currentUser.username}</h2>
        <p className="member-type">{currentUser.memberType}</p>
      </div>

      {/* Spending Type Card Section */}
      <div className="card-section">
        <SpendingTypeCard
          spendingType={currentUser.spenderType}
          location={currentUser.location}
          age={currentUser.age}
          gender={currentUser.gender}
          sexuality={currentUser.sexuality}
          profileImage={currentUser.profileImage}
        />
        <button
          className="learn-more-button"
          onClick={() => navigate('/spender-types')}
        >
          Learn More About Spending Types
        </button>
      </div>

      {/* Recent Matches Section */}
      <div className="matches-section">
        <h3 className="matches-title">Recent Matches</h3>
        <RecentMatchesSection matches={currentUser.matches} />
      </div>
    </div>
  );
}

export default Dashboard;
