import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SpendingTypeCard from '../components/SpendingTypeCard';
import RecentMatchesSection from '../components/RecentMatchesSection';
import DashboardFooter from '../components/DashboardFooter';

function Dashboard() {
  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    window.location.href = `/${page}`;
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        username="Richie Bucks"
        profileImage="/images/richie.jpg"
        memberType="Base Member"
      />
      <SpendingTypeCard
        spendingType="YOLO"
        preferences={['Investor', 'YOLO', 'Luxury Lover']}
      />
      <RecentMatchesSection
        matches={[
          { name: 'Emily R.', type: 'YOLO', avatar: '/images/emily.jpg' },
        ]}
      />
      <DashboardFooter navigateTo={navigateTo} />
    </div>
  );
}

export default Dashboard;
