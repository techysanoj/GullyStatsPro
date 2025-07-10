// LiveScoreboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './LiveScoreboard.css';
import MatchHeader from './MatchHeader';
import ScoreInputPad from './ScoreInputPad';
import CurrentScorePanel from './CurrentScorePanel';
// import BatsmanPanel from './BatsmanPanel';
// import BowlerPanel from './BowlerPanel';
// import BallTimeline from './BallTimeline';
// import CommentaryFeed from './CommentaryFeed';
// import MatchSummary from './MatchSummary';

const LiveScoreboard = ({ matchData }) => {
  const [gameState, setGameState] = useState({
    currentInnings: 1,
    battingTeam: matchData.firstInnings === 'team1' ? matchData.team1 : matchData.team2,
    bowlingTeam: matchData.firstInnings === 'team1' ? matchData.team2 : matchData.team1,
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    currentBall: 0,
    striker: null,
    nonStriker: null,
    bowler: null,
    ballHistory: [],
    commentary: [],
    target: null,
    isMatchComplete: false,
    isInningsComplete: false
  });

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Initialize game state
  useEffect(() => {
    const battingTeam = matchData.firstInnings === 'team1' ? matchData.team1 : matchData.team2;
    const bowlingTeam = matchData.firstInnings === 'team1' ? matchData.team2 : matchData.team1;
    
    setGameState(prev => ({
      ...prev,
      battingTeam,
      bowlingTeam,
      striker: battingTeam.players[0],
      nonStriker: battingTeam.players[1],
      bowler: bowlingTeam.players[0],
      commentary: [{
        id: 1,
        text: `${matchData.tossWinner.name} won the toss and chose to ${matchData.tossChoice}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'info'
      }]
    }));
  }, [matchData]);

  // Auto-save game state
  useEffect(() => {
    localStorage.setItem('liveMatchState', JSON.stringify(gameState));
  }, [gameState]);

  const addBall = useCallback((ballType, runs = 0, isExtra = false, isWicket = false, wicketType = null) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Save current state to undo stack
      setUndoStack(stack => [...stack.slice(-9), prev]);
      setRedoStack([]);

      // Update ball count
      if (!isExtra) {
        newState.balls += 1;
        newState.currentBall += 1;
      }

      // Update score
      newState.score += runs;

      // Handle wickets
      if (isWicket) {
        newState.wickets += 1;
        // TODO: Implement player change logic
      }

      // Handle overs
      if (newState.balls >= 6) {
        newState.overs += 1;
        newState.balls = 0;
        newState.currentBall = 0;
        // TODO: Implement over change logic (swap bowler, switch ends)
      }

      // Add to ball history
      const ballData = {
        id: Date.now(),
        type: ballType,
        runs,
        isExtra,
        isWicket,
        wicketType,
        over: newState.overs,
        ball: newState.balls,
        striker: newState.striker,
        bowler: newState.bowler
      };

      newState.ballHistory = [...newState.ballHistory, ballData];

      // Generate commentary
      const commentary = generateCommentary(ballData);
      newState.commentary = [commentary, ...newState.commentary];

      // Check innings completion
      if (newState.wickets >= 10 || newState.overs >= matchData.overs) {
        newState.isInningsComplete = true;
      }

      return newState;
    });
  }, [matchData.overs]);

  const generateCommentary = (ballData) => {
    const { striker, bowler, runs, type, isWicket, wicketType } = ballData;
    let text = '';

    if (isWicket) {
      text = `${striker.name} is out! ${wicketType} - ${bowler.name} strikes!`;
    } else if (type === 'WD') {
      text = `Wide ball by ${bowler.name} - ${runs} extra runs`;
    } else if (type === 'NB') {
      text = `No ball by ${bowler.name} - ${runs} runs`;
    } else if (runs === 0) {
      text = `${bowler.name} to ${striker.name} - dot ball`;
    } else {
      text = `${bowler.name} to ${striker.name} - ${runs} run${runs > 1 ? 's' : ''}`;
    }

    return {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString(),
      type: isWicket ? 'wicket' : 'ball'
    };
  };

  const undoLastBall = useCallback(() => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack(stack => [gameState, ...stack]);
      setUndoStack(stack => stack.slice(0, -1));
      setGameState(previousState);
    }
  }, [undoStack, gameState]);

  const redoLastBall = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(stack => [...stack, gameState]);
      setRedoStack(stack => stack.slice(1));
      setGameState(nextState);
    }
  }, [redoStack, gameState]);

  const endInnings = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isInningsComplete: true,
      target: prev.score + 1
    }));
  }, []);

  const startSecondInnings = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentInnings: 2,
      battingTeam: prev.bowlingTeam,
      bowlingTeam: prev.battingTeam,
      score: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      currentBall: 0,
      striker: prev.bowlingTeam.players[0],
      nonStriker: prev.bowlingTeam.players[1],
      bowler: prev.battingTeam.players[0],
      ballHistory: [],
      isInningsComplete: false
    }));
  }, []);

  return (
    <div className="live-scoreboard">
      <MatchHeader
        matchData={matchData}
        gameState={gameState}
        onEndInnings={endInnings}
        onStartSecondInnings={startSecondInnings}
      />

      <div className="scoreboard-content">
        <div className="left-panel">
          <CurrentScorePanel
            gameState={gameState}
            matchData={matchData}
          />
          
          <div className="players-section">
            <BatsmanPanel
              striker={gameState.striker}
              nonStriker={gameState.nonStriker}
              ballHistory={gameState.ballHistory}
            />
            <BowlerPanel
              bowler={gameState.bowler}
              ballHistory={gameState.ballHistory}
              currentOver={gameState.overs}
              currentBall={gameState.balls}
            />
          </div>

          <ScoreInputPad
            onAddBall={addBall}
            onUndo={undoLastBall}
            onRedo={redoLastBall}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
            disabled={gameState.isInningsComplete}
          />

          {/* <BallTimeline
            ballHistory={gameState.ballHistory}
            currentBall={gameState.currentBall}
          /> */}
        </div>

        {/* <div className="right-panel">
          <MatchSummary
            matchData={matchData}
            gameState={gameState}
          />
          <CommentaryFeed
            commentary={gameState.commentary}
          />
        </div> */}
      </div>
    </div>
  );
};

export default LiveScoreboard;