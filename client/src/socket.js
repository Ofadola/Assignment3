import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export const subscribeConnectEvent = (cb) => {
    socket.on('connect', cb);
}

export const subscribeGameEvent = (cb) => {
    socket.on('game', cb);
}

export const subscribeMessageEvent = (cb) => {
    socket.on('message', cb);
}

export const subscribeErrorEvent = (cb) => {
    socket.on('error', cb);
}

export const joinRoom = ({ player, gameId, isHost }) => {
    socket.emit('joinRoom', { player, gameId, isHost });
}

export const startGame = (gameId) => {
    console.log('starting game');
    socket.emit('startGame', { gameId });
}

// MAIN
export const storytellerChoose = ({ card, clue, gameId }) => {
    console.log('Storyteller chose card')
    socket.emit('storytellerChoose', { card, clue, gameId });
}

export const playerChoose = ({ card, username, gameId }) => {
    console.log('made choice')
    socket.emit('playerChoose', { card, username, gameId });
}

export const playerVote = ({ card, username, gameId }) => {
    console.log('player voted');
    socket.emit('playerVote', { card, username, gameId });
}

export const storytellerConfirm = ({ gameId }) => {
    console.log('Confirmed');
    socket.emit('storytellerConfirm', { gameId });
}

export const disconnectSocket = () => {
    socket.disconnect();
}

export const reconnectRoom = ({ username, gameId }) => {
    console.log('RECONNECTING ROOM');
    socket.emit('reconnectRoom', { username, gameId });
}

export const isConnected = () => socket.connected;