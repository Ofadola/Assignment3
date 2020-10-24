import React, { useContext, useState } from 'react';
import axios from '../../client/src/components/node_modules/axios';
import './Host.css';
import { useHistory } from 'react-router-dom';

const Host = () => {
    const [gameId, setGameId] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const history = useHistory();

    const createGame = async () => {
        try {
            const res = await axios.post('/rooms/create', { gameId, isPublic });
            console.log(res.data.response);
            history.push(`/select?gameid=${res.data.response.gameId}&ishost=true`);
        } catch (err) {
            console.error(err);
            let error = err.response.data.error.reason;
            if (error.startsWith('E11000 duplicate key')) {
                error = 'Game with this game ID already exists';
            }
            alert(error);
        }
    }

    return (
        <React.Fragment>
            <div className="logo">
                Dixit
            </div>
            <form className="host-page"
            onSubmit={e => {
                e.preventDefault();
                createGame();
            }}>
                <div className="top-s">
                    <button className="green-btn" type="submit">NEW GAME</button>
                    <div>
                        <input type="checkbox"
                        checked={isPublic} onChange={e => setIsPublic(e.target.checked)}/>
                        <label>Open to all?</label>
                    </div>
                </div>
                <input type="text" className="dixit-input" placeholder="Game ID" required
                value={gameId} onChange={e => setGameId(e.target.value)}/>
            </form>
        </React.Fragment>
    )
}

export default Host
