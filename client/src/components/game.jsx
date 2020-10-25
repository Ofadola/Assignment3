import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import User from './User';
import Waiting from './Waiting'
import './Game.css';
import { GameContext } from '../contexts/GameContext';
import { Link, Redirect, useLocation } from 'react-router-dom';
import GameFooter from './GameFooter';
import LoadingSpinner from './LoadingSpinner';

const Game = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const gameId = query.get('gameid');

    const [clue, setClue] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const { currentGame, currentPlayer, reconnectRoom,
    storytellerChoose, playerChoose, playerVote, startGame, 
    storytellerConfirm } = useContext(GameContext);

    const onSubmit = async () => {
        if (player.currentRole === 'storyteller' && currentGame.state === 'storyteller') {
            if (selectedCard !== null && clue !== '') {
                storytellerChoose({ card: selectedCard, clue, gameId });
            }
        }
        if (player.currentRole === 'player' && currentGame.state === 'choosing') {
            if (selectedCard !== null) {
                playerChoose({ card: selectedCard, username, gameId });
            }
        }
        if (player.currentRole === 'player' && currentGame.state === 'voting') {
            if (selectedCard !== null) {
                playerVote({ card: selectedCard, username, gameId });
            }
        }
        if (player.currentRole === 'storyteller' && currentGame.state === 'votingEnd') {
            storytellerConfirm({ gameId });
        }
    }

    useEffect(() => {
        reconnectRoom({ username, gameId });
    }, []);

    if (!username || !gameId) return (
        <Redirect to="/" />
    )
    console.log(currentGame);
    if (!currentGame) return (
        <LoadingSpinner />
    )
    const player = currentGame.players
    .find(player => player.username === username);
    // GAME PREP
    let selectText = 'ERROR';
    if (player.currentRole === 'storyteller') {
        if (currentGame.state === 'storyteller') {
            selectText = 'You are storyteller. Select one of your cards to play';
        }
        else if (currentGame.state === 'voting' || currentGame.state === 'votingEnd') {
            selectText = 'Players cards';
        }
        else {
            selectText = 'Your cards';
        }
    } else {
        if (currentGame.state === 'choosing') {
            selectText = 'You are player. Select one of your cards to play';
        }
        else if (currentGame.state === 'voting' || currentGame.state === 'votingEnd') {
            selectText = 'Players cards';
        }
        else {
            selectText = 'Your cards';
        }
    }
    const cards = (currentGame.state === 'voting' || currentGame.state === 'votingEnd') ?
    currentGame.votings : player.cards;
    let cardVotes = null;
    let storytellerCard = null;
    if (currentGame.state === 'votingEnd') {
        cardVotes = currentGame.players.map(player => 0);
        for (let i in currentGame.players) {
            if (currentGame.players[i].currentRole === 'storyteller') {
                storytellerCard = currentGame.votings[i];
            }
            for (let j in currentGame.players) {
                if (currentGame.players[j].chosenCard === currentGame.votings[i]
                    && currentGame.players[j].currentRole !== 'storyteller') {
                    cardVotes[i] += 1;
                }
            }
        }
    }
    let winner = null;
    if (currentGame.winner !== null && currentGame.winner !== undefined) {
        winner = currentGame.players[currentGame.winner];
    }
    // END OF GAME PREP
    if (currentGame.state === 'not started') return (
        <Waiting numPlayers={currentGame.players.length} isHost={player.isHost}
        onStart={() => startGame(currentGame.gameId)}/>
    )
    if (currentGame.state === 'finished') return (
        <div className="finished">
            <div className="finished-text">
                Game Finished
            </div>
            <User 
            isCurrent={true}
            username={winner.username}
            score={winner.score}
            avatarSrc={winner.avatarSrc}/>
            <div className="winner-text">Winner</div>
            <Link to="/" className="link-home">Go to Home Page</Link>
        </div>
    )
    return (
        <React.Fragment>
            <div className="logo logo-small">Dixit</div>
            <div className="cards-left">
                <img src="/images/card.png"/>
                <div>x {currentGame.cards.length}</div>
            </div>
            <div className="game-main">
                <section className="users-section">
                    {currentGame.players.map(user => <User 
                    key={user.username}
                    isCurrent={user.currentRole === 'storyteller'}
                    username={user.username}
                    score={user.score}
                    avatarSrc={user.avatarSrc}/>)}
                </section>
                {currentGame.state === 'votingEnd' && <div className="scores">
                    {currentGame.scores.map((score, i) => 
                        <div className="score" key={i}>
                            +{score}
                        </div>
                    )}
                </div>}
                <label className="select-card">{selectText}</label>
                <div className="cards-list">
                    {cards.map((card, i) => <Card
                    onClick={() => {
                        if ((currentGame.state === 'storyteller' &&
                        player.currentRole !== 'storyteller') || 
                        currentGame.state === 'votingEnd') {
                            return null;
                        }
                        if (selectedCard !== card) {
                            setSelectedCard(card);
                        } else {
                            setSelectedCard(null);
                        }
                    }}
                    key={card}
                    card={card} 
                    scaled={card === storytellerCard}
                    circleChar={currentGame.state === 'votingEnd' ? 
                    cardVotes[i] || '' : card === selectedCard && '✓'}
                    />)}
                </div>
                <GameFooter 
                isStoryteller={player.currentRole === 'storyteller'}
                state={currentGame.state} clue={clue}
                setClue={setClue}
                hasChosen={!!player.chosenCard}
                onSubmit={onSubmit}/>
                {currentGame.state !== 'storyteller' && <div className="clue">
                    <div className="clue-text">
                        {currentGame.clue}
                    </div>
                </div>}
            </div>
        </React.Fragment>
    )
}

export default Game;
