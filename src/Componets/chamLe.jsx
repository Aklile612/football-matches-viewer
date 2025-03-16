import MatchCard from "./MatchCard";

const ChampionsLeagueMatches = ({ matches }) => {
  return (
    <div className="allChampions">
      <h3>Champions league week games</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} variant="cl" />
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default ChampionsLeagueMatches;
