import React, { useState } from 'react';
import '../styles/Explore.css';

const dummyProfiles = [
  {
    id: 1,
    username: 'Emily R.',
    spenderType: 'YOLO',
    age: 27,
    location: 'Boston, MA',
    profileImage: '/images/emily.jpg',
  },
  {
    id: 2,
    username: 'John D.',
    spenderType: 'Investor',
    age: 32,
    location: 'New York, NY',
    profileImage: '/images/john.jpg',
  },
  {
    id: 3,
    username: 'Sara P.',
    spenderType: 'Deal Hunter',
    age: 24,
    location: 'Chicago, IL',
    profileImage: '/images/sara.jpg',
  },
];

function Explore() {
  const [profiles, setProfiles] = useState(dummyProfiles);
  const [swipeDirection, setSwipeDirection] = useState('');

  const handleSwipe = (direction, profile) => {
    setSwipeDirection(direction);
    console.log(`${direction === 'right' ? 'Liked' : 'Disliked'} ${profile.username}`);
    setTimeout(() => {
      setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
      setSwipeDirection('');
    }, 300); // Delay for animation
  };

  return (
    <div className="explore-page">
      <h1 className="explore-title">Explore Profiles</h1>
      <div className="card-container">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <div
              key={profile.id}
              className={`profile-card ${index === 0 ? swipeDirection : ''}`}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${profile.profileImage})`,
                }}
              ></div>
              <div className="card-details">
                <h2>{profile.username}</h2>
                <p>Spender Type: {profile.spenderType}</p>
                <p>Age: {profile.age}</p>
                <p>Location: {profile.location}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => handleSwipe('left', profile)} className="dislike">
                  Dislike
                </button>
                <button onClick={() => handleSwipe('right', profile)} className="like">
                  Like
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-more-profiles">No more profiles to explore!</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
