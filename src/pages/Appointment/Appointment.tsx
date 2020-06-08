import React, { useEffect, useState } from 'react';
import { Container } from 'pages/common';
import { useParams } from 'react-router-dom';

// import { getAppoinmentDetails, AppointDetail } from 'pages/api/appointments';
import { AppointDetail } from 'pages/api/appointments';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const requestAppointmentDetails = async (id: string, setAppointment: Function) => {
	// const appointment = await getAppoinmentDetails({ id });
	// eslint-disable-next-line
		// @ts-ignore
	if (window.appointment) {
		// eslint-disable-next-line
		// @ts-ignore
		setAppointment(window.appointment);
	}
};

const Appointment = () => {
	const { id } = useParams();
	const [appointment, setAppointment] = useState<AppointDetail>();
	useEffect(() => {
		requestAppointmentDetails(id, setAppointment);
	}, [id]);

	return appointment ? (
		<Container>
			<LeftSide appointmentType={appointment.appointmentType} />
			<RightSide appointment={appointment} />
		</Container>
	) : (
		<div />
	);
};

export default Appointment;
