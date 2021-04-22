import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { redirectToURL } from 'utils';
import { stylesWithTheme } from 'utils/createStyles';

import { State, ReducerAction } from '../types';
import PatientPasswordForm from './PatientPasswordForm';

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
			maxWidth: '542px',
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

export interface PatientPasswordProps {
	state: State;
	onChangeStep: (payload: ReducerAction, redirectPath: string) => void;
}

const PatientPassword = ({ state: { patientPassword }, onChangeStep }: PatientPasswordProps): ReactElement => {
	const { t } = useTranslation('newSignUp');
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
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('patientPassword.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				<Typography variant="h2" component="span">
					{t('patientPassword.title.firstSection')}{' '}
				</Typography>
				<Typography className={classes.boldText} variant="h2" component="span">
					{t('patientPassword.title.secondSection')}{' '}
				</Typography>
				<Typography variant="h2" component="span">
					{t('patientPassword.title.thridSection')}{' '}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('patientPassword.subTitle')}
			</Typography>
			<PatientPasswordForm
				patientPassword={patientPassword}
				onChangeStep={onChangeStep}
				openPrivacyPolicy={gotToPolicy}
				openDataAnalitycs={gotToDataAnalitycs}
				openTermsAndConditions={gotToTermsAndConditions}
			/>
		</div>
	);
};

export default PatientPassword;
