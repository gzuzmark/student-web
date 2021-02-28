import React, { ReactElement, useContext, useCallback, useReducer, useLayoutEffect } from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { Location } from 'history';
import Snackbar from '@material-ui/core/Snackbar';
import { Container, RightLayout, LeftLayout, Stepper } from 'pages/common';
import AppContext from 'AppContext';
import { stylesWithTheme, usePageTitle, setLocalValue } from 'utils';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { State, ReducerAction } from './types';
import { initialAboutPatientValues, initialContactPatientValues, initialPatientPassword } from './constants';
import AboutPatient from './components/AboutPatient';
import ContactPatient from './components/ContactPatient';
import PatientPassword from './components/PatientPassword';
import { createAccount, createPatient } from 'pages/api';
import SuccessSignUp from './components/SuccessSignUp';
import WelcomeModal from './components/WelcomeModal';

const Alert = (props: AlertProps) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '18px 34px 20px 34px',
		[breakpoints.up('lg')]: {
			padding: '128px 60px 0 40px',
		},
	},
	titlePrefix: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '17px',
		},
	},
	title: {
		textAlign: 'center',
		paddingBottom: '10px',
		fontWeight: 'bold',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
			paddingBottom: '40px',
		},
	},
}));

const SUB_ROUTES = ['sobre_ti', 'contacto', 'password'];

const findStep = (location: Location) =>
	SUB_ROUTES.findIndex((route: string) => location && location.pathname === `/creacion_cuenta/${route}`);

const createSteps = (t: Function, isDesktop: boolean) =>
	isDesktop ? [t('left.step.first.label'), t('left.step.second.label'), t('left.step.third.label')] : ['', '', ''];

const initialValues: State = {
	step: 0,
	isSubmitting: false,
	aboutPatient: initialAboutPatientValues,
	contactPatient: initialContactPatientValues,
	patientPassword: initialPatientPassword,
	showConfirmationMessage: false,
	showWelcomeMessage: false,
	path: '/dashboard/citas',
};

export const newSignUpReducer = (state: State, action: ReducerAction): State => {
	switch (action.type) {
		case 'COMPLETE_ABOUT_PATIENT': {
			return {
				...state,
				aboutPatient: action.aboutPatient,
				step: 1,
			};
		}
		case 'COMPLETE_CONTACT_STEP': {
			return {
				...state,
				contactPatient: action.contactPatient,
				step: 2,
			};
		}
		case 'COMPLETE_PASSWORD_STEP': {
			return {
				...state,
				isSubmitting: true,
			};
		}
		case 'FINISH_SUBMITTING': {
			return {
				...state,
				isSubmitting: false,
				showConfirmationMessage: true,
			};
		}
		case 'REDIRECT_DASHBOARD_SCREEN': {
			return {
				...state,
				showConfirmationMessage: false,
				showWelcomeMessage: true,
				path: '/dashboard/default',
			};
		}
		case 'REDIRECT_APPOINTMENT_SCREEN': {
			return {
				...state,
				showConfirmationMessage: false,
				showWelcomeMessage: true,
				path: '/seleccionar_doctor',
			};
		}
		default: {
			throw Error(`The action ${action} is not supported`);
		}
	}
};

const NewSignUp = (): ReactElement => {
	const [state, dispatch] = useReducer<typeof newSignUpReducer>(newSignUpReducer, initialValues);
	const { t } = useTranslation('newSignUp');
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const steps = createSteps(t, isDesktop);
	const [open, setOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const { updateState } = useContext(AppContext);
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const onSubmit = useCallback(
		async ({ aboutPatient, contactPatient, patientPassword }: State) => {
			try {
				const accountInfo = {
					...contactPatient,
					password: patientPassword.password,
				};
				const patientInfo = {
					...aboutPatient,
					...contactPatient,
				};
				const localUserToken = await createAccount(accountInfo);
				const reservationAccountID = await createPatient(patientInfo, localUserToken);

				setLocalValue('userToken', localUserToken);

				if (updateState) {
					updateState({
						reservationAccountID,
						userToken: localUserToken,
						user: patientInfo,
						appointmentCreationStep: '',
					});
				}

				dispatch({ type: 'FINISH_SUBMITTING' });
			} catch (e) {
				setOpen(true);
				setErrorMessage('Email y Nr. de documento deben ser únicos.');
				console.error(e);
			}
		},
		[updateState],
	);
	const onChangeStep = (payload: ReducerAction, redirectPath: string) => {
		dispatch(payload);

		if (payload.type !== 'COMPLETE_PASSWORD_STEP') {
			history.push(redirectPath);
		} else {
			onSubmit({ ...state, patientPassword: payload.patientPassword });
		}
	};

	const showWelcomeScreen = (payload: ReducerAction): void => {
		dispatch(payload);
	};

	useLayoutEffect(() => {
		const index = findStep(location);
		const isAboutPatientComplete = !!state.aboutPatient.name;
		const isContactPatientComplete = !!state.contactPatient.identification;

		if (index === 1 && !isAboutPatientComplete) {
			history.push('creacion_cuenta/sobre_ti');
		} else if (index === 2 && isAboutPatientComplete && !isContactPatientComplete) {
			history.push('creacion_cuenta/contacto');
		} else if (index === 2 && !isAboutPatientComplete && !isContactPatientComplete) {
			history.push('creacion_cuenta/sobre_ti');
		}
	}, [history, location, state.aboutPatient.name, state.contactPatient.identification]);

	usePageTitle('Registro');

	if (state.showConfirmationMessage) {
		return <SuccessSignUp showWelcomeScreen={showWelcomeScreen} />;
	}

	if (state.showWelcomeMessage) {
		return <WelcomeModal path={state.path} />;
	}

	return (
		<Container>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
			<LeftLayout>
				<div className={classes.wrapper}>
					<Typography className={classes.title} variant="h1">
						{t('left.title')}
					</Typography>
					<Stepper
						steps={steps}
						orientation={isDesktop ? 'vertical' : 'horizontal'}
						alternativeLabel={!isDesktop}
						activeStep={state.step}
					/>
				</div>
			</LeftLayout>
			<RightLayout>
				<Switch>
					<Route path="/creacion_cuenta/sobre_ti">
						<AboutPatient state={state} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/creacion_cuenta/contacto">
						<ContactPatient state={state} onChangeStep={onChangeStep} />
					</Route>
					<Route exact path="/creacion_cuenta/password">
						<PatientPassword state={state} onChangeStep={onChangeStep} />
					</Route>
					<Route path="/creacion_cuenta/*">
						<Redirect to="/creacion_cuenta/sobre_ti" />
					</Route>
				</Switch>
			</RightLayout>
		</Container>
	);
};

export default NewSignUp;
