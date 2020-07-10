import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

import validationSchema from './validationSchema';

const initialValues = {
	familyRelationship: '',
};

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	title: {
		fontSize: '15px',
		lineHeight: '20px',
		padding: '0 0 18px',
		textAlign: 'left',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '35px',
			padding: '0 0 28px',
		},
	},
	form: {
		paddingBottom: '28px',
		[breakpoints.up('lg')]: {
			paddingBottom: '18px',
			width: '403px',
		},
	},
	fieldWrapper: {
		textAlign: 'left',
		marginBottom: '17px',
		[breakpoints.up('lg')]: {
			marginBottom: '28px',
		},
	},
	label: {
		paddingBottom: '4px',
		[breakpoints.up('lg')]: {
			paddingBottom: '8px',
		},
	},
	submitWrapper: {
		[breakpoints.up('lg')]: {
			paddingRight: '103px',
		},
	},
	disclosureWrapper: {
		textAlign: 'left',
		width: '286px',
		[breakpoints.up('lg')]: {
			width: '547px',
		},
	},
	disclosureText: {
		color: palette.info.main,
	},
}));

interface NewMinorProfileValues {
	familyRelationship: string;
}

interface NewMinorProfileProps {
	onSubmit: (familyRelationship: string) => void;
}

const NewMinorProfile = ({ onSubmit }: NewMinorProfileProps) => {
	const classes = useStyles();
	const { t } = useTranslation('createProfile');
	const onSubmitCallback = useCallback(
		(values: NewMinorProfileValues, { setSubmitting }: FormikHelpers<NewMinorProfileValues>) => {
			setSubmitting(false);
			onSubmit(values.familyRelationship);
		},
		[onSubmit],
	);

	return (
		<>
			<Typography className={classes.title}>{t('createProfile.relationshipToTheMinor.title')}</Typography>
			<Formik initialValues={initialValues} onSubmit={onSubmitCallback} validationSchema={validationSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<FormControl className={classes.fieldWrapper} fullWidth>
							<FormLabel className={classes.label}>{t('createProfile.relationshipToTheMinor.label')}</FormLabel>
							<Field component={TextField} name="familyRelationship" variant="outlined" select>
								<MenuItem value={0}>{t('createProfile.relationshipToTheMinor.fatherOption')}</MenuItem>
								<MenuItem value={1}>{t('createProfile.relationshipToTheMinor.motherOption')}</MenuItem>
								<MenuItem value={2}>{t('createProfile.relationshipToTheMinor.siblingOption')}</MenuItem>
								<MenuItem value={3}>{t('createProfile.relationshipToTheMinor.uncleOption')}</MenuItem>
								<MenuItem value={4}>{t('createProfile.relationshipToTheMinor.granpaOption')}</MenuItem>
							</Field>
						</FormControl>
						<div className={classes.submitWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('createProfile.relationshipToTheMinor.continue')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
			<div className={classes.disclosureWrapper}>
				<Typography component="span" className={classes.disclosureText}>
					{t('createProfile.relationshipToTheMinor.disclosure.firstPart')}{' '}
				</Typography>
				<Typography component="span" color="primary">
					{t('createProfile.relationshipToTheMinor.disclosure.secondPart')}{' '}
				</Typography>
				<Typography component="span" className={classes.disclosureText}>
					{t('createProfile.relationshipToTheMinor.disclosure.thridPart')}
				</Typography>
			</div>
		</>
	);
};

export default NewMinorProfile;
