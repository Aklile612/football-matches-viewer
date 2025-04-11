import { useState, useEffect } from "react";
import UnitedMatches from "./Componets/united";
import WeeklyMatches from "./Componets/weekly";
import CityMatches from "./Componets/city";
import ChampionsLeagueMatches from "./Componets/chamLe";
import PremerieLeagueMatches from "./Componets/past";
import { getDateRange } from "./Componets/date";

const App = () => {
  const [selectedTeam, setselectTeam] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  const handleTeamSelect = (team) => {
    setselectTeam(team);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { today, future, past, seasonEnd } = getDateRange();
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!selectedTeam) return;
    setError("");
    const weeklyFiveMatches = async () => {
      setLoading(true);
      try {
        const unitedM = `/v4/teams/66/matches?dateFrom=${today}&dateTo=${seasonEnd}`;
        const cityM = `/v4/teams/65/matches?dateFrom=${today}&dateTo=${seasonEnd}`;
        const championsL = `/v4/competitions/CL/matches?dateFrom=${today}&dateTo=${future}`;
        const pastMatchesUrl = `/v4/competitions/PL/matches?dateFrom=${past}&dateTo=${today}`;
        const API_URL =
          selectedTeam === "United" ? unitedM :
          selectedTeam === "City" ? cityM :
          selectedTeam === "CL" ? championsL :
          selectedTeam === "EL" ? pastMatchesUrl :
          "";
        const response = await fetch(API_URL, {
          headers: {
            "X-Auth-Token": API_KEY,
            "Accept": "application/json"
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }
        const data = await response.json();
        if (data.matches) {
          const sorted = [...data.matches].sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
          if (selectedTeam === 'EL') {
            setMatches(sorted.slice(0, 14));
          } else {
            setMatches(sorted.slice(0, 6));
          }
        } else {
          console.log("NO Matches sorry");
        }
        setLastUpdated(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch matches. Check your API key or try again later.");
        setLoading(false);
      }
    };
    weeklyFiveMatches();
  }, [selectedTeam, today, future, past, seasonEnd, refreshKey, API_KEY]);

  return (
    <div className="container">
      <div className="head">
        <h1><i className="fa-solid fa-futbol"></i>Football Fixture</h1>
        <p className="season-info">Season {new Date().getFullYear() - 1}/{new Date().getFullYear()}</p>
        <p className="date-range">{today} — {future} (weekly)</p>
      </div>
      <div className="buttons-container">
        <button className={`custom-button bmanutd${selectedTeam === "" ? " active" : ""}`} onClick={() => handleTeamSelect("")}>Home</button>
        <button className={`custom-button bmanutd${selectedTeam === "United" ? " active" : ""}`} onClick={() => handleTeamSelect("United")}>Manchester United</button>
        <button className={`custom-button bcity${selectedTeam === "City" ? " active" : ""}`} onClick={() => handleTeamSelect("City")}>Manchester City</button>
        <button className={`custom-button bchamp${selectedTeam === "CL" ? " active" : ""}`} onClick={() => handleTeamSelect("CL")}>Champions League</button>
        <button className={`custom-button bpast${selectedTeam === "EL" ? " active" : ""}`} onClick={() => handleTeamSelect("EL")}>Past Matches</button>
        <button className="custom-button brefresh" onClick={() => setRefreshKey(k => k + 1)}><i className="fa-solid fa-rotate"></i> Refresh</button>
      </div>
      <div className="weekly-match">
        {error && (
          <div>
            <p className="error-message">{error}</p>
            <button className="custom-button brefresh" onClick={() => setRefreshKey(k => k + 1)} style={{ marginTop: "10px" }}>Retry</button>
          </div>
        )}
        {loading ? (
          <div className="skeleton-container">
            {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        ) : selectedTeam && !loading && (
          <>
            <p className="match-count">{matches.length} matches</p>
            {lastUpdated && <p className="last-updated">Updated {lastUpdated}</p>}
          </>
        )}
        {!selectedTeam ? (
          <WeeklyMatches />
        ) : selectedTeam === "United" ? (
          <UnitedMatches matches={matches} />
        ) : selectedTeam === "City" ? (
          <CityMatches matches={matches} />
        ) : selectedTeam === "CL" ? (
          <ChampionsLeagueMatches matches={matches} />
        ) : selectedTeam === "EL" ? (
          <PremerieLeagueMatches matches={matches} />
        ) : selectedTeam ? (
          <div className="empty-state">
            <i className="fa-solid fa-calendar-xmark"></i>
            <p>No matches found for this period.</p>
          </div>
        ) : null}
      </div>
      <div className="footer">
        <p>Football Fixtures © {new Date().getFullYear()}</p>
        <p className="attribution">Powered by football-data.org</p>
      </div>
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default App;