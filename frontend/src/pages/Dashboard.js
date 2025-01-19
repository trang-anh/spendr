import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import SpendingTypeCard from '../components/SpendingTypeCard';
import RecentMatchesSection from '../components/RecentMatchesSection';
import DashboardFooter from '../components/DashboardFooter';
import '../styles/Dashboard.css';

function Dashboard() {
  // Default user object for data not collected via signup
  const defaultUser = {
    username: 'Richie Bucks', // Default username
    profileImage: '/images/richie.jpg', // Default profile image
    memberType: 'Base Member', // Default membership type
    spenderType: 'YOLO', // Default spender type
    location: 'New York', // Default location
    age: 25, // Default age
    gender: 'Male', // Default gender
    sexuality: 'Heterosexual', // Default sexuality
    matches: [ // Default matches for demo purposes
      { name: 'Emily R.', type: 'YOLO', avatar: '/images/emily.jpg' },
      { name: 'John D.', type: 'Investor', avatar: '/images/john.jpg' },
    ],
  };

  // Fetch user data passed from the signup process, or fallback to defaults
  const location = useLocation();
  const user = location.state || defaultUser;

  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    window.location.href = `/${page}`; // Navigate to the specified page
  };

  return (
    <div className="dashboard-container">
      {/* Header with dynamic user data */}
      <DashboardHeader
        username={user.username}
        profileImage={user.profileImage}
        memberType={user.memberType}
      />

      {/* Spending Type Card with user-specific public details */}
      <SpendingTypeCard
        spendingType={user.spenderType}
        location={user.location}
        age={user.age}
        gender={user.gender}
        sexuality={user.sexuality}
      />

      {/* Recent Matches Section */}
      <RecentMatchesSection matches={user.matches} />

      {/* Footer Navigation */}
      <DashboardFooter navigateTo={navigateTo} />
    </div>
  );
}

export default Dashboard;
