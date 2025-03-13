import React, { useState, useEffect } from "react";
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
  const { today, future, past, seasonEnd } = getDateRange();
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!selectedTeam) return;
    const weeklyFiveMatches = async () => {
      setLoading(true);
      try {
        const unitedM = `/v4/teams/66/matches?dateFrom=${today}&dateTo=${seasonEnd}`;
        const cityM = `/v4/teams/65/matches?dateFrom=${today}&dateTo=${seasonEnd}`;
        const championsL = `/v4/competitions/CL/matches?dateFrom=${today}&dateTo=${future}`;
        const EupropaL = `/v4/competitions/PL/matches?dateFrom=${past}&dateTo=${today}`;
        const API_URL =
          selectedTeam === "United" ? unitedM :
          selectedTeam === "City" ? cityM :
          selectedTeam === "CL" ? championsL :
          selectedTeam === "EL" ? EupropaL :
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
          if (selectedTeam === 'EL') {
            setMatches(data.matches.slice(0, 14));
          } else {
            setMatches(data.matches.slice(0, 6));
          }
        } else {
          console.log("NO Matches sorry");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    weeklyFiveMatches();
  }, [selectedTeam, today, future, API_KEY]);

  return (
    <div className="container">
      <div className="head">
        <h1><i className="fa-solid fa-futbol"></i>Football Fixture</h1>
      </div>
      <div className="buttons-container">
        <button className="custom-button bmanutd" onClick={() => setselectTeam("")}>Home</button>
        <button className="custom-button bmanutd" onClick={() => setselectTeam("United")}>Manchester United</button>
        <button className="custom-button bcity" onClick={() => setselectTeam("City")}>Manchester City</button>
        <button className="custom-button bchamp" onClick={() => setselectTeam("CL")}>Champions League</button>
        <button className="custom-button" onClick={() => setselectTeam("EL")}>Past Matches</button>
      </div>
      <div className="weekly-match">
        {loading ? (
          <p>Loading matches...</p>
        ) : !selectedTeam ? (
          <WeeklyMatches />
        ) : selectedTeam === "United" ? (
          <UnitedMatches matches={matches} />
        ) : selectedTeam === "City" ? (
          <CityMatches matches={matches} />
        ) : selectedTeam === "CL" ? (
          <ChampionsLeagueMatches matches={matches} />
        ) : selectedTeam === "EL" ? (
          <PremerieLeagueMatches matches={matches} />
        ) : null}
      </div>
    </div>
  );
};

export default App;