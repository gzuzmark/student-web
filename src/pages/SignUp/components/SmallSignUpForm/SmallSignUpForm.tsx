import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
import { Theme } from '@material-ui/core/styles';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { DatePickerField } from 'pages/common';
import { redirectToURL } from 'utils';

import validationSchema from './validationSchema';

export interface SmallSignUpFormValues {
	name: string;
	lastName: string;
	birthDate: Date | null;
	identification: string;
	phoneNumber: string;
	email: string;
}

const useStyles = stylesWithTheme(({ breakpoints, palette }: Theme) => ({
	wrapper: {
		padding: '21px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '72px 0px 0px 0px',
		},
	},
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
	fieldWithHelperText: {
		'& .MuiFormHelperText-root': {
			color: palette.info.main,
		},
		'& .MuiFormHelperText-root.Mui-error': {
			color: palette.error.main,
		},
	},
	privacyPolicyWrapper: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '22px',
		},
	},
	legalInformation: {
		fontSize: '13px',
		color: palette.info.main,
	},
	privacyPolicyLink: {
		fontSize: '13px',
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}));

const initialValues: SmallSignUpFormValues = {
	name: '',
	lastName: '',
	birthDate: null,
	identification: '',
	phoneNumber: '',
	email: '',
};

interface SmallSignUpFormProps {
	onSubmit: (values: SmallSignUpFormValues, formikHelpers: FormikHelpers<SmallSignUpFormValues>) => void;
	validateAgeAfterSelecting: (date: Date | null) => void;
}

const SmallSignUpForm = ({ onSubmit, validateAgeAfterSelecting }: SmallSignUpFormProps): ReactElement | null => {
	const classes = useStyles();
	const { t } = useTranslation('signUp');
	const openPrivacyPolicy = () => {
		redirectToURL('https://drive.google.com/open?id=1RjgoOp4wR2zCUtktj0d_PqhT9FC7TGyR', true);
	};
	const openTermsAndConditions = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('aboutme.subTitle.forSomeoneElse')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('aboutme.title.firstSection')}{' '}
				</Typography>
				<Typography variant="h2" className={classes.boldText} component="span">
					{t('aboutme.title.secondSection')}{' '}
				</Typography>
				<Typography variant="h2" component="span">
					{t('aboutme.title.thirdSection')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('aboutme.subTitle.forSomeoneElse')}
			</Typography>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({ submitForm, isSubmitting }) => (
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
									label={t('smallSignUp.lastName.label')}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={DatePickerField}
									validationOnChange={validateAgeAfterSelecting}
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
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									name="identification"
									label={t('aboutme.fields.document.label.minor')}
									variant="outlined"
									inputProps={{ maxLength: 11 }}
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									className={classes.fieldWithHelperText}
									name="phoneNumber"
									type="tel"
									label={t('contact.fields.phoneNumber.label.toSomeoneElse')}
									variant="outlined"
									helperText={t('contact.fields.phoneNumber.helperText.toSomeoneElse')}
									inputProps={{ maxLength: 9 }}
									fullWidth
								/>
							</div>
							<div className={classes.fieldWrapper}>
								<Field
									component={TextField}
									className={classes.fieldWithHelperText}
									name="email"
									label={t('contact.fields.email.label.toSomeoneElse')}
									variant="outlined"
									helperText={t('contact.fields.email.helperText')}
									fullWidth
								/>
							</div>
						</div>
						<div className={classes.privacyPolicyWrapper}>
							<Typography className={classes.legalInformation} component="span">
								{t('contact.legalInformation.firstSection')}{' '}
							</Typography>
							<Typography
								className={classes.privacyPolicyLink}
								component="span"
								color="primary"
								onClick={openPrivacyPolicy}
							>
								{t('contact.legalInformation.privacyPolicyLink')}{' '}
							</Typography>
							<Typography className={classes.legalInformation} component="span">
								{t('contact.legalInformation.secondSection')}{' '}
							</Typography>
							<Typography
								className={classes.privacyPolicyLink}
								component="span"
								color="primary"
								onClick={openTermsAndConditions}
							>
								{t('contact.legalInformation.termsAndConditionsLink')}
							</Typography>
						</div>
						<div className={classes.fieldWrapper}>
							<Button variant="contained" fullWidth onClick={submitForm} disabled={isSubmitting}>
								{t('smallSignUp.submit.text')}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SmallSignUpForm;
