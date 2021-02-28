import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { redirectToURL } from 'utils';

import { State, ReducerAction } from '../types';
import AboutPatientForm from './AboutPatientForm';

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

export interface AboutPatientProps {
	state: State;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
}

const AboutPatient = ({ state: { aboutPatient }, onChangeStep }: AboutPatientProps): ReactElement | null => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const openDialog = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('aboutPatient.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('aboutPatient.title.firstSection')}{' '}
				</Typography>
				<Typography variant="h2" className={classes.boldText} component="span">
					{t('aboutPatient.title.secondSection')}{' '}
				</Typography>
				<Typography variant="h2" component="span">
					{t('aboutPatient.title.thirdSection')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('aboutPatient.subTitle')}
			</Typography>
			<AboutPatientForm aboutPatient={aboutPatient} onChangeStep={onChangeStep} openPrivacyPolicy={openDialog} />
		</div>
	);
};

export default AboutPatient;
