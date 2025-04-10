import { useEffect, useState } from "react";
import { getDateRange } from "./date";
import MatchCard from "./MatchCard";

const WeeklyMatches = () => {
  const { today, future } = getDateRange();
  const API_URL = `/v4/competitions/PL/matches?dateFrom=${today}&dateTo=${future}`;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [matches, setMatches] = useState([]);
  const [weeklyError, setWeeklyError] = useState("");
  const [weeklyLoading, setWeeklyLoading] = useState(false);

  useEffect(() => {
    const fetchWeeklyMatches = async () => {
      setWeeklyError("");
      setWeeklyLoading(true);
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
          setMatches([...data.matches].sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)));
        } else {
          console.log("No matches found for the given date range");
        }
        setWeeklyLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeeklyError("Unable to load weekly matches.");
        setWeeklyLoading(false);
      }
    };

    fetchWeeklyMatches();
  }, [today, future, API_KEY]);

  return (
    <div>
      <h3>Weekly Premier League Matches</h3>
      <p className="match-count">English Premier League</p>
      {matches.length > 0 && <h4>Match Week {matches[0].matchday}</h4>}
      <br />
      {weeklyError && <p className="error-message">{weeklyError}</p>}
      {weeklyLoading ? (
        <div className="skeleton-container">
          {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
        </div>
      ) : matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default WeeklyMatches;
