import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import './Home.css';

const Home = () => {
    return (
        <React.Fragment>
            <div className="logo">
                Dixit
            </div>
            <div className="home-buttons">
                <Link className="play-btn green-btn" to="/join">PLAY NOW</Link>
                <Link className="host-btn green-btn" to="/host">HOST GAME</Link>
            </div>
        </React.Fragment>
    )
}

export default Home;
