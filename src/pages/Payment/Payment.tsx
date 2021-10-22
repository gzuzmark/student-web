import { Kushki } from '@kushki/js';
import { CashTokenRequest } from '@kushki/js/lib/types/cash_token_request';
import { TokenRequest } from '@kushki/js/lib/types/token_request';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { CONFIRMATION_STEP, EMPTY_TRACK_PARAMS, GUEST } from 'AppContext';
import { Field, Form, Formik } from 'formik';
import amex from 'icons/amex.png';
import bbva from 'icons/imgBBVA.png';
import bcp from 'icons/imgBCP.png';
import cajaarequipa from 'icons/imgCajaArequipa.png';
import cajatrujillo from 'icons/imgCajaTrujillo.png';
import interbank from 'icons/imgInterbank.png';
import tambo from 'icons/imgTambo.png';
import LogoKsh from 'icons/logo_ksh.png';
import mastercard from 'icons/mastercard.png';
import LogoPci from 'icons/pci_logo.png';
import visa from 'icons/visa.png';
import {
	applyDiscount,
	applyBenefit,
	createAppointment,
	createPayment,
	Discount,
	KUSHKI_PAYMENT_ID,
	NewAppointmentBody,
	PaymentRequestBody,
	PE_PAYMENT_ID,
	B2B_PAYMENT_ID,
	sendFakeSession,
	Benefit,
} from 'pages/api';
import { Container, Loading } from 'pages/common';
import { validSelectTimeWithNow } from 'pages/SelectDoctor/components/FunctionsHelper';
import { ModalErrorTime } from 'pages/SelectDoctor/components/ModalErrorTime';
import { FAKE_SESSION_ID } from 'pages/SelectDoctor/services/contants';
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PAYMENT_ROUTE } from 'routes';
import {
	addGAEvent,
	dateToUTCUnixTimestamp,
	getHour,
	getHumanDay,
	getIntCurrency,
	stylesWithTheme,
	useAppointmentStepValidation,
} from 'utils';
import initCulqi from 'utils/culquiIntegration';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import KushkiCardError, { RequestCard } from './exceptions/KushkiCardError';
import KushkiCashError from './exceptions/KushkiCashError';
import { processErrorPayment } from './services';

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

