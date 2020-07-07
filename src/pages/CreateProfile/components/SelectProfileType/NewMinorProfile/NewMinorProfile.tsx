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

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
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
					<Form>
						<FormControl className={classes.fieldWrapper} fullWidth>
							<FormLabel>{t('createProfile.relationshipToTheMinor.label')}</FormLabel>
							<Field
								component={TextField}
								placeholder={t('createProfile.relationshipToTheMinor.placeholder')}
								name="familyRelationship"
								variant="outlined"
								select
							>
								<MenuItem value={0}>Masculino</MenuItem>
								<MenuItem value={1}>Femenino</MenuItem>
							</Field>
						</FormControl>
						<div className={classes.fieldWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('createProfile.relationshipToTheMinor.continue')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default NewMinorProfile;
