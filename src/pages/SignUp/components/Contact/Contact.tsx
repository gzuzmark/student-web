import React from 'react';
import { Theme } from '@material-ui/core/styles';

import { redirectToURL } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';

import ContactForm, { ContactValues } from './ContactForm';

interface ContactProps {
	submitSignUp: (values: ContactValues) => Promise<void>;
	isGuest: boolean;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '16px 24px 0',
		width: '100%',
		[breakpoints.up('lg')]: {
			padding: '32px 64px',
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
			maxWidth: '472px',
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

const Contact = ({ submitSignUp, isGuest }: ContactProps) => {
	const classes = useStyles();
	const gotToPolicy = () => {
		redirectToURL(
			'https://docs.google.com/document/u/1/d/e/2PACX-1vQf6HE_Cj14iMCA6By3PPapUWZbp4dhtoi5n1BlpL5Nk58v_1Cl66sHA6gKx3yP0w/pub',
			true,
		);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL(
			'https://docs.google.com/document/u/2/d/e/2PACX-1vS3SBl2FrGqj_qWltyMkUOF1B3dNSHtvr7sbqGy6OJvuKQKGcIklLBvO4GIOev4YQ/pub',
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
			<ContactForm
				submitSignUp={submitSignUp}
				openPrivacyPolicy={gotToPolicy}
				openTermsAndConditions={gotToTermsAndConditions}
				openDataAnalitycs={gotToDataAnalitycs}
				isGuest={isGuest}
			/>
		</div>
	);
};

export default Contact;
