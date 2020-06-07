import React from 'react';

import { Container } from 'pages/common';
import { usePageTitle, useAppointmentStepValidation } from 'utils';

import { LeftSide, RightSide } from './components';

const PreSignUp = () => {
	usePageTitle('Un segundo');
	const { appointmentOwner, updateState } = useAppointmentStepValidation('pre-registro');

	return (
		<Container>
			<LeftSide appointmentOwner={appointmentOwner} />
			<RightSide appointmentOwner={appointmentOwner} updateState={updateState} />
		</Container>
	);
};

export default PreSignUp;
