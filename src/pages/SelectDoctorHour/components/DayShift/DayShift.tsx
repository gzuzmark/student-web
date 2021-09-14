import { Schedule } from 'pages/api';
import TimeOption from 'pages/SelectDoctor/components/TimeOption';
import React, { useEffect, useState } from 'react';
import useStyles from './useStyles';

export type ShiftType = '' | '' | '';

export interface DayShiftProps {
	shift?: ShiftType;
	schedules: Schedule[];
}

const DayShift = ({ schedules }: DayShiftProps) => {
	const classes = useStyles();
	const [activeSchedule, setActiveSchedule] = useState<string | null>(null);

	useEffect(() => {
		setActiveSchedule(null);
	}, [schedules]);

	return (
		<div className={classes.container}>
			<div className={classes.divHours}>
				{schedules.map(({ id, isDisabled, startTime }, i) => (
					<TimeOption
						key={i}
						scheduleId={id}
						date={startTime}
						format={'hh:mm a'}
						status={isDisabled ? 'disabled' : activeSchedule === id ? 'selected' : 'default'}
						onClick={() => setActiveSchedule(id)}
					/>
				))}
			</div>
		</div>
	);
};

export default DayShift;
