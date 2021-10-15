import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { DatePickerField, Option } from 'pages/common';
import validationSchema, { minorValidationSchema } from './validationSchema';
import { Grid, Typography } from '@material-ui/core';

export interface AboutMeValues {
	name: string;
	lastName: string;
	secondSurname: string;
	birthDate: Date | null;
	gender: number | undefined;
	identification?: string;
	documentIssueDate?: Date | null;
	condition: boolean | null;
	address: string;
}

interface AboutMeFormProps {
	aboutMeData: AboutMeValues | undefined;
	onChangeStep: (values: AboutMeValues) => void;
	openPrivacyPolicy: () => void;
	userLabel?: string;
	validationOnChange?: (date: Date | null) => void;
	isGuest: boolean;
}

const initialValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
	identification: '',
	documentIssueDate: null,
	condition: null,
	address: '',
};

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '752px',
		},
	},
	fieldWrapper: {
		paddingBottom: '39px',
		'&:last-child': {
			paddingBottom: '35px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '43px',
			},
		},
	},
	fieldLabelWrapper: {
		paddingBottom: '10px',
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
	subTitle: {
		marginBottom: '24px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '16px',
		color: '#1ECD96',
		lineHeight: '20px',
		borderBottom: '1px solid #F0F2FA',
		[breakpoints.up('lg')]: {
			marginBottom: '30px',
			lineHeight: '24px',
			paddingBottom: '16px',
			fontSize: '20px',
		},
	},
	optionButton: {
		textTransform: 'none',
		minWidth: '112px',
		padding: '14px',
		'&.MuiButton-contained': {
			padding: '12px',
			[breakpoints.up('lg')]: {
				padding: '17px',
			},
		},
		[breakpoints.up('lg')]: {
			maxHeight: '48px',
		},
	},
	labelYesNo: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			paddingBottom: '41px',
		},
	},
}));

const AboutMeForm = ({
	aboutMeData,
	onChangeStep,
	openPrivacyPolicy,
	userLabel,
	validationOnChange,
	isGuest,
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

	return (
		<Formik
			initialValues={aboutMeData || initialValues}
			onSubmit={onSubmit}
			validationSchema={userLabelExists ? minorValidationSchema : validationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					<div>
						<Grid container spacing={2}>
							<Grid item sm={6} xs={6}>
								<FormControl className={classes.fieldWrapper} fullWidth>
									<Field
										component={TextField}
										label={t('aboutme.fields.gender.label')}
										name="gender"
										variant="outlined"
										select
									>
										<MenuItem value={'0'}>Masculino</MenuItem>
										<MenuItem value={'1'}>Femenino</MenuItem>
									</Field>
								</FormControl>
							</Grid>
							<Grid item sm={6} xs={6}>
								<div className={classes.fieldWrapper}>
									<Field
										component={DatePickerField}
										disableFuture
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
							</Grid>
						</Grid>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="name"
								label={t(userLabel ? `aboutme.fields.name.label.${userLabel}` : 'aboutme.fields.name.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<Grid container spacing={2}>
							<Grid item sm={6} xs={6}>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										name="lastName"
										label={t(
											userLabel ? `aboutme.fields.lastName.label.${userLabel}` : 'aboutme.fields.lastName.label',
										)}
										variant="outlined"
										fullWidth
									/>
								</div>
							</Grid>
							<Grid item sm={6} xs={6}>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										name="secondSurname"
										label={t('aboutme.fields.secondSurname.label')}
										variant="outlined"
										fullWidth
									/>
								</div>
							</Grid>
						</Grid>
						{userLabelExists ? (
							<>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										name="identification"
										label={t('aboutme.fields.document.label.minor')}
										variant="outlined"
										inputProps={{ maxLength: 12 }}
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
