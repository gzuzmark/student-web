import React, { useCallback, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Loading } from 'pages/common';
import { PAYMENT_ROUTE } from 'routes';
import { useAppointmentStepValidation, getIntCurrency } from 'utils';
import initCulqi from 'utils/culquiIntegration';
import { CONFIRMATION_STEP, GUEST } from 'AppContext';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { createPayment, createAppointment, applyDiscount, Discount, CULQI_PAYMENT_ID, PE_PAYMENT_ID } from 'pages/api';

const buildTransactionURL = (doctorName: string, doctorLastname: string, patientName: string, patientPhone: string) => {
	return `https://chats.landbot.io/v2/H-642423-BHD55YOVGNEOHTH0/index.html?doctor_name=${doctorName}&doctor_lastname=${doctorLastname}&name=${patientName}&phone=${patientPhone}`;
};

const Payment = () => {
	const {
		doctor,
		user,
		patientUser,
		schedule,
		channel,
		useCase,
		triage,
		userFiles,
		userToken,
		updateState: updateContextState,
		isTransactionEnabled = false,
		appointmentOwner,
	} = useAppointmentStepValidation(PAYMENT_ROUTE);
	const history = useHistory();
	const activeUser = patientUser || user;
	const { t } = useTranslation('payment');
	const [discountCode, setDiscountCode] = useState('');
	const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [discount, setDiscount] = useState<Discount>({ id: '', totalCost: '' });

	const performTransactionPayment = useCallback(
		async (method: number) => {
			if (schedule && updateContextState && useCase && triage && activeUser && doctor) {
				try {
					setIsPaymentLoading(true);
					const userName = activeUser.name;
					const userPhone = activeUser.phoneNumber;
					const response: any = await createPayment({
						cost: useCase?.totalCost,
						appointmentTypeID: 'ugito',
						scheduleID: schedule.id,
						discountID: discount.id,
						email: activeUser.email || '',
						token: 'SnzVSB3cSA',
						dni: activeUser.identification || '',
						name: userName || '',
						lastName: activeUser.lastName,
						phone: userPhone || '',
						paymentType: method,
					});
					await createAppointment(
						{
							reservationAccountID: activeUser.id,
							appointmentTypeID: 'ugito',
							useCaseID: useCase.id,
							scheduleID: schedule.id,
							triage,
							media: userFiles || [],
							isGuest: appointmentOwner === GUEST,
						},
						userToken,
					);
					setIsPaymentLoading(false);
					let link = null;
					if (method === PE_PAYMENT_ID) {
						if (response?.data) {
							link = response?.data?.data?.reference_link as string;
						}
					} else {
						link = buildTransactionURL(doctor.name, doctor.lastName, userName || '', userPhone || '');
					}
					updateContextState({
						useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
						paymentURL: link,
						appointmentCreationStep: CONFIRMATION_STEP,
					});
					history.push('/confirmacion');
				} catch (e) {
					setErrorMessage(t('payment.error.pe'));
					setIsPaymentLoading(false);
				}
			}
		},
		[
			schedule,
			updateContextState,
			useCase,
			triage,
			activeUser,
			doctor,
			discount.id,
			discount.totalCost,
			userFiles,
			appointmentOwner,
			userToken,
			history,
			t,
		],
	);

	const makePayment = useCallback(
		(paymentMethod: number) => (e: MouseEvent) => {
			if (paymentMethod === CULQI_PAYMENT_ID) {
				e.preventDefault();
				window.Culqi.open();
			} else {
				performTransactionPayment(paymentMethod);
			}
		},
		[performTransactionPayment],
	);
	const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target) {
			setDiscountCode(e.target.value);
		}
	};
	const sendDiscount = useCallback(async () => {
		try {
			if (activeUser && schedule) {
				const reviewedDiscount = await applyDiscount({
					couponCode: discountCode,
					dni: activeUser.identification,
					scheduleID: schedule.id,
				});

				window.Culqi.settings({ currency: 'PEN', amount: getIntCurrency(reviewedDiscount.totalCost) });
				setDiscount(reviewedDiscount);
			}
		} catch (e) {}
	}, [discountCode, schedule, activeUser]);

	useEffect(() => {
		if (useCase?.totalCost) {
			initCulqi(useCase?.totalCost);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (useCase?.totalCost) {
			window.culqi = async () => {
				try {
					setIsPaymentLoading(true);
					if (schedule && updateContextState && useCase && triage && activeUser) {
						if (!!window.Culqi.token) {
							const token = window.Culqi.token.id;
							const email = window.Culqi.token.email;

							await createPayment({
								cost: useCase?.totalCost,
								appointmentTypeID: 'ugito',
								scheduleID: schedule.id,
								discountID: discount.id,
								email,
								token,
								dni: activeUser.identification || '',
								name: '',
								lastName: '',
								phone: '',
								paymentType: CULQI_PAYMENT_ID,
							});
							await createAppointment(
								{
									reservationAccountID: activeUser.id,
									appointmentTypeID: 'ugito',
									useCaseID: useCase.id,
									scheduleID: schedule.id,
									triage,
									media: userFiles || [],
									isGuest: appointmentOwner === GUEST,
								},
								userToken,
							);
							updateContextState({
								useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
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
	}, [discount]);

	return !isPaymentLoading ? (
		<Container>
			<LeftSide doctor={doctor} user={activeUser} schedule={schedule} channel={channel} />
			<RightSide
				totalCost={discount.totalCost || useCase?.totalCost}
				isCounponDisabled={!!discount.totalCost}
				sendDiscount={sendDiscount}
				discountCode={discountCode}
				onChangeDiscount={onChangeDiscount}
				executePayment={makePayment}
				errorMessage={errorMessage}
				isTransactionEnabled={isTransactionEnabled}
			/>
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default Payment;
