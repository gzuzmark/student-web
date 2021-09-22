import { Button, Typography } from '@material-ui/core';
import { Schedule } from 'pages/api';
import TimeOption from 'pages/SelectDoctor/components/TimeOption';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './useStyles';

export type ShiftType = 'all' | '' | '';

export interface DayShiftProps {
	title?: string;
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
	shift?: ShiftType;
	schedules: Schedule[];
	showButtonContinue: boolean;
	onActiveScheduleButton?: () => void;
	onClickContinueButton: (schedule: Schedule) => void;
}

const DayShift = ({
	schedules,
	showButtonContinue,
	onActiveScheduleButton,
	onClickContinueButton,
	title,
	icon,
}: DayShiftProps) => {
	const { t } = useTranslation('selectDoctor');
	const DayShiftIcon = icon;
	const classes = useStyles();

	const [activeSchedule, setActiveSchedule] = useState<string | null>(null);

	const onClickSchedule = (id: string) => {
		setActiveSchedule(id);
		if (onActiveScheduleButton) {
			onActiveScheduleButton();
		}
	};

	const onClickContinue = () => {
		if (activeSchedule != null) {
			const findSchedule = schedules.find((sch) => sch.id === activeSchedule);
			if (findSchedule && onClickContinueButton) {
				onClickContinueButton(findSchedule);
			}
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
			<div className={classes.divTitle}>
				{icon ? <DayShiftIcon /> : null}
				<Typography className={classes.title}>{title}</Typography>
			</div>
			<div className={classes.divider} />
			<div className={classes.divSchedule}>
				<div className={classes.divHours}>
					{schedules.map(({ id, isDisabled, startTime }, i) => (
						<TimeOption
							key={i}
							className={classes.hourItem}
							scheduleId={id}
							date={startTime}
							format={'hh:mm a'}
							status={isDisabled ? 'disabled' : activeSchedule === id ? 'selected' : 'default'}
							onClick={() => onClickSchedule(id)}
						/>
					))}
				</div>
				{activeSchedule != null && (
					<div className={classes.divButton}>
						<Button fullWidth className={classes.continueButton} variant="contained" onClick={onClickContinue}>
							{t('left.button.seleccionar')}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default DayShift;
