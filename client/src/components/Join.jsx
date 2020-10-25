import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './Join.css';
import { useHistory } from 'react-router-dom';

const Join = () => {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [gameId, setGameId] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchGames = async () => {
            const res = await axios.get('/rooms/open');
            setGames(res.data.response);
            setLoading(false);
        }
        if (loading) fetchGames();
    }, [loading]);
    return (
        <React.Fragment>
            <div className="logo">
                Dixit
            </div>
            <form className="join-form"
            onSubmit={e => {
                e.preventDefault();
                history.push(`/select?gameid=${gameId}&ishost=false`);
            }}>
                <main className="main-join">
                    <div className="left-side">
                        <div className="join-header">
                            <img src="/images/players.png"/>
                            <div>Join Game</div>
                        </div>
                        <input type="text" className="dixit-input"
                        placeholder="Game ID" required
                        value={gameId} onChange={e => setGameId(e.target.value)}/>
                    </div>
                    <div className="right-side">
                        <div className="join-header">
                            <img src="/images/search.png"/>
                            <div>Open Games</div>
                        </div>
                        <select required
                        value={gameId}
                        onChange={e => {
                            if (e.target.value !== 'none') {
                                setGameId(e.target.value);
                            }
                        }}>
                            <option value="none">No Game Selected</option>
                            {games.map(game => 
                                <option value={game.gameId}>{game.gameId}</option>
                            )}
                        </select>
                    </div>
                </main>
                <footer>
                    <button className="join-now-btn green-btn" type="submit">JOIN NOW</button>
                </footer>
            </form>
        </React.Fragment>
    )
}

export default Join
