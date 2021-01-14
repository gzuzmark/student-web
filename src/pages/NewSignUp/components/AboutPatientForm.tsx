import React, { ReactElement, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { DatePickerField } from 'pages/common';

import { aboutPatientValidationSchema } from './validationSchema';

import { ReducerAction, AboutPatientValues } from '../types';
import { initialAboutPatientValues } from '../constants';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '20px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '30px',
			},
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	privacyPolicyLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

export interface AboutPatientFormProps {
	aboutPatient: AboutPatientValues;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
	openPrivacyPolicy: () => void;
}

const AboutPatientForm = ({ aboutPatient, onChangeStep, openPrivacyPolicy }: AboutPatientFormProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const onSubmit = useCallback(
		(values: AboutPatientValues) => {
			onChangeStep({ type: 'COMPLETE_ABOUT_PATIENT', aboutPatient: values }, '/creacion_cuenta/contacto');
		},
		[onChangeStep],
	);

	return (
		<Formik
			initialValues={aboutPatient || initialAboutPatientValues}
			onSubmit={onSubmit}
			validationSchema={aboutPatientValidationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="name"
								label={t('aboutPatient.fields.name.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="lastName"
								label={t('aboutPatient.fields.lastName.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="secondSurname"
								label={t('aboutPatient.fields.secondSurname.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={DatePickerField}
								name="birthDate"
								TextFieldProps={{
									label: t('aboutPatient.fields.birthDate.label'),
									variant: 'outlined',
									helperText: '',
									fullWidth: true,
									placeholder: 'DD/MM/YYYY',
								}}
							/>
						</div>
						<FormControl className={classes.fieldWrapper} fullWidth>
							<Field
								component={TextField}
								label={t('aboutPatient.fields.gender.label')}
								name="gender"
								variant="outlined"
								select
							>
								<MenuItem value={0}>Masculino</MenuItem>
								<MenuItem value={1}>Femenino</MenuItem>
							</Field>
						</FormControl>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('aboutPatient.submit.text')}
						</Button>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography component="span">{t('aboutPatient.privacyPolicy.firstSection')} </Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('aboutPatient.privacyPolicy.secondSection')}
						</Typography>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AboutPatientForm;
