import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { PasswordField } from 'pages/common';

import validationSchema from './validationSchema';

export interface ContactValues {
	phoneNumber: string;
	email: string;
	password: string;
	repeatPassword: string;
}

interface ContactFormProps {
	submitSignUp: (value: ContactValues) => void;
	openPrivacyPolicy: () => void;
}

const initialValues = {
	phoneNumber: '',
	email: '',
	password: '',
	repeatPassword: '',
};

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '25px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '27px',
			},
		},
	},
	fieldWithHelperText: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: palette.error.main,
		},
	},
	privacyPolicyWrapper: {
		paddingBottom: '19px',
		[breakpoints.up('lg')]: {
			paddingBottom: '28px',
			marginRight: '-40px',
		},
	},
	legalInformation: {
		fontSize: '13px',
		color: palette.info.main,
	},
	privacyPolicyLink: {
		fontSize: '13px',
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

const ContactForm = ({ submitSignUp, openPrivacyPolicy }: ContactFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const onSubmit = useCallback(
		async (values: ContactValues, { setSubmitting }: { setSubmitting: Function }) => {
			submitSignUp(values);
			setSubmitting(false);
		},
		[submitSignUp],
	);

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="phoneNumber"
								type="tel"
								label={t('contact.fields.phoneNumber.label')}
								variant="outlined"
								helperText={t('contact.fields.phoneNumber.helperText')}
								inputProps={{ maxLength: 9 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="email"
								label={t('contact.fields.email.label')}
								variant="outlined"
								helperText={t('contact.fields.email.helperText')}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="password"
								label={t('contact.fields.password.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="repeatPassword"
								label={t('contact.fields.repeatPassword.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography className={classes.legalInformation} component="span">
							{t('contact.legalInformation.firstSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('contact.legalInformation.privacyPolicyLink')}{' '}
						</Typography>
						<Typography className={classes.legalInformation} component="span">
							{t('contact.legalInformation.secondSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('contact.legalInformation.termsAndConditionsLink')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{matches ? t('contact.submit.text') : t('contact.submit.text.mobile')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactForm;
