import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Uncomment when integrating backend
import '../styles/Explore.scss';

function Explore() {
  const [profiles, setProfiles] = useState([
    // Dummy profiles for testing
    {
      id: 1,
      name: 'Emily R.',
      age: 26,
      location: 'New York',
      spendingType: 'YOLO',
      avatar: '/images/emily.jpg',
    },
    {
      id: 2,
      name: 'John D.',
      age: 30,
      location: 'San Francisco',
      spendingType: 'Investor',
      avatar: '/images/john.jpg',
    },
    {
      id: 3,
      name: 'Sophia L.',
      age: 24,
      location: 'Chicago',
      spendingType: 'Luxury Lover',
      avatar: '/images/sophia.jpg',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current profile index
  const [isSwiping, setIsSwiping] = useState(false); // Track swipe animation

  const currentProfile = profiles[currentIndex]; // Get the current profile

  // Fetch profile suggestions from backend (commented out for now)
  /*
  useEffect(() => {
    axios
      .get('/api/profiles/suggestions')
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile suggestions:', error);
      });
  }, []);
  */

  const handleLike = () => {
    if (!currentProfile) return;
    console.log(`Liked: ${currentProfile.name}`);
    // Uncomment to send "like" to backend
    /*
    axios.post('/api/profiles/like', { profileId: currentProfile.id })
      .then(response => console.log('Like sent to backend:', response))
      .catch(error => console.error('Error liking profile:', error));
    */
    triggerSwipe('right');
  };

  const handleDislike = () => {
    if (!currentProfile) return;
    console.log(`Disliked: ${currentProfile.name}`);
    // Uncomment to send "dislike" to backend
    /*
    axios.post('/api/profiles/dislike', { profileId: currentProfile.id })
      .then(response => console.log('Dislike sent to backend:', response))
      .catch(error => console.error('Error disliking profile:', error));
    */
    triggerSwipe('left');
  };

  const triggerSwipe = (direction) => {
    setIsSwiping(direction);
    setTimeout(() => {
      setIsSwiping(false);
      goToNextProfile();
    }, 500); // Match CSS animation duration
  };

  const goToNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('No more profiles to explore.');
    }
  };

  return (
    <div className="explore-container">
      {/* Navigation Button */}
      <div className="explore-nav">
        <button onClick={() => (window.location.href = '/dashboard')}>Back to Dashboard</button>
      </div>

      <h1>Explore Matches</h1>
      {currentProfile ? (
        <div className={`profile-card ${isSwiping ? `swipe-${isSwiping}` : ''}`}>
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>{currentProfile.name}, {currentProfile.age}</h2>
            <p>{currentProfile.location}</p>
            <p className="spending-type">Spending Type: {currentProfile.spendingType}</p>
          </div>
          <div className="actions">
            <button className="dislike-btn" onClick={handleDislike}>
              Dislike
            </button>
            <button className="like-btn" onClick={handleLike}>
              Like
            </button>
          </div>
        </div>
      ) : (
        <p>No more profiles to explore.</p>
      )}
    </div>
  );
}

export default Explore;
