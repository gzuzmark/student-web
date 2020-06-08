import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';

import { Container, RightLayout, LeftLayout } from 'pages/common';
import { usePageTitle, useAppointmentStepValidation } from 'utils';
import aliviaAxios from 'utils/customAxios';
import { useHistory } from 'react-router-dom';
import { PAYMENT_ROUTE } from 'routes';

const Payment = () => {
	const history = useHistory();
	const { triage, reservationAccountID, scheduleID, useCase } = useAppointmentStepValidation(PAYMENT_ROUTE);

	usePageTitle('Pago');
	const onClick = useCallback(async () => {
		if (useCase) {
			await aliviaAxios.post('/appointments', {
				data: {
					reservation_account_id: reservationAccountID,
					use_case_id: useCase.id,
					schedule_id: scheduleID,
					appointment_type_id: 'asdf',
					questions: triage,
				},
			});
			history.push('/citas');
		}
	}, [history, reservationAccountID, scheduleID, triage, useCase]);

	return (
		<Container>
			<LeftLayout>Titulo</LeftLayout>
			<RightLayout>
				<Button onClick={onClick} variant="outlined">
					Pago
				</Button>
			</RightLayout>
		</Container>
	);
};

export default Payment;
