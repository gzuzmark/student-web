import React, { useState, useCallback, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { InputAdornment, IconButton } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { stylesWithTheme } from 'utils/createStyles';
import { ReactComponent as Visibility } from 'icons/eye_on.svg';
import { ReactComponent as VisibilityOff } from 'icons/eye_off.svg';
import { sendLogin } from 'pages/api';

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

const LoginForm = () => {
	const { t } = useTranslation('login');
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};
	const onSubmit = useCallback(
		async ({ phoneNumber, password }: FormValues, { setSubmitting }: { setSubmitting: Function }) => {
			await sendLogin({ username: phoneNumber, password });
			setSubmitting(false);
		},
		[],
	);

	return (
		<Formik initialValues={{ phoneNumber: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<div>
						<div className={classes.inputWrapper}>
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
						<div className={classes.inputWrapper}>
							<Field
								component={TextField}
								name="password"
								label={t('login.password.label')}
								variant="outlined"
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={toggleShowPassword} onMouseDown={handleOnMouseDown}>
												{showPassword ? (
													<Visibility className={classes.icon} />
												) : (
													<VisibilityOff className={classes.icon} />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
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
