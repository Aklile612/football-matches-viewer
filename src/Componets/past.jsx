import MatchCard from "./MatchCard";

const PremerieLeagueMatches = ({ matches }) => {
  return (
    <div>
      <h3>Premier league past week games</h3>
      <h3>Match Week {matches.length > 0 ? matches[0].matchday : ""}</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} showScore />
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default PremerieLeagueMatches;
