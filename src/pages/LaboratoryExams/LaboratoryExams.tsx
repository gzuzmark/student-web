import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Container } from 'pages/common';

import Home from './components/Home';
import LaboratoriesMap from './components/LaboratoriesMap';
import Exams from './components/Exams';
import LeftSide from './components/LeftSide';

const LaboratoryExams = () => {
	return (
		<Container>
			<LeftSide />
			<Switch>
				<Route path="/dashboard/laboratorios" exact>
					<Home />
				</Route>
				<Route path="/dashboard/laboratorios/cercanos" exact>
					<LaboratoriesMap />
				</Route>
				<Route path="/dashboard/laboratorios/examenes" exact>
					<Exams />
				</Route>
				<Route path="/dashboard/laboratorios/*">
					<Redirect to="/dashboard/laboratorios" />
				</Route>
			</Switch>
		</Container>
	);
};

export default LaboratoryExams;
