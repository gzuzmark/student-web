import React, { ReactElement, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { DatePickerField } from 'pages/common';

import { aboutNewProfileSchema } from './validationSchema';
import { redirectToURL } from 'utils';

export interface AboutNewProfileData {
	name: string;
	lastName: string;
	secondSurname: string;
	identification: string;
	birthDate: Date | null;
	gender: number | undefined;
}

export interface AboutNewProfileProps {
	submitCallback: (data: AboutNewProfileData) => void;
	validateAfterDateSelected?: (date: Date | null) => void;
}

const initialValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
	identification: '',
};

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
			paddingBottom: '20px',
		},
		[breakpoints.up('lg')]: {
			paddingBottom: '48px',
			'&:last-child': {
				paddingBottom: '43px',
			},
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
}));

const AboutNewProfile = ({ submitCallback, validateAfterDateSelected }: AboutNewProfileProps): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('familyMembers');
	const onSubmit = useCallback(
		(data: AboutNewProfileData) => {
			submitCallback(data);
		},
		[submitCallback],
	);
	const openPrivacyPolicy = () => {
		redirectToURL(
			'https://docs.google.com/document/u/2/d/e/2PACX-1vS3SBl2FrGqj_qWltyMkUOF1B3dNSHtvr7sbqGy6OJvuKQKGcIklLBvO4GIOev4YQ/pub',
			true,
		);
	};

	return (
		<div>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('aboutNewProfile.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('aboutNewProfile.title.firstSection')}{' '}
				</Typography>
				<Typography variant="h2" className={classes.boldText} component="span">
					{t('aboutNewProfile.title.secondSection')}{' '}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t(`aboutNewProfile.subTitle`)}
			</Typography>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={aboutNewProfileSchema}>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form}>
						<div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="name"
									label={t('aboutNewProfile.fields.name.label')}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="lastName"
									label={t('aboutNewProfile.fields.lastName.label')}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="secondSurname"
									label={t('aboutNewProfile.fields.secondSurname.label')}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="identification"
									label={t('aboutNewProfile.fields.document.label.minor')}
									variant="outlined"
									inputProps={{ maxLength: 11 }}
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={DatePickerField}
									name="birthDate"
									validationOnChange={validateAfterDateSelected}
									TextFieldProps={{
										label: t('aboutNewProfile.fields.birthDate.label'),
										variant: 'outlined',
										helperText: '',
										fullWidth: true,
										placeholder: 'DD/MM/YYYY',
									}}
								/>
							</div>
							<FormControl className={classes.fieldWrapper} fullWidth>
								<Field
									component={TextField}
									label={t('aboutNewProfile.fields.gender.label')}
									name="gender"
									variant="outlined"
									select
								>
									<MenuItem value={0}>Masculino</MenuItem>
									<MenuItem value={1}>Femenino</MenuItem>
								</Field>
							</FormControl>
						</div>
						<div className={classes.privacyPolicyWrapper}>
							<Typography component="span">{t('aboutNewProfile.privacyPolicy.firstSection')} </Typography>
							<Typography
								className={classes.privacyPolicyLink}
								component="span"
								color="primary"
								onClick={openPrivacyPolicy}
							>
								{t('aboutNewProfile.privacyPolicy.secondSection')}
							</Typography>
						</div>
						<div className={classes.fieldWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('aboutNewProfile.submit.text')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AboutNewProfile;
