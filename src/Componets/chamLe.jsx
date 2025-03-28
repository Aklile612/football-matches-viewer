import MatchCard from "./MatchCard";

const ChampionsLeagueMatches = ({ matches }) => {
  return (
    <div className="allChampions">
      <h3>Champions league week games</h3>
      <p className="match-count">UEFA Champions League</p>
      <h4>Match Day {matches[0]?.matchday || "-"}</h4>
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
