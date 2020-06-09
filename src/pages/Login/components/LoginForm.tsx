import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils/createStyles';
import { sendLogin, getCurrentUser } from 'pages/api';
import { PasswordField } from 'pages/common';
import { AppointmentCreationStep, PRE_SIGNUP_STEP, SELECT_DOCTOR_STEP, TRIAGE_STEP, PAYMENT_STEP } from 'AppContext';

import validationSchema from '../validationSchema';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	inputWrapper: {
		paddingBottom: '36px',
		[breakpoints.up('lg')]: {
			paddingBottom: '46px',
		},
		'&:last-child': {
			paddingBottom: '6px',
			[breakpoints.up('lg')]: {
				paddingBottom: '16px',
			},
		},
	},
	inputError: {
		paddingBottom: '36px',
		[breakpoints.up('lg')]: {
			paddingBottom: '25px',
		},
		'&:last-child': {
			paddingBottom: '6px',
		},
	},
	icon: {
		'& > path': {
			stroke: palette.info.main,
		},
	},
	linkWrapper: {
		textAlign: 'right',
		paddingBottom: '27px',
		[breakpoints.up('lg')]: {
			paddingBottom: '19px',
		},
	},
	link: {
		color: palette.info.main,
	},
	linkLabel: {
		color: palette.info.main,
	},
	buttonWrapper: {
		paddingBottom: '17px',
		[breakpoints.up('lg')]: {
			paddingBottom: '26px',
		},
	},
	signUpWrapper: {
		textAlign: 'center',
	},
	signUpLink: {
		color: palette.primary.main,
	},
}));

interface FormValues {
	phoneNumber: string;
	password: string;
}

interface LoginFormProps {
	appointmentCreationStep: AppointmentCreationStep | undefined;
	updateContextState: Function | undefined;
}
const redirectAfterLogin = (
	appointmentCreationStep: AppointmentCreationStep | undefined,
	history: Record<string, any>,
): void => {
	switch (appointmentCreationStep) {
		case TRIAGE_STEP:
		case SELECT_DOCTOR_STEP:
			history.goBack();
			break;
		case PRE_SIGNUP_STEP:
			history.push('/pago');
			break;
		default:
			history.push('/citas');
			break;
	}
};

const LoginForm = ({ updateContextState, appointmentCreationStep }: LoginFormProps) => {
	const { t } = useTranslation('login');
	const classes = useStyles();
	const history = useHistory();
	const onSubmit = useCallback(
		async ({ phoneNumber, password }: FormValues, { setSubmitting, setFieldError }: FormikHelpers<FormValues>) => {
			const token = await sendLogin({ username: phoneNumber, password }, setFieldError);
			if (token && updateContextState) {
				const [reservationToken, currentUser] = await getCurrentUser();
				redirectAfterLogin(appointmentCreationStep, history);
				updateContextState({
					userToken: token,
					reservationAccountID: reservationToken,
					user: currentUser,
					appointmentCreationStep: appointmentCreationStep === PRE_SIGNUP_STEP ? PAYMENT_STEP : appointmentCreationStep,
				});
			}

			setSubmitting(false);
		},
		[appointmentCreationStep, history, updateContextState],
	);

	return (
		<Formik initialValues={{ phoneNumber: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, errors, touched }) => (
				<Form>
					<div>
						<div
							className={clsx(
								classes.inputWrapper,
								errors.phoneNumber && touched.phoneNumber ? classes.inputError : '',
							)}
						>
							<Field
								component={TextField}
								name="phoneNumber"
								type="tel"
								label={t('login.cellphone.label')}
								variant="outlined"
								inputProps={{ maxLength: 9 }}
								fullWidth
							/>
						</div>
						<div className={clsx(classes.inputWrapper, errors.password && touched.password ? classes.inputError : '')}>
							<Field
								component={PasswordField}
								name="password"
								label={t('login.password.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>
					<div className={classes.linkWrapper}>
						<Link to="/recuperar_contrasena" className={classes.link}>
							<Typography className={classes.linkLabel} component="span">
								{t('login.forgotPassword.link')}
							</Typography>
						</Link>
					</div>
					<div className={classes.buttonWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('login.submit.text')}
						</Button>
					</div>
					<div className={classes.signUpWrapper}>
						<Typography component="span">{t('login.signUp.text')} </Typography>
						<Link to="/registro" className={classes.signUpLink}>
							<Typography component="span" color="primary">
								{t('login.signUp.link')}
							</Typography>
						</Link>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