const getBooleanOrTrue = (value: string | undefined | null): boolean => {
	if (value === undefined || value === null) {
		return true;
	}
	return !!JSON.parse(String(value).toLowerCase());
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
		reservationAccountID,
		updateState: updateContextState,
		appointmentOwner,
		trackParams,
		benefit,
		useBenefit,
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

	const kushki = new Kushki({
		merchantId: `${process.env.REACT_APP_KUSHKI_MERCHANT_ID}`, // Your public merchant id
		inTestEnvironment: getBooleanOrTrue(process.env.REACT_APP_KUSHKI_IN_TEST_ENV), //!!`${process.env.REACT_APP_KUSHKI_IN_TEST_ENV}`
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
		documentType: 'DNI',
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

	const validHourReservation = useCallback(() => {
		try {
			validSelectTimeWithNow(schedule);
			return true;
		} catch (e) {
			if (e instanceof Error) {
				setErrorTimeMessage(e.message);
				return false;
			}
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

	const performTransactionB2BPayment = useCallback(
		async (method: number) => {
			if (schedule && updateContextState && useCase && triage && activeUser && doctor) {
				console.log(initialValuesCash);
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
						paymentType: B2B_PAYMENT_ID,
						trackParams: trackParams || EMPTY_TRACK_PARAMS,
						reservationAccountID: activeUser.id,
						benefitID: benefit && useBenefit ? benefit.id : '',
					});
					await createAppointment(
						{
							reservationAccountID: activeUser.id,
							appointmentTypeID: 'b2b',
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
							console.log('<<<<response.data>>>>');
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
			initialValuesCash,
			discount.id,
			discount.totalCost,
			trackParams,
			userFiles,
			appointmentOwner,
			userToken,
			history,
			t,
			benefit,
			useBenefit,
		],
	);

	const makePayment = useCallback(
		(paymentMethod: number) => (e: MouseEvent) => {
			const isValidaDate = validHourReservation();
			if (!isValidaDate) return;
			const { id: scheduleId = '' } = schedule || {};
			const isFakeSession = scheduleId.includes(FAKE_SESSION_ID);
			if (!isFakeSession) {
				if (paymentMethod === KUSHKI_PAYMENT_ID) {
					e.preventDefault();
					// window.Culqi.open();
					openKushkiForm();
				} else if (paymentMethod === B2B_PAYMENT_ID) {
					performTransactionB2BPayment(paymentMethod);
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
		[schedule, validHourReservation, useCase, reservationAccountID, doctor, performTransactionB2BPayment],
	);

	const createRequestCardKushki = (amount: string, values: any) => {
		return {
			amount: amount,
			currency: 'PEN',
			card: {
				name: values.cardName,
				number: values.cardNumber.toString(),
				cvc: values.cardCvv.toString(),
				expiryMonth: values.expDate.split('/')[0],
				expiryYear: values.expDate.split('/')[1],
			},
		} as TokenRequest;
	};

	const createRequestCashKushki = (amount: string, values: any) => {
		return {
			name: values.name.toString(),
			lastName: values.lastName.toString(),
			identification: values.documentNumber.toString(),
			documentType: values.documentType.toString(),
			email: values.email.toString(),
			totalAmount: Number(amount),
			currency: 'PEN',
			description: values.description.toString(),
		} as CashTokenRequest;
	};

	const createRequestCardPayment = (
		token: string,
		schedule: any,
		amount: string,
		email: string,
		benefit?: Benefit | null,
	) => {
		return {
			cost: amount,
			appointmentTypeID: 'ugito',
			scheduleID: schedule.id,
			discountID: discount.id,
			email: email,
			token: token,
			dni: activeUser?.identification || '',
			name: '',
			lastName: '',
			phone: '',
			paymentType: KUSHKI_PAYMENT_ID,
			trackParams: trackParams || EMPTY_TRACK_PARAMS,
			reservationAccountID: activeUser?.id,
			benefitID: benefit ? benefit.id : '',
		} as PaymentRequestBody;
	};

	const createRequestChashPayment = (
		amount: string,
		values: any,
		token: string,
		method: number,
		benefit?: Benefit | null,
	) => {
		return {
			cost: amount,
			appointmentTypeID: 'ugito',
			scheduleID: schedule?.id || '',
			discountID: discount.id,
			email: values.email.toString() || '',
			token: token,
			dni: values.documentNumber.toString() || '',
			name: values.name.toString() || '',
			lastName: values.lastName.toString() || '',
			phone: activeUser?.phoneNumber || '',
			paymentType: method,
			trackParams: trackParams || EMPTY_TRACK_PARAMS,
			reservationAccountID: activeUser?.id,
			benefitID: benefit ? benefit.id : '',
		} as PaymentRequestBody;
	};

	const createRequestCardAppoitment = () => {
		return {
			reservationAccountID: activeUser?.id,
			appointmentTypeID: 'ugito',
			useCaseID: useCase?.id,
			scheduleID: schedule?.id,
			triage,
			media: userFiles || [],
			isGuest: appointmentOwner === GUEST,
		} as NewAppointmentBody;
	};

	const createRequestCashAppoitment = () => {
		return {
			reservationAccountID: activeUser?.id,
			appointmentTypeID: 'ugito',
			useCaseID: useCase?.id,
			scheduleID: schedule?.id,
			triage,
			media: userFiles || [],
			isGuest: appointmentOwner === GUEST,
		} as NewAppointmentBody;
	};

	const paymentCardKushki = (amount: string, values: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			const request = createRequestCardKushki(amount, values);
			kushki.requestToken(request, (response: any) => {
				if (response.code && response.message) {
					return reject(new KushkiCardError(response.message, response.code, request as RequestCard));
				}
				if (response.token) {
					return resolve(response.token);
				}
				return reject(new KushkiCardError('error de kushki', 'undefined', request as RequestCard));
			});
		});
	};

	const paymentCashKushki = (amount: string, values: any): Promise<string> => {
		return new Promise((resolve, reject) => {
			const request = createRequestCashKushki(amount, values);
			kushki.requestCashToken(request, (response: any) => {
				if (response.code && response.message) {
					return reject(new KushkiCashError(response.message, response.code, request as object));
				}
				if (response.token) {
					return resolve(response.token);
				}
				return reject(new KushkiCashError('error de kushki', 'undefined', request as object));
			});
		});
	};

	const makeKushkiPayment = async (values: any) => {
		const isValidaDate = validHourReservation();
		if (!isValidaDate) return;
		const totalCost = discount.totalCost || useCase?.totalCost;
		const amount = totalCost ? totalCost.toString() : '';
		if (schedule && updateContextState && useCase && triage && activeUser) {
			try {
				setIsPaymentLoading(true);
				const token = await paymentCardKushki(amount, values);
				await createPayment(createRequestCardPayment(token, schedule, amount, values.email, benefit));
				await createAppointment(createRequestCardAppoitment(), userToken);

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
				setErrorMessage('');
				setIsPaymentLoading(false);
				history.push('/confirmacion');
			} catch (error) {
				setErrorMessage(processErrorPayment(error as Error));
				setOpenKushkiModal(false);
				setIsPaymentLoading(false);
			}
		}
	};

	const makeKushkiCashPayment = async (values: any) => {
		const totalCost = discount.totalCost || useCase?.totalCost;
		const amount = totalCost ? totalCost.toString() : '';
		if (schedule && updateContextState && useCase && triage && activeUser && doctor) {
			const method = 2;
			try {
				setIsPaymentLoading(true);
				const token = await paymentCashKushki(amount, values);
				const response: any = await createPayment(createRequestChashPayment(amount, values, token, method, benefit));
				await createAppointment(createRequestCashAppoitment(), userToken);
				let link = null;

				if (method === PE_PAYMENT_ID) {
					if (response?.data) {
						link = response?.data?.data?.reference_link as string;
					}
				} else {
					link = buildTransactionURL(doctor.name, doctor.lastName, values.fullName || '', activeUser.phoneNumber || '');
				}
				updateContextState({
					useCase: { ...useCase, totalCost: discount.totalCost || useCase.totalCost },
					paymentURL: '',
					appointmentCreationStep: CONFIRMATION_STEP,
					ticketNumber: link,
				});
				history.push('/confirmacion');
			} catch (error) {
				setErrorMessage(processErrorPayment(error as Error));
				setOpenKushkiCashModal(false);
				setIsPaymentLoading(false);
			}
		}
	};

	const onChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target) {
			setDiscountCode(e.target.value);
		}
	};
	const sendDiscount = useCallback(async () => {
		try {
			const reviewedBenefit = await applyBenefit({
				benefitID: benefit?.id,
				dni: 'fasdafasd',
				scheduleID: 'fadsfdafads',
			});

			addGAEvent({
				category: 'Agendar cita - Paso 3',
				action: 'Aplicar descuento en beneficio',
				label: reviewedBenefit.id,
			});
			window.Culqi.settings({ currency: 'PEN', amount: getIntCurrency(reviewedBenefit.totalCost) });
			setDiscount(reviewedBenefit);

			if (activeUser && schedule) {
				if (discountCode) {
					const reviewedDiscount = await applyDiscount({
						couponCode: discountCode,
						dni: activeUser.identification,
						scheduleID: schedule.id,
					});

					addGAEvent({ category: 'Agendar cita - Paso 3', action: 'Aplicar descuento', label: reviewedDiscount.id });
					window.Culqi.settings({ currency: 'PEN', amount: getIntCurrency(reviewedDiscount.totalCost) });
					setDiscount(reviewedDiscount);
				} else {
					const reviewedBenefit = await applyBenefit({
						benefitID: benefit?.id,
						dni: activeUser.identification,
						scheduleID: schedule.id,
					});

					addGAEvent({
						category: 'Agendar cita - Paso 3',
						action: 'Aplicar descuento en beneficio',
						label: reviewedBenefit.id,
					});
					window.Culqi.settings({ currency: 'PEN', amount: getIntCurrency(reviewedBenefit.totalCost) });
					setDiscount(reviewedBenefit);
				}
			}
		} catch (e) {}
	}, [discountCode, schedule, activeUser, benefit]);

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
				useBenefit={useBenefit}
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
						<DialogContentText style={{ color: '#848181' }}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									Este pago es procesado de forma segura por Kushki, un proovedor de pagos PCI de nivel 1.{' '}
								</Grid>
							</Grid>
						</DialogContentText>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Grid item xs={12}>
									<Grid container spacing={2} style={{ justifyContent: 'center', marginBottom: '25px' }}>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={visa} width={35} height={12} alt="Brand Visa" />
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={mastercard} width={28} height={18} alt="Brand Mastercard" />
										</Grid>
										<Grid item xs={2} style={{ textAlign: 'center' }}>
											<img src={amex} width={28} height={18} alt="Brand Amex" />
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
							<Grid item xs={12}>
								<Grid container spacing={2} style={{ justifyContent: 'center' }}>
									<Grid item xs={4} style={{ textAlign: 'center' }}>
										<img src={LogoPci} width={'75px'} alt="Kushki" />
									</Grid>
									<Grid item xs={4} style={{ textAlign: 'center' }}>
										<div style={{ fontWeight: 'bold', fontSize: '9px' }}>POWERED BY</div>
										<img src={LogoKsh} width={'75px'} alt="Kushki" />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
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
					<DialogContentText style={{ color: '#848181' }}>
						<Grid container spacing={2}>
							<Grid item xs={10}>
								Este pago es procesado de forma segura por Kushki, un proovedor de pagos PCI de nivel 1.{' '}
							</Grid>
						</Grid>
					</DialogContentText>
					<Grid item xs={12}>
						<Grid container spacing={2} style={{ justifyContent: 'center', marginBottom: '25px' }}>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={interbank} width={40} height={20} alt="Brand Interbank" />
							</Grid>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={bcp} width={40} height={20} alt="Brand BCP" />
							</Grid>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={bbva} width={40} height={20} alt="Brand BBVA" />
							</Grid>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={tambo} width={40} height={20} alt="Brand Tambo" />
							</Grid>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={cajaarequipa} width={40} height={20} alt="Brand Caja Arequipa" />
							</Grid>
							<Grid item xs={2} style={{ textAlign: 'center' }}>
								<img src={cajatrujillo} width={40} height={20} alt="Brand Caja Trujillo" />
							</Grid>
						</Grid>
					</Grid>
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
													label={'Tipo de documento'}
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
					<Grid item xs={12}>
						<Grid container spacing={2} style={{ justifyContent: 'center' }}>
							<Grid item xs={4} style={{ textAlign: 'center' }}>
								<img src={LogoPci} width={'75px'} alt="Kushki" />
							</Grid>
							<Grid item xs={4} style={{ textAlign: 'center' }}>
								<div style={{ fontWeight: 'bold', fontSize: '9px' }}>POWERED BY</div>
								<img src={LogoKsh} width={'75px'} alt="Kushki" />
							</Grid>
						</Grid>
					</Grid>
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
