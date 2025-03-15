

const CityMatches = ({matches})=>{
    return(
        <>
        <div className="allcity">
        
            <h3 > Manchester city six games</h3>
        
        
        {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li className="weekU" key={index}>
                <div className="allU">
                    <div className="teamsU">
                        <img src={match.homeTeam.crest} alt="home team flag" /><p>{match.homeTeam.tla}</p> 
                    </div>
                    <div className="teamsU"><p>vs</p></div>
                    <div className="teamsU">
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
export default CityMatches;