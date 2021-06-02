import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { stylesWithTheme } from 'utils/createStyles';

import LaboratoryForm, { LaboratoryFormValues } from './LaboratoryForm';
import { ExamDataValues } from '../ExamForm';
import { ContactPatientValues } from '../ContactPatient';

interface ContactProps {
	previousData: {
		contactData: ContactPatientValues | undefined;
		examData: ExamDataValues | undefined;
	};
	laboratoryData: LaboratoryFormValues | undefined;
	onChangeStep: (values: LaboratoryFormValues, onError?: Function) => void;
}

export interface HeaderValues {
	modality?: string;
	calle?: string;
}

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
			maxWidth: '472px',
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

const Laboratory = ({ previousData, laboratoryData, onChangeStep }: ContactProps) => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<LaboratoryForm previousData={previousData} laboratoryData={laboratoryData} onChangeStep={onChangeStep} />
		</div>
	);
};

export default Laboratory;
