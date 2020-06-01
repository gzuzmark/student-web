import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { PrivacyPolicyDialog } from 'pages/common';

import ContactForm, { ContactValues } from './ContactForm';

interface ContactProps {
	submitSignUp: (value: ContactValues) => void;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '21px 26px 0',
		[breakpoints.up('lg')]: {
			padding: '81px 0px 0px 108px',
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
			maxWidth: '502px',
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

const Contact = ({ submitSignUp }: ContactProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const openDialog = () => {
		setIsDialogOpen(true);
	};
	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('contact.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('contact.title')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('contact.subTitle')}
			</Typography>
			<ContactForm submitSignUp={submitSignUp} openPrivacyPolicy={openDialog} />
			<PrivacyPolicyDialog isOpen={isDialogOpen} closeDialog={closeDialog} />
		</div>
	);
};

export default Contact;
