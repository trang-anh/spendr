import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for now; enable when integrating backend
import DashboardHeader from '../components/DashboardHeader';
import SpendingTypeCard from '../components/SpendingTypeCard';
import RecentMatchesSection from '../components/RecentMatchesSection';
import DashboardFooter from '../components/DashboardFooter';
import '../styles/Dashboard.scss';

function Dashboard() {
  // Placeholder state for user data (mock data for now)
  const [user, setUser] = useState({
    username: 'Richie Bucks', // Mock username
    profileImage: '/images/default-profile.jpg', // Default profile image
    memberType: 'Base Member', // Mock membership type
    spendingType: 'YOLO', // Mock spending type
    preferences: ['Investor', 'YOLO', 'Luxury Lover'], // Mock preferences
  });

  // Placeholder state for matches (mock data for now)
  const [matches, setMatches] = useState([
    { name: 'Abigail W.', avatar: '/images/abigail.jpg', time: 'Just now', type: 'YOLO' },
    { name: 'Sammy G.', avatar: '/images/sammy.jpg', time: '2h', type: 'YOLO' },
    { name: 'Isabella E.', avatar: '/images/isabella.jpg', time: '6h', type: 'Investor' },
    { name: 'Katie L.', avatar: '/images/katie.jpg', time: '15h', type: 'YOLO' },
    { name: 'Vanessa D.', avatar: '/images/vanessa.jpg', time: '16h', type: 'Luxury Lover' },
  ]);

  
  /*
  // Uncomment the useEffect block when ready to integrate backend
  useEffect(() => {
    // Fetch user data and matches from the backend
    axios
      .get('/api/dashboard') // Replace with your actual API endpoint
      .then((response) => {
        const { user, matches, isPremium } = response.data;
        setUser(user); // Populate user info
        setMatches(matches); // Populate matches
        setIsPremium(isPremium); // Determine if the user is a premium member
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);
  */

  // Navigation handler (mocked for now)
  const navigateTo = (page) => {
    console.log(`Navigating to ${page}`);
    if (page === 'liked-me') {
      console.log('Redirecting to Pricing Page for Premium Feature');
      // Redirect to Pricing Page
      window.location.href = '/pricing'; // Temporary redirect
      return;
    }
    // Navigate to other pages
    window.location.href = `/${page}`; // Update this to use React Router if applicable
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <DashboardHeader
        username={user.username} // Placeholder username
        profileImage={user.profileImage} // Placeholder profile image
        memberType={user.memberType} // Placeholder membership type
      />

      {/* Spending Type Card */}
      <SpendingTypeCard
        spendingType={user.spendingType} // Placeholder spending type
        preferences={user.preferences} // Placeholder preferences
      />

      {/* Recent Matches Section */}
      <RecentMatchesSection matches={matches} /> {/* Placeholder matches */}

      {/* Dashboard Footer */}
      <DashboardFooter navigateTo={navigateTo}/>


    </div>
  );
}

export default Dashboard;
