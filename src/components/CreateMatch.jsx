// CreateMatch.jsx - FIXED VERSION
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import './CreateMatch.css';
import ProgressStepper from './ProgressStepper';
import MatchInfoStep from './MatchInfoStep';
import TeamsPlayersStep from './TeamsPlayersStep';
import TossConfirmStep from './TossConfirmStep';
import LiveScoreboard from './LiveScoreboard';

const CreateMatch = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLiveScoreboard, setShowLiveScoreboard] = useState(false);
  const [matchData, setMatchData] = useState({
    title: '',
    location: '',
    overs: 10,
    ballType: 'Tennis',
    team1: { name: 'Team A', logo: null, players: [], captain: null, wicketkeeper: null },
    team2: { name: 'Team B', logo: null, players: [], captain: null, wicketkeeper: null },
    tossWinner: null,
    tossChoice: null,
    firstInnings: null
  });

  useEffect(() => {
    const savedData = localStorage.getItem('matchDraft');
    if (savedData) setMatchData(JSON.parse(savedData));
  }, []);

  // Debounced localStorage save to prevent excessive saves
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('matchDraft', JSON.stringify(matchData));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [matchData]);

  const updateMatchData = useCallback((field, value) => {
    setMatchData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateTeamData = useCallback((teamKey, field, value) => {
    setMatchData(prev => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        [field]: value
      }
    }));
  }, []);

  const canProceed = useCallback((step) => {
    switch (step) {
      case 1:
        return matchData.title && matchData.location && matchData.overs;
      case 2:
        return matchData.team1.players.length >= 1 &&
               matchData.team2.players.length >= 1 &&
               matchData.team1.captain && matchData.team2.captain;
      case 3:
        return matchData.tossWinner && matchData.tossChoice;
      default:
        return false;
    }
  }, [matchData]);

  const nextStep = useCallback(() => {
    if (canProceed(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, canProceed]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleConfirmMatch = useCallback(() => {
    // Determine which team bats first based on toss
    const firstInnings = matchData.tossChoice === 'bat' ? matchData.tossWinner : 
                        (matchData.tossWinner === 'team1' ? 'team2' : 'team1');
    
    // Update match data with first innings info
    const updatedMatchData = {
      ...matchData,
      firstInnings: firstInnings,
      status: 'live'
    };
    
    // Save to localStorage
    localStorage.setItem('currentMatch', JSON.stringify(updatedMatchData));
    localStorage.removeItem('matchDraft');
    
    // Show live scoreboard
    setShowLiveScoreboard(true);
  }, [matchData]);


  return (
  <div className="create-match-container">
    {showLiveScoreboard ? (
      <LiveScoreboard matchData={{...matchData, firstInnings: matchData.tossChoice === 'bat' ? matchData.tossWinner : (matchData.tossWinner === 'team1' ? 'team2' : 'team1')}} />
    ) : (
      <>
        {/* Your existing JSX code stays the same */}
        <div className="create-match-header">
          <div className="header-content">
            <button className="back-button">
              <ChevronLeft size={24} />
              Back to Home
            </button>
            <h1 className="page-title">Create New Match</h1>
          </div>
        </div>

        <div className="create-match-content">
          <ProgressStepper currentStep={currentStep} />

          <div className="step-content">
            {currentStep === 1 && (
              <MatchInfoStep matchData={matchData} updateMatchData={updateMatchData} />
            )}
            {currentStep === 2 && (
              <TeamsPlayersStep matchData={matchData} updateTeamData={updateTeamData} />
            )}
            {currentStep === 3 && (
              <TossConfirmStep matchData={matchData} updateMatchData={updateMatchData} onConfirm={handleConfirmMatch} />
            )}
          </div>

          <div className="step-navigation">
            <button className="nav-button prev" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft size={20} /> Previous
            </button>

            {currentStep < 3 ? (
              <button
                className={`nav-button next ${!canProceed(currentStep) ? 'disabled' : ''}`}
                onClick={nextStep}
                disabled={!canProceed(currentStep)}
              >
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <button
                className={`nav-button confirm ${!canProceed(currentStep) ? 'disabled' : ''}`}
                onClick={handleConfirmMatch}
                disabled={!canProceed(currentStep)}
              >
                <Trophy size={20} /> Confirm & Start Match
              </button>
            )}
          </div>
        </div>
      </>
    )}
  </div>
);
};

export default CreateMatch;