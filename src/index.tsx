import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'l18n/index';
import { SnackbarProvider } from 'notistack';
import { socket, SocketContext } from './pages/Socket/socket';

ReactDOM.render(
	<React.StrictMode>
		<SocketContext.Provider value={socket}>
			<SnackbarProvider maxSnack={1}>
				<App />
			</SnackbarProvider>
		</SocketContext.Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
