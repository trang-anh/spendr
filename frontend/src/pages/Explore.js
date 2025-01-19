import React from 'react';
import '../styles/Explore.css'; // Import styles

// Sample profiles
const profiles = [
  {
    id: 1,
    photo: '/images/user1.jpg',
    username: 'Emily R.',
    age: 28,
    location: 'Boston, MA',
    spenderType: 'YOLO Spendr',
  },
  {
    id: 2,
    photo: '/images/user2.jpg',
    username: 'John D.',
    age: 32,
    location: 'New York, NY',
    spenderType: 'Investr',
  },
  {
    id: 3,
    photo: '/images/user3.jpg',
    username: 'Sarah P.',
    age: 24,
    location: 'Austin, TX',
    spenderType: 'Balanced Budgetr',
  },
  {
    id: 4,
    photo: '/images/user4.jpg',
    username: 'Mike K.',
    age: 30,
    location: 'Seattle, WA',
    spenderType: 'Deal Huntr',
  },
];

function Explore() {
  return (
    <div className="explore-container">
      <h1>Explore Profiles</h1>
      <div className="profile-card-container">
        {profiles.map((profile) => (
          <div className="profile-card" key={profile.id}>
            <img
              src={profile.photo}
              alt={`${profile.username}'s profile`}
              className="profile-photo"
            />
            <div className="profile-info">
              <h2>{profile.username}, {profile.age}</h2>
              <p>{profile.location}</p>
              <span className={`spender-type ${profile.spenderType.toLowerCase().replace(/\s/g, '-')}`}>
                {profile.spenderType}
              </span>
            </div>
            <div className="action-buttons">
              <button className="dislike-button">Dislike</button>
              <button className="like-button">Like</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
