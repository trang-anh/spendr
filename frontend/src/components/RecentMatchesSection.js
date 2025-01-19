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
                <small>{match.time}</small>
              </div>
              <span className={`spending-type ${match.type.toLowerCase()}`}>
                {match.type}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default RecentMatchesSection;
  