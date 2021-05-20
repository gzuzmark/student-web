import React, { useCallback, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Container, Loading } from 'pages/common';
import { PAYMENT_ROUTE_LABORATORY } from 'routes';
import {
	useAppointmentStepValidation,
	dateToUTCUnixTimestamp,
	addGAEvent,
	getHumanDay,
	getHour,
	stylesWithTheme,
} from 'utils';
// import initCulqi from 'utils/culquiIntegration';
import { CONFIRMATION_STEP } from 'AppContext';

import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import { createPaymentLab, Discount, KUSHKI_PAYMENT_ID, PE_PAYMENT_ID, sendFakeSession } from 'pages/api';
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
import { formatUTCDate } from 'utils';
// import { Laboratory } from 'pages/ClinicalExamination/components';

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

const PaymentLaboratory = () => {
	const {
		doctor,
		user,
		patientUser,
		schedule,
		useCase,
		reservationAccountID,
		updateState: updateContextState,
		appointmentOwner,
		trackParams,
		laboratorio,
		schedules,
		labExamn,
		labAva,
	} = useAppointmentStepValidation(PAYMENT_ROUTE_LABORATORY);
	const history = useHistory();
	const classes = useStyles();
	const activeUser = patientUser || user;
	const { t } = useTranslation('paymentLaboratory');
	const [discountCode, setDiscountCode] = useState('');
	const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [discount, setDiscount] = useState<Discount>({ id: '', totalCost: '' });

	const kushki = new Kushki({
		merchantId: `${process.env.REACT_APP_KUSHKI_MERCHANT_ID}`, // Your public merchant id
		inTestEnvironment: !!`${process.env.REACT_APP_KUSHKI_IN_TEST_ENV}`,
	});
	/*const kushki = new Kushki({
		merchantId: '5f2c989bea794296bd461c39f9932368', // Your public merchant id
		inTestEnvironment: false,
	});*/

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
				} else if (paymentMethod === 2) {
					openKushkiCashForm();
					//performTransactionPayment(paymentMethod);
				} else {
					makeKushkiLocalPayment();
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
		[schedule, makeKushkiLocalPayment, useCase, reservationAccountID, doctor],
	);

	const makeKushkiPayment = (values: any) => {
		const totalCost = laboratorio
			? labExamn?.modality === 1
				? laboratorio?.total_cost + laboratorio?.delivery_cost
				: laboratorio?.total_cost
			: 0;
		const amount = totalCost ? totalCost.toString() : '';
		if (schedules && updateContextState && user && laboratorio && labExamn) {
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
					console.log(response);

					if (!response.code) {
						await createPaymentLab({
							cost: totalCost,
							token: response.token,
							email: values.email,
							patient_dni: user.identification || '',
							payment_type: KUSHKI_PAYMENT_ID,
							reservation_date: formatUTCDate(new Date(schedules.start_time), 'yyyy-MM-dd'),
							user_id: '',
							exam_modality_id: labExamn.modality,
							service_id: 2,
							student_id: '',
							laboratory_id: laboratorio.id,
							laboratory_name: laboratorio.name,
							file: '',
							laboratory_exams: [],
						});

						addGAEvent({
							event: 'virtualEvent',
							category: 'Agendar cita - Gracias',
							action: 'Avance satisfactorio',
							label: laboratorio.ruc || '',
							dia: getHumanDay(new Date(schedules.start_time)),
							hora: getHour(new Date(schedules.start_time)),
							// especialidad: doctor?.specialityName || '',
							monto: amount,
							tipoPago: 'Tarjeta',
						});

						addGAEvent({
							event: 'Purchase',
							ecommerce: {
								currencyCode: 'PEN',
								purchase: {
									actionField: {
										id: laboratorio.id + '',
										revenue: amount,
										tax: '0',
									},
									products: [
										{
											name: laboratorio.ruc || '',
											id: laboratorio.id + '' || '',
											price: amount,
											brand: 'Alivia',
											category: laboratorio.name || '',
											variant: getHour(new Date(schedules.start_time)),
											quantity: '1',
											dimension3: 'Tarjeta de crédito o débito',
											dimension4: getHumanDay(new Date(schedules.start_time)),
										},
									],
								},
							},
						});

						updateContextState({
							// useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
							appointmentCreationStep: CONFIRMATION_STEP,
						});

						history.push('/confirmacion');
					} else {
						console.error('Error: ', response.error, 'Code: ', response.code, 'Message: ', response.message);
						setErrorMessage('Error-' + response.code + ': ' + response.message);
						setOpenKushkiModal(false);
					}
					setIsPaymentLoading(false);
				},
			);
		}
	};

	const makeKushkiLocalPayment = async () => {
		const totalCost = laboratorio
			? labExamn?.modality === 1
				? laboratorio?.total_cost + laboratorio?.delivery_cost
				: laboratorio?.total_cost
			: 0;
		setIsPaymentLoading(true);
		if (schedules && updateContextState && user && laboratorio && labExamn) {
			const method = 3;

			const data = {
				cost: totalCost,
				token: '',
				email: user.email || '',
				patient_dni: user.identification || '',
				payment_type: method,
				reservation_date: formatUTCDate(new Date(schedules.start_time), 'yyyy-MM-dd'),
				user_id: '',
				exam_modality_id: labExamn.modality,
				service_id: 2,
				student_id: '',
				laboratory_id: laboratorio.id,
				laboratory_name: laboratorio.name,
				file: '',
				laboratory_exams: [],
			};
			console.log(data);
			try {
				await createPaymentLab(data);

				setIsPaymentLoading(false);

				updateContextState({
					// useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
					paymentURL: '',
					appointmentCreationStep: CONFIRMATION_STEP,
					// ticketNumber: link,
				});
				history.push('/confirmacion');
			} catch (e) {
				console.log(e);
				setErrorMessage(t('payment.error.pe'));
				setIsPaymentLoading(false);
			}
		}
	};

	const makeKushkiCashPayment = (values: any) => {
		const totalCost = laboratorio
			? labExamn?.modality === 1
				? laboratorio?.total_cost + laboratorio?.delivery_cost
				: laboratorio?.total_cost
			: 0;
		const amount = totalCost ? totalCost.toString() : '';
		setIsPaymentLoading(true);
		const callback = async function (response: any) {
			if (!response.code) {
				if (schedules && updateContextState && user && laboratorio && labExamn) {
					const method = 2;
					const token = response.token;
					try {
						// setIsPaymentLoading(true);

						await createPaymentLab({
							cost: totalCost,
							token: token,
							email: values.email,
							patient_dni: user.identification || '',
							payment_type: method,
							reservation_date: formatUTCDate(new Date(schedules.start_time), 'yyyy-MM-dd'),
							user_id: '',
							exam_modality_id: labExamn.modality,
							service_id: 2,
							student_id: '',
							laboratory_id: laboratorio.id,
							laboratory_name: laboratorio.name,
							file: '',
							laboratory_exams: [],
						});
						setIsPaymentLoading(false);
						let link = null;

						if (method === PE_PAYMENT_ID) {
							if (response?.data) {
								link = response?.data?.data?.reference_link as string;
							}
						} else {
							// link = buildTransactionURL(doctor.name, doctor.lastName, values.fullName || '', userPhone || '');
						}
						updateContextState({
							// useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
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

	return !isPaymentLoading ? (
		<Container>
			<LeftSide lab={laboratorio} user={activeUser} schedule={schedules} labExamn={labExamn} />
			<RightSide
				totalCost={
					laboratorio
						? labExamn?.modality === 1
							? laboratorio?.total_cost + laboratorio?.delivery_cost
							: laboratorio?.total_cost
						: 0
				}
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
														<Grid item xs={4}>
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
														<Grid item xs={8}>
															<Field
																component={TextField}
																variant="outlined"
																name="cardCvv"
																value={values.cardCvv}
																label="Código de Seguridad"
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
														// disabled={isSubmitting}
													>
														{/* {tFamily('familyMembers.editProfile.complete')} */}
														<LockIcon />
														PAGAR S/{' '}
														{laboratorio
															? labExamn?.modality === 1
																? laboratorio?.total_cost + laboratorio?.delivery_cost
																: laboratorio?.total_cost
															: 0}
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
										S/{' '}
										{laboratorio
											? labExamn?.modality === 1
												? laboratorio?.total_cost + laboratorio?.delivery_cost
												: laboratorio?.total_cost
											: 0}
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
		</Container>
	) : (
		<Loading fullScreen loadingMessage={t('payment.wait.message')} />
	);
};

export default PaymentLaboratory;
