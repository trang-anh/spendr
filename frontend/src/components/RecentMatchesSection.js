import React from 'react';
import '../styles/RecentMatchesSection.css';

function RecentMatchesSection({ matches = [] }) {
  if (matches.length === 0) {
    return <p>No recent matches to display.</p>;
  }

  return (
    <div className="recent-matches-section">
      <ul>
        {matches.map((match, index) => (
          <li key={index} className="match-card">
            <img src={match.avatar} alt={`${match.name}'s avatar`} />
            <div>
              <h3>{match.name}</h3>
              <p>Spender Type: {match.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentMatchesSection;
