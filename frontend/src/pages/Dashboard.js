import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DashboardHeader from '../components/DashboardHeader';
import SpendingTypeCard from '../components/SpendingTypeCard';
import RecentMatchesSection from '../components/RecentMatchesSection';
import DashboardFooter from '../components/DashboardFooter';
import '../styles/Dashboard.css';

function Dashboard({ user }) {
  const navigate = useNavigate(); // Use useNavigate for routing

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <DashboardHeader
        username={user.username}
        profileImage={user.profileImage}
        memberType={user.memberType}
      />

      {/* Spending Type Card with user details */}
      <SpendingTypeCard
        spendingType={user.spenderType}
        location={user.location}
        age={user.age}
        gender={user.gender}
        sexuality={user.sexuality}
      />

      {/* Button to navigate to spender type descriptions */}
      <button
        className="spender-type-button"
        onClick={() => navigate('/spender-types')}
      >
        Learn More About Spender Types
      </button>

      {/* Recent Matches Section */}
      <RecentMatchesSection matches={user.matches} />

      {/* Footer Navigation */}
      <DashboardFooter navigateTo={navigate} />
    </div>
  );
}

export default Dashboard;
