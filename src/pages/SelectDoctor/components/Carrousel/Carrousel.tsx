import React from 'react';
import DateCalendar from '../DateCalendar/DateCalendar';
import useStyles from './styles';
import LeftDisabled from 'icons/left-disabled.svg';
import RightEnabled from 'icons/right-enabled.svg';
import clsx from 'clsx';

interface CarrouselProps {
	dates: Date[];
}

const Carrousel = ({ dates }: CarrouselProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.carousel}>
				<div className={clsx(classes.pointer)}>
					<img alt="left" src={LeftDisabled} />
				</div>
				{dates.map((date: Date, i: number) => (
					<DateCalendar date={date} key={i} />
				))}
				<div className={clsx(classes.pointer)}>
					<img alt="right" src={RightEnabled} />
				</div>
			</div>
		</div>
	);
};

export default Carrousel;
