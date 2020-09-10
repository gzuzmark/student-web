import React, { useCallback } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import { PasswordField } from 'pages/common';
import { sendPassword } from 'pages/api';
import { stylesWithTheme } from 'utils/createStyles';
import { ReactComponent as Ellipse } from 'icons/ellipse.svg';

import validationSchema from './validationSchema';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	title: {
		textTransform: 'none',
		paddingBottom: '16px',
	},
	benefits: {
		padding: '0 0 44px 0',
		[breakpoints.up('lg')]: {
			padding: '0 0 54px 0',
		},
	},
	benefit: {
		padding: '0 0 16px 0',
		'&:last-child': {
			padding: '0',
		},
	},
	benefitIcon: {
		minWidth: '26px',
	},
	benefitText: {
		margin: '0',
	},
	form: {
		[breakpoints.up('lg')]: {
			maxWidth: '367px',
		},
	},
	fieldWrapper: {
		paddingBottom: '42px',
		'&:last-child': {
			paddingBottom: '33px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '33px',
			},
		},
	},
	submitWrapper: {
		[breakpoints.up('lg')]: {
			paddingRight: '104px',
		},
	},
}));

export interface CreatePasswordValues {
	password?: string;
	repeatPassword?: string;
}

interface FormikCreatePasswordValues {
	password: string;
	repeatPassword: string;
}

const CreatePasswordForm = () => {
	const { t } = useTranslation('global');
	const classes = useStyles();
	const onSubmit = useCallback(
		async (values: CreatePasswordValues, { setSubmitting }: FormikHelpers<FormikCreatePasswordValues>) => {
			try {
				await sendPassword(values);

				setSubmitting(false);
			} catch (e) {}
		},
		[],
	);
	const initialValues = {
		password: '',
		repeatPassword: '',
	};

	return (
		<div>
			<Typography className={classes.title} variant="button">
				{t('createPassword.title')}
			</Typography>
			<List className={classes.benefits}>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('createPassword.benefits.saveMedicHistory')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('createPassword.benefits.onlinePrescriptions')} />
				</ListItem>
				<ListItem className={classes.benefit}>
					<ListItemIcon className={classes.benefitIcon}>
						<Ellipse />
					</ListItemIcon>
					<ListItemText className={classes.benefitText} primary={t('createPassword.benefits.appointments')} />
				</ListItem>
			</List>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="password"
								label={t('createPassword.fields.password.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.fieldWrapper}>
							<Field
								component={PasswordField}
								name="repeatPassword"
								label={t('createPassword.fields.repeatPassword.label')}
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className={classes.submitWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('createPassword.fields.submitLabel')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreatePasswordForm;
