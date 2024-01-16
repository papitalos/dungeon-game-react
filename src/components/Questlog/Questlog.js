import React from 'react';
import './Questlog.css'

function QuestLog({ missions }) {
    return (
        <div className='questlog-content'>
            <h2>Registro de Missões</h2>
            <ul>
                {missions.map(mission => (
                    <li key={mission.id}>
                        {mission.description} - {mission.complete ? "Completa" : "Pendente"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestLog;