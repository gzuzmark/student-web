import React, { useState } from 'react';
import DateCalendar from '../DateCalendar/DateCalendar';
import useStyles from './styles';
import LeftDisabled from 'icons/left-disabled.svg';
import RightEnabled from 'icons/right-enabled.svg';
import clsx from 'clsx';
import { Theme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { DateSchedule } from 'pages/api';

interface CarrouselProps {
	dates: DateSchedule[];
}

const Carrousel = ({ dates }: CarrouselProps) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));
	const [listDates, setListDates] = useState<DateSchedule[]>([]);

	useEffect(() => {
		console.log(isDesktop);
		if (isDesktop) {
			setListDates(dates);
		} else {
			setListDates(dates.slice(0, 3));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dates]);

	return (
		<div className={classes.container}>
			<div className={classes.carousel}>
				<div className={clsx(classes.pointer)}>
					<img alt="left" src={LeftDisabled} />
				</div>
				{listDates.map((dateSchedule: DateSchedule, i: number) => (
					<DateCalendar dateSchedule={dateSchedule} key={i} />
				))}
				<div className={clsx(classes.pointer)}>
					<img alt="right" src={RightEnabled} />
				</div>
			</div>
		</div>
	);
};

export default Carrousel;
