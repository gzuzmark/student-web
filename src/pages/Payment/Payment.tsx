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
} from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { Theme } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuItem from '@material-ui/core/MenuItem';
import mastercard from 'icons/mastercard.png';
import visa from 'icons/visa.png';
import { Formik, Form, Field } from 'formik';
import LogoKsh from 'icons/logo_ksh.png';
import LogoPci from 'icons/pci_logo.png';
import amex from 'icons/amex.png';
import dinersClub from 'icons/diners_club.png';
import { validSelectTimeWithNow } from 'pages/SelectDoctor/components/FunctionsHelper';
import { ModalErrorTime } from 'pages/SelectDoctor/components/ModalErrorTime';

const buildTransactionURL = (doctorName: string, doctorLastname: string, patientName: string, patientPhone: string) => {
	return `https://chats.landbot.io/v2/H-728571-PDFPFMRFJGISOF45/index.html?doctor_name=${doctorName}&doctor_lastname=${doctorLastname}&name=${patientName}&phone=${patientPhone}`;
};

const FAKE_SESSION_ERROR_MESSAGE =
	'Lo sentimos. El horario que has elegido ya no se encuentra disponible. Un miembro de nuestro equipo se pondrá en contacto contigo para ayudarte';

const useStyles = stylesWithTheme(({ breakpoints, spacing }: Theme) => ({
	kushkiTitle: {
		textAlign: 'center',
	},
	kushkiMargin: {
		margin: spacing(1),
	},
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '600px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '20px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '30px',
			},
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	privacyPolicyLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
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
	const [errorTimeMessage, setErrorTimeMessage] = useState<string | null>(null);

	// const kushki = new Kushki({
	// 	merchantId: `${process.env.REACT_APP_KUSHKI_MERCHANT_ID}`, // Your public merchant id
	// 	inTestEnvironment: !!`${process.env.REACT_APP_KUSHKI_IN_TEST_ENV}`,
	// });
	const kushki = new Kushki({
		merchantId: '5f2c989bea794296bd461c39f9932368', // Your public merchant id
		inTestEnvironment: false,
	});

	const [openKushkiModal, setOpenKushkiModal] = React.useState(false);
	const [openKushkiCashModal, setOpenKushkiCashModal] = React.useState(false);

	const initialValues = {
		cardName: '',
		cardNumber: '',
		expDate: '',
		cardCvv: '',
		email: '',
	};

	const initialValuesCash = {
		name: '',
		lastName: '',
		documentType: '',
		documentNumber: '',
		email: '',
		description: '',
	};

	const [validEmail, setValidEmail] = useState(false);

	const openKushkiForm = () => {
		setOpenKushkiModal(true);
	};

	const openKushkiCashForm = () => {
		setOpenKushkiCashModal(true);
	};

	const [card, setCard] = useState(true);
	//const [cashPayment, setCashPayment] = useState(false);
	const [paymentOption, setPaymentOption] = useState(false);
	let titlePaymentMethod = 'Tarjeta de Crédito o Débito';

	const selectPaymentOption = (option: any) => {
		switch (option) {
			case 1:
				setCard(true);
				//setCashPayment(false);
				setPaymentOption(false);
				break;
			case 2:
				//setCashPayment(true);
				setCard(false);
				setPaymentOption(false);
				titlePaymentMethod = 'Pago efectivo';
				break;
			case 3:
				break;
			default:
				break;
		}
	};

	const validFechaCita = useCallback(() => {
		try {
			validSelectTimeWithNow(schedule, true);
			return true;
		} catch (error) {
			setErrorTimeMessage(error.message);
			console.log(error);
			return false;
		}
	}, [schedule]);

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

	// const performTransactionPayment = useCallback(
	// 	async (method: number) => {
	// 		if (schedule && updateContextState && useCase && triage && activeUser && doctor) {
	// 			console.log(initialValuesCash);
	// 			try {
	// 				setIsPaymentLoading(true);
	// 				const userName = activeUser.name;
	// 				const userPhone = activeUser.phoneNumber;
	// 				const response: any = await createPayment({
	// 					cost: useCase?.totalCost,
	// 					appointmentTypeID: 'ugito',
	// 					scheduleID: schedule.id,
	// 					discountID: discount.id,
	// 					email: activeUser.email || '',
	// 					token: 'SnzVSB3cSA',
	// 					dni: activeUser.identification || '',
	// 					name: userName || '',
	// 					lastName: activeUser.lastName,
	// 					phone: userPhone || '',
	// 					paymentType: method,
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
	// 				setIsPaymentLoading(false);
	// 				let link = null;
	// 				if (method === PE_PAYMENT_ID) {
	// 					if (response?.data) {
	// 						console.log('<<<<response.data>>>>');
	// 						link = response?.data?.data?.reference_link as string;
	// 					}
	// 				} else {
	// 					link = buildTransactionURL(doctor.name, doctor.lastName, userName || '', userPhone || '');
	// 				}
	// 				updateContextState({
	// 					useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
	// 					paymentURL: link,
	// 					appointmentCreationStep: CONFIRMATION_STEP,
	// 				});
	// 				history.push('/confirmacion');
	// 			} catch (e) {
	// 				setErrorMessage(t('payment.error.pe'));
	// 				setIsPaymentLoading(false);
	// 			}
	// 		}
	// 	},
	// 	[
	// 		schedule,
	// 		updateContextState,
	// 		useCase,
	// 		triage,
	// 		activeUser,
	// 		doctor,
	// 		initialValuesCash,
	// 		discount.id,
	// 		discount.totalCost,
	// 		trackParams,
	// 		userFiles,
	// 		appointmentOwner,
	// 		userToken,
	// 		history,
	// 		t,
	// 	],
	// );

	const makePayment = useCallback(
		(paymentMethod: number) => (e: MouseEvent) => {
			console.log('tipo de pago:', paymentMethod, schedule);
			const isValidaDate = validFechaCita();
			if (!isValidaDate) return;
			const { id: scheduleId = '' } = schedule || {};
			const isFakeSession = scheduleId.includes(FAKE_SESSION_ID);
			if (!isFakeSession) {
				if (paymentMethod === KUSHKI_PAYMENT_ID) {
					e.preventDefault();
					// window.Culqi.open();
					openKushkiForm();
				} else {
					openKushkiCashForm();
					//performTransactionPayment(paymentMethod);
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
		[schedule, validFechaCita, useCase, reservationAccountID, doctor],
	);

	const makeKushkiPayment = (values: any) => {
		const isValidaDate = validFechaCita();
		if (!isValidaDate) return;
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

	const makeKushkiCashPayment = (values: any) => {
		const totalCost = discount.totalCost || useCase?.totalCost;
		const amount = totalCost ? totalCost.toString() : '';
		setIsPaymentLoading(true);
		const callback = async function (response: any) {
			if (!response.code) {
				if (schedule && updateContextState && useCase && triage && activeUser && doctor) {
					const method = 2;
					const token = response.token;
					try {
						//setIsPaymentLoading(true);
						//const userName = activeUser.name;
						const userPhone = activeUser.phoneNumber;
						const response: any = await createPayment({
							cost: amount,
							appointmentTypeID: 'ugito',
							scheduleID: schedule.id,
							discountID: discount.id,
							email: values.email.toString() || '',
							token: token,
							dni: values.documentNumber.toString() || '',
							name: values.name.toString() || '',
							lastName: values.lastName.toString() || '',
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
							link = buildTransactionURL(doctor.name, doctor.lastName, values.fullName || '', userPhone || '');
						}
						updateContextState({
							useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
							paymentURL: '',
							appointmentCreationStep: CONFIRMATION_STEP,
							ticketNumber: link,
						});
						history.push('/confirmacion');
					} catch (e) {
						setErrorMessage(t('payment.error.pe'));
						setIsPaymentLoading(false);
					}
				}
			} else {
				console.error('Error: ', response.error, 'Code: ', response.code, 'Message: ', response.message);
				setErrorMessage('Error-' + response.code + ': ' + response.message);
				setOpenKushkiCashModal(false);
			}
		};
		kushki.requestCashToken(
			{
				name: values.name.toString(),
				lastName: values.lastName.toString(),
				identification: values.documentNumber.toString(),
				documentType: values.documentType.toString(),
				email: values.email.toString(),
				totalAmount: Number(amount),
				currency: 'PEN',
				description: values.description.toString(),
			},
			callback,
		); // Als

		//performTransactionPayment(PE_PAYMENT_ID);
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
					<Grid container spacing={3} style={{ fontSize: '16px', marginTop: '5px' }}>
						<Grid item xs={1}>
							<CreditCardIcon />
						</Grid>
						<Grid item xs={7} style={{ textAlign: 'left' }}>
							{titlePaymentMethod}
						</Grid>
					</Grid>
				</DialogTitle>
				{paymentOption && (
					<DialogContent style={{ overflow: 'none' }}>
						<Grid container spacing={3}>
							<List component="nav" aria-label="secondary mailbox folder">
								<ListItem button onClick={() => selectPaymentOption(1)}>
									<ListItemText primary="Tarjeta de crédito o débito." />
								</ListItem>
								<ListItem button onClick={() => selectPaymentOption(2)}>
									<ListItemText primary="Efectivo" />
								</ListItem>
							</List>
						</Grid>
					</DialogContent>
				)}
				{card && (
					<DialogContent style={{ overflow: 'none' }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Grid item xs={12}>
									<Grid container spacing={2} style={{ justifyContent: 'center', marginBottom: '25px' }}>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={amex} width={28} height={18} alt="Brand Mastercard" />
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={visa} width={35} height={12} alt="Brand Visa" />
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={dinersClub} width={30} height={18} alt="Brand Diners Club" />
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={mastercard} width={28} height={18} alt="Brand Mastercard" />
										</Grid>
									</Grid>
								</Grid>
								<br></br>
								<Formik initialValues={initialValues} onSubmit={makeKushkiPayment}>
									{({ submitForm, values, setFieldValue }: any) => (
										<Form className={classes.form}>
											<div>
												<div className={classes.fieldWrapper}>
													<Field
														component={TextField}
														variant="outlined"
														name="cardName"
														value={values.cardName}
														label="Nombre del Titular"
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
												</div>
												<div className={classes.fieldWrapper}>
													<Field
														component={TextField}
														variant="outlined"
														name="cardNumber"
														value={values.cardNumber}
														label="Número de Tarjeta"
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
												</div>
												<div className={classes.fieldWrapper}>
													<Grid container spacing={3}>
														<Grid item xs={7}>
															<Field
																component={TextField}
																variant="outlined"
																name="expDate"
																value={values.expDate}
																label="Fecha Exp."
																fullWidth
																onChange={(event: any) => {
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
														<Grid item xs={5}>
															<Field
																component={TextField}
																variant="outlined"
																name="cardCvv"
																value={values.cardCvv}
																label="CVV"
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
													</Grid>
												</div>
												<div className={classes.fieldWrapper}>
													<Field
														component={TextField}
														variant="outlined"
														name="email"
														value={values.email}
														label="Email"
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
												</div>
												<div className={classes.fieldWrapper}>
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
													>
														{/* {tFamily('familyMembers.editProfile.complete')} */}
														<LockIcon />
														PAGAR S/{discount.totalCost || useCase?.totalCost}
													</Button>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							</Grid>
							<Grid item xs={12} style={{ textAlign: 'center' }}>
								<div style={{ textAlign: 'center', display: 'inline' }}>
									<div style={{ fontWeight: 'bold', fontSize: '9px' }}>POWERED BY</div>
									<div style={{}}>
										<img src={LogoKsh} width={'15%'} alt="Kushki" />
									</div>
								</div>
							</Grid>
						</Grid>
						<DialogContentText style={{ color: '#848181' }}>
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
				)}
			</Dialog>

			<Dialog
				open={openKushkiCashModal}
				onClose={() => {
					setOpenKushkiCashModal(false);
				}}
				aria-labelledby="form-dialog-title"
				style={{ overflow: 'scroll', height: '100%' }}
			>
				<DialogTitle className={classes.kushkiTitle}>
					{!paymentOption ? (
						<Grid container spacing={3} style={{ fontSize: '16px', marginTop: '5px' }}>
							<Grid item xs={1}>
								<LocalAtmIcon />
							</Grid>
							<Grid item xs={7} style={{ textAlign: 'left' }}>
								Pago efectivo
							</Grid>
							{/* <Grid item xs={4} style={{backgroundColor: '#f0f4f9'}}>
						<a style={{textDecoration: 'none'}} href="javascript:void(0)" onClick={() => {
							setPaymentOption(true);
							setCard(false);
							setCashPayment(false);
						}}>Opciones de pago</a>
					</Grid> */}
						</Grid>
					) : (
						<Grid container spacing={3}>
							<Grid item xs={12}>
								Cambiar forma de pago
							</Grid>
						</Grid>
					)}
				</DialogTitle>
				<DialogContent style={{ overflow: 'none', marginTop: '7px' }}>
					<Formik initialValues={initialValuesCash} onSubmit={makeKushkiCashPayment}>
						{({ submitForm, values, isSubmitting, setFieldValue }) => (
							<Form className={classes.form}>
								<div>
									<div className={classes.fieldWrapper}>
										<Field
											style={{ marginTop: '30px' }}
											component={TextField}
											name="name"
											type="text"
											value={values.name}
											label="Nombre"
											variant="outlined"
											fullWidth
											onChange={(e: any) => {
												if (e.target.validity.valid || !e.target.value) {
													setFieldValue('name', e.target.value);
												}
											}}
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
									</div>
									<div className={classes.fieldWrapper}>
										<Field
											component={TextField}
											name="lastName"
											type="text"
											value={values.lastName}
											label="Apellido"
											variant="outlined"
											fullWidth
											onChange={(e: any) => {
												if (e.target.validity.valid || !e.target.value) {
													setFieldValue('lastName', e.target.value);
												}
											}}
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
									</div>
									<div className={classes.fieldWrapper}>
										<Grid container spacing={3}>
											<Grid item xs={5}>
												<Field
													component={TextField}
													name="documentType"
													label={t('Documento')}
													variant="outlined"
													fullWidth
													onChange={(e: any) => {
														setFieldValue('documentType', e.target.value);
													}}
													select
													value={values.documentType}
												>
													<MenuItem value={'DNI'}>DNI</MenuItem>
													<MenuItem value={'CE'}>CE</MenuItem>
												</Field>
											</Grid>
											<Grid item xs={7}>
												<Field
													component={TextField}
													name="documentNumber"
													type="text"
													label={t('Identificación')}
													variant="outlined"
													fullWidth
													onChange={(e: any) => {
														if (e.target.validity.valid || !e.target.value) {
															setFieldValue('documentNumber', e.target.value);
														}
													}}
													value={values.documentNumber}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<CreditCardIcon />
															</InputAdornment>
														),
													}}
												/>
											</Grid>
										</Grid>
									</div>
									<div className={classes.fieldWrapper}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label={t('Email')}
											variant="outlined"
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
											value={values.email}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<EmailIcon />
													</InputAdornment>
												),
											}}
										/>
									</div>
									<div className={classes.fieldWrapper}>
										<Field
											component={TextField}
											name="description"
											type="text"
											label={t('Descripción')}
											variant="outlined"
											fullWidth
											onChange={(e: any) => {
												if (e.target.validity.valid || !e.target.value) {
													setFieldValue('description', e.target.value);
												}
											}}
											value={values.description}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<DescriptionIcon />
													</InputAdornment>
												),
											}}
										/>
									</div>
								</div>
								<div className={classes.fieldWrapper}>
									<Button
										variant="contained"
										fullWidth
										onClick={submitForm}
										disabled={
											!values.name ||
											!values.lastName ||
											!values.documentType ||
											!values.documentNumber ||
											!values.email ||
											!validEmail ||
											!values.description
										}
									>
										<LockIcon />
										{t('Generar Orden de pago de ')}
										S/{discount.totalCost || useCase?.totalCost}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
					<Grid container spacing={3}>
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
			{errorTimeMessage && (
				<ModalErrorTime isOpen={true} setIsOpen={() => null} message={errorTimeMessage} redirect={true} />
			)}
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default Payment;
