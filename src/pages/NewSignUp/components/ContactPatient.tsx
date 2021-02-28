import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { redirectToURL } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';

import { State, ReducerAction } from '../types';
import ContactPatientForm from './ContactPatientForm';

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
	state: State;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
}

const ContactPatient = ({ state: { contactPatient }, onChangeStep }: ContactPatientProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
	const classes = useStyles();
	const gotToPolicy = () => {
		redirectToURL('https://drive.google.com/open?id=1RjgoOp4wR2zCUtktj0d_PqhT9FC7TGyR', true);
	};
	const gotToTermsAndConditions = () => {
		redirectToURL('https://drive.google.com/open?id=12DfeCL1FGluiEmYcH_fo4uZBUu1k-LtV', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('contactPatient.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('contactPatient.title.firstSection')}{' '}
				</Typography>
				<Typography className={classes.boldText} variant="h2" component="span">
					{t('contactPatient.title.secondSection')}{' '}
				</Typography>
				<Typography variant="h2" component="span">
					{t('contactPatient.title.thridSection')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('contactPatient.subTitle')}
			</Typography>
			<ContactPatientForm
				contactPatient={contactPatient}
				onChangeStep={onChangeStep}
				openPrivacyPolicy={gotToPolicy}
				openTermsAndConditions={gotToTermsAndConditions}
			/>
		</div>
	);
};

export default ContactPatient;
