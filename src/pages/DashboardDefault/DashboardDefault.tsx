import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from 'pages/common';

import Home from './components/Home';
import LeftSide from './components/LeftSide';

const LaboratoryExams = () => {
	return (
		<Container>
			<LeftSide />
			<Switch>
				<Route path="/dashboard/default" exact>
					<Home />
				</Route>
			</Switch>
		</Container>
	);
};

export default LaboratoryExams;
