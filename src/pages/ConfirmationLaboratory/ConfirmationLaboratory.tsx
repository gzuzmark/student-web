import React from 'react';
import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { PAYMENT_ROUTE_LABORATORY } from 'routes';

import { RightSide } from './components/RightSide';
import LeftSide from './components/LeftSide';
// import { GUEST } from 'AppContext';

const ConfirmationLaboratory = () => {
	const { user, laboratorio, schedules, updateState } = useAppointmentStepValidation(PAYMENT_ROUTE_LABORATORY);

	return (
		<Container>
			<LeftSide user={user} laboratorio={laboratorio} schedule={schedules} showExtraInfo={false} isGuest={true} />
			<RightSide isGuest={true} email={user?.email || ''} updateContextState={updateState} />
		</Container>
	);
};

export default ConfirmationLaboratory;
