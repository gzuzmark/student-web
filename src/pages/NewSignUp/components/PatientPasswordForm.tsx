import React, { ReactElement, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { PasswordField } from 'pages/common';
import { stylesWithTheme } from 'utils/createStyles';

import { patientPasswordValidationSchema } from './validationSchema';

import { ReducerAction, PatientPasswordValues } from '../types';
import { initialPatientPassword } from '../constants';

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

export interface PatientPasswordFormProps {
	patientPassword: PatientPasswordValues;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
}

const PatientPasswordForm = ({
	patientPassword,
	onChangeStep,
	openPrivacyPolicy,
	openTermsAndConditions,
}: PatientPasswordFormProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const onSubmit = useCallback(
		(values: PatientPasswordValues) => {
			try {
				onChangeStep({ type: 'COMPLETE_PASSWORD_STEP', patientPassword: values }, '/creacion_cuenta/pasword');
			} catch (e) {
				console.error(e);
			}
		},
		[onChangeStep],
	);

	return (
		<Formik
			initialValues={patientPassword || initialPatientPassword}
			onSubmit={onSubmit}
			validationSchema={patientPasswordValidationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="password"
								className={classes.fieldWithHelperText}
								label={t('patientPassword.fields.password.label')}
								helperText={t('patientPassword.fields.password.helperText')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="repeatPassword"
								label={t('patientPassword.fields.repeatPassword.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography className={classes.legalInformation} component="span">
							{t('patientPassword.legalInformation.firstSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('patientPassword.legalInformation.privacyPolicyLink')}{' '}
						</Typography>
						<Typography className={classes.legalInformation} component="span">
							{t('patientPassword.legalInformation.secondSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openTermsAndConditions}
						>
							{t('patientPassword.legalInformation.termsAndConditionsLink')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('patientPassword.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default PatientPasswordForm;
