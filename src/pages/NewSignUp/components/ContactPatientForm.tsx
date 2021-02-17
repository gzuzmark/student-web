import React, { ReactElement, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField as MaterialTextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { getLocations, Ubigeo } from 'pages/api';
import { stylesWithTheme } from 'utils/createStyles';

import { contactPatientValidationSchema } from './validationSchema';
import { ContactPatientValues, ReducerAction } from '../types';
import { initialContactPatientValues } from '../constants';

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
export interface ContactPatientFormProps {
	contactPatient: ContactPatientValues;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
	openPrivacyPolicy: () => void;
	openTermsAndConditions: () => void;
}

const ContactPatientForm = ({
	contactPatient,
	onChangeStep,
	openPrivacyPolicy,
	openTermsAndConditions,
}: ContactPatientFormProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const [ubigeos, setUbigeos] = useState<string[]>([]);
	const onSubmit = useCallback(
		(values: ContactPatientValues) => {
			try {
				const formatedValues: ContactPatientValues = {
					...values,
					identification: values.identification.trim(),
					email: values.email.trim(),
					address: values.address.trim(),
					ubigeo: values.ubigeo.trim(),
				};

				onChangeStep({ type: 'COMPLETE_CONTACT_STEP', contactPatient: formatedValues }, '/creacion_cuenta/password');
			} catch (e) {
				console.error(e);
			}
		},
		[onChangeStep],
	);

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
			initialValues={contactPatient || initialContactPatientValues}
			onSubmit={onSubmit}
			validationSchema={contactPatientValidationSchema}
		>
			{({ submitForm, isSubmitting, setFieldValue, values }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="identification"
								label={t('contactPatient.fields.id.label')}
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
								label={t('contactPatient.fields.phoneNumber.label')}
								variant="outlined"
								helperText={t('contactPatient.fields.phoneNumber.helperText')}
								inputProps={{ maxLength: 9 }}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								className={classes.fieldWithHelperText}
								name="email"
								label={t('contactPatient.fields.email.label')}
								variant="outlined"
								helperText={t('contactPatient.fields.email.helperText')}
								fullWidth
							/>
						</div>

						<>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									className={classes.fieldWithHelperText}
									name="address"
									label={t('contactPatient.fields.address.label')}
									variant="outlined"
									helperText={t('contactPatient.fields.address.helperText')}
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
											helperText={t('contactPatient.fields.address.helperText')}
											label={t('contactPatient.fields.ubigeo.label')}
											variant="outlined"
											onChange={handleTypeUbigeo}
										/>
									)}
								/>
							</div>
						</>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography className={classes.legalInformation} component="span">
							{t('contactPatient.legalInformation.firstSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('contactPatient.legalInformation.privacyPolicyLink')}{' '}
						</Typography>
						<Typography className={classes.legalInformation} component="span">
							{t('contactPatient.legalInformation.secondSection')}{' '}
						</Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openTermsAndConditions}
						>
							{t('contactPatient.legalInformation.termsAndConditionsLink')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('contactPatient.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ContactPatientForm;
