import React from 'react';
import '../styles/SpendingTypeCard.css';

function SpendingTypeCard({ spendingType, location, age, gender, sexuality }) {
  return (
    <div className="spending-type-card">
      <h2>Your Public Profile</h2>
      <ul>
        <li><strong>Location:</strong> {location}</li>
        <li><strong>Age:</strong> {age}</li>
        <li><strong>Gender:</strong> {gender}</li>
        <li><strong>Sexuality:</strong> {sexuality}</li>
        <li><strong>Spender Type:</strong> {spendingType}</li>
      </ul>
    </div>
  );
}

export default SpendingTypeCard;
