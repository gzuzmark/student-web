import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocal from 'date-fns/locale/es';
import { AppProvider } from './AppContext';

import pageTheme from './theme';
import { Nav } from 'pages/common';
import routes from './routes';

const theme = createMuiTheme({
	...pageTheme,
});

const formats = {
	normalDate: 'dd/MM/yyyy',
	keyboardDate: 'dd/MM/yyyy',
};

function App() {
	return (
		<LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocal} dateFormats={formats}>
			<ThemeProvider theme={theme}>
				<AppProvider>
					<Router>
						<Nav />
						<Switch>
							{routes.map(({ id, route, component: Component }) => (
								<Route key={id} path={route}>
									<Component />
								</Route>
							))}
						</Switch>
					</Router>
				</AppProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
