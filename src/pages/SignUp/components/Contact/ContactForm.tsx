import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { PasswordField } from 'pages/common';

import { newUservalidationSchema, guestValidationSchema } from './validationSchema';

export interface ContactValues {
	identification: string;
	phoneNumber: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
}

interface FormikContactValues {
	identification: string;
	phoneNumber: string;
	email: string;
	password: string;
	repeatPassword: string;
}

interface ContactFormProps {
	submitSignUp: (values: ContactValues) => Promise<void>;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
	isGuest: boolean;
}

const initialValues = {
	identification: '',
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

const ContactForm = ({ submitSignUp, openPrivacyPolicy, openTermsAndConditions, isGuest }: ContactFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const contactKey = isGuest ? 'toSomeoneElse' : 'toYou';
	const onSubmit = useCallback(
		async (values: ContactValues, { setSubmitting, setFieldError }: FormikHelpers<FormikContactValues>) => {
			try {
				await submitSignUp(values);

				setSubmitting(false);
			} catch (e) {
				setFieldError('identification', t('contact.fields.identification.error'));
				setFieldError('phoneNumber', t('contact.phoneNumber.error'));

				if (values.email) {
					setFieldError('email', t('contact.email.error'));
				}
			}
		},
		[submitSignUp, t],
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={isGuest ? guestValidationSchema : newUservalidationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								label={t(`contact.fields.id.label.${contactKey}`)}
								variant="outlined"
								inputProps={{ maxLength: 11 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="phoneNumber"
								type="tel"
								label={t(`contact.fields.phoneNumber.label.${contactKey}`)}
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
								label={t(`contact.fields.email.label.${contactKey}`)}
								variant="outlined"
								helperText={t('contact.fields.email.helperText')}
								fullWidth
							/>
						</div>
						{!isGuest ? (
							<>
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
							</>
						) : null}
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
							onClick={openTermsAndConditions}
						>
							{t('contact.legalInformation.termsAndConditionsLink')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('contact.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactForm;
