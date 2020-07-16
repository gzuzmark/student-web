import React, { useEffect } from 'react';

import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { CONFIRMATION_ROUTE } from 'routes';

import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';
import { GUEST } from 'AppContext';

const Confirmation = () => {
	const { appointmentOwner, user, doctor, schedule, useCase } = useAppointmentStepValidation(CONFIRMATION_ROUTE);
	const isGuest = appointmentOwner === GUEST;

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			window.fbq('track', 'Purchase', { currency: 'PEN', value: useCase?.totalCost });
			window.gtag('event', 'conversion', {'send_to': 'AW-620358090/NHAXCLHh29YBEMrT56cC'});
			window.gtag('event', 'Pagar', 'Botón', 'click');
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Container>
			<LeftSide user={user} doctor={doctor} schedule={schedule} />
			<RightSide isGuest={isGuest} email={user?.email || ''} />
		</Container>
	);
};

export default Confirmation;
