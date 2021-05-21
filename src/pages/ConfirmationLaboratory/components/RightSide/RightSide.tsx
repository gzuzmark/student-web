import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { RightLayout } from 'pages/common';
import AppointmentTips from '../AppointmentTips';
import useStyles from './styles';

interface RightSideProps {
	isGuest: boolean;
	email: string;
	updateContextState?: Function;
}

const RightSide = ({ isGuest, email }: RightSideProps) => {
	const classes = useStyles();
	const { push } = useHistory();

	const goToAppointments = useCallback(() => {
		push('/dashboard/citas');
	}, [push]);

	return (
		<RightLayout className={classes.rightLayout}>
			<AppointmentTips scheduleID={''} isGuest={isGuest} goToAppointments={goToAppointments} email={email} />
		</RightLayout>
	);
};

export default RightSide;
