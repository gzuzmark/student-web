import React, { useEffect, useState } from 'react';
import { Container } from 'pages/common';
import { useParams } from 'react-router-dom';

import { getAppoinmentDetails, AppointDetail } from 'pages/api/appointments';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const requestAppointmentDetails = async (id: string, setAppointment: Function) => {
	const appointment = await getAppoinmentDetails({ id });

	setAppointment(appointment);
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
		<div>Loading...</div>
	);
};

export default Appointment;
