import React, { useCallback, useContext, useState } from 'react';
import { Grid, TextField as MaterialTextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Checkbox } from 'formik-material-ui';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';

import { newUservalidationSchema, guestValidationSchema } from './validationSchema';
import AppContext from 'AppContext';
import { getLocations, Ubigeo } from 'pages/api';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';

export interface ContactValues {
	identification: string;
	identificationType: string;
	phoneNumber: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	address?: string;
	ubigeo?: string;
	isTerm?: boolean | null;
	isClub?: boolean;
}

interface FormikContactValues {
	identification: string;
	identificationType: string;
	phoneNumber: string;
	email: string;
	password: string;
	repeatPassword: string;
	address: string;
	ubigeo: string;
	isTerm: boolean;
	isClub: boolean;
}

interface ContactFormProps {
	submitSignUp: (values: ContactValues) => Promise<void>;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
	openDataAnalitycs: () => void;
	isGuest: boolean;
}

const initialValues = {
	identification: '',
	identificationType: '',
	phoneNumber: '',
	email: '',
	password: '',
	repeatPassword: '',
	address: '',
	ubigeo: '',
	isTerm: false,
	isClub: false,
};

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '752px',
		},
	},
	fieldTermWrapper: {
		paddingBottom: '22px',
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
	termsConditions: {
		marginLeft: '30px',
		fontSize: '0.85rem',
		fontWeight: '500',
		color: '#FE6B6F',
	},
	subTitle: {
		marginBottom: '40px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '16px',
		paddingBottom: '8px',
		color: palette.secondary.light,
		lineHeight: '20px',
		borderBottom: '1px solid #B0CEFE',
		[breakpoints.up('lg')]: {
			paddingBottom: '16px',
			fontSize: '20px',
		},
	},
	title: {
		marginBottom: '40px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '16px',
		paddingBottom: '8px',
		color: palette.primary.main,
		lineHeight: '20px',
		borderBottom: '1px solid #B0CEFE',
		[breakpoints.up('lg')]: {
			paddingBottom: '16px',
			fontSize: '20px',
		},
	},
}));

