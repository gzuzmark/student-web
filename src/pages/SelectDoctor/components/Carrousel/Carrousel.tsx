import React, { useState } from 'react';
import DateCalendar from '../DateCalendar/DateCalendar';
import useStyles from './styles';
import LeftDisabled from 'icons/left-disabled.svg';
import RightEnabled from 'icons/right-enabled.svg';
import clsx from 'clsx';
import { Theme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { DateSchedule } from 'pages/api';
import { Skeleton } from '@material-ui/lab';

interface CarrouselProps {
	dates: DateSchedule[] | null;
	selectedDate: Date | null;
	isNextAvailableDate?: boolean;
	onSelectDate?: (date: Date) => void;
	onNextWeek?: (firstDate: Date) => void;
	onBackWeek?: (firstDate: Date) => void;
}

const Carrousel = ({ dates, selectedDate, isNextAvailableDate, onSelectDate }: CarrouselProps) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const [listDates, setListDates] = useState<DateSchedule[]>([]);
	const [weekCount, setWeekCount] = useState<number>(0);
	const [allowBackWeek, setAllowBackWeek] = useState(false);
	const [allowNextWeek, setAllowNextWeek] = useState(false);

	const onClickDay = (date: Date) => {
		if (onSelectDate) {
			onSelectDate(date);
		}
	};

	const onBackCarrousel = () => {
		setAllowBackWeek(false);
		setAllowNextWeek(false);
	};

	const onNextCarrousel = () => {
		setAllowBackWeek(false);
		setAllowNextWeek(false);
	};

	useEffect(() => {
		if (dates != null) {
			setListDates(dates);
			setAllowNextWeek(true);
		} else {
			setAllowBackWeek(false);
			setAllowNextWeek(false);
		}
	}, [dates, isNextAvailableDate]);

	return (
		<div className={classes.container}>
			<div className={classes.carousel}>
				<div
					className={clsx(classes.arrow, allowBackWeek ? [classes.pointer, classes.rotate] : null)}
					onClick={onBackCarrousel}
				>
					<img alt="left" src={allowBackWeek ? RightEnabled : LeftDisabled} />
				</div>
				{dates === null
					? [0, 1, 2, 3, 4, 5, 6].map((n, i) => (
							<Skeleton key={i} variant="rect" width={76} height={64} className={classes.skeleton} />
					  ))
					: (isDesktop ? listDates : listDates.slice(0, 3)).map((dateSchedule: DateSchedule, i: number) => (
							<DateCalendar key={i} dateSchedule={dateSchedule} selectedDate={selectedDate} onClick={onClickDay} />
					  ))}
				<div
					className={clsx(classes.arrow, allowNextWeek && isNextAvailableDate ? classes.pointer : classes.rotate)}
					onClick={onNextCarrousel}
				>
					<img alt="right" src={allowNextWeek && isNextAvailableDate ? RightEnabled : LeftDisabled} />
				</div>
			</div>
		</div>
	);
};

export default Carrousel;
