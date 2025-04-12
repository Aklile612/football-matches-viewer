import { memo } from "react";

const fallbackCrest = (e) => {
  e.target.src = "/vite.svg";
};

const MatchCard = ({ match, showScore, variant }) => {
  const cardClass = variant === "united" ? "weekU" : variant === "city" ? "weekU" : "week";
  const htHome = match.score?.halfTime?.home;
  const htAway = match.score?.halfTime?.away;

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

  const homeWon = isFinished && homeScore != null && homeScore > awayScore;
  const awayWon = isFinished && awayScore != null && awayScore > homeScore;
  const homeClass = homeWon ? "winner" : "";
  const awayClass = awayWon ? "winner" : "";

  const resultEmoji = isFinished && showScore
    ? homeScore > awayScore ? "\u{1F7E2}" : homeScore < awayScore ? "\u{1F534}" : "\u{1F7E1}"
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
          <p className={homeClass}>{match.homeTeam.tla}</p>
          <small>{match.homeTeam.name}</small>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <p className={scoreClass}>{resultEmoji} {score}</p>
        </div>
        <div className={variant ? "teamsU" : "teams"}>
          <img src={match.awayTeam.crest} alt="away team flag" onError={fallbackCrest} />
          <p className={awayClass}>{match.awayTeam.tla}</p>
          <small>{match.awayTeam.name}</small>
        </div>
      </div>
      <div className="dates">
        <p>Date: {new Date(match.utcDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
        <p>Time: {new Date(match.utcDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      {isFinished && htHome != null && <p className="venue">HT: {htHome} - {htAway}</p>}
      {match.competition?.name && <p className="venue">{match.competition.name}</p>}
      {match.venue && <p className="venue">{match.venue}</p>}
      {match.status && <span className={`status-badge ${match.status.toLowerCase()}`}>{statusText}</span>}
    </li>
  );
};

export default memo(MatchCard);
