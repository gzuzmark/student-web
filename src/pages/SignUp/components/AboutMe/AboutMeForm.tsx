import React, { useCallback, useContext } from 'react';
import AppContext from 'AppContext';

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

import validationSchema, { minorValidationSchema } from './validationSchema';

export interface AboutMeValues {
	name: string;
	lastName: string;
	secondSurname: string;
	birthDate: Date | null;
	gender: number | undefined;
	identification?: string;
	documentIssueDate?: Date | null;
}

interface AboutMeFormProps {
	aboutMeData: AboutMeValues | undefined;
	onChangeStep: (values: AboutMeValues) => void;
	openPrivacyPolicy: () => void;
	userLabel?: string;
	validationOnChange?: (date: Date | null) => void;
}

const initialValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
	identification: '',
	documentIssueDate: null,
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

const AboutMeForm = ({
	aboutMeData,
	onChangeStep,
	openPrivacyPolicy,
	userLabel,
	validationOnChange,
}: AboutMeFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const onSubmit = useCallback(
		(values: AboutMeValues, { setSubmitting }: { setSubmitting: Function; setFieldError: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);
	const userLabelExists = !!userLabel;

	const { useCase, userToken, updateState } = useContext(AppContext);

	//console.log(useCase?.name);
	console.log(useCase);

	return (
		<Formik
			initialValues={aboutMeData || initialValues}
			onSubmit={onSubmit}
			validationSchema={userLabelExists ? minorValidationSchema : validationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="name"
								label={t(userLabel ? `aboutme.fields.name.label.${userLabel}` : 'aboutme.fields.name.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="lastName"
								label={t(userLabel ? `aboutme.fields.lastName.label.${userLabel}` : 'aboutme.fields.lastName.label')}
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
								component={DatePickerField}
								name="birthDate"
								validationOnChange={validationOnChange}
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
								<MenuItem value={0}>Masculino</MenuItem>
								<MenuItem value={1}>Femenino</MenuItem>
							</Field>
						</FormControl>
						{userLabelExists ? (
							<>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										name="identification"
										label={t('aboutme.fields.document.label.minor')}
										variant="outlined"
										inputProps={{ maxLength: 11 }}
										fullWidth
									/>
								</div>
								<div className={classes.fieldWrapper}>
									<Field
										component={DatePickerField}
										name="documentIssueDate"
										TextFieldProps={{
											label: t('aboutme.fields.documentIssueDate.label.minor'),
											variant: 'outlined',
											helperText: '',
											fullWidth: true,
											placeholder: 'DD/MM/YYYY',
										}}
									/>
								</div>
							</>
						) : null}
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
