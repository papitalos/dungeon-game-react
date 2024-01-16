import React, { useState } from "react";
import './App.css'

import WorldMap from "./components/WorldMap/WorldMap";
import QuestLog from "./components/Questlog/Questlog";
import CharacterStats from "./components/CharacterStats/CharacterStats";

function App() {
  //Lista de stats para character
  const [characterStats, setCharacterStats] = useState({
    mana: 15,
    maxMana: 15, 
    experience: 0
});
  //Lista de missoes
  const [missions, setMissions] = useState([
    { id: 1, description: "Lançar um feitiço", complete: false },
    { id: 2, description: "Encontrar um goblin", complete: false },
    { id: 3, description: "Mate um goblin", complete: false },
  ]);


  
  //função para lidar com resultado de batalhas
  const handleBattleOutcome = (outcome) => {
    setCharacterStats(prevStats => ({
        ...prevStats,
        health: prevStats.health - outcome.damageTaken,
        experience: prevStats.experience + outcome.experienceGained
    }));
  };

  //funçoes para lidar com resultado das missoes e adicionar missoes
  const addMission = (newMission) => {
    setMissions(prevMissions => [...prevMissions, newMission]);
  };

  const completeMission = (missionId) => {
    setMissions(prevMissions =>
        prevMissions.map(mission =>
            mission.id === missionId ? { ...mission, complete: true } : mission
        )
    );
  };

  return (
    <div className="App">

      <CharacterStats stats={characterStats} />
      <QuestLog missions={missions}/>
      <WorldMap  missions={missions} addMission={addMission} completeMission={completeMission} characterStats={characterStats} setCharacterStats={setCharacterStats}/>
    </div>
  );
}

export default App;
