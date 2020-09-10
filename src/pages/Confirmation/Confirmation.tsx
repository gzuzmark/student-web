import React, { useEffect, useContext, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';

import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { CONFIRMATION_ROUTE } from 'routes';

import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';
import MobileBottomMessage from './components/MobileBottomMessage';
import AppContext, { GUEST } from 'AppContext';

const Confirmation = () => {
	// const { appointmentOwner, user, doctor, schedule, useCase, paymentURL, userToken } = useAppointmentStepValidation(
	// 	CONFIRMATION_ROUTE,
	// );
	const { appointmentOwner, user, doctor, schedule, useCase, paymentURL, userToken } = useContext(AppContext);
	const [showMobileRightSide, setShowMobileRightSide] = useState<boolean>(false);
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const isGuest = appointmentOwner === GUEST;
	const isUserLoggedIn = !!userToken;
	const closeMessage = () => {
		setShowMobileRightSide(true);
	};

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			window.fbq('track', 'Purchase', { currency: 'PEN', value: useCase?.totalCost });
			window.gtag('event', 'conversion', { send_to: 'AW-620358090/NHAXCLHh29YBEMrT56cC' });
			window.gtag('event', 'Pagar', 'Botón', 'click');
		}
		if (paymentURL) {
			setTimeout(() => {
				window.location.href = paymentURL;
			}, 500);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Container>
			<LeftSide
				user={user}
				doctor={doctor}
				schedule={schedule}
				showExtraInfo={!isGuest && !isUserLoggedIn}
				isGuest={isGuest}
			/>
			{isGuest || isUserLoggedIn ? (
				<RightSide isGuest={isGuest} email={user?.email || ''} showPasswordForm={!isGuest && !isUserLoggedIn} />
			) : matches ? (
				<RightSide isGuest={isGuest} email={user?.email || ''} showPasswordForm={!isGuest && !isUserLoggedIn} />
			) : showMobileRightSide ? (
				<RightSide isGuest={isGuest} email={user?.email || ''} showPasswordForm={!isGuest && !isUserLoggedIn} />
			) : (
				<MobileBottomMessage closeMessage={closeMessage} />
			)}
		</Container>
	);
};

export default Confirmation;
