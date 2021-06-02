import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { Trans } from 'react-i18next';

import { stylesWithTheme } from 'utils/createStyles';
import { AppointmentOwner } from 'AppContext';

import ExamForm, { ExamDataValues } from './ExamForm';

interface ExamProps {
	examData: ExamDataValues | undefined;
	onChangeStep: (values: ExamDataValues, onError?: Function) => void;
	appointmentOwner?: AppointmentOwner;
	defaultLabelType?: string;
	validationOnChange?: (date: Date | null) => void;
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
	titleContainer: {
		paddingBottom: '24px',
		paddingLeft: '26px',
		[breakpoints.up('lg')]: {
			paddingBottom: '33px',
			paddingLeft: '0',
		},
	},
	title: {
		fontSize: '20px',
		lineHeight: '25px',
		[breakpoints.up('lg')]: {
			fontSize: '25px',
			lineHeight: '30px',
			letterSpacing: '0.2px',
		},
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

const Exam = ({ examData, onChangeStep }: ExamProps) => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<div className={classes.titleContainer}>
				<Typography component="span" className={classes.title}>
					<Trans i18nKey={`clinicalExamination:${'right.default.title'}`} />
				</Typography>
			</div>
			<ExamForm examData={examData} onChangeStep={onChangeStep} />
		</div>
	);
};

export default Exam;
