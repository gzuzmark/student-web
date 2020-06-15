import React, { useState, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Loading } from 'pages/common';
import { PAYMENT_ROUTE } from 'routes';
import { useAppointmentStepValidation } from 'utils';
import initCulqi from 'utils/culquiIntegration';
import { CONFIRMATION_STEP } from 'AppContext';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { createPayment, createAppointment } from 'pages/api';

const Payment = () => {
	const {
		doctor,
		user,
		schedule,
		channel,
		useCase,
		triage,
		userToken,
		reservationAccountID,
		updateState: updateContextState,
	} = useAppointmentStepValidation(PAYMENT_ROUTE);
	const history = useHistory();
	const { t } = useTranslation('payment');
	const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const openPaymentModal = (e: MouseEvent) => {
		e.preventDefault();
		window.Culqi.open();
	};

	useEffect(() => {
		if (doctor?.totalCost) {
			initCulqi(doctor?.totalCost);

			window.culqi = async () => {
				try {
					setIsPaymentLoading(true);
					if (schedule && updateContextState && reservationAccountID && useCase && triage) {
						if (!!window.Culqi.token) {
							const token = window.Culqi.token.id;

							await createPayment({
								token,
								scheduleID: schedule.id,
								appointmentTypeID: 'ugito',
								cost: doctor?.totalCost,
							});
							await createAppointment(
								{
									reservationAccountID: reservationAccountID,
									appointmentTypeID: 'ugito',
									useCaseID: useCase.id,
									scheduleID: schedule.id,
									triage,
								},
								userToken,
							);
							updateContextState({
								appointmentCreationStep: CONFIRMATION_STEP,
							});
							history.push('/confirmacion');
						} else if (!!window.Culqi.error) {
							setErrorMessage(window.Culqi.error.user_message);
						}
					}
					setIsPaymentLoading(false);
				} catch (e) {
					setErrorMessage(t('payment.error.culqi'));
					setIsPaymentLoading(false);
				}
			};
		}
		// eslint-disable-next-line
	}, []);

	return !isPaymentLoading ? (
		<Container>
			<LeftSide doctor={doctor} user={user} schedule={schedule} channel={channel} />
			<RightSide totalCost={doctor?.totalCost} openPaymentModal={openPaymentModal} errorMessage={errorMessage} />
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default Payment;
