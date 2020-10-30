import React, { ReactElement, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';

import { contactInfoSchema } from './validationSchema';

export interface ContactInfoData {
	phoneNumber: string;
	email: string;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	mobileSubtitle: {
		paddingBottom: '17px',
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	boldText: {
		fontWeight: 'bold',
	},
	titleWrapper: {
		paddingBottom: '44px',
		[breakpoints.up('lg')]: {
			paddingBottom: '25px',
		},
	},
	subTitle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '51px',
		},
	},
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
}));

export interface ContactInfoProps {
	isMinor: boolean;
	callbackAction: (data: ContactInfoData) => void;
	defaultValues: ContactInfoData;
}

const ContactInfo = ({ isMinor, callbackAction, defaultValues }: ContactInfoProps): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('familyMembers');
	const onSubmit = useCallback(
		(data: ContactInfoData) => {
			callbackAction({ ...data, email: data.email.trim() });
		},
		[callbackAction],
	);

	return (
		<div>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('contactInfo.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t(isMinor ? 'contactInfo.title.firstSection.minor' : 'contactInfo.title.firstSection.default')}{' '}
				</Typography>
				<Typography variant="h2" className={classes.boldText} component="span">
					{t(isMinor ? 'contactInfo.title.secondSection.minor' : 'contactInfo.title.secondSection.default')}{' '}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('contactInfo.subTitle')}
			</Typography>
			<Formik initialValues={defaultValues} onSubmit={onSubmit} validationSchema={contactInfoSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="email"
									label={t('contact.fields.email.label')}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="phoneNumber"
									type="tel"
									label={t('contact.fields.phoneNumber.label')}
									variant="outlined"
									inputProps={{ maxLength: 9 }}
									fullWidth
								/>
							</div>
						</div>
						<div className={classes.fieldWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('contact.submit.text')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ContactInfo;
