import React, { ReactElement, useContext, useCallback, useReducer, useLayoutEffect } from 'react';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { Location } from 'history';

import { Container, RightLayout, LeftLayout, Stepper } from 'pages/common';
import AppContext from 'AppContext';
import { stylesWithTheme, usePageTitle, setLocalValue } from 'utils';

import { State, ReducerAction } from './types';
import { initialAboutPatientValues, initialContactPatientValues, initialPatientPassword } from './constants';
import AboutPatient from './components/AboutPatient';
import ContactPatient from './components/ContactPatient';
import PatientPassword from './components/PatientPassword';
import { createAccount, createPatient } from 'pages/api';
import SuccessSignUp from './components/SuccessSignUp';

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
};

const newSignUpReducer = (state: State, action: ReducerAction): State => {
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
	const { updateState } = useContext(AppContext);
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
		return <SuccessSignUp />;
	}

	return (
		<Container>
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
