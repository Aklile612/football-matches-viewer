const MatchCard = ({ match, showScore, variant }) => {
  const cardClass = variant === "united" ? "weekU" : variant === "city" ? "weekU" : "week";
  const score = match.status === "FINISHED"
    ? `${match.score.fullTime.home ?? "-"} - ${match.score.fullTime.away ?? "-"}`
    : showScore
      ? `${match.score.fullTime.home ?? "-"} : ${match.score.fullTime.away ?? "-"}`
      : "vs";

  return (
    <li className={cardClass}>
      <div className={variant ? "allU" : "all"}>
        <div className={variant ? "teamsU" : "teams"}>
          <img src={match.homeTeam.crest} alt="home team flag" />
          <p>{match.homeTeam.tla}</p>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <p>{score}</p>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <img src={match.awayTeam.crest} alt="away team flag" />
          <p>{match.awayTeam.tla}</p>
        </div>
      </div>
      <div className="dates">
        <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
        <p>Time: {new Date(match.utcDate).toLocaleTimeString()}</p>
      </div>
      {match.status && <span className={`status-badge ${match.status.toLowerCase()}`}>{match.status}</span>}
    </li>
  );
};

export default MatchCard;
