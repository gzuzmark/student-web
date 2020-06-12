import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import { Container } from 'pages/common';
import AppContext, { TRIAGE_STEP } from 'AppContext';
import { usePageTitle, redirectToBaseAlivia } from 'utils';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { getUseCase } from 'pages/api';

const requestUseCaseID = async (useCaseID: string, updateState: Function | undefined) => {
	if (updateState) {
		const useCase = await getUseCase(useCaseID);
		updateState({ useCase, appointmentCreationStep: TRIAGE_STEP });
	}
};

const Triage = () => {
	const location = useLocation();
	const { updateState, useCase } = useContext(AppContext);
	usePageTitle('Triaje');
	useEffect(() => {
		const params = parse(location.search);
		const useCaseParam = params.malestar as string;

		if (!useCaseParam) {
			redirectToBaseAlivia();
		}

		if (!useCase && useCaseParam && updateState) {
			requestUseCaseID(useCaseParam, updateState);
		}
	}, [location.search, updateState, useCase]);

	return (
		<Container>
			<LeftSide />
			<RightSide updateContextState={updateState} />
		</Container>
	);
};

export default Triage;
