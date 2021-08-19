import React from 'react';
import DateCalendar from '../DateCalendar/DateCalendar';
import useStyles from './styles';
import LeftDisabled from 'icons/left-disabled.svg';
import RightEnabled from 'icons/right-enabled.svg';
import clsx from 'clsx';

interface CarrouselProps {
	id?: string;
}

const Carrousel = ({ id }: CarrouselProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.carousel}>
				<div className={clsx(classes.pointer)}>
					<img src={LeftDisabled} />
				</div>
				<DateCalendar date={new Date(2021, 7, 16)} /> {/* 16 de agosto */}
				<DateCalendar date={new Date(2021, 7, 17)} /> {/* 17 de agosto */}
				<DateCalendar date={new Date(2021, 7, 18)} /> {/* 18 de agosto */}
				<DateCalendar date={new Date(2021, 7, 19)} /> {/* 19 de agosto */}
				<DateCalendar date={new Date(2021, 7, 20)} /> {/* 21 de agosto */}
				<DateCalendar date={new Date(2021, 7, 21)} /> {/* 21 de julio */}
				<div className={clsx(classes.pointer)}>
					<img src={RightEnabled} />
				</div>
			</div>
		</div>
	);
};

export default Carrousel;
