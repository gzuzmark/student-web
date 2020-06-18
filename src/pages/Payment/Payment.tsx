import React, { useCallback, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Loading } from 'pages/common';
import { PAYMENT_ROUTE } from 'routes';
import { useAppointmentStepValidation } from 'utils';
import initCulqi from 'utils/culquiIntegration';
import { CONFIRMATION_STEP } from 'AppContext';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { createPayment, createAppointment, applyDiscount, Discount } from 'pages/api';

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
	const [discountCode, setDiscountCode] = useState('');
	const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [discount, setDiscount] = useState<Discount>({ id: '', totalCost: '' });
	const openPaymentModal = useCallback((e: MouseEvent) => {
		e.preventDefault();
		window.Culqi.open();
	}, []);
	const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target) {
			setDiscountCode(e.target.value);
		}
	};
	const sendDiscount = useCallback(async () => {
		try {
			if (user) {
				const reviewedDiscount = await applyDiscount({ couponCode: discountCode, dni: user.dni });

				setDiscount(reviewedDiscount);
			}
		} catch (e) {}
	}, [discountCode, user]);

	useEffect(() => {
		if (useCase?.totalCost) {
			initCulqi(useCase?.totalCost);

			window.culqi = async () => {
				try {
					setIsPaymentLoading(true);
					if (schedule && updateContextState && reservationAccountID && useCase && triage) {
						if (!!window.Culqi.token) {
							const token = window.Culqi.token.id;
							const email = window.Culqi.token.email;

							await createPayment({
								token,
								scheduleID: schedule.id,
								appointmentTypeID: 'ugito',
								cost: useCase?.totalCost,
								email,
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
			<RightSide
				totalCost={discount.totalCost || useCase?.totalCost}
				isCounponDisabled={!!discount.totalCost}
				sendDiscount={sendDiscount}
				discountCode={discountCode}
				onChangeDiscount={onChangeDiscount}
				openPaymentModal={openPaymentModal}
				errorMessage={errorMessage}
			/>
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default Payment;
