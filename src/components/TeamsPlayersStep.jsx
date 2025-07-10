// TeamsPlayersStep.jsx - FIXED VERSION
import React, { useState, useCallback, useEffect } from 'react';
import { Plus, X, Crown, Shield, Upload, User } from 'lucide-react';

const PlayerRow = React.memo(({ player, onUpdate, onRemove, isCaptain, isWicketkeeper, setCaptain, setWicketkeeper }) => {
  const [name, setName] = useState(player.name);
  const [role, setRole] = useState(player.role);

  useEffect(() => {
    setName(player.name);
    setRole(player.role);
  }, [player.name, player.role]);

  const handleNameChange = useCallback((e) => {
    const newName = e.target.value;
    setName(newName);
    // Update immediately instead of waiting for blur
    onUpdate('name', newName);
  }, [onUpdate]);

  const handleRoleChange = useCallback((e) => {
    const newRole = e.target.value;
    setRole(newRole);
    onUpdate('role', newRole);
  }, [onUpdate]);

  return (
    <div className="player-card">
      <div className="player-avatar">
        {player.avatar ? <img src={player.avatar} alt={player.name} /> : <User size={20} />}
      </div>
      <div className="player-details">
        <input
          type="text"
          className="player-name"
          placeholder="Player Name"
          value={name}
          onChange={handleNameChange}
          // Remove onBlur to prevent focus issues
        />
        <select
          className="player-role"
          value={role}
          onChange={handleRoleChange}
        >
          {['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'].map(roleOption => (
            <option key={roleOption} value={roleOption}>{roleOption}</option>
          ))}
        </select>
      </div>
      <div className="player-actions">
        <button
          className={`action-btn captain ${isCaptain ? 'active' : ''}`}
          onClick={setCaptain}
          title="Captain"
        >
          <Crown size={16} />
        </button>
        <button
          className={`action-btn wicketkeeper ${isWicketkeeper ? 'active' : ''}`}
          onClick={setWicketkeeper}
          title="Wicketkeeper"
        >
          <Shield size={16} />
        </button>
        <button
          className="action-btn remove"
          onClick={onRemove}
          title="Remove Player"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
});

// Move TeamPanel outside the main component to prevent recreation
const TeamPanel = React.memo(({ teamKey, teamData, updateTeamData, addPlayer, removePlayer, updatePlayer, setCaptain, setWicketkeeper }) => (
  <div className="team-panel">
    <div className="team-header">
      <div className="team-info">
        <div className="team-logo-container">
          <div className="team-logo">
            {teamData.logo ? <img src={teamData.logo} alt="Team Logo" /> : <User size={24} />}
          </div>
          <button className="upload-logo-btn"><Upload size={16} /></button>
        </div>
        <input
          type="text"
          className="team-name-input"
          value={teamData.name}
          onChange={(e) => updateTeamData(teamKey, 'name', e.target.value)}
          placeholder="Team Name"
        />
      </div>
    </div>
    <div className="players-section">
      <div className="players-header">
        <h4>Players ({teamData.players.length}/15)</h4>
        <button
          className="add-player-btn"
          onClick={() => addPlayer(teamKey)}
          disabled={teamData.players.length >= 15}
        >
          <Plus size={16} /> Add Player
        </button>
      </div>
      <div className="players-list">
        {teamData.players.map(player => (
          <PlayerRow
            key={player.id}
            player={player}
            onUpdate={(field, value) => updatePlayer(teamKey, player.id, field, value)}
            onRemove={() => removePlayer(teamKey, player.id)}
            isCaptain={teamData.captain === player.id}
            isWicketkeeper={teamData.wicketkeeper === player.id}
            setCaptain={() => setCaptain(teamKey, player.id)}
            setWicketkeeper={() => setWicketkeeper(teamKey, player.id)}
          />
        ))}
      </div>
    </div>
  </div>
));

const TeamsPlayersStep = ({ matchData, updateTeamData }) => {
  const [activeTeam, setActiveTeam] = useState('team1');

  const addPlayer = useCallback((teamKey) => {
    const newPlayer = {
      id: Date.now(),
      name: '',
      role: 'Batsman',
      avatar: null
    };
    const currentPlayers = matchData[teamKey].players;
    if (currentPlayers.length < 15) {
      updateTeamData(teamKey, 'players', [...currentPlayers, newPlayer]);
    }
  }, [matchData, updateTeamData]);

  const removePlayer = useCallback((teamKey, playerId) => {
    const updatedPlayers = matchData[teamKey].players.filter(p => p.id !== playerId);
    updateTeamData(teamKey, 'players', updatedPlayers);
    if (matchData[teamKey].captain === playerId) updateTeamData(teamKey, 'captain', null);
    if (matchData[teamKey].wicketkeeper === playerId) updateTeamData(teamKey, 'wicketkeeper', null);
  }, [matchData, updateTeamData]);

  const updatePlayer = useCallback((teamKey, playerId, field, value) => {
    const updatedPlayers = matchData[teamKey].players.map(player =>
      player.id === playerId ? { ...player, [field]: value } : player
    );
    updateTeamData(teamKey, 'players', updatedPlayers);
  }, [matchData, updateTeamData]);

  const setCaptain = useCallback((teamKey, playerId) => {
    updateTeamData(teamKey, 'captain', playerId);
  }, [updateTeamData]);

  const setWicketkeeper = useCallback((teamKey, playerId) => {
    updateTeamData(teamKey, 'wicketkeeper', playerId);
  }, [updateTeamData]);

  return (
    <div className="teams-players-step">
      <div className="teams-header">
        <h2 className="section-title">Teams & Players</h2>
        <p className="section-subtitle">Add 5-15 players per team and select captain & wicketkeeper</p>
      </div>

      <div className="teams-container">
        <div className="teams-tabs">
          <button className={`team-tab ${activeTeam === 'team1' ? 'active' : ''}`} onClick={() => setActiveTeam('team1')}>
            {matchData.team1.name} <span className="player-count">({matchData.team1.players.length})</span>
          </button>
          <button className={`team-tab ${activeTeam === 'team2' ? 'active' : ''}`} onClick={() => setActiveTeam('team2')}>
            {matchData.team2.name} <span className="player-count">({matchData.team2.players.length})</span>
          </button>
        </div>
        <div className="teams-content">
          <div className="desktop-teams">
            <TeamPanel 
              teamKey="team1" 
              teamData={matchData.team1} 
              updateTeamData={updateTeamData}
              addPlayer={addPlayer}
              removePlayer={removePlayer}
              updatePlayer={updatePlayer}
              setCaptain={setCaptain}
              setWicketkeeper={setWicketkeeper}
            />
            <TeamPanel 
              teamKey="team2" 
              teamData={matchData.team2} 
              updateTeamData={updateTeamData}
              addPlayer={addPlayer}
              removePlayer={removePlayer}
              updatePlayer={updatePlayer}
              setCaptain={setCaptain}
              setWicketkeeper={setWicketkeeper}
            />
          </div>
          <div className="mobile-teams">
            <div className={`team-mobile-panel ${activeTeam === 'team1' ? 'active' : 'hidden'}`}>
              <TeamPanel 
                teamKey="team1" 
                teamData={matchData.team1} 
                updateTeamData={updateTeamData}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                updatePlayer={updatePlayer}
                setCaptain={setCaptain}
                setWicketkeeper={setWicketkeeper}
              />
            </div>
            <div className={`team-mobile-panel ${activeTeam === 'team2' ? 'active' : 'hidden'}`}>
              <TeamPanel 
                teamKey="team2" 
                teamData={matchData.team2} 
                updateTeamData={updateTeamData}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                updatePlayer={updatePlayer}
                setCaptain={setCaptain}
                setWicketkeeper={setWicketkeeper}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="teams-summary">
        <div className="summary-card">
          <h4>Match Summary</h4>
          <div className="summary-teams">
            <div className="summary-team">
              <strong>{matchData.team1.name}</strong>
              <span>{matchData.team1.players.length} players</span>
              {matchData.team1.captain && (
                <span className="captain-info">
                  <Crown size={12} /> Captain: {matchData.team1.players.find(p => p.id === matchData.team1.captain)?.name}
                </span>
              )}
            </div>
            <div className="vs-divider">VS</div>
            <div className="summary-team">
              <strong>{matchData.team2.name}</strong>
              <span>{matchData.team2.players.length} players</span>
              {matchData.team2.captain && (
                <span className="captain-info">
                  <Crown size={12} /> Captain: {matchData.team2.players.find(p => p.id === matchData.team2.captain)?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPlayersStep;