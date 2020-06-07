import React from 'react';

import { useAppointmentStepValidation, usePageTitle } from 'utils';

import { Container } from '../common';
import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';

const SelectDoctor = () => {
	const { useCase, updateState } = useAppointmentStepValidation('seleccionar-doctor');

	usePageTitle('Seleccion doctor');

	return (
		<Container>
			<LeftSide />
			<RightSide useCase={useCase} updateContextState={updateState} />
		</Container>
	);
};

export default SelectDoctor;
