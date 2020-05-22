import React from 'react';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { formatApiDate, stylesWithTheme } from 'utils';
import { ActiveDoctorTime } from './DoctorList/DoctorList';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		position: 'relative',
		[breakpoints.up('md')]: {
			width: '330px',
			marginRight: '10px', // 7px of margin right from buttons + 12px from container width space + 10px to all sum up 29px
		},
	},
	times: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '18px',
		[breakpoints.up('md')]: {
			marginBottom: '0',
		},
	},
	dateButtonWrapper: {
		width: '98px',
		marginRight: '7px',
		marginBottom: '11px',
		'&:nth-child(3n)': {
			marginRight: '0',
			[breakpoints.up('md')]: {
				marginRight: '7px',
			},
		},
		[breakpoints.up('md')]: {
			width: '46px',
			'&:nth-last-child(-n + 6)': {
				marginBottom: '0',
			},
		},
	},
	dateButton: {
		textTransform: 'lowercase',
		fontSize: '14px',
		lineHeight: '15px',
		[breakpoints.up('md')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
		},
	},
	timesOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		cursor: 'pointer',
	},
}));

interface AvailableTimesProps {
	availableDates: string[];
	name: string;
	doctorID: number;
	selectTime: (time: string) => void;
	activeDoctorTime: ActiveDoctorTime;
}

const AvailableTimes = ({ availableDates, name, doctorID, selectTime, activeDoctorTime }: AvailableTimesProps) => {
	const classes = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const activateAll = () => {
		selectTime('');
	};
	const onClick = (date: string) => () => {
		selectTime(date);
	};
	const format = matches ? 'k:mm' : undefined;
	const isSelectedDoctor = activeDoctorTime.doctorID === doctorID;
	const isEmptyTime = activeDoctorTime.time === '';
	const isButtonDisabled = (time: string) =>
		isEmptyTime ? false : activeDoctorTime.time !== time || !isSelectedDoctor;

	return (
		<div className={classes.container}>
			{!isEmptyTime ? <div onClick={activateAll} className={classes.timesOverlay} /> : null}
			<div className={classes.times}>
				{availableDates.map((date: string) => (
					<div className={classes.dateButtonWrapper} key={`${name}-${date}`}>
						<Button
							classes={{ root: classes.dateButton }}
							variant="contained"
							onClick={onClick(date)}
							disabled={isButtonDisabled(date)}
							fullWidth
						>
							{formatApiDate(date, format)}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AvailableTimes;
