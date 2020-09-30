import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';

import { Container } from 'pages/common';
import { useAppointmentStepValidation } from 'utils';
import { CONFIRMATION_ROUTE } from 'routes';

import { RightSide } from './components/RightSide';
import LeftSide from './components/LeftSide';
import MobileBottomMessage from './components/RightSide/MobileBottomMessage';
import { GUEST } from 'AppContext';

export type UserType = 'underage' | 'adultRelative' | 'myself';

const getUserType = (
	isUnderAge: boolean,
	isForNewAccount: boolean,
	isForNewLinkedAccount: boolean,
): UserType | undefined => {
	if (isForNewAccount) {
		return 'myself';
	}

	if (isForNewLinkedAccount && isUnderAge) {
		return 'underage';
	} else if (isForNewLinkedAccount && !isUnderAge) {
		return 'adultRelative';
	}
};

const Confirmation = () => {
	const {
		appointmentOwner,
		user,
		patientUser,
		doctor,
		schedule,
		useCase,
		paymentURL,
		userToken,
		updateState,
	} = useAppointmentStepValidation(CONFIRMATION_ROUTE);
	const activeUser = patientUser || user;
	const [showMobileRightSide, setShowMobileRightSide] = useState<boolean>(false);
	const [isBottomMessageShowing, setIsBottomMessageShowing] = useState<boolean>(true);
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const isGuest = appointmentOwner === GUEST;
	const isUserLoggedIn = !!userToken;
	const closeMessage = () => {
		setShowMobileRightSide(true);
	};
	const hideBottomMessage = () => {
		setIsBottomMessageShowing(false);
	};
	const isForNewAccount = !isGuest && !isUserLoggedIn;
	const isForNewLinkedAccount = isGuest && isUserLoggedIn;
	const showMobileMessage = !isDesktop && !showMobileRightSide;
	const userType = getUserType(activeUser?.isUnderAge || false, isForNewAccount, isForNewLinkedAccount);

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
				user={patientUser || user}
				doctor={doctor}
				schedule={schedule}
				showExtraInfo={isForNewAccount || isForNewLinkedAccount}
				isGuest={isGuest}
			/>
			{isForNewAccount || isForNewLinkedAccount ? (
				showMobileMessage ? (
					<MobileBottomMessage
						showBottomMessage={isBottomMessageShowing}
						hideBottomMessage={hideBottomMessage}
						closeMessage={closeMessage}
						isForNewAccount={isForNewAccount}
						name={activeUser?.name}
					/>
				) : (
					<RightSide
						isGuest={isGuest}
						email={user?.email || ''}
						updateContextState={updateState}
						userId={activeUser ? activeUser.id : ''}
						userType={userType}
						loggedUserName={user?.name}
						activeUserName={activeUser?.name}
						patientId={patientUser?.id}
					/>
				)
			) : (
				<RightSide
					isGuest={isGuest}
					email={user?.email || ''}
					updateContextState={updateState}
					userId={activeUser ? activeUser.id : ''}
					patientId={patientUser?.id}
				/>
			)}
		</Container>
	);
};

export default Confirmation;
