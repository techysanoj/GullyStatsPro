import React from 'react';
import { Trophy, Target, Clock, MapPin } from 'lucide-react';
import './MatchSummary.css';

const MatchSummary = ({ matchData, gameState }) => {
  const { team1, team2, title, location, overs, tossWinner, tossChoice, firstInnings } = matchData;
  const { currentInnings, score, wickets, overs: currentOvers, balls } = gameState;

  const battingTeam = firstInnings === 'team1' ? team1 : team2;
  const bowlingTeam = firstInnings === 'team1' ? team2 : team1;

  const overProgress = ((currentOvers + balls / 6) / overs) * 100;
  const currentRunRate = currentOvers > 0 ? (score / (currentOvers + balls / 6)).toFixed(2) : '0.00';

  const getTossText = () => {
    const winner = tossWinner === 'team1' ? team1.name : team2.name;
    const choice = tossChoice === 'bat' ? 'chose to bat' : 'chose to bowl';
    return `${winner} won the toss and ${choice}`;
  };

  const getTargetText = () => {
    if (currentInnings === 2 && gameState.firstInningsScore) {
      const target = gameState.firstInningsScore + 1;
      const required = target - score;
      const remainingBalls = (overs * 6) - (currentOvers * 6 + balls);
      const requiredRate = remainingBalls > 0 ? (required / (remainingBalls / 6)).toFixed(2) : '0.00';
      
      return {
        target,
        required,
        requiredRate,
        remainingBalls: Math.floor(remainingBalls / 6) + '.' + (remainingBalls % 6)
      };
    }
    return null;
  };

  const targetInfo = getTargetText();

  return (
    <div className="match-summary">
      <div className="summary-header">
        <h2 className="match-title">{title}</h2>
        <div className="match-location">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
      </div>

      <div className="teams-info">
        <div className="team-card">
          <div className="team-logo">
            {team1.logo ? (
              <img src={team1.logo} alt={team1.name} />
            ) : (
              <div className="default-logo">{team1.name.charAt(0)}</div>
            )}
          </div>
          <div className="team-details">
            <h3>{team1.name}</h3>
            {currentInnings === 1 && firstInnings === 'team1' && (
              <span className="batting-indicator">Batting</span>
            )}
            {currentInnings === 1 && firstInnings === 'team2' && (
              <span className="bowling-indicator">Bowling</span>
            )}
            {currentInnings === 2 && firstInnings === 'team2' && (
              <span className="batting-indicator">Batting</span>
            )}
            {currentInnings === 2 && firstInnings === 'team1' && (
              <span className="bowling-indicator">Bowling</span>
            )}
          </div>
        </div>

        <div className="vs-divider">VS</div>

        <div className="team-card">
          <div className="team-logo">
            {team2.logo ? (
              <img src={team2.logo} alt={team2.name} />
            ) : (
              <div className="default-logo">{team2.name.charAt(0)}</div>
            )}
          </div>
          <div className="team-details">
            <h3>{team2.name}</h3>
            {currentInnings === 1 && firstInnings === 'team2' && (
              <span className="batting-indicator">Batting</span>
            )}
            {currentInnings === 1 && firstInnings === 'team1' && (
              <span className="bowling-indicator">Bowling</span>
            )}
            {currentInnings === 2 && firstInnings === 'team1' && (
              <span className="batting-indicator">Batting</span>
            )}
            {currentInnings === 2 && firstInnings === 'team2' && (
              <span className="bowling-indicator">Bowling</span>
            )}
          </div>
        </div>
      </div>

      <div className="toss-info">
        <Trophy size={16} />
        <span>{getTossText()}</span>
      </div>

      <div className="match-progress">
        <div className="progress-header">
          <h4>Match Progress</h4>
          <span className="progress-text">
            {currentOvers}.{balls} / {overs} overs ({overProgress.toFixed(1)}%)
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${overProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="current-stats">
        <div className="stat-item">
          <div className="stat-label">Current Score</div>
          <div className="stat-value">{score}/{wickets}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Run Rate</div>
          <div className="stat-value">{currentRunRate}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Innings</div>
          <div className="stat-value">{currentInnings}/2</div>
        </div>
      </div>

      {targetInfo && (
        <div className="target-info">
          <div className="target-header">
            <Target size={18} />
            <h4>Target Information</h4>
          </div>
          <div className="target-stats">
            <div className="target-stat">
              <span className="target-label">Target:</span>
              <span className="target-value">{targetInfo.target}</span>
            </div>
            <div className="target-stat">
              <span className="target-label">Required:</span>
              <span className="target-value">{targetInfo.required} runs</span>
            </div>
            <div className="target-stat">
              <span className="target-label">Required Rate:</span>
              <span className="target-value">{targetInfo.requiredRate}</span>
            </div>
            <div className="target-stat">
              <span className="target-label">Remaining:</span>
              <span className="target-value">{targetInfo.remainingBalls} overs</span>
            </div>
          </div>
        </div>
      )}

      <div className="match-format">
        <Clock size={16} />
        <span>{overs} Overs • {matchData.ballType} Ball</span>
      </div>
    </div>
  );
};

export default MatchSummary;