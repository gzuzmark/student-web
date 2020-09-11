import React, { useCallback, MouseEvent } from 'react';
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
	fields: {
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
	actionsWrapper: {
		[breakpoints.up('lg')]: {
			display: 'flex',
		},
	},
	action: {
		marginBottom: '16px',
		padding: '12.5px 0',
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			width: '263px',
			marginBottom: '0px',
			marginRight: '10px',
		},
		'&:last-child': {
			marginBottom: '0',
			[breakpoints.up('lg')]: {
				marginRight: '0px',
			},
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

interface CreatePasswordFormProps {
	userId?: string;
	omitStepCallback?: (e: MouseEvent) => void;
}

const CreatePasswordForm = ({ userId, omitStepCallback }: CreatePasswordFormProps) => {
	const { t } = useTranslation('global');
	const classes = useStyles();
	const onSubmit = useCallback(
		async (values: CreatePasswordValues, { setSubmitting }: FormikHelpers<FormikCreatePasswordValues>) => {
			try {
				await sendPassword({ userId, password: values.password });

				setSubmitting(false);
			} catch (e) {}
		},
		[userId],
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
					<Form>
						<div className={classes.fields}>
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
						</div>
						<div className={classes.actionsWrapper}>
							<Button
								className={classes.action}
								variant="contained"
								fullWidth
								onClick={submitForm}
								disabled={isSubmitting}
							>
								{t('createPassword.fields.submitLabel')}
							</Button>
							{omitStepCallback ? (
								<Button
									className={classes.action}
									variant="contained"
									fullWidth
									onClick={omitStepCallback}
									disabled={isSubmitting}
								>
									{t('createPassword.fields.omitLabel')}
								</Button>
							) : null}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreatePasswordForm;
