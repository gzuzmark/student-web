import React from 'react';

import { SELECT_DOCTOR_ROUTE } from 'routes';
import { useAppointmentStepValidation, usePageTitle } from 'utils';

import { Container } from '../common';
import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';

const SelectDoctor = () => {
	const { useCase, userToken, updateState } = useAppointmentStepValidation(SELECT_DOCTOR_ROUTE);

	usePageTitle('Seleccion doctor');

	return (
		<Container>
			<LeftSide />
			<RightSide isUserLoggedIn={!!userToken} useCase={useCase} updateContextState={updateState} />
		</Container>
	);
};

export default SelectDoctor;
