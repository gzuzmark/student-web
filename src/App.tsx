import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocal from 'date-fns/locale/es';
import { Nav } from 'pages/common';

import { routes, routeWithoutNav } from './routes';
import { AppProvider } from './AppContext';
import pageTheme from './theme';
import PrivateRoute from 'pages/common/PrivateRoute';

const theme = createMuiTheme({
	...pageTheme,
});

const formats = {
	normalDate: 'dd/MM/yyyy',
	keyboardDate: 'dd/MM/yyyy',
};

const App = () => {
	return (
		<LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocal} dateFormats={formats}>
			<ThemeProvider theme={theme}>
				<AppProvider>
					<Router>
						<Switch>
							<Route exact path={routes.map(({ path }) => path)}>
								<>
									<Nav />
									{routes.map(({ id, guard, component: Component, ...rest }) =>
										!!guard ? (
											<Route key={id} {...rest}>
												<PrivateRoute>
													<Component />
												</PrivateRoute>
											</Route>
										) : (
											<Route key={id} component={Component} {...rest} />
										),
									)}
								</>
							</Route>
							<Route exact path={routeWithoutNav.map(({ path }) => path)}>
								{routeWithoutNav.map(({ id, ...rest }) => (
									<Route key={id} {...rest} />
								))}
							</Route>
							<Route exact path="/registro">
								<Redirect to="/registro/contacto" />
							</Route>
							<Route path="/*">
								<Redirect to="/triaje" />
							</Route>
						</Switch>
					</Router>
				</AppProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default App;
