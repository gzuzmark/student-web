import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme, redirectToURL } from 'utils';

import MedicalDataForm, { MedicalDataValues } from './MedicalDataForm';
import IndicacionesModal from './components/IndicacionesModal';

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
	onChangeStep: (values: MedicalDataValues, onError?: Function) => void;
	medicalData: MedicalDataValues | undefined;
	defaultLabelType?: string;
}

const MedicalData = ({ onChangeStep, medicalData, defaultLabelType }: MedicalDataProps) => {
	const { t } = useTranslation('signUp');
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const [isIndicacionesModalOpen, setIsIndicacionesModalOpen] = useState<boolean>(false);
	const openDialog = () => {
		redirectToURL(
			'https://docs.google.com/document/d/e/2PACX-1vQf6HE_Cj14iMCA6By3PPapUWZbp4dhtoi5n1BlpL5Nk58v_1Cl66sHA6gKx3yP0w/pub',
			true,
		);
	};

	const closeIndicacionesModal = () => {
		setIsIndicacionesModalOpen(false);
	};

	const openIndicacionesModal = () => {
		setIsIndicacionesModalOpen(true);
	};

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.mobileSubtitle} color="primary">
				{t(defaultLabelType ? `medicalData.subTitle.${defaultLabelType}` : 'medicalData.subTitle')}
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
						<Typography variant="h2" component="span">
							{t('medicalData.title.thirdSection')}{' '}
						</Typography>
					</>
				) : (
					<>
						<Typography className={classes.boldText} variant="h2" component="span">
							{t('medicalData.mobile.title.firstSection')}{' '}
						</Typography>
						<Typography variant="h2" component="span">
							{t('medicalData.title.thirdSection')}{' '}
						</Typography>
					</>
				)}
				<Typography variant="h2" component={matches ? 'div' : 'span'}>
					{t(
						defaultLabelType
							? `medicalData.title.fourthSection.${defaultLabelType}`
							: 'medicalData.title.fourthSection',
					)}
				</Typography>
			</div>
			<Typography className={classes.subTitle} color="primary">
				{t(defaultLabelType ? `medicalData.subTitle.${defaultLabelType}` : 'medicalData.subTitle')}
			</Typography>
			<MedicalDataForm
				medicalData={medicalData}
				onChangeStep={onChangeStep}
				openIndicacionesModal={openIndicacionesModal}
				openPrivacyPolicy={openDialog}
			/>
			<IndicacionesModal isOpen={isIndicacionesModalOpen} onClose={closeIndicacionesModal} />
		</div>
	);
};

export default MedicalData;
