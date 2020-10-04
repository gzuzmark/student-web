import React from 'react';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';
import { AppointDetail } from 'pages/api/appointments';

import AppointmentCard from './AppointmentCard';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	tabWrapper: {
		padding: '26px 26px 20px',
		[breakpoints.up('lg')]: {
			padding: '26px 0',
		},
	},
}));

interface AppointmentsTabProps {
	appointments: AppointDetail[];
	isActive: boolean;
	oldAppointments?: boolean;
}

const AppointmentsTab = ({ appointments, isActive, oldAppointments = false }: AppointmentsTabProps) => {
	const classes = useStyles();

	return isActive ? (
		<div className={classes.tabWrapper}>
			{appointments.map((appointment: AppointDetail) => (
				<AppointmentCard key={appointment.id} appointment={appointment} isOldAppointment={oldAppointments} />
			))}
		</div>
	) : null;
};

export default AppointmentsTab;
