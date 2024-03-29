import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { redirectToURL } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';

import ContactPatientForm, { ContactPatientValues } from './ContactPatientForm';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '21px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '81px 0px 0px 0px',
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
			paddingBottom: '35px',
			maxWidth: '582px',
		},
	},
	subTitle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
			paddingBottom: '51px',
		},
	},
}));

export interface ContactPatientProps {
	contactData: ContactPatientValues | undefined;
	onChangeStep: (values: ContactPatientValues, onError?: Function) => void;
}

const ContactPatient = ({ contactData, onChangeStep }: ContactPatientProps): ReactElement => {
	const { t } = useTranslation('clinicalExamination');
	const classes = useStyles();

	const gotToPolicy = () => {
		redirectToURL(
			'https://docs.google.com/document/u/1/d/e/2PACX-1vQf6HE_Cj14iMCA6By3PPapUWZbp4dhtoi5n1BlpL5Nk58v_1Cl66sHA6gKx3yP0w/pub',
			true,
		);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL(
			'https://docs.google.com/document/d/e/2PACX-1vQBjhj6QCJ0ywkZ1o9IROUIfz5haZ6oSBWz4p3G533it-1wf8e-TRZguMHhTpq3wA/pub',
			true,
		);
	};
	const gotToDataAnalitycs = () => {
		redirectToURL(
			'https://docs.google.com/document/d/e/2PACX-1vSJapxUoM7Uqusf9D8VXyiWg6N5FSF1f5yg0lwt_6l-9FmsP_gdiiEnpftNqhrvmQ/pub',
			true,
		);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('contactPatient.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('contactPatient.subTitle')}{' '}
				</Typography>
			</div>
			<ContactPatientForm
				contactData={contactData}
				onChangeStep={onChangeStep}
				// submitContactPatient={submitContactPatient}
				openPrivacyPolicy={gotToPolicy}
				openTermsAndConditions={gotToTermsAndConditions}
				openDataAnalitycs={gotToDataAnalitycs}
			/>
		</div>
	);
};

export default ContactPatient;
