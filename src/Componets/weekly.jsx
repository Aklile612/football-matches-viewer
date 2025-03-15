import React, { useEffect, useState } from "react";
import { getDateRange } from "./date";

const WeeklyMatches = () => {
  const { today, future } = getDateRange();
  const API_URL = `/v4/competitions/PL/matches?dateFrom=${today}&dateTo=${future}`;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchWeeklyMatches = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "X-Auth-Token": API_KEY,
            "Accept": "application/json"
          },
        });
        if (!response.ok) {
          throw new Error("Failed this to fetch matches");
        }
        const data = await response.json();
        if (data.matches) {
          setMatches(data.matches);
        } else {
          console.log("No matches found for the given date range");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeeklyMatches();
  }, [today, future, API_KEY]);

  return (
    <div>
      <h3>Weekly Premier League Matches</h3><br />
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li className="week" key={index}>
              <div className="all">
                <div className="teams">
                  <img src={match.homeTeam.crest} alt="home team flag" /><p>{match.homeTeam.tla}</p>
                </div>
                <div className="teams"><p>{match.status === "FINISHED" ? `${match.score.fullTime.home ?? "-"} - ${match.score.fullTime.away ?? "-"}` : "vs"}</p></div>
                <div className="teams">
                  <img src={match.awayTeam.crest} alt="away team flag" /><p>{match.awayTeam.tla}</p>
                </div>
              </div>
              <div className="dates">
                <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
                <p>Time: {new Date(match.utcDate).toLocaleTimeString()}</p>
              </div>
              {match.status && <span className={`status-badge ${match.status.toLowerCase()}`}>{match.status}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default WeeklyMatches;