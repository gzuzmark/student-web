import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import { Container } from 'pages/common';
import AppContext from 'AppContext';
import { usePageTitle } from 'utils';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const Triage = () => {
	const location = useLocation();
	const params = parse(location.search);
	const { updateState, useCase } = useContext(AppContext);
	useEffect(() => {
		if (!useCase && updateState) {
			updateState({ useCase: params.malestar });
		}
	}, [params.malestar, updateState, useCase]);
	usePageTitle('Triaje');

	return (
		<Container>
			<LeftSide />
			<RightSide updateContextState={updateState} />
		</Container>
	);
};

export default Triage;
