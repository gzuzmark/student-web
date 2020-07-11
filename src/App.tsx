import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocal from 'date-fns/locale/es';
import { Nav } from 'pages/common';
import { parse } from 'query-string';

import { routes, routeWithoutNav } from './routes';
import { AppProvider } from './AppContext';
import pageTheme from './theme';
import { redirectToBaseAlivia, setLocalValue } from './utils';

import Validator from 'pages/common/Validator';

const theme = createMuiTheme({
	...pageTheme,
});

const formats = {
	normalDate: 'dd/MM/yyyy',
	keyboardDate: 'dd/MM/yyyy',
};

const RedirectWrapper = ({ location }: { location: Location }) => {
	const params = parse(location.search);

	if (!params.malestar) {
		redirectToBaseAlivia();

		return null;
	}

	return <Redirect to={{ pathname: '/triaje', search: `?malestar=${params.malestar}` }} />;
};

const App = () => {
	setLocalValue('routeListeners', '0');

	return (
		<LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocal} dateFormats={formats}>
			<ThemeProvider theme={theme}>
				<AppProvider>
					<Router>
						<Switch>
							<Route exact path={routes.map(({ path }) => path)}>
								<>
									{routes.map(({ id, guard, component: Component, ...rest }) => (
										<Route key={id} {...rest}>
											<Validator isPrivate={!!guard}>
												<>
													<Nav />
													<Component />
												</>
											</Validator>
										</Route>
									))}
								</>
							</Route>
							<Route exact path={routeWithoutNav.map(({ path }) => path)}>
								{routeWithoutNav.map(({ id, ...rest }) => (
									<Route key={id} {...rest} />
								))}
							</Route>
							<Route exact path="/registro">
								<Redirect to="/registro/sobre_ti" />
							</Route>
							<Route path="/dashboard">
								<Redirect to="/dashboard/citas" />
							</Route>
							<Route path="/*" component={RedirectWrapper} />
						</Switch>
					</Router>
				</AppProvider>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default App;
