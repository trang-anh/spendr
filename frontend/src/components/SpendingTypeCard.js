import React from 'react';

function SpendingTypeCard({ spendingType, preferences }) {
  return (
    <div className="spending-card">
      <h3>{spendingType} Spending Type</h3>
      <p>Most recent preferences:</p>
      <ol>
        {preferences.map((preference, index) => (
          <li key={index}>{preference}</li>
        ))}
      </ol>
    </div>
  );
}

export default SpendingTypeCard;
