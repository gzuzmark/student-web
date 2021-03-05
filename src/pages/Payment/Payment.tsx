import React, { useCallback, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Loading } from 'pages/common';
import { PAYMENT_ROUTE } from 'routes';
import {
	useAppointmentStepValidation,
	getIntCurrency,
	dateToUTCUnixTimestamp,
	addGAEvent,
	getHumanDay,
	getHour,
	stylesWithTheme,
} from 'utils';
import initCulqi from 'utils/culquiIntegration';
import { CONFIRMATION_STEP, GUEST, EMPTY_TRACK_PARAMS } from 'AppContext';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import {
	createPayment,
	createAppointment,
	applyDiscount,
	Discount,
	KUSHKI_PAYMENT_ID,
	PE_PAYMENT_ID,
	sendFakeSession,
	KUSHKI_RESPONSE_K001,
	KUSHKI_RESPONSE_K004,
	KUSHKI_RESPONSE_K005,
	KUSHKI_RESPONSE_K017,
} from 'pages/api';
import { FAKE_SESSION_ID } from 'pages/SelectDoctor/components/RightSide/RightSide';
import { Kushki } from '@kushki/js';
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	InputAdornment,
	TextField,
	Theme,
} from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import mastercard from 'icons/mastercard.png';
import visa from 'icons/visa.png';
import { Form, Formik } from 'formik';
import LogoKsh from 'icons/logo_ksh.png';
import LogoPci from 'icons/pci_logo.png';
import amex from 'icons/amex.png';
import dinersClub from 'icons/diners_club.png';

const buildTransactionURL = (doctorName: string, doctorLastname: string, patientName: string, patientPhone: string) => {
	return `https://chats.landbot.io/v2/H-728571-PDFPFMRFJGISOF45/index.html?doctor_name=${doctorName}&doctor_lastname=${doctorLastname}&name=${patientName}&phone=${patientPhone}`;
};

const FAKE_SESSION_ERROR_MESSAGE =
	'Lo sentimos. El horario que has elegido ya no se encuentra disponible. Un miembro de nuestro equipo se pondrá en contacto contigo para ayudarte';

