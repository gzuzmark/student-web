import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme } from 'utils';

import useSharedStyles from '../sharedStyles';
import validationSchema from './validationSchema';
import { FormLabel } from '@material-ui/core';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		paddingTop: '28px',
	},
	form: {
		[breakpoints.up('lg')]: {
			width: '402px',
		},
	},
	inputDocumentWrapper: {
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			paddingBottom: '35px',
		},
	},
	inputDocumentLabelWrapper: {
		paddingBottom: '7px',
	},
}));

interface ValidateDocumentStepProps {
	goToNextStep: () => void;
}

interface FormValues {
	documentValue: string;
}

const ValidateDocumentStep = ({ goToNextStep }: ValidateDocumentStepProps) => {
	const sharedClasses = useSharedStyles();
	const classes = useStyles();
	const { t } = useTranslation('forgotPassword');
	const validateDocument = useCallback(
		async ({ documentValue }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
			console.log(documentValue);
			// api call
			setSubmitting(false);
			goToNextStep();
		},
		[goToNextStep],
	);

	return (
		<div className={classes.wrapper}>
			<Typography className={sharedClasses.title}>{t('forgotPassword.validateDocument.title')}</Typography>
			<Typography className={sharedClasses.subTitle}>{t('forgotPassword.validateDocument.subTitle')}</Typography>
			<Formik onSubmit={validateDocument} initialValues={{ documentValue: '' }} validationSchema={validationSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div className={classes.inputDocumentWrapper}>
							<div className={classes.inputDocumentLabelWrapper}>
								<FormLabel>{t('forgotPassword.validateDocument.idLabel')}</FormLabel>
							</div>
							<Field
								component={TextField}
								name="documentValue"
								type="tel"
								variant="outlined"
								inputProps={{ maxLength: 12 }}
								disabled={isSubmitting}
								fullWidth
							/>
						</div>
						<Button variant="contained" disabled={isSubmitting} onClick={submitForm} fullWidth>
							{t('forgotPassword.validateDocument.nextButton')}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ValidateDocumentStep;
