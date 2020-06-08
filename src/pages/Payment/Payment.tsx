import React, { useLayoutEffect } from 'react';

import { usePageTitle, useAppointmentStepValidation } from 'utils';
import aliviaAxios from 'utils/customAxios';
import { useHistory } from 'react-router-dom';
import { PAYMENT_ROUTE } from 'routes';

// eslint-disable-next-line
// @ts-ignore
const createAppointment = async (useCase, reservationAccountID, scheduleID, triage, userToken, history) => {
	if (useCase) {
		await aliviaAxios.post(
			'/appointments',
			{
				data: {
					reservation_account_id: reservationAccountID,
					use_case_id: useCase.id,
					schedule_id: scheduleID,
					appointment_type_id: 'asdf',
					questions: triage,
				},
			},
			{ headers: { Authentication: `Bearer ${userToken}` } },
		);
		history.push('/citas');
	}
};

const Payment = () => {
	const history = useHistory();
	const { userToken, triage, reservationAccountID, scheduleID, useCase } = useAppointmentStepValidation(PAYMENT_ROUTE);

	usePageTitle('Pago');
	useLayoutEffect(() => {
		createAppointment(useCase, reservationAccountID, scheduleID, triage, userToken, history);
	}, [history, reservationAccountID, scheduleID, triage, useCase, userToken]);

	return <div />;

	// return (
	// 	<Container>
	// 		<LeftLayout>Titulo</LeftLayout>
	// 		<RightLayout>
	// 			<Button onClick={onClick} variant="outlined">
	// 				Pago
	// 			</Button>
	// 		</RightLayout>
	// 	</Container>
	// );
};

export default Payment;
