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
	validationOnChange?: (date: Date | null) => void;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '16px 24px 0',
		width: '100%',
		[breakpoints.up('lg')]: {
			padding: '32px 64px',
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
		marginBottom: '32px',
		fontFamily: 'Mulish',
		fontWeight: '700',
		fontSize: '16px',
		color: '#1ECD96',
		lineHeight: '20px',
		borderBottom: '1px solid #F0F2FA',
		[breakpoints.up('lg')]: {
			marginBottom: '40px',
			lineHeight: '24px',
			paddingBottom: '16px',
			fontSize: '20px',
		},
	},
}));

const AboutMe = ({
	aboutMeData,
	onChangeStep,
	appointmentOwner,
	defaultLabelType,
	validationOnChange,
}: AboutMeProps) => {
	const { t } = useTranslation('signUp');
	const classes = useStyles();
	const userLabel = defaultLabelType || (appointmentOwner === MYSELF ? 'forMe' : 'forSomeoneElse');
	const openDialog = () => {
		redirectToURL(
			'https://docs.google.com/document/u/2/d/e/2PACX-1vS3SBl2FrGqj_qWltyMkUOF1B3dNSHtvr7sbqGy6OJvuKQKGcIklLBvO4GIOev4YQ/pub',
			true,
		);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.subTitle} color="primary">
				{t(`aboutme.subTitle.${userLabel}`)}
			</Typography>
			<AboutMeForm
				userLabel={defaultLabelType}
				aboutMeData={aboutMeData}
				onChangeStep={onChangeStep}
				openPrivacyPolicy={openDialog}
				validationOnChange={validationOnChange}
			/>
		</div>
	);
};

export default AboutMe;
