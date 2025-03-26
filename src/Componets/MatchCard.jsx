import { memo } from "react";

const fallbackCrest = (e) => {
  e.target.src = "/vite.svg";
};

const MatchCard = ({ match, showScore, variant }) => {
  const cardClass = variant === "united" ? "weekU" : variant === "city" ? "weekU" : "week";
  const statusLabels = {
    SCHEDULED: "Scheduled", TIMED: "Scheduled", LIVE: "Live",
    IN_PLAY: "Live", PAUSED: "Paused", FINISHED: "Full Time",
    POSTPONED: "Postponed", CANCELLED: "Cancelled"
  };
  const statusText = statusLabels[match.status] || match.status;

  const homeScore = match.score?.fullTime?.home;
  const awayScore = match.score?.fullTime?.away;
  const isFinished = match.status === "FINISHED";
  const scoreClass = isFinished && homeScore != null && awayScore != null
    ? homeScore > awayScore ? "score-win" : homeScore < awayScore ? "score-loss" : "score-draw"
    : "";

  const score = isFinished
    ? `${homeScore ?? "-"} - ${awayScore ?? "-"}`
    : showScore
      ? `${homeScore ?? "-"} : ${awayScore ?? "-"}`
      : "vs";

  return (
    <li className={cardClass}>
      <div className={variant ? "allU" : "all"}>
        <div className={variant ? "teamsU" : "teams"}>
          <img src={match.homeTeam.crest} alt="home team flag" onError={fallbackCrest} />
          <p>{match.homeTeam.tla}</p>
          <small>{match.homeTeam.name}</small>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <p className={scoreClass}>{score}</p>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <img src={match.awayTeam.crest} alt="away team flag" onError={fallbackCrest} />
          <p>{match.awayTeam.tla}</p>
          <small>{match.awayTeam.name}</small>
        </div>
      </div>
      <div className="dates">
        <p>Date: {new Date(match.utcDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
        <p>Time: {new Date(match.utcDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      {match.venue && <p className="venue">{match.venue}</p>}
      {match.stadium && <p className="venue">{match.stadium}</p>}
      {match.status && <span className={`status-badge ${match.status.toLowerCase()}`}>{statusText}</span>}
    </li>
  );
};

export default memo(MatchCard);