const ContactForm = ({
	submitSignUp,
	openPrivacyPolicy,
	openTermsAndConditions,
	openDataAnalitycs,
	isGuest,
}: ContactFormProps) => {
	const { t } = useTranslation('signUp');
	const { isUbigeoEnabled } = useContext(AppContext);
	const [ubigeos, setUbigeos] = useState<string[]>([]);
	const classes = useStyles(initialValues.isTerm);
	const contactKey = isGuest ? 'toSomeoneElse' : 'toYou';

	const onSubmit = useCallback(
		async (values: ContactValues, { setSubmitting, setFieldError }: FormikHelpers<FormikContactValues>) => {
			try {
				const formatedValues = {
					...values,
					identification: values.identification.trim(),
					identificationType: values.identificationType,
					email: values.email?.trim(),
				};
				await submitSignUp(formatedValues);
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

	const [isChecked, setChecked] = useState(false);
	const handleChange = (event: any) => {
		setChecked(event.target.checked);
	};

	const handleTypeUbigeo = async (e: any) => {
		const value = e.target.value;
		if (value) {
			const response = await getLocations(value);
			const locations = response.data.map((r: Ubigeo) => r.description);
			setUbigeos(locations);
		} else {
			setUbigeos([]);
		}
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={isGuest ? guestValidationSchema : newUservalidationSchema}
		>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form}>
					{/*<div>
						{isUbigeoEnabled && (
							<>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										className={classes.fieldWithHelperText}
										name="address"
										label={t('contact.fields.address.label')}
										variant="outlined"
										helperText={t('contact.fields.address.helperText')}
										fullWidth
									/>
								</div>
								<div className={classes.fieldWrapper}>
									<Field
										component={Autocomplete}
										options={ubigeos}
										getOptionLabel={(option: string) => option}
										className={classes.fieldWithHelperText}
										name="ubigeo"
										variant="outlined"
										fullWidth
										renderInput={(params: AutocompleteRenderInputParams) => (
											<MaterialTextField
												{...params}
												error={false}
												helperText={t('contact.fields.address.helperText')}
												label={t('contact.fields.ubigeo.label')}
												variant="outlined"
												onChange={handleTypeUbigeo}
											/>
										)}
									/>
								</div>
							</>
						)}
						<div className={classes.fieldWrapper}>
							<FormControlLabel
								control={
									<>
										<Field
											component={Checkbox}
											type="checkbox"
											name="isTerm"
											color="primary"
											checked={isChecked}
											onClick={handleChange}
										/>
									</>
								}
								label={
									<>
										<Typography className={classes.legalInformation} component="span">
											{t('contact.legalInformation.firstSection1')}{' '}
										</Typography>
										<Typography
											className={classes.privacyPolicyLink}
											component="span"
											color="primary"
											onClick={openTermsAndConditions}
										>
											{t('contact.legalInformation.termsAndConditionsLink1')}{' '}
										</Typography>
										<Typography className={classes.legalInformation} component="span">
											{t('contact.legalInformation.secondSection1')}{' '}
										</Typography>
										<Typography
											className={classes.privacyPolicyLink}
											component="span"
											color="primary"
											onClick={openPrivacyPolicy}
										>
											{t('contact.legalInformation.privacyPolicyLink1')}{' '}
										</Typography>
									</>
								}
							/>
							<ErrorMessage className={classes.termsConditions} name="isTerm" component="p"></ErrorMessage>
						</div>
						<div className={classes.fieldWrapper}>
							<FormControlLabel
								control={<Field component={Checkbox} type="checkbox" name="isClub" color="primary" />}
								label={
									<>
										<Typography className={classes.legalInformation} component="span">
											{t('contact.legalInformation.firstSection2')}{' '}
										</Typography>
										<Typography
											className={classes.privacyPolicyLink}
											component="span"
											color="primary"
											onClick={openDataAnalitycs}
										>
											{t('contact.legalInformation.analysisData')}{' '}
										</Typography>
									</>
								}
							/>
						</div>
					</div>

					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting || isChecked === false}>
							{t('contact.submit.text')}
						</Button>
					</div>*/}
					<div>
						<Typography className={classes.title} color="primary">
							{t('contact.subTitle.id')}
						</Typography>
						<Grid container spacing={2}>
							<Grid item sm={6} xs={6}>
								<FormControl className={classes.fieldWrapper} fullWidth>
									<Field
										component={TextField}
										label={'Tipo de doc.'}
										name="identificationType"
										variant="outlined"
										select
									>
										<MenuItem value={'1'}>DNI</MenuItem>
										<MenuItem value={'2'}>CE</MenuItem>
									</Field>
								</FormControl>
							</Grid>
							<Grid item sm={6} xs={6}>
								<div className={classes.fieldWrapper}>
									<Field
										component={TextField}
										name="identification"
										label={t(`contact.fields.id.label.${contactKey}`)}
										variant="outlined"
										inputProps={{ maxLength: 12 }}
										fullWidth
									/>
								</div>
							</Grid>
						</Grid>
						<div>
							<Typography className={classes.subTitle} color="primary">
								{t('medicalData.fields.files.label.contacto')}
							</Typography>
							<Grid container spacing={2}>
								<Grid item sm={6} xs={6}>
									<div className={classes.fieldWrapper}>
										<Field
											component={TextField}
											className={classes.fieldWithHelperText}
											name="phoneNumber"
											type="tel"
											label={t(`contact.fields.phoneNumber.label.${contactKey}`)}
											variant="outlined"
											inputProps={{ maxLength: 9 }}
											fullWidth
										/>
									</div>
								</Grid>
								<Grid item sm={6} xs={6}>
									<div className={classes.fieldWrapper}>
										<Field
											component={TextField}
											className={classes.fieldWithHelperText}
											name="email"
											label={t(`contact.fields.email.label.${contactKey}`)}
											variant="outlined"
											fullWidth
										/>
									</div>
								</Grid>
							</Grid>
						</div>
						<div className={classes.fieldTermWrapper}>
							<FormControlLabel
								control={
									<>
										<Field
											component={Checkbox}
											type="checkbox"
											name="isTerm"
											color="primary"
											checked={isChecked}
											onClick={handleChange}
										/>
									</>
								}
								label={
									<>
										<Typography className={classes.legalInformation} component="span">
											{t('contact.legalInformation.firstSection2')}{' '}
										</Typography>
										<Typography
											className={classes.privacyPolicyLink}
											component="span"
											color="primary"
											onClick={openDataAnalitycs}
										>
											{t('contact.legalInformation.analysisData')}{' '}
										</Typography>
										<Typography className={classes.legalInformation} component="span">
											{t('contact.legalInformation.secondSection2')}{' '}
										</Typography>
									</>
								}
							/>
							<ErrorMessage className={classes.termsConditions} name="isTerm" component="p"></ErrorMessage>
						</div>
						<div className={classes.fieldWrapper}>
							<Typography className={classes.legalInformation} component="span">
								{t('contact.legalInformation.firstSection')}{' '}
							</Typography>
							<Typography
								className={classes.privacyPolicyLink}
								component="span"
								color="primary"
								onClick={openTermsAndConditions}
							>
								{t('contact.legalInformation.termsAndConditionsLink1')}{' '}
							</Typography>
							<Typography className={classes.legalInformation} component="span">
								{t('contact.legalInformation.secondSection1')}{' '}
							</Typography>
							<Typography
								className={classes.privacyPolicyLink}
								component="span"
								color="primary"
								onClick={openPrivacyPolicy}
							>
								{t('contact.legalInformation.privacyPolicyLink1')}{' '}
							</Typography>
						</div>
						<div className={classes.fieldWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting || isChecked === false}>
								{t('contact.submit.text')}
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactForm;
