import MatchCard from "./MatchCard";

const UnitedMatches = ({ matches }) => {
  return (
    <div className="allUnited">
      <h3>Manchester United six games</h3>
      <h4>Match Week {matches[0]?.matchday || "-"}</h4>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} variant="united" />
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default UnitedMatches;
