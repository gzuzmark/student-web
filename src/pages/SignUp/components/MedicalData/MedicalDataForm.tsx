import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { stylesWithTheme } from 'utils/createStyles';
import { OptionsGroup, Option } from 'pages/common';

import validationSchema from './validationSchema';

export interface MedicalDataValues {
	takeMedicines: boolean | null;
	medicineList: string;
	haveAllergies: boolean | null;
	allergies: string;
	moreInfo: string;
}

interface MedicalDataFormProps {
	onChangeStep: (values: MedicalDataValues) => void;
	openPrivacyPolicy: () => void;
}

const initialValues = {
	takeMedicines: null,
	medicineList: '',
	haveAllergies: null,
	allergies: '',
	moreInfo: '',
};

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	fieldWrapper: {
		paddingBottom: '37px',
		'&:nth-child(4)': {
			paddingBottom: '20px',
		},
		'&:last-child': {
			paddingBottom: '20px',
		},
		'& .MuiInputBase-root.Mui-disabled': {
			backgroundColor: 'transparent',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '43px',
			},
		},
	},
	fieldLabelWrapper: {
		paddingBottom: '8px',
	},
	optionalField: {
		[breakpoints.up('lg')]: {
			marginRight: '-2px',
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
	italicLabel: {
		fontStyle: 'italic',
	},
}));

const MedicalDataForm = ({ onChangeStep, openPrivacyPolicy }: MedicalDataFormProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const onSubmit = useCallback(
		(values: MedicalDataValues, { setSubmitting }: { setSubmitting: Function }) => {
			onChangeStep(values);
			setSubmitting(false);
		},
		[onChangeStep],
	);

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, values }) => (
				<Form className={classes.form}>
					<div>
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.moreInfo.label')}</FormLabel>
							</div>
							<Field component={OptionsGroup} name="takeMedicines" fullWidth>
								<Option value={true}>{t('medicalData.fields.yesOption')}</Option>
								<Option value={false}>{t('medicalData.fields.noOption')}</Option>
							</Field>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="medicineList"
								label={t('medicalData.fields.medicineList.label')}
								variant="outlined"
								disabled={!values.takeMedicines}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.haveAllergies.label')}</FormLabel>
							</div>
							<Field component={OptionsGroup} name="haveAllergies" fullWidth>
								<Option value={true}>{t('medicalData.fields.yesOption')}</Option>
								<Option value={false}>{t('medicalData.fields.noOption')}</Option>
							</Field>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={TextField}
								name="allergies"
								label={t('medicalData.fields.allergies.label')}
								variant="outlined"
								disabled={!values.haveAllergies}
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<div className={clsx(classes.fieldLabelWrapper, classes.optionalField)}>
								<FormLabel>
									{t('medicalData.fields.moreInfo.label')}{' '}
									{matches ? (
										<Typography component="span" className={classes.italicLabel}>
											{t('medicalData.fields.optional.label')}
										</Typography>
									) : null}
								</FormLabel>
							</div>
							<Field component={TextField} name="moreInfo" variant="outlined" fullWidth />
						</div>
					</div>
					<div className={classes.privacyPolicyWrapper}>
						<Typography component="span">{t('medicalData.privacyPolicy.firstSection')} </Typography>
						<Typography
							className={classes.privacyPolicyLink}
							component="span"
							color="primary"
							onClick={openPrivacyPolicy}
						>
							{t('medicalData.privacyPolicy.secondSection')}
						</Typography>
					</div>
					<div className={classes.fieldWrapper}>
						<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
							{t('medicalData.submit.text')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default MedicalDataForm;
