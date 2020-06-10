import React from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme, redirectToURL } from 'utils';

import MedicalDataForm, { MedicalDataValues } from './MedicalDataForm';

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

interface MedicalDataProps {
	onChangeStep: (values: MedicalDataValues) => void;
	medicalData: MedicalDataValues | undefined;
}

const MedicalData = ({ onChangeStep, medicalData }: MedicalDataProps) => {
	const { t } = useTranslation('signUp');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const openDialog = () => {
		redirectToURL('https://drive.google.com/open?id=1RjgoOp4wR2zCUtktj0d_PqhT9FC7TGyR', true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t('medicalData.subTitle')}
			</Typography>
			<div className={classes.titleWrapper}>
				{matches ? (
					<>
						<Typography variant="h2" component="span">
							{t('medicalData.title.firstSection')}{' '}
						</Typography>
						<Typography variant="h2" className={classes.boldText} component="span">
							{t('medicalData.title.secondSection')}{' '}
						</Typography>
					</>
				) : (
					<Typography className={classes.boldText} variant="h2" component="span">
						{t('medicalData.mobile.title.firstSection')}{' '}
					</Typography>
				)}
				<Typography variant="h2" component={matches ? 'div' : 'span'}>
					{t('medicalData.title.thirdSection')}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t('medicalData.subTitle')}
			</Typography>
			<MedicalDataForm medicalData={medicalData} onChangeStep={onChangeStep} openPrivacyPolicy={openDialog} />
		</div>
	);
};

export default MedicalData;
