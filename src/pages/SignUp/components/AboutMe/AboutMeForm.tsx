import React, { useCallback } from 'react';
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

import validationSchema from './validationSchema';

export interface AboutMeValues {
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: Date | null;
	gender: number | undefined;
}

interface AboutMeFormProps {
	submitSignUp: (value: AboutMeValues, setSubmitting: Function, setFieldError: Function) => void;
	openPrivacyPolicy: () => void;
}

const initialValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	identification: '',
	birthDate: null,
	gender: undefined,
};

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
				paddingBottom: '43px',
			},
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '22px',
		},
	},
	privacyPolicyLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

const AboutMeForm = ({ submitSignUp, openPrivacyPolicy }: AboutMeFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const onSubmit = useCallback(
		async (
			values: AboutMeValues,
			{ setSubmitting, setFieldError }: { setSubmitting: Function; setFieldError: Function },
		) => {
			submitSignUp(values, setSubmitting, setFieldError);
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
								name="name"
								label={t('aboutme.fields.name.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="lastName"
								label={t('aboutme.fields.lastName.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="secondSurname"
								label={t('aboutme.fields.secondSurname.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								type="tel"
								label={t('aboutme.fields.id.label')}
								variant="outlined"
								inputProps={{ maxLength: 11 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={DatePickerField}
								name="birthDate"
								TextFieldProps={{
									label: t('aboutme.fields.birthDate.label'),
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
								label={t('aboutme.fields.gender.label')}
								name="gender"
								variant="outlined"
								select
							>
								<MenuItem value={1}>Masculino</MenuItem>
								<MenuItem value={2}>Femenino</MenuItem>
							</Field>
						</FormControl>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography component="span">{t('aboutme.privacyPolicy.firstSection')} </Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('aboutme.privacyPolicy.secondSection')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('aboutme.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AboutMeForm;
