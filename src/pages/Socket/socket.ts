import React from 'react';

const BASE_URL = String(process.env.REACT_APP_BASE_URL);
let url = null;
if (BASE_URL.startsWith('https')) {
	url = BASE_URL.replace('https', 'wss');
} else {
	url = BASE_URL.replace('http', 'ws');
}

export const socket: WebSocket = new WebSocket(`${url}/ws`);

export const SocketContext = React.createContext(socket);

export const ON_OPEN = 'open';
export const ON_CLOSE = 'close';
