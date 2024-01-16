import React, { useState } from 'react';
import Player from '../Player/Player';
import SpellBook from "../SpellBook/SpellBook.js";
import Golem from '../Golem/Golem';

import './WorldMap.css'

function WorldMap({ missions, addMission, completeMission, characterStats, setCharacterStats }) {
  //Passa a função cast spell para o Spell Book
  const [castSpell, setCastSpell] = useState(() => () => {});

  //Golem
  const [golemPosition, setGolemPosition] = useState(null);


  //tamanho da Grid
  const gridSize = 5;
  //variaveis das celulas do grid
  const cellSize = 100;
  const gap = 1;
 
  const styleCelulas = {
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`
  }

  //ve se o golem deve ou nao spawnar
  const checkForGolemSpawn = () => {
    const shouldSpawnGolem = Math.random() < 0.5; // 50% de chance
    if (shouldSpawnGolem) {
        completeMission(2);
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        setGolemPosition({ x, y });
    } else {
        setGolemPosition(null);
    }
  };

  //verifica se um feitiço foi lançado encima de um golem e se sim remove o golem
  const onCastSpell = (playerPosition) => {
    completeMission(1)
    if (golemPosition && playerPosition.x === golemPosition.x && playerPosition.y === golemPosition.y) {
        setGolemPosition(null); // Remove o Golem
        setCharacterStats(prevStats => {
            var newExperience = prevStats.experience + 25;
            
            let newMana = prevStats.mana;
            let newMaxMana = prevStats.maxMana;

            // Verifica se o jogador subiu de nível
            if (newExperience >= 50) {
                
                newMaxMana += 10; // Aumenta o máximo de mana em 10
                newMana = newMaxMana; // Recarrega a mana completamente
                newExperience = 0
            }

            return { 
                ...prevStats, 
                experience: newExperience, 
                mana: newMana, 
                maxMana: newMaxMana 
            };
        });

        completeMission(3);
    }
};



  return (
    <div className='grid-content'>
        <h2>Mapa do Mundo</h2>
        <div className="worldMap" style={styleCelulas}>

            {//Cria uma matriz (que seria o grid) e mapeia com indexes
            Array.from({ length: gridSize * gridSize }).map((_, index) => {
                //Desenha uma celula com um index especifico, isso para todas as grids
                return(
                <div key={index} className="worldMapCell"></div>
                )
            })
            }

            {/*desenha o Player e passa o props de informações da grid para ele saber se movimentar pelo mapa*/}
            <Player 
            gridSize={gridSize}
            cellSize={cellSize} 
            gap={gap} setCastSpell={setCastSpell} 
            completeMission={completeMission} 
            onTeleport={checkForGolemSpawn} 
            onCastSpell={onCastSpell} 
            characterStats={characterStats} 
            setCharacterStats={setCharacterStats}/>

            <Golem gridSize={gridSize} cellSize={cellSize} position={golemPosition} />
        </div>
        <SpellBook castSpell={castSpell}/>
    </div>
  );
}

export default WorldMap;
