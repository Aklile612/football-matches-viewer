import MatchCard from "./MatchCard";

const CityMatches = ({ matches }) => {
  return (
    <div className="allcity">
      <h3>Manchester city six games</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} variant="city" />
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default CityMatches;
