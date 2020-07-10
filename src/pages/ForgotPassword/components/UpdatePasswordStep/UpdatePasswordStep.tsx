import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';

import { stylesWithTheme } from 'utils';
import { resetPassword } from 'pages/api';
import { PasswordField } from 'pages/common';

import useSharedStyles from '../sharedStyles';
import validationSchema from './validationSchema';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		paddingTop: '28px',
	},
	form: {
		[breakpoints.up('lg')]: {
			width: '402px',
		},
	},
	passwordInputWrapper: {
		paddingBottom: '14px',
		[breakpoints.up('lg')]: {
			paddingBottom: '19px',
		},
	},
	repeatPasswordInputWrapper: {
		paddingBottom: '12px',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
		},
	},
	otpInputLabelWrapper: {
		paddingBottom: '7px',
	},
	resendLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

interface FormValues {
	password: string;
	repeatPassword: string;
}

interface ValidateOTPStepProps {
	documentNumber: string;
	userID: string;
	otpCode: string;
}

const UpdatePasswordStep = ({ documentNumber, userID: userId, otpCode }: ValidateOTPStepProps) => {
	const sharedClasses = useSharedStyles();
	const classes = useStyles();
	const { t } = useTranslation('forgotPassword');
	const history = useHistory();
	const changePassword = useCallback(
		async ({ password }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
			try {
				await resetPassword({ password, documentNumber, userId, otpCode });

				setSubmitting(false);
				history.push('/dashboard/citas');
			} catch (e) {}
		},
		[documentNumber, history, otpCode, userId],
	);

	return (
		<div className={classes.wrapper}>
			<Typography className={sharedClasses.title}>{t('forgotPassword.updatePassword.title')}</Typography>
			<Typography className={sharedClasses.subTitle}>{t('forgotPassword.updatePassword.subTitle')}</Typography>
			<Formik
				onSubmit={changePassword}
				initialValues={{ password: '', repeatPassword: '' }}
				validationSchema={validationSchema}
			>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div className={classes.passwordInputWrapper}>
							<div className={classes.otpInputLabelWrapper}>
								<FormLabel>{t('forgotPassword.updatePassword.newPasswordLabel')}</FormLabel>
							</div>
							<Field component={PasswordField} name="password" variant="outlined" disabled={isSubmitting} fullWidth />
						</div>
						<div className={classes.repeatPasswordInputWrapper}>
							<div className={classes.otpInputLabelWrapper}>
								<FormLabel>{t('forgotPassword.updatePassword.repeatPasswordLabel')}</FormLabel>
							</div>
							<Field
								component={PasswordField}
								name="repeatPassword"
								variant="outlined"
								disabled={isSubmitting}
								fullWidth
							/>
						</div>
						<Button variant="contained" disabled={isSubmitting} onClick={submitForm} fullWidth>
							{t('forgotPassword.updatePassword.submitNewPassword')}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UpdatePasswordStep;
