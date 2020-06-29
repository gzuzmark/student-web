import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';

import { stylesWithTheme } from 'utils';
import { verifyResetPasswordCode, requestRecoverToken } from 'pages/api';

import useSharedStyles from '../sharedStyles';
import validationSchema from './validationSchema';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		paddingTop: '28px',
	},
	form: {
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			width: '402px',
			paddingBottom: '35px',
		},
	},
	otpInputWrapper: {
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			paddingBottom: '35px',
		},
	},
	otpInputLabelWrapper: {
		paddingBottom: '7px',
	},
	otpInputLabelDesktop: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	otpInputLabelMobile: {
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	resendLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

interface FormValues {
	otpCode: string;
}

interface ValidateOTPStepProps {
	goToNextStep: () => void;
	phoneNumber: string;
	documentNumber: string;
	setUserID: Function;
	setOtpCode: Function;
}

const ValidateOTPStep = ({
	goToNextStep,
	phoneNumber,
	documentNumber,
	setUserID,
	setOtpCode,
}: ValidateOTPStepProps) => {
	const sharedClasses = useSharedStyles();
	const classes = useStyles();
	const { t } = useTranslation('forgotPassword');
	const validateOTP = useCallback(
		async ({ otpCode }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
			const userID = await verifyResetPasswordCode({ otpCode, documentNumber });

			setUserID(userID);
			setOtpCode(otpCode);
			setSubmitting(false);
			goToNextStep();
		},
		[documentNumber, goToNextStep, setOtpCode, setUserID],
	);
	const resendOtpCode = useCallback(async () => {
		try {
			await requestRecoverToken({ documentNumber });
		} catch (e) {}
	}, [documentNumber]);

	return (
		<div className={classes.wrapper}>
			<Typography className={sharedClasses.title}>{t('forgotPassword.validateOTP.title')}</Typography>
			<Typography className={sharedClasses.subTitle}>
				{t('forgotPassword.validateOTP.subTitle')} {phoneNumber}
			</Typography>
			<Formik onSubmit={validateOTP} initialValues={{ otpCode: '' }} validationSchema={validationSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div className={classes.otpInputWrapper}>
							<div className={classes.otpInputLabelWrapper}>
								<FormLabel className={classes.otpInputLabelDesktop}>
									{t('forgotPassword.validateOTP.otpCodeLabel')}
								</FormLabel>
								<FormLabel className={classes.otpInputLabelMobile}>
									{t('forgotPassword.validateOTP.otpCodeLabel.mobile')}
								</FormLabel>
							</div>
							<Field
								component={TextField}
								name="otpCode"
								type="tel"
								variant="outlined"
								inputProps={{ maxLength: 4 }}
								disabled={isSubmitting}
								fullWidth
							/>
						</div>
						<Button variant="contained" disabled={isSubmitting} onClick={submitForm} fullWidth>
							{t('forgotPassword.validateOTP.nextButton')}
						</Button>
					</Form>
				)}
			</Formik>
			<div>
				<Typography component="span">{t('forgotPassword.validateOTP.resendCodeLabel')} </Typography>
				<Typography className={classes.resendLink} color="primary" onClick={resendOtpCode} component="span">
					{t('forgotPassword.validateOTP.resendCodeLink')}
				</Typography>
			</div>
		</div>
	);
};

export default ValidateOTPStep;
