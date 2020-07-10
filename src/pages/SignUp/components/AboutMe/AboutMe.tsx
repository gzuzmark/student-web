import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { MYSELF, AppointmentOwner } from 'AppContext';
import { redirectToURL } from 'utils';

import AboutMeForm, { AboutMeValues } from './AboutMeForm';

interface AboutMeProps {
	aboutMeData: AboutMeValues | undefined;
	onChangeStep: (values: AboutMeValues, onError?: Function) => void;
	appointmentOwner?: AppointmentOwner;
	defaultLabelType?: string;
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

const AboutMe = ({ aboutMeData, onChangeStep, appointmentOwner, defaultLabelType }: AboutMeProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const userLabel = defaultLabelType || (appointmentOwner === MYSELF ? 'forMe' : 'forSomeoneElse');
	const openDialog = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t(`aboutme.subTitle.${userLabel}`)}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('aboutme.title.firstSection')}{' '}
				</Typography>
				<Typography variant="h2" className={classes.boldText} component="span">
					{t(defaultLabelType ? `aboutme.title.secondSection.${userLabel}` : 'aboutme.title.secondSection')}{' '}
				</Typography>
				<Typography variant="h2" component="span">
					{t('aboutme.title.thirdSection')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t(`aboutme.subTitle.${userLabel}`)}
			</Typography>
			<AboutMeForm
				userLabel={defaultLabelType}
				aboutMeData={aboutMeData}
				onChangeStep={onChangeStep}
				openPrivacyPolicy={openDialog}
			/>
		</div>
	);
};

export default AboutMe;
