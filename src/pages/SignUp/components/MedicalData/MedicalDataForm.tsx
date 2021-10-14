import React, { useCallback, useLayoutEffect, useRef, useContext } from 'react';
import AppContext from 'AppContext';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import animateScrollTo from 'animated-scroll-to';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils/createStyles';
import { OptionsGroup, Option, FilesGroupField } from 'pages/common';

import validationSchema from './validationSchema';
import ActionAfterError from './ActionAfterError';
import { Grid } from '@material-ui/core';

export interface MedicalDataValues {
	takeMedicines: boolean | null;
	medicineList: string;
	allergies: string;
	symptom: string;
	moreInfo: string;
	phoneNumber: string;
	email?: string;
	consultReason: string;
	files?: string[];
	isDermatology: boolean | null;
}

interface MedicalDataFormProps {
	onChangeStep: (values: MedicalDataValues) => void;
	openPrivacyPolicy: () => void;
	medicalData: MedicalDataValues | undefined;
	//---------------------------
	openIndicacionesModal: () => void;
	isGuest: boolean;
}

const initialValues = {
	takeMedicines: null,
	medicineList: '',
	allergies: '',
	phoneNumber: '',
	email: '',
	symptom: '',
	moreInfo: '',
	consultReason: '',
	files: [],
	isDermatology: false,
};

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '752px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:last-child': {
			paddingBottom: '20px',
		},
		'& .MuiInputBase-root.Mui-disabled': {
			backgroundColor: 'transparent',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '24px',
			'&:last-child': {
				paddingBottom: '33px',
			},
		},
	},
	optionButton: {
		textTransform: 'none',
		padding: '14px',
		minWidth: '112px',
		'&.MuiButton-contained': {
			padding: '13.5px',
			[breakpoints.up('lg')]: {
				padding: '17px',
			},
		},
		[breakpoints.up('lg')]: {
			maxHeight: '48px',
		},
	},
	fieldLabelWrapper: {
		paddingBottom: '10px',
	},
	labelYesNo: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '24px',
		[breakpoints.up('lg')]: {
			paddingBottom: '41px',
		},
	},
	fieldClickable: {
		cursor: 'pointer',
	},
	optionalFieldLabel: {
		[breakpoints.up('lg')]: {
			marginRight: '-5px',
		},
	},
	moreInformationLabel: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '22px',
			textAlign: 'center',
		},
	},
	privacyPolicyLink: {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
	italicLabel: {
		fontStyle: 'italic',
	},
	subTitle: {
		marginBottom: '32px',
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
}));

function especialidad(speciality = '') {
	if (speciality === 'Dermatología') {
		return 'Adjunta al menos dos fotos del problema en piel, una a 10 cm y otra a 30 cm de distancia. (Obligatorio)';
	} else {
		return 'Adjunta fotos, resultados de laboratorio, rayos X, ecografías, etc.';
	}
}

function mejorefotos(speciality = '') {
	if (speciality === 'Dermatología') {
		return 'Mejores fotos para un diagnóstico más preciso.';
	} else {
		return '';
	}
}

function indicaciones(speciality = '') {
	if (speciality === 'Dermatología') {
		return 'Indicaciones';
	} else {
		return '';
	}
}

const MedicalDataForm = ({
	onChangeStep,
	openPrivacyPolicy,
	medicalData,
	openIndicacionesModal,
	isGuest,
}: MedicalDataFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const consultReasonRef = useRef<Element | null>(null);
	const contactKey = isGuest ? 'toSomeoneElse' : 'toYou';
	const onSubmit = useCallback(
		(values: MedicalDataValues, { setSubmitting }: { setSubmitting: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);

	const onModal = useCallback(async () => {
		openIndicacionesModal();
	}, [openIndicacionesModal]);

	const onError = () => {
		if (consultReasonRef.current) {
			animateScrollTo(consultReasonRef.current, { verticalOffset: -50, speed: 750 });
		}
	};

	useLayoutEffect(() => {
		consultReasonRef.current = document.querySelector('.consult-reason-field');
	}, []);

	const { useCase } = useContext(AppContext);
	initialValues.isDermatology = useCase?.name === 'Dermatología';

	return (
		<Formik initialValues={medicalData || initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, values, submitCount, isValid }) => (
				<Form className={classes.form}>
					<ActionAfterError
						isSubmitting={isSubmitting}
						submitCount={submitCount}
						isValid={isValid}
						onSubmitError={onError}
					/>
					<div>
						<div className={clsx(classes.fieldWrapper, 'consult-reason-field')}>
							<div className={clsx(classes.fieldLabelWrapper, classes.optionalFieldLabel)}>
								<FormLabel>{t('medicalData.fields.consultReason.label')}</FormLabel>
							</div>
							<Field component={TextField} name="consultReason" variant="outlined" fullWidth />
						</div>
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.symptom.label')}</FormLabel>
							</div>
							<Field component={TextField} name="symptom" variant="outlined" fullWidth />
						</div>
						<Grid container spacing={2} className={classes.labelYesNo}>
							<Grid item sm>
								<FormLabel>{t('medicalData.fields.takeMedicines.label')}</FormLabel>
							</Grid>
							<Grid item sm={6} xs={12} md="auto">
								<Field component={OptionsGroup} name="takeMedicines" fullWidth>
									<Option className={classes.optionButton} value={true}>
										{t('medicalData.fields.yesOption')}
									</Option>
									<Option className={classes.optionButton} value={false}>
										{t('medicalData.fields.noOption')}
									</Option>
								</Field>
							</Grid>
						</Grid>
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.medicineList.label')}</FormLabel>
							</div>
							<Field
								component={TextField}
								name="medicineList"
								variant="outlined"
								disabled={!values.takeMedicines}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.photos.label')}</FormLabel>
							</div>
							<input name="isDermatology" value={String(useCase?.name === 'Dermatología')} type="hidden" />

							<Field
								component={FilesGroupField}
								inputId="files-input"
								name="files"
								//labelText ={t('medicalData.dropzone.label')}
								labelText={especialidad(useCase?.name)}
							/>

							<Typography component="span">{mejorefotos(useCase?.name)} </Typography>

							<Typography className={classes.privacyPolicyLink} component="span" color="primary" onClick={onModal}>
								{indicaciones(useCase?.name)}
							</Typography>
						</div>
						<div className={classes.fieldWrapper}>
							<div className={clsx(classes.fieldLabelWrapper, classes.optionalFieldLabel)}>
								<FormLabel>
									{t('medicalData.fields.moreInfo.label')}{' '}
									{matches ? (
										<Typography component="span" className={classes.italicLabel}>
											{t('medicalData.fields.optional.label')}
										</Typography>
									) : null}
								</FormLabel>
							</div>
							<Field
								component={TextField}
								className={classes.moreInformationLabel}
								name="moreInfo"
								variant="outlined"
								helperText={t('medicalData.fields.moreInfo.helperText')}
								fullWidth
							/>
						</div>
						<div>
							<Typography className={classes.subTitle} color="primary">
								{t('medicalData.fields.files.label.contacto')}
							</Typography>
							<Grid container spacing={1}>
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
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('medicalData.submit.text')}
						</Button>
					</div>
					{/* <div className={classes.privacyPolicyWrapper}>
						<Typography component="span">{t('medicalData.privacyPolicy.firstSection')} </Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('medicalData.privacyPolicy.secondSection')}
						</Typography>
					</div> */}
				</Form>
			)}
		</Formik>
	);
};

export default MedicalDataForm;
