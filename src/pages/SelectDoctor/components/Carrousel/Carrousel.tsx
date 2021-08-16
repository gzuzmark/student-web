import React from 'react';
import DateCalendar from '../DateCalendar/DateCalendar';
import useStyles from './styles';

interface CarrouselProps {
	id?: string;
}

const Carrousel = ({ id }: CarrouselProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<DateCalendar date={new Date(2021, 7, 14)} />
			<DateCalendar date={new Date(2021, 7, 15)} />
			<DateCalendar date={new Date(2021, 7, 12)} />
			<DateCalendar date={new Date(2021, 6, 20)} />
		</div>
	);
};

export default Carrousel;
