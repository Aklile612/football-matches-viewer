const PremerieLeagueMatches = ({matches})=>{
    return(
        <>
        <div>
        
            <h3>Premier league past week games</h3>
            <h3>Match Week {matches.length >0 ? matches[0].matchday : ""} </h3>
        
        {matches.length > 0 ? (
        
        <ul>
          {matches.map((match, index) => (
            
            <li className="week"  key={index}>
                
                <div className="all">
                    <div className="teams">
                        <img src={match.homeTeam.crest} alt="home team flag" /><p>{match.homeTeam.tla}</p> 
                    </div>
                    <div className="teams"><p>{match.score.fullTime.home ?? "-"}:{match.score.fullTime.away ?? "-"}</p></div>
                    <div className="teams">
                       <img src={match.awayTeam.crest} alt="away team flag"/><p>{match.awayTeam.tla}</p>
                    </div> 
                    
                </div>
                <div className="dates">
                <p> Date:{new Date(match.utcDate).toLocaleDateString()}</p>
                <p>Time:{new Date(match.utcDate).toLocaleTimeString()}</p>
                </div>
                {match.status && <span className={`status-badge ${match.status.toLowerCase()}`}>{match.status}</span>}
            </li>
            
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
        </div>
        </>
    )

};
export default PremerieLeagueMatches;