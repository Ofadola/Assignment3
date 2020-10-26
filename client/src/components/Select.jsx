import React, { useContext, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import './Select.css';

const avatars = [
    'cat',
    'horse',
    'lion',
    'mouse',
    'owl',
    'pig',
    'rabbit',
]

const Select = () => {
    const { joinRoom, currentGame, setPlayer } = useContext(GameContext);
    const [avatar, setAvatar] = useState('cat');
    const [displayName, setDisplayName] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const gameId = query.get('gameid');
    const isHost = query.get('ishost');

    const handleSubmit = async () => {
        console.log('JOINING');
        joinRoom({
            player: {
                avatarSrc: `/images/avatars/${avatar}.png`,
                username: displayName,
            },
            gameId,
            isHost: isHost === 'true',
        });
        setPlayer({
            player: {
                avatarSrc: `/images/avatars/${avatar}.png`,
                username: displayName,
            },
            isHost: isHost === 'true',
        });
    }

    if (!gameId || !isHost || (isHost !== 'true' && isHost !== 'false')) {
        return <Redirect to="/"/>
    }

    if (currentGame) {
        return <Redirect to={`/game?username=${displayName}&gameid=${gameId}`}/>
    }
    return (
        <React.Fragment>
            <div className="logo">
                Dixit
            </div>
            <form className="select-main"
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type="text" className="dixit-input" placeholder="Display Name" 
                required value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                <img src={`/images/avatars/${avatar}.png`} className="chosen-avatar"/>
                <label>Select Avatar</label>
                <div className="avatars">
                    {avatars.map(av => 
                    <div className="avatar-ex"
                    onClick={() => setAvatar(av)}>
                        <div className="avatar-chosen" style={{
                            display: av === avatar ? 'block' : 'none',
                        }}>✔</div>
                        <img src={`/images/avatars/${av}.png`}/>
                    </div>)}
                </div>
                <button className="green-btn" type="submit">CONFIRM</button>
            </form>
        </React.Fragment>
    )
}

export default Select;