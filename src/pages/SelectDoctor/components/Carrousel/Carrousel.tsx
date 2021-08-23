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
import { addDays, isSameDay } from 'date-fns/esm';
import { useCallback } from 'react';

type ModeCarrouselType = 'short' | 'large';
interface CarrouselProps {
	/**
	 * Show dates in carrousel
	 */
	dates: DateSchedule[] | null;
	selectedDate: Date | null;
	isNextAvailableDate: boolean;
	mode?: ModeCarrouselType;
	onSelectDate?: (date: Date) => void;
	onNextWeek?: (firstDate: Date) => void;
	onBackWeek?: (firstDate: Date) => void;
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
				const firstDate = addDays(date, (maxItems - 1) * -1);
				console.log('Back Carrousel', firstDate);
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
				console.log('Next Carrousel', dates[lastIndex].date);
				onNextWeek(dates[lastIndex].date);
			}
		}
	};

	const isBackDay = useCallback((): boolean => {
		if (dates != null) {
			const firstDay = dates[0].date;
			const today = new Date();
			return firstDay > today && !isSameDay(firstDay, today);
		}
		return false;
	}, [dates]);

	useEffect(() => {
		if (mode === 'large') {
			isDesktop ? setMaxItems(NUM_ITEMS_LARGE) : setMaxItems(NUM_ITEMS_SHORT);
		} else {
			setMaxItems(NUM_ITEMS_SHORT);
		}
	}, [mode, isDesktop]);

	useEffect(() => {
		if (dates != null) {
			setAllowBackWeek(isBackDay());
			setAllowNextWeek(isNextAvailableDate);
		} else {
			setAllowBackWeek(false);
			setAllowNextWeek(false);
		}
	}, [dates, isBackDay, isNextAvailableDate]);

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
