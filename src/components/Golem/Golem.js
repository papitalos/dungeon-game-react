import React, { useState, useEffect } from 'react';
import golemImageUrl from '../../assets/golem.png'

function Golem({ gridSize, cellSize, position }) {
    if (!position) return null;

    const golemStyle = {
        left: `${position.x * cellSize}px`,
        top: `${position.y * cellSize}px`,
        position:`absolute`,
        width: `${cellSize}px`, 
        height: `${cellSize}px`, 
    };
    const golemImg ={
        width: `${cellSize}px`, 
        height: `${cellSize}px`,
        objectFit: `contain`
    }
    return (
        <div className="Golem" style={golemStyle}>
            <img src={golemImageUrl} alt="Golem de Pedra" style={golemImg}/>
        </div>
    );
}

export default Golem;