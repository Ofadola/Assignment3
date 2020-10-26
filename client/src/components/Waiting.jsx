import React from 'react';
import './Waiting.css';

const Waiting = ({ numPlayers, isHost, onStart }) => {
    return (
        <React.Fragment>
            <div className="logo">
                Dixit
            </div>
            <main className="waiting-main">
                <div className="player-num">{numPlayers}</div>
                <div className="player-label">Players</div>
                <div className="player-extra">Waiting for players...</div>
                {isHost && <button className="green-btn"
                onClick={onStart}>START!</button>}
            </main>
        </React.Fragment>
    )
}

export default Waiting