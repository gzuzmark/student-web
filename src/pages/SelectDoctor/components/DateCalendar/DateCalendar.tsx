import { format, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';

type StatusType = 'default' | 'selected' | 'disabled';

interface DateCalendarProps {
	date: Date;
	onClick?: (date: Date) => void;
}

const DateCalendar = ({ date, onClick }: DateCalendarProps) => {
	const classes = useStyles();
	const [dayText, setDayText] = useState<string | null>(null);
	const [dateMonthText, setDateMonthText] = useState<string | null>(null);
	const [status, setStatus] = useState<StatusType>('default');

	const clickDateCalendar = () => {
		if (onClick) {
			onClick(date);
		}
	};

	useEffect(() => {
		if (date !== undefined) {
			console.log(date);
			if (isToday(date)) {
				setDayText('Hoy');
			} else if (isTomorrow(date)) {
				setDayText('Mañana');
			} else {
				const day = format(date, 'eee', { locale: es });
				setDayText(_.upperFirst(day));
			}
			setDateMonthText(format(date, 'dd MMMM', { locale: es }));
		}
	}, [date]);

	return (
		<div className={clsx(classes.container, classes.pointer)} onClick={clickDateCalendar}>
			<div className={classes.div}>
				<div className={classes.dayDiv}>{dayText}</div>
				<div className={classes.dateDiv}>{dateMonthText}</div>
			</div>
		</div>
	);
};

export default DateCalendar;
