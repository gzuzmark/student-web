import React, { useCallback } from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { parseUTCDate, dateToUTCUnixTimestamp } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';
import { OptionsGroup, Option, DatePickerField } from 'pages/common';
import { User } from 'AppContext';
import { updateProfile } from 'pages/api';

import validationSchema from './validationSchema';

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '403px',
		},
	},
	fieldWrapper: {
		textAlign: 'left',
		paddingBottom: '37px',
		'&.with-less-padding': {
			paddingBottom: '15px',
		},
		'&:last-child': {
			paddingBottom: '25px',
		},
		'& .MuiInputBase-root.Mui-disabled': {
			backgroundColor: 'transparent',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '25px',
			},
		},
	},
	optionButton: {
		textTransform: 'none',
		padding: '12.5px',
		'&.MuiButton-contained': {
			padding: '13.5px',
			[breakpoints.up('lg')]: {
				padding: '17.5px',
			},
		},
		[breakpoints.up('lg')]: {
			padding: '16.5px',
		},
	},
	fieldLabelWrapper: {
		paddingBottom: '8px',
	},
	optionalFieldLabel: {
		[breakpoints.up('lg')]: {
			marginRight: '-2px',
		},
	},
	moreInformationLabel: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
	},
	actionButtons: {
		display: 'flex',
		justifyContent: 'space-between',
		[breakpoints.up('lg')]: {
			justifyContent: 'flex-start',
		},
	},
	saveAction: {
		width: '145px',
		padding: '11px 0',
		[breakpoints.up('lg')]: {
			padding: '8px 0',
			marginRight: '25px',
		},
	},
	cancelAction: {
		width: '145px',
		textTransform: 'none',
	},
}));

interface EditFamilyMemberFormProps {
	user: User;
	cancelAction: () => void;
}

interface UpdateUser extends Omit<User, 'birthDate'> {
	birthDate: Date | null;
}

const EditFamilyMemberForm = ({ user, cancelAction }: EditFamilyMemberFormProps) => {
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const { t } = useTranslation('signUp');
	const { t: tFamily } = useTranslation('familyMembers');
	const onSubmitCallback = useCallback(
		async (values: UpdateUser, { setSubmitting }: FormikHelpers<UpdateUser>) => {
			try {
				if (values.birthDate) {
					await updateProfile({ ...values, birthDate: dateToUTCUnixTimestamp(values.birthDate) });
					setSubmitting(false);
					cancelAction();
				}
			} catch (e) {
				setSubmitting(false);
			}
		},
		[cancelAction],
	);
	const initialValues: UpdateUser = { ...user, birthDate: parseUTCDate(user.birthDate || 1594789593) };

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitCallback} validationSchema={validationSchema}>
			{({ submitForm, isSubmitting, values }) => (
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
						<FormControl className={clsx(classes.fieldWrapper, 'with-less-padding')} fullWidth>
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
						<div className={classes.fieldWrapper}>
							<div className={classes.fieldLabelWrapper}>
								<FormLabel>{t('medicalData.fields.takeMedicines.label')}</FormLabel>
							</div>
							<Field component={OptionsGroup} name="takeMedicines" fullWidth>
								<Option className={classes.optionButton} value={true}>
									{t('medicalData.fields.yesOption')}
								</Option>
								<Option className={classes.optionButton} value={false}>
									{t('medicalData.fields.noOption')}
								</Option>
							</Field>
						</div>
						<div className={clsx(classes.fieldWrapper, 'with-less-padding')}>
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
								<Option className={classes.optionButton} value={true}>
									{t('medicalData.fields.yesOption')}
								</Option>
								<Option className={classes.optionButton} value={false}>
									{t('medicalData.fields.noOption')}
								</Option>
							</Field>
						</div>
						<div className={clsx(classes.fieldWrapper, 'with-less-padding')}>
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
					</div>
					<div className={classes.actionButtons}>
						<Button
							className={classes.saveAction}
							variant="contained"
							fullWidth
							onClick={submitForm}
							disabled={isSubmitting}
						>
							{tFamily('familyMembers.editProfile.complete')}
						</Button>
						<Button
							className={classes.cancelAction}
							variant="outlined"
							fullWidth
							onClick={cancelAction}
							disabled={isSubmitting}
						>
							{tFamily('familyMembers.editProfile.cancel')}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default EditFamilyMemberForm;
