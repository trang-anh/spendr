import React from 'react';

function SpendingTypeCard({ spendingType, preferences }) {
  return (
    <div className="spending-card">
      <h3>{spendingType} Spending Type</h3>
      <p>Most recent preferences:</p>
      <ul>
        {preferences.map((preference, index) => (
          <li key={index}>{preference}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpendingTypeCard;
