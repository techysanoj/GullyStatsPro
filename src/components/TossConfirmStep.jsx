import React, { useState } from 'react';
import { Trophy, Target, Shield, Share2, Copy, MessageCircle } from 'lucide-react';

const TossConfirmStep = ({ matchData, updateMatchData, onConfirm }) => {
  const [tossInProgress, setTossInProgress] = useState(false);
  const [selectedSide, setSelectedSide] = useState('');
  const [tossResult, setTossResult] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const performToss = () => {
    if (!selectedSide) return;
    
    setTossInProgress(true);
    
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
      setTossResult(result);
      
      const winner = result === selectedSide ? matchData.team1.name : matchData.team2.name;
      updateMatchData('tossWinner', winner);
      
      setTossInProgress(false);
    }, 2000);
  };

  const handleTossChoice = (choice) => {
    updateMatchData('tossChoice', choice);
    updateMatchData('firstInnings', choice === 'Bat' ? matchData.tossWinner : 
      (matchData.tossWinner === matchData.team1.name ? matchData.team2.name : matchData.team1.name));
  };

  const handleConfirmMatch = () => {
    setShowShareModal(true);
  };

  const copyMatchLink = () => {
    const matchLink = `${window.location.origin}/match/${Date.now()}`;
    navigator.clipboard.writeText(matchLink);
    alert('Match link copied to clipboard!');
  };

  const shareViaWhatsApp = () => {
    const message = `🏏 Join our cricket match!\n\n${matchData.title}\n📍 ${matchData.location}\n⏰ ${matchData.overs} overs\n\n${matchData.team1.name} vs ${matchData.team2.name}\n\nJoin now!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="toss-confirm-step">
      <div className="toss-section">
        <h2 className="section-title">Coin Toss</h2>
        
        {!matchData.tossWinner ? (
          <div className="toss-container">
            <div className="toss-selection">
              <h3>Select your call for {matchData.team1.name}</h3>
              <div className="toss-options">
                <button
                  className={`toss-option ${selectedSide === 'Heads' ? 'active' : ''}`}
                  onClick={() => setSelectedSide('Heads')}
                >
                  Heads
                </button>
                <button
                  className={`toss-option ${selectedSide === 'Tails' ? 'active' : ''}`}
                  onClick={() => setSelectedSide('Tails')}
                >
                  Tails
                </button>
              </div>
            </div>

            <div className="coin-container">
              <div className={`coin ${tossInProgress ? 'flipping' : ''}`}>
                <div className="coin-side heads">H</div>
                <div className="coin-side tails">T</div>
              </div>
              {tossResult && (
                <div className="toss-result">
                  <p>Result: <strong>{tossResult}</strong></p>
                  <p>Winner: <strong>{matchData.tossWinner}</strong></p>
                </div>
              )}
            </div>

            <button
              className={`toss-button ${!selectedSide ? 'disabled' : ''}`}
              onClick={performToss}
              disabled={!selectedSide || tossInProgress}
            >
              {tossInProgress ? 'Flipping...' : 'Flip Coin'}
            </button>
          </div>
        ) : (
          <div className="toss-winner-section">
            <div className="winner-announcement">
              <Trophy className="trophy-icon" size={32} />
              <h3>{matchData.tossWinner} won the toss!</h3>
            </div>

            <div className="toss-choice-section">
              <h4>What would you like to do?</h4>
              <div className="choice-options">
                <button
                  className={`choice-option ${matchData.tossChoice === 'Bat' ? 'active' : ''}`}
                  onClick={() => handleTossChoice('Bat')}
                >
                  <Target size={20} />
                  Bat First
                </button>
                <button
                  className={`choice-option ${matchData.tossChoice === 'Bowl' ? 'active' : ''}`}
                  onClick={() => handleTossChoice('Bowl')}
                >
                  <Shield size={20} />
                  Bowl First
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {matchData.tossWinner && matchData.tossChoice && (
        <div className="confirmation-section">
          <h2 className="section-title">Match Summary</h2>
          <div className="match-summary-card">
            <div className="summary-header">
              <h3>{matchData.title}</h3>
              <div className="summary-badges">
                <span className="badge">{matchData.overs} Overs</span>
                <span className="badge">{matchData.ballType} Ball</span>
              </div>
            </div>

            <div className="summary-details">
              <div className="detail-row">
                <span className="label">Location:</span>
                <span className="value">{matchData.location}</span>
              </div>
              <div className="detail-row">
                <span className="label">Teams:</span>
                <span className="value">{matchData.team1.name} vs {matchData.team2.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Toss Winner:</span>
                <span className="value">{matchData.tossWinner}</span>
              </div>
              <div className="detail-row">
                <span className="label">First Innings:</span>
                <span className="value">{matchData.firstInnings} will {matchData.tossChoice.toLowerCase()} first</span>
              </div>
            </div>

            <div className="teams-overview">
              <div className="team-overview">
                <h4>{matchData.team1.name}</h4>
                <p>{matchData.team1.players.length} players</p>
                <div className="team-roles">
                  <span>👑 {matchData.team1.players.find(p => p.id === matchData.team1.captain)?.name}</span>
                  {matchData.team1.wicketkeeper && (
                    <span>🧤 {matchData.team1.players.find(p => p.id === matchData.team1.wicketkeeper)?.name}</span>
                  )}
                </div>
              </div>
              <div className="team-overview">
                <h4>{matchData.team2.name}</h4>
                <p>{matchData.team2.players.length} players</p>
                <div className="team-roles">
                  <span>👑 {matchData.team2.players.find(p => p.id === matchData.team2.captain)?.name}</span>
                  {matchData.team2.wicketkeeper && (
                    <span>🧤 {matchData.team2.players.find(p => p.id === matchData.team2.wicketkeeper)?.name}</span>
                  )}
                </div>
              </div>
            </div>

            <button 
              className="confirm-match-button"
              onClick={handleConfirmMatch}
            >
              <Trophy size={20} />
              Confirm & Start Match
            </button>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="share-modal-overlay">
          <div className="share-modal">
            <div className="modal-header">
              <h3>Match Created Successfully! 🎉</h3>
              <button 
                className="close-modal"
                onClick={() => setShowShareModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Share this match with your friends:</p>
              <div className="share-options">
                <button className="share-option whatsapp" onClick={shareViaWhatsApp}>
                  <MessageCircle size={20} />
                  Share via WhatsApp
                </button>
                <button className="share-option copy" onClick={copyMatchLink}>
                  <Copy size={20} />
                  Copy Link
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="start-match-btn" onClick={onConfirm}>
                Start Match Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TossConfirmStep;