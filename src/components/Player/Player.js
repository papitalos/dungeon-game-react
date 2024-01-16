import React, { useState, useEffect } from 'react';
import './Player.css';

//Imagens
import playerImageUrl from '../../assets/player.png'
import spellCastingImageUrl from '../../assets/player_atacking.png';



function Player({ gridSize, cellSize, gap, setCastSpell, completeMission, onTeleport, onCastSpell, characterStats, setCharacterStats}) {
    //coloca o Jogador no meio da grid e define sua direção
    const [playerPosition, setPlayerPosition] = useState({ x: 2, y: 2 });

    //Serve para definir a imagem atual do player e gerenciar feitiço
    const [currentImageUrl, setCurrentImageUrl] = useState(playerImageUrl);
    const [spellMessage, setSpellMessage] = useState('');

    //variaveis de controle do jogador
    const [enableTransition, setEnableTransition] = useState(true);
    const [flip, setFlip] = useState(1);

    //intervalo entre cada passo para melhor controle don jogoo
    const movementInterval = 200; // Tempo em milissegundos
    const [lastMoveTime, setLastMoveTime] = useState(Date.now());

    //movimento do jogador
    const movePlayer = (direction) => {

        //Verificação do intervalo
        const now = Date.now();
        if (now - lastMoveTime < movementInterval) {
            return; // Retorna cedo se o intervalo de tempo não foi atingido
        }
        setLastMoveTime(now); // Atualiza o tempo do último movimento


        setPlayerPosition(prevPosition => {
            let { x, y } = prevPosition;
            let shouldTransition = true;
    
            switch (direction) {
                case 'w':
                    if (y === 0) shouldTransition = false; //define se vai ter transition suave ou nao
                    y = y > 0 ? y - 1 : gridSize - 1; //define se vai teletransportar pra o outro lado do grid ou nao
                    setFlip(1);
                    break;
                case 's':
                    if (y === gridSize - 1) shouldTransition = false;
                    y = y < gridSize - 1 ? y + 1 : 0;
                    setFlip(-1);
                    break;
                case 'a':
                    if (x === 0) shouldTransition = false;
                    x = x > 0 ? x - 1 : gridSize - 1;
                    setFlip(-1);
                    break;
                case 'd':
                    if (x === gridSize - 1) shouldTransition = false;
                    x = x < gridSize - 1 ? x + 1 : 0;
                    setFlip(1);
                    break; 
                default:
                    break;
            }     

            if (!shouldTransition) {
                onTeleport();
            }

            setEnableTransition(shouldTransition);
            return { x, y };
        });
    };

    //verificação das teclas
    useEffect(() => {
        const handleKeyPress = (e) => {
            //coloca as teclas em minusculo para o caso do jogador estar com capslock ligado
            if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
            movePlayer(e.key.toLowerCase());
        }
        };
        window.addEventListener('keydown', handleKeyPress);

        //Tira a verificação das teclas no return
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [gridSize , lastMoveTime]);


    //calculo da posição absoluta
    const playerStyle = {
        left: `${playerPosition.x * cellSize + playerPosition.x * gap}px`,
        top: `${playerPosition.y * cellSize + playerPosition.y * gap}px`,
        width: `${cellSize}px`, 
        height: `${cellSize}px`, 
        transition: enableTransition ? 'left 0.5s, top 0.5s' : 'none'
    };
    const playerFlip = {
        transform: `scaleX(${flip})`,
    }

    //FEITIÇO ____________________________________________________________________________________
    useEffect(() => {
        const spellCosts = {
            "Fireball": 5,
            "Ice Spike": 4,
            "Wind Gust": 3,
            "Earthquake": 6
        };
        
        setCastSpell(() => (spellName) => {
            const manaCost = spellCosts[spellName];
            if (characterStats.mana >= manaCost) {
                // Gasta mana e lança o feitiço
                setCharacterStats(prevStats => ({
                    ...prevStats,
                    mana: prevStats.mana - manaCost
                }));
            
                setCurrentImageUrl(spellCastingImageUrl); // Muda para a imagem de lançamento de feitiço
                setSpellMessage(`${spellName}`); // Mostra a mensagem do feitiço
        
                setTimeout(() => {
                    setCurrentImageUrl(playerImageUrl); // Volta para a imagem original
                    setSpellMessage('');
                }, 1000); // Tempo em milissegundos
        
                onCastSpell(playerPosition); // Informa ao WorldMap sobre o lançamento do feitiço
            }
        });
    }, [playerPosition, characterStats.mana]);
    //____________________________________________________________________________________________

    return (
        /* cria o player e define as coordenadas iniciais dele */
        <div className="Player" style={playerStyle}>
            {/*imagem do player*/}
            <img src={currentImageUrl} alt="Player" style={playerFlip} />
            {spellMessage && <div className="spell-message">{spellMessage}</div>} {/*renderiza a mensagem */}
        </div>
    );
}

export default Player;
