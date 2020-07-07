import React, { useEffect, useContext } from 'react';

import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { SELECT_DOCTOR_ROUTE } from 'routes';
import { useAppointmentStepValidation, usePageTitle, redirectToBaseAlivia } from 'utils';

import { Container } from '../common';
import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';
import { getUseCase } from 'pages/api';
import AppContext, { SELECT_DOCTOR_STEP, GUEST } from 'AppContext';

const DEFAULT_TRIAGE_VALUES = [
	{ question: '¿Para quién es la consulta?', answer: 'relative' },
	{ question: '¿Qué tan fuerte es el malestar?', answer: 'moderate' },
	{ question: 'De acuerdo, describe el malestar:', answer: '-' },
	{ question: '¿Hace cuánto tiempo se viene presentando este malestar?', answer: '-' },
];

const requestUseCaseID = async (useCaseID: string, updateState: Function | undefined) => {
	if (updateState) {
		const useCase = await getUseCase(useCaseID);
		updateState({
			useCase,
			appointmentCreationStep: SELECT_DOCTOR_STEP,
			triage: DEFAULT_TRIAGE_VALUES,
			appointmentOwner: GUEST,
		});
	}
};

const useHookBasedOnURLAccess = (comeFromTriage: boolean, f1: Function, f2: Function) => {
	return comeFromTriage ? f1(SELECT_DOCTOR_ROUTE) : f2(AppContext);
};

const SelectDoctor = () => {
	const location = useLocation();
	const params = parse(location.search);
	const comeFromTriage = !params.malestar;
	const { useCase, userToken, updateState } = useHookBasedOnURLAccess(
		comeFromTriage,
		useAppointmentStepValidation,
		useContext,
	);
	usePageTitle('Seleccion doctor');

	useEffect(() => {
		if (!comeFromTriage) {
			const useCaseParam = params.malestar as string;

			if (!useCaseParam) {
				redirectToBaseAlivia();
			}

			if (!useCase && useCaseParam && updateState) {
				requestUseCaseID(useCaseParam, updateState);
			}
		}
	}, [location.search, updateState, useCase]);

	return (
		<Container>
			<LeftSide />
			<RightSide
				isUserLoggedIn={!!userToken}
				useCase={useCase}
				updateContextState={updateState}
				comeFromTriage={comeFromTriage}
			/>
		</Container>
	);
};

export default SelectDoctor;
