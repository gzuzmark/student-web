import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';

import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { CONFIRMATION_ROUTE } from 'routes';

import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';
import MobileBottomMessage from './components/MobileBottomMessage';
import { GUEST } from 'AppContext';

const Confirmation = () => {
	const {
		appointmentOwner,
		user,
		guestUser,
		doctor,
		schedule,
		useCase,
		paymentURL,
		userToken,
		updateState,
	} = useAppointmentStepValidation(CONFIRMATION_ROUTE);
	const activeUser = guestUser || user;
	const [showMobileRightSide, setShowMobileRightSide] = useState<boolean>(false);
	const [isBottomMessageShowing, setIsBottomMessageShowing] = useState<boolean>(true);
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const isGuest = appointmentOwner === GUEST;
	const isUserLoggedIn = !!userToken;
	const closeMessage = () => {
		setShowMobileRightSide(true);
	};
	const hideBottomMessage = () => {
		setIsBottomMessageShowing(false);
	};

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			window.fbq('track', 'Purchase', { currency: 'PEN', value: useCase?.totalCost });
			window.fbq('track', 'CompleteRegistration', { value: useCase?.totalCost });
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
				user={guestUser || user}
				doctor={doctor}
				schedule={schedule}
				showExtraInfo={!isGuest && !isUserLoggedIn}
				isGuest={isGuest}
			/>
			{isGuest || isUserLoggedIn ? (
				<RightSide
					isGuest={isGuest}
					email={user?.email || ''}
					showPasswordForm={!isGuest && !isUserLoggedIn}
					updateContextState={updateState}
					userId={activeUser ? activeUser.id : ''}
				/>
			) : matches ? (
				<RightSide
					isGuest={isGuest}
					email={user?.email || ''}
					showPasswordForm={!isGuest && !isUserLoggedIn}
					updateContextState={updateState}
					userId={activeUser ? activeUser.id : ''}
				/>
			) : showMobileRightSide ? (
				<RightSide
					isGuest={isGuest}
					email={user?.email || ''}
					showPasswordForm={!isGuest && !isUserLoggedIn}
					updateContextState={updateState}
					userId={activeUser ? activeUser.id : ''}
				/>
			) : (
				<MobileBottomMessage
					showBottomMessage={isBottomMessageShowing}
					hideBottomMessage={hideBottomMessage}
					closeMessage={closeMessage}
				/>
			)}
		</Container>
	);
};

export default Confirmation;
