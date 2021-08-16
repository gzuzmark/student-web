import { format, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

interface DateCalendarProps {
	date?: Date;
}

const DateCalendar = ({ date }: DateCalendarProps) => {
	const classes = useStyles();
	const [dayText, setDayText] = useState<string | null>(null);
	const [dateMonthText, setDateMonthText] = useState<string | null>(null);

	useEffect(() => {
		if (date !== undefined) {
			console.log(date);
			if (isToday(date)) {
				setDayText('Hoy');
			} else if (isTomorrow(date)) {
				setDayText('Mañana');
			} else {
				const day = format(date, 'eeee', { locale: es });
				setDayText(_.upperFirst(day));
			}
			setDateMonthText(format(date, 'dd MMMM', { locale: es }));
		}
	}, [date]);

	return (
		<div className={classes.container}>
			<div className={classes.div}>
				<div className={classes.dayDiv}>{dayText}</div>
				<div>{dateMonthText}</div>
			</div>
		</div>
	);
};

export default DateCalendar;