const useStyles = stylesWithTheme(({ spacing }: Theme) => ({
	kushkiTitle: {
		textAlign: 'center',
	},
	kushkiMargin: {
		margin: spacing(1),
	},
}));

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
		reservationAccountID,
		updateState: updateContextState,
		appointmentOwner,
		trackParams,
	} = useAppointmentStepValidation(PAYMENT_ROUTE);
	const history = useHistory();
	const classes = useStyles();
	const activeUser = patientUser || user;
	const { t } = useTranslation('payment');
	const [discountCode, setDiscountCode] = useState('');
	const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [discount, setDiscount] = useState<Discount>({ id: '', totalCost: '' });

	const kushki = new Kushki({
		merchantId: '5f2c989bea794296bd461c39f9932368', // Your public merchant id
		inTestEnvironment: false,
	});

	const [openKushkiModal, setOpenKushkiModal] = React.useState(false);

	const initialValues = {
		cardName: '',
		cardNumber: '',
		expDate: '',
		cardCvv: '',
		email: '',
	};

	const [validEmail, setValidEmail] = useState(false);

	const openKushkiForm = () => {
		setOpenKushkiModal(true);
	};

	React.useEffect(() => {
		const { id = '', startTime, endTime } = schedule || {};
		const { id: useCaseId = '' } = useCase || {};
		if (id.includes(FAKE_SESSION_ID)) {
			sendFakeSession({
				reservation_account_id: reservationAccountID || '',
				use_case_id: useCaseId,
				doctor_id: (doctor && doctor.id) || '',
				start_time: dateToUTCUnixTimestamp(startTime!),
				end_time: dateToUTCUnixTimestamp(endTime!),
			}).catch((err) => {
				const { message = '' } = err || {};
				setErrorMessage(message);
			});
		}
		// eslint-disable-next-line
	}, []);

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
						trackParams: trackParams || EMPTY_TRACK_PARAMS,
						reservationAccountID: activeUser.id,
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
			trackParams,
			userFiles,
			appointmentOwner,
			userToken,
			history,
			t,
		],
	);

	const makePayment = useCallback(
		(paymentMethod: number) => (e: MouseEvent) => {
			console.log('tipo de pago: ' + paymentMethod);
			const { id: scheduleId = '' } = schedule || {};
			const isFakeSession = scheduleId.includes(FAKE_SESSION_ID);
			if (!isFakeSession) {
				if (paymentMethod === KUSHKI_PAYMENT_ID) {
					e.preventDefault();
					// window.Culqi.open();
					openKushkiForm();
				} else {
					performTransactionPayment(paymentMethod);
				}
			} else {
				const { id = '', startTime, endTime } = schedule || {};
				const { id: useCaseId = '' } = useCase || {};
				if (id.includes(FAKE_SESSION_ID)) {
					window.alert(FAKE_SESSION_ERROR_MESSAGE);
					sendFakeSession({
						reservation_account_id: reservationAccountID || '',
						use_case_id: useCaseId,
						doctor_id: (doctor && doctor.id) || '',
						start_time: dateToUTCUnixTimestamp(startTime!),
						end_time: dateToUTCUnixTimestamp(endTime!),
					}).catch((err) => {
						const { message = '' } = err || {};
						setErrorMessage(message);
					});
				}
			}
		},
		[schedule, reservationAccountID, doctor, useCase, performTransactionPayment],
	);

	const makeKushkiPayment = (values: any) => {
		const totalCost = discount.totalCost || useCase?.totalCost;
		const amount = totalCost ? totalCost.toString() : '';
		if (schedule && updateContextState && useCase && triage && activeUser) {
			setIsPaymentLoading(true);
			kushki.requestToken(
				{
					amount: amount,
					currency: 'PEN',
					card: {
						name: values.cardName,
						number: values.cardNumber.toString(),
						cvc: values.cardCvv.toString(),
						expiryMonth: values.expDate.split('/')[0],
						expiryYear: values.expDate.split('/')[1],
					},
				},
				async (response: any) => {
					if (!response.code) {
						console.log(response);
						await createPayment({
							cost: amount,
							appointmentTypeID: 'ugito',
							scheduleID: schedule.id,
							discountID: discount.id,
							email: values.email,
							token: response.token,
							dni: activeUser.identification || '',
							name: '',
							lastName: '',
							phone: '',
							paymentType: KUSHKI_PAYMENT_ID,
							trackParams: trackParams || EMPTY_TRACK_PARAMS,
							reservationAccountID: activeUser.id,
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

						addGAEvent({
							event: 'virtualEvent',
							category: 'Agendar cita - Gracias',
							action: 'Avance satisfactorio',
							label: doctor?.cmp || '',
							dia: getHumanDay(schedule.startTime),
							hora: getHour(schedule.startTime),
							especialidad: doctor?.specialityName || '',
							monto: discount.totalCost || useCase?.totalCost,
							tipoPago: 'Tarjeta',
						});

						addGAEvent({
							event: 'Purchase',
							ecommerce: {
								currencyCode: 'PEN',
								purchase: {
									actionField: {
										id: activeUser.id,
										revenue: discount.totalCost || useCase?.totalCost,
										tax: '0',
									},
									products: [
										{
											name: doctor?.cmp || '',
											id: doctor?.cmp || '',
											price: discount.totalCost || useCase?.totalCost,
											brand: 'Alivia',
											category: doctor?.specialityName || '',
											variant: getHour(schedule.startTime),
											quantity: '1',
											dimension3: 'Tarjeta de crédito o débito',
											dimension4: getHumanDay(schedule.startTime),
										},
									],
								},
							},
						});

						updateContextState({
							useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
							appointmentCreationStep: CONFIRMATION_STEP,
						});

						history.push('/confirmacion');
					} else {
						console.error('Error: ', response.error, 'Code: ', response.code, 'Message: ', response.message);
						setErrorMessage('Error-' + response.code + ': ' + response.message);
						/*if (response.code === KUSHKI_RESPONSE_K001) {
							setErrorMessage('Error-K001: Ingresar correctamente datos de Tarjeta.');
						} else if (response.code === KUSHKI_RESPONSE_K005) {
							setErrorMessage('Error-K005: El número de tarjeta no es válido.');
						} else if (response.code === KUSHKI_RESPONSE_K004) {
							setErrorMessage('Error-K004: ID del comercio o credencial no válido.');
						} else if (response.code === KUSHKI_RESPONSE_K017) {
							setErrorMessage('Error-017: Transacción rechazada, ingresar correctamente datos de una tarjeta válida.');
						}*/
						setOpenKushkiModal(false);
					}
					setIsPaymentLoading(false);
				},
			);
		}
	};

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

				addGAEvent({ category: 'Agendar cita - Paso 3', action: 'Aplicar descuento', label: reviewedDiscount.id });
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
			makePayment(1);
			// window.culqi = async () => {
			// 	try {
			// 		setIsPaymentLoading(true);
			// 		if (schedule && updateContextState && useCase && triage && activeUser) {
			// 			if (!!window.Culqi.token) {
			// 				const token = window.Culqi.token.id;
			// 				const email = window.Culqi.token.email;
			// 				console.log('useEffect', schedule);
			// 				await createPayment({
			// 					cost: useCase?.totalCost,
			// 					appointmentTypeID: 'ugito',
			// 					scheduleID: schedule.id,
			// 					discountID: discount.id,
			// 					email,
			// 					token,
			// 					dni: activeUser.identification || '',
			// 					name: '',
			// 					lastName: '',
			// 					phone: '',
			// 					paymentType: CULQI_PAYMENT_ID,
			// 					trackParams: trackParams || EMPTY_TRACK_PARAMS,
			// 					reservationAccountID: activeUser.id,
			// 				});
			// 				await createAppointment(
			// 					{
			// 						reservationAccountID: activeUser.id,
			// 						appointmentTypeID: 'ugito',
			// 						useCaseID: useCase.id,
			// 						scheduleID: schedule.id,
			// 						triage,
			// 						media: userFiles || [],
			// 						isGuest: appointmentOwner === GUEST,
			// 					},
			// 					userToken,
			// 				);
			// 				addGAEvent({
			// 					event: 'virtualEvent',
			// 					category: 'Agendar cita - Gracias',
			// 					action: 'Avance satisfactorio',
			// 					label: doctor?.cmp || '',
			// 					dia: getHumanDay(schedule.startTime),
			// 					hora: getHour(schedule.startTime),
			// 					especialidad: doctor?.specialityName || '',
			// 					monto: discount.totalCost || useCase?.totalCost,
			// 					tipoPago: 'Tarjeta',
			// 				});
			// 				addGAEvent({
			// 					event: 'Purchase',
			// 					ecommerce: {
			// 						currencyCode: 'PEN',
			// 						purchase: {
			// 							actionField: {
			// 								id: activeUser.id,
			// 								revenue: discount.totalCost || useCase?.totalCost,
			// 								tax: '0',
			// 							},
			// 							products: [
			// 								{
			// 									name: doctor?.cmp || '',
			// 									id: doctor?.cmp || '',
			// 									price: discount.totalCost || useCase?.totalCost,
			// 									brand: 'Alivia',
			// 									category: doctor?.specialityName || '',
			// 									variant: getHour(schedule.startTime),
			// 									quantity: '1',
			// 									dimension3: 'Tarjeta de crédito o débito',
			// 									dimension4: getHumanDay(schedule.startTime),
			// 								},
			// 							],
			// 						},
			// 					},
			// 				});
			// 				updateContextState({
			// 					useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
			// 					appointmentCreationStep: CONFIRMATION_STEP,
			// 				});
			// 				history.push('/confirmacion');
			// 			} else if (!!window.Culqi.error) {
			// 				setErrorMessage(window.Culqi.error.user_message);
			// 			}
			// 		}
			// 		setIsPaymentLoading(false);
			// 	} catch (e) {
			// 		setErrorMessage(t('payment.error.culqi'));
			// 		setIsPaymentLoading(false);
			// 	}
			// };
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
			/>
			<Dialog
				open={openKushkiModal}
				onClose={() => {
					setOpenKushkiModal(false);
				}}
				aria-labelledby="form-dialog-title"
				style={{ overflow: 'scroll', height: '100%' }}
			>
				<DialogTitle className={classes.kushkiTitle}>
					<CreditCardIcon /> Tarjeta de Crédito o Débito
				</DialogTitle>
				<DialogContent style={{ overflow: 'none' }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid container spacing={2} style={{ justifyContent: 'center' }}>
								<Grid item xs={2} style={{ textAlign: 'center' }}>
									<img src={amex} width={28} height={18} alt="Brand Mastercard" />
								</Grid>
								<Grid item xs={2} style={{ textAlign: 'center' }}>
									<img src={visa} width={35} height={12} alt="Brand Visa" />
								</Grid>
								<Grid item xs={2} style={{ textAlign: 'center' }}>
									<img src={dinersClub} width={28} height={18} alt="Brand Mastercard" />
								</Grid>
								<Grid item xs={2} style={{ textAlign: 'center' }}>
									<img src={mastercard} width={28} height={18} alt="Brand Mastercard" />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Formik initialValues={initialValues} onSubmit={makeKushkiPayment}>
								{({ submitForm, values, setFieldValue }: any) => (
									<Form className={classes.form}>
										<div>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<TextField
														variant="standard"
														name="cardName"
														value={values.cardName}
														label="Nombre en Tarjeta"
														className={classes.kushkiMargin}
														fullWidth
														onChange={(e: any) => {
															if (e.target.validity.valid || !e.target.value) {
																setFieldValue('cardName', e.target.value);
															}
														}}
														type="text"
														inputProps={{
															pattern: '[a-zA-Z ]*',
														}}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<PersonIcon />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														variant="standard"
														name="cardNumber"
														value={values.cardNumber}
														label="Número de Tarjeta"
														className={classes.kushkiMargin}
														fullWidth
														onChange={(e: any) => {
															if (e.target.validity.valid || !e.target.value) {
																if (e.target.value.length <= 16) {
																	setFieldValue('cardNumber', e.target.value);
																}
															}
														}}
														type="text"
														inputProps={{
															pattern: '[0-9]*',
														}}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<CreditCardIcon />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={6}>
													<TextField
														variant="standard"
														name="expDate"
														value={values.expDate}
														label="Fecha Exp."
														className={classes.kushkiMargin}
														fullWidth
														onChange={(event) => {
															let text = event.target.value;
															if (text.charAt(text.length - 1) === '/') {
																return;
															}
															if (event.target.validity.valid || !text) {
																if (text.length <= 5) {
																	if (text.length === 2 && values.expDate.charAt(2) !== '/') {
																		text = text + '/';
																	}
																	setFieldValue('expDate', text);
																}
															}
														}}
														type="text"
														inputProps={{
															pattern: '[\\0-9]*',
														}}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<CalendarTodayIcon />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={6}>
													<TextField
														variant="standard"
														name="cardCvv"
														value={values.cardCvv}
														label="Código de Seguridad"
														className={classes.kushkiMargin}
														fullWidth
														onChange={(e: any) => {
															if (e.target.validity.valid || !e.target.value) {
																if (e.target.value.length <= 4) {
																	setFieldValue('cardCvv', e.target.value);
																}
															}
														}}
														type="password"
														inputProps={{
															pattern: '[0-9]*',
														}}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														variant="standard"
														name="email"
														value={values.email}
														label="Email"
														className={classes.kushkiMargin}
														fullWidth
														onChange={(e: any) => {
															const validateEmail = (email: any) => {
																const at = email.indexOf('@');
																const dot = email.lastIndexOf('.');
																return (
																	email.length > 0 &&
																	at > 0 &&
																	dot > at + 1 &&
																	dot < email.length &&
																	email[at + 1] !== '.' &&
																	email.indexOf(' ') === -1 &&
																	email.indexOf('..') === -1
																);
															};

															const assert = (a: any, b: any) => {
																return a === b;
															};
															const value = assert(validateEmail(e.target.value), true);
															if (value === true) {
																setValidEmail(value);
															} else {
																setValidEmail(value);
															}
															setFieldValue('email', e.target.value);
														}}
														type="email"
														inputProps={{}}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<EmailIcon />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<Button
														// className={classes.saveAction}
														variant="contained"
														fullWidth
														onClick={submitForm}
														disabled={
															!values.cardName ||
															!values.cardNumber ||
															!values.cardCvv ||
															values.cardCvv.length < 3 ||
															!values.expDate ||
															!values.email ||
															!validEmail
														}
														// disabled={isSubmitting}
													>
														{/* {tFamily('familyMembers.editProfile.complete')} */}
														<LockIcon />
														PAGAR S/{discount.totalCost || useCase?.totalCost}
													</Button>
												</Grid>
											</Grid>
										</div>
									</Form>
								)}
							</Formik>
						</Grid>
						<Grid item xs={12} style={{ textAlign: 'center', margin: '5px 0px' }}>
							<div style={{ textAlign: 'center', display: 'inline' }}>
								<div style={{ fontWeight: 'bold', fontSize: '9px' }}>POWERED BY</div>
								<div style={{}}>
									<img src={LogoKsh} width={'15%'} alt="Kushki" />
								</div>
							</div>
						</Grid>
					</Grid>
					<DialogContentText style={{ margin: '5px 0px', color: '#848181' }}>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<img src={LogoPci} width={'70px'} alt="Kushki" />
							</Grid>
							<Grid item xs={10}>
								Este pago es procesado de forma segura por Kushki, un proovedor de pagos PCI de nivel 1.{' '}
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default Payment;
