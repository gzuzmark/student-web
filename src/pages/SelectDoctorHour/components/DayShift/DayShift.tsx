import { Button } from '@material-ui/core';
import { Schedule } from 'pages/api';
import TimeOption from 'pages/SelectDoctor/components/TimeOption';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './useStyles';

export type ShiftType = 'all' | '' | '';

export interface DayShiftProps {
	shift?: ShiftType;
	schedules: Schedule[];
	showButtonContinue: boolean;
	onActiveScheduleButton?: () => void;
}

const DayShift = ({ schedules, showButtonContinue, onActiveScheduleButton }: DayShiftProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [activeSchedule, setActiveSchedule] = useState<string | null>(null);

	const onClickSchedule = (id: string) => {
		setActiveSchedule(id);
		if (onActiveScheduleButton) {
			onActiveScheduleButton();
		}
	};

	useEffect(() => {
		setActiveSchedule(null);
	}, [schedules]);

	useEffect(() => {
		if (!showButtonContinue) {
			setActiveSchedule(null);
		}
	}, [showButtonContinue]);

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
						onClick={() => onClickSchedule(id)}
					/>
				))}
			</div>
			{activeSchedule != null && (
				<div>
					<Button fullWidth className={classes.continueButton} variant="contained">
						{t('left.button.seleccionar')}
					</Button>
				</div>
			)}
		</div>
	);
};

export default DayShift;
