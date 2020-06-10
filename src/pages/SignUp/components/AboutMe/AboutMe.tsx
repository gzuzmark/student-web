import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { PrivacyPolicyDialog } from 'pages/common';
import { MYSELF, AppointmentOwner } from 'AppContext';

import AboutMeForm, { AboutMeValues } from './AboutMeForm';

interface AboutMeProps {
	submitSignUp: (value: AboutMeValues, setSubmitting: Function, setFieldError: Function) => void;
	appointmentOwner?: AppointmentOwner;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
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
}));

const AboutMe = ({ submitSignUp, appointmentOwner }: AboutMeProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const userLabel = appointmentOwner === MYSELF ? 'forMe' : 'forSomeoneElse';
	const openDialog = () => {
		setIsDialogOpen(true);
	};
	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('aboutme.subTitle')}
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
				{t(`aboutme.subTitle.${userLabel}`)}
			</Typography>
			<AboutMeForm submitSignUp={submitSignUp} openPrivacyPolicy={openDialog} />
			<PrivacyPolicyDialog isOpen={isDialogOpen} closeDialog={closeDialog} />
		</div>
	);
};

export default AboutMe;
