import React from 'react';

// import socketIO from 'socket.io-client';

// export const socket = socketIO('http://localhost:8080/socket.io/', {
// 	transports: ['polling', 'websocket'],
// });

// socket.on('connect', () => {
// 	console.log('conectado');
// });

// socket.on('error', (err) => {
// 	console.log(err);
// });

const BASE_URL = String(process.env.REACT_APP_BASE_URL);
let url = null;
if (BASE_URL.startsWith('https')) {
	url = BASE_URL.replace('https', 'wss');
} else {
	url = BASE_URL.replace('http', 'ws');
}

export const socket: WebSocket = new WebSocket(`${url}/ws`);

export const SocketContext = React.createContext(socket);
