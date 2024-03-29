import React, { useState } from 'react';
import { Theme } from '@material-ui/core/styles';

import { stylesWithTheme, redirectToURL } from 'utils';

import MedicalDataForm, { MedicalDataValues } from './MedicalDataForm';
import IndicacionesModal from './components/IndicacionesModal';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		padding: '16px 24px 0',
		width: '100%',
		[breakpoints.up('lg')]: {
			padding: '32px 64px',
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

const MedicalData = ({ onChangeStep, medicalData /*submitSignUp*/ }: MedicalDataProps) => {
	//const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const classes = useStyles();
	const [isIndicacionesModalOpen, setIsIndicacionesModalOpen] = useState<boolean>(false);

	const closeIndicacionesModal = () => {
		setIsIndicacionesModalOpen(false);
	};

	const openIndicacionesModal = () => {
		setIsIndicacionesModalOpen(true);
	};
	const gotToPolicy = () => {
		redirectToURL(
			'https://docs.google.com/document/u/1/d/e/2PACX-1vQf6HE_Cj14iMCA6By3PPapUWZbp4dhtoi5n1BlpL5Nk58v_1Cl66sHA6gKx3yP0w/pub',
			true,
		);
	};

	return (
		<div className={classes.wrapper}>
			<MedicalDataForm
				medicalData={medicalData}
				onChangeStep={onChangeStep}
				openIndicacionesModal={openIndicacionesModal}
				openPrivacyPolicy={gotToPolicy}
			/>
			<IndicacionesModal isOpen={isIndicacionesModalOpen} onClose={closeIndicacionesModal} />
		</div>
	);
};

export default MedicalData;
