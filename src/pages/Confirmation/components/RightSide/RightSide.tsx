import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { RightLayout } from 'pages/common';
import AppointmentTips from '../AppointmentTips';
import CreatePassword from './CreatePassword';
import useStyles from './styles';
import { UserType } from 'pages/Confirmation/Confirmation';
import LinkUnderAgeAccount from './LinkUnderAgeAccount';
import { linkAccount } from 'pages/api';

interface RightSideProps {
	isGuest: boolean;
	email: string;
	updateContextState?: Function;
	userId: string;
	userType?: UserType;
	loggedUserName?: string;
	activeUserName?: string;
	patientId?: string;
	scheduleID?: string;
}

interface InformationDisplayedOptions extends RightSideProps {
	goToAppointments: () => void;
	linkNewAccount: (patientId: string | undefined) => () => Promise<void>;
}

const renderInformationDisplayed = ({
	userType,
	isGuest,
	goToAppointments,
	email,
	userId,
	updateContextState,
	loggedUserName,
	activeUserName,
	patientId,
	scheduleID,
	linkNewAccount,
}: InformationDisplayedOptions) => {
	switch (userType) {
		case 'underage':
			return (
				<LinkUnderAgeAccount
					loggedUserName={loggedUserName}
					activeUserName={activeUserName}
					linkAction={linkNewAccount(patientId)}
					closeModalAction={goToAppointments}
				/>
			);
		case 'adultRelative':
			return (
				<AppointmentTips
					scheduleID={scheduleID || ''}
					isGuest={isGuest}
					goToAppointments={goToAppointments}
					email={email}
				/>
			);
		case 'myself':
			return (
				<CreatePassword userId={userId} goToAppointments={goToAppointments} updateContextState={updateContextState} />
			);
		default:
			return (
				<AppointmentTips
					scheduleID={scheduleID || ''}
					isGuest={isGuest}
					goToAppointments={goToAppointments}
					email={email}
				/>
			);
	}
};

const RightSide = (props: RightSideProps) => {
	const classes = useStyles();
	const { push } = useHistory();

	const goToAppointments = useCallback(() => {
		push('/dashboard/citas');
	}, [push]);

	const linkNewAccount = useCallback(
		(patientId: string | undefined) => async () => {
			try {
				if (patientId) {
					await linkAccount(patientId);
				}
			} catch (e) {}
		},
		[],
	);

	return (
		<RightLayout className={classes.rightLayout}>
			{renderInformationDisplayed({ ...props, goToAppointments, linkNewAccount })}
		</RightLayout>
	);
};

export default RightSide;
