function RecentMatchesSection({ matches }) {
    return (
      <section className="recent-matches-section">
        <h2>Recent Matches</h2>
        <ul>
          {matches.map((match, index) => (
            <li key={index} className="match-item">
              <img src={match.avatar} alt={match.name} className="match-avatar" />
              <div>
                <p>{match.name}</p>
                <small>{match.type}</small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default RecentMatchesSection;
  