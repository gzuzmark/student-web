import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { redirectToURL } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';

import ContactForm, { ContactValues } from './ContactForm';

interface ContactProps {
	submitSignUp: (values: ContactValues) => Promise<void>;
	isGuest: boolean;
}

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
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const gotToPolicy = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('contact.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('contact.title.firstLine')}{' '}
				</Typography>
				<Typography className={classes.boldText} variant="h2" component="span">
					{t('contact.title.secondLine')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('contact.subTitle')}
			</Typography>
			<ContactForm
				submitSignUp={submitSignUp}
				openPrivacyPolicy={gotToPolicy}
				openTermsAndConditions={gotToTermsAndConditions}
				isGuest={isGuest}
			/>
		</div>
	);
};

export default Contact;
