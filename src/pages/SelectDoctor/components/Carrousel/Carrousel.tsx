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
import { addDays, isAfter, isSameDay } from 'date-fns/esm';
import { useCallback } from 'react';

export type ModeCarrouselType = 'short' | 'large';

interface CarrouselProps {
	/**
	 * Show dates in carrousel
	 */
	dates: DateSchedule[] | null;
	selectedDate: Date | null;
	isNextAvailableDate: boolean;
	mode?: ModeCarrouselType;
	onSelectDate: (date: Date | null) => void;
	onNextWeek?: (firstDate: Date) => void;
	onBackWeek?: (firstDate: Date) => void;
	isMaintainDay?: boolean;
}

const NUM_ITEMS_SHORT = 3;
const NUM_ITEMS_LARGE = 7;

const Carrousel = ({
	dates,
	selectedDate,
	isNextAvailableDate,
	mode = 'large',
	onSelectDate,
	onBackWeek,
	onNextWeek,
	isMaintainDay,
}: CarrouselProps) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const [maxItems, setMaxItems] = useState<number>(0);
	const [allowBackWeek, setAllowBackWeek] = useState(false);
	const [allowNextWeek, setAllowNextWeek] = useState(false);

	const onClickDay = (date: Date) => {
		if (onSelectDate) {
			onSelectDate(date);
		}
	};

	const onBackCarrousel = () => {
		if (dates != null && allowBackWeek) {
			setAllowBackWeek(false);
			setAllowNextWeek(false);
			if (onBackWeek) {
				const firstSchedule: DateSchedule = dates[0];
				const { date } = firstSchedule;
				let firstDate = new Date();
				if (mode === 'short') {
					firstDate = addDays(date, (maxItems - 1) * -1);
				} else {
					firstDate = addDays(date, (maxItems - 1) * -1);
				}
				onBackWeek(firstDate);
			}
		}
	};

	const onNextCarrousel = () => {
		if (dates != null && allowNextWeek) {
			setAllowBackWeek(false);
			setAllowNextWeek(false);
			const lastIndex = maxItems - 1;
			if (onNextWeek) {
				onNextWeek(dates[lastIndex].date);
			}
		}
	};

	const isBackWeek = useCallback((): boolean => {
		if (dates != null && dates.length > 0) {
			const firstDay = dates[0].date;
			const today = new Date();
			return firstDay > today && !isSameDay(firstDay, today);
		}
		return false;
	}, [dates]);

	const isNextWeek = useCallback(
		(totalItems: number): boolean => {
			if (dates != null) {
				if (isNextAvailableDate) {
					return true;
				}
				if (totalItems === NUM_ITEMS_SHORT) {
					const flagDate = dates[NUM_ITEMS_SHORT - 1];
					const hasDayWithSessions = dates.filter((dateSchedule) =>
						isAfter(dateSchedule.date, flagDate.date) ? !dateSchedule.isEmpty : false,
					);
					return hasDayWithSessions.length > 0;
				}
				return isNextAvailableDate;
			}
			return false;
		},
		[dates, isNextAvailableDate],
	);

	const getSelectedDay = (dates: DateSchedule[]): Date | null => {
		const datesWithSessions = dates.filter((date) => !date.isEmpty);
		if (datesWithSessions.length > 0) {
			return datesWithSessions[0].date;
		}
		return null;
	};

	useEffect(() => {
		const totalItems = mode === 'large' ? (isDesktop ? NUM_ITEMS_LARGE : NUM_ITEMS_SHORT) : NUM_ITEMS_SHORT;
		setMaxItems(totalItems);
		if (dates != null) {
			setAllowBackWeek(isBackWeek());
			setAllowNextWeek(isNextWeek(totalItems));
		} else {
			setAllowBackWeek(false);
			setAllowNextWeek(false);
		}
	}, [mode, isDesktop, dates, isNextAvailableDate, isBackWeek, isNextWeek]);

	useEffect(() => {
		console.log(isMaintainDay, 'estatus carousel');
		if (dates != null) {
			const totalItems = mode === 'large' ? (isDesktop ? NUM_ITEMS_LARGE : NUM_ITEMS_SHORT) : NUM_ITEMS_SHORT;

			if (isMaintainDay) {
				// const filterDates = dates.slice(0, totalItems - 1);
				// onSelectDate(selectedDate);
				// const selectedDate = getSelectedDay(filterDates);
				// const filterDates = dates.slice(0, totalItems - 1);
				// const selectedDateFilter = getSelectedDay(filterDates);
				onSelectDate(selectedDate);
			} else {
				const filterDates = dates.slice(0, totalItems - 1);
				const selectedDateFilter = getSelectedDay(filterDates);
				onSelectDate(selectedDateFilter);
			}

			// onSelectDate(selectedDate)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDesktop, dates, isMaintainDay]);

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
					? [0, 1, 2, 3, 4, 5, 6]
							.slice(0, maxItems)
							.map((n, i) => <Skeleton key={i} variant="rect" width={82} height={64} className={classes.skeleton} />)
					: dates
							.slice(0, maxItems)
							.map((dateSchedule: DateSchedule, i: number) => (
								<DateCalendar key={i} dateSchedule={dateSchedule} selectedDate={selectedDate} onClick={onClickDay} />
							))}
				<div
					className={clsx(classes.arrow, allowNextWeek ? classes.pointer : classes.rotate)}
					onClick={onNextCarrousel}
				>
					<img alt="right" src={allowNextWeek ? RightEnabled : LeftDisabled} />
				</div>
			</div>
		</div>
	);
};

export default Carrousel;
