import React, { useState } from 'react';
import { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { stylesWithTheme } from 'utils';
import { Schedule } from 'pages/api';

import { ActiveDoctorTime } from './DoctorList/DoctorList';
import TimeOption from './TimeOption';
import { validSelectTimeWithNow } from './FunctionsHelper';
import ModalErrorTime from './ModalErrorTime/ModalErrorTime';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		position: 'relative',
		[breakpoints.up('lg')]: {
			width: '456px',
			marginRight: '10px', // 7px of margin right from buttons + 12px from container width space + 10px to all sum up 29px
		},
	},
	times: {
		display: 'flex',
		flexWrap: 'wrap',
		marginBottom: '18px',
		[breakpoints.up('lg')]: {
			marginBottom: '0',
		},
	},
	dateButtonWrapper: {
		width: '98px',
		marginRight: '7px',
		marginBottom: '11px',
		'&:nth-child(3n)': {
			marginRight: '0',
			[breakpoints.up('lg')]: {
				marginRight: '7px',
			},
		},
		[breakpoints.up('lg')]: {
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
		padding: '7.5px 0',
		[breakpoints.up('lg')]: {
			marginRight: '7px',
			minWidth: 'auto',
			fontSize: '13px',
			lineHeight: '18px',
			padding: '11.5px 8px',
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
	availableDates: Schedule[];
	name: string;
	doctorCmp: string;
	selectTime: (scheduleId: string, scheduleIndex: number) => void;
	activeDoctorTime: ActiveDoctorTime;
}

const AvailableTimes = ({ availableDates, name, doctorCmp, selectTime, activeDoctorTime }: AvailableTimesProps) => {
	const classes = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [messageError, setMessageError] = useState('');

	const activateAll = () => {
		selectTime('', -1);
	};

	const onClick = (scheduleId: string, scheduleIndex: number) => () => {
		try {
			const schedule: Schedule = availableDates[scheduleIndex];
			validSelectTimeWithNow(schedule);
			selectTime(scheduleId, scheduleIndex);
		} catch (error) {
			setMessageError(error.message);
			setIsOpenModal(true);
		}
	};

	const format = matches ? 'hh:mm a' : undefined;

	const isSelectedDoctor = activeDoctorTime.doctorCmp === doctorCmp;

	const isEmptyTime = activeDoctorTime.scheduleID === '';

	const isButtonDisabled = (scheduleID: string) =>
		isEmptyTime ? false : activeDoctorTime.scheduleID !== scheduleID || !isSelectedDoctor;

	const isButtonActive = (scheduleID: string) =>
		isEmptyTime ? false : activeDoctorTime.scheduleID === scheduleID && isSelectedDoctor;

	return (
		<div className={classes.container}>
			{!isEmptyTime ? <div onClick={activateAll} className={classes.timesOverlay} /> : null}
			<div className={classes.times}>
				{availableDates.map(({ id, startTime }: Schedule, scheduleIndex: number) => (
					<TimeOption
						scheduleId={id}
						date={startTime}
						onClick={onClick(id, scheduleIndex)}
						disabled={isButtonDisabled(id)}
						active={isButtonActive(id)}
						format={format}
						key={`${name}-${doctorCmp}-${id}`}
					/>
				))}
			</div>
			<ModalErrorTime isOpen={isOpenModal} setIsOpen={setIsOpenModal} message={messageError} />
		</div>
	);
};

export default AvailableTimes;
