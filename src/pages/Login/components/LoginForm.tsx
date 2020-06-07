import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils/createStyles';
import { sendLogin } from 'pages/api';
import { PasswordField } from 'pages/common';
import { AppointmentCreationStep, PRE_SIGNUP, SELECT_DOCTOR, routeMapping } from 'AppContext';

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
}

const LoginForm = ({ appointmentCreationStep }: LoginFormProps) => {
	const { t } = useTranslation('login');
	const classes = useStyles();
	const history = useHistory();
	const onSubmit = useCallback(
		async ({ phoneNumber, password }: FormValues, { setSubmitting }: { setSubmitting: Function }) => {
			await sendLogin({ username: phoneNumber, password });
			setSubmitting(false);
			switch (appointmentCreationStep) {
				case PRE_SIGNUP:
					history.push('/pago');
					break;
				case SELECT_DOCTOR:
					history.push(routeMapping[SELECT_DOCTOR]);
					break;
				default:
					history.push('/citas');
					break;
			}
		},
		[appointmentCreationStep, history],
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
