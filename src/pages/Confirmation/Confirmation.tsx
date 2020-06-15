import React from 'react';

import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { CONFIRMATION_ROUTE } from 'routes';

import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';

const Confirmation = () => {
	const { user, doctor, schedule } = useAppointmentStepValidation(CONFIRMATION_ROUTE);

	return (
		<Container>
			<LeftSide user={user} doctor={doctor} schedule={schedule} />
			<RightSide schedule={schedule} />
		</Container>
	);
};

export default Confirmation;
