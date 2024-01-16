import React from 'react';

function CharacterStats({ stats }) {
    return (
        <div className="character-stats">
            <h2>Estatísticas do Personagem</h2>
            <p>Mana: {stats.mana} / {stats.maxMana}</p>
            <p>Experiência: {stats.experience}</p>
        </div>
    );
}

export default CharacterStats;
