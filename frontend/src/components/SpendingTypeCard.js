import React from 'react';
import '../styles/SpendingTypeCard.css';

function SpendingTypeCard({ spendingType, location, age, gender, sexuality, profileImage }) {
  return (
    <div className="credit-card">
      <div className="card-profile">
        <img src={profileImage || '/default-profile.png'} alt="Profile" className="profile-image" />
      </div>
      <div className="card-details">
        <h2 className="spender-type">{spendingType} Spender</h2>
        <p>Location: {location}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Sexuality: {sexuality}</p>
      </div>
    </div>
  );
}

export default SpendingTypeCard;
