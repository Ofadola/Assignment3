import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../socket';
import { disconnectSocket, isConnected, joinRoom, playerChoose, playerVote, reconnectRoom, startGame, storytellerChoose, storytellerConfirm, subscribeConnectEvent, 
    subscribeErrorEvent, subscribeGameEvent, subscribeMessageEvent } from '../socket';

export const GameContext = createContext({
    currentGame: {},
    currentPlayer: {},
    joinRoom: ({ player, gameId, isHost }) => {},
    startGame: () => {},
    setPlayer: ({ player, isHost }) => {},
    setGame: (game) => {},
    storytellerChoose: ({ card, clue, gameId }) => {},
    storytellerConfirm: ({ gameId }) => {},
    playerChoose: ({ card, username, gameId }) => {},
    playerVote: ({ card, username, gameId }) => {},
    reconnectRoom: ({ username, gameId }) => {},
});

export const GameProvider = ({ children }) => {
    const [currentGame, setCurrentGame] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [loading, setLoading] = useState(!isConnected());
    console.log('LOADING ' + loading);

    useEffect(() => {
        subscribeConnectEvent(() => {
            console.log('Connected');
            setLoading(false);
        })
        subscribeMessageEvent(msg => {
            if (msg === 'welcome') {
                console.log(msg);
                setLoading(false);
            } else {
                console.log(msg);
            }
        });
        subscribeErrorEvent(err => console.log(err));
        subscribeGameEvent(game => {
            console.log('GAME OBJECT RECEIVED');
            console.log(game);
            setCurrentGame(game);
        })
        return () => disconnectSocket();
    }, []);

    if (loading) {
        return (
            <LoadingSpinner />
        )
    }
    return (
        <GameContext.Provider value={{
            currentGame,
            currentPlayer,
            joinRoom,
            setPlayer: setCurrentPlayer,
            setGame: setCurrentGame,
            reconnectRoom,
            storytellerChoose: storytellerChoose,
            storytellerConfirm: storytellerConfirm,
            playerVote: playerVote,
            playerChoose: playerChoose,
            startGame: startGame,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;