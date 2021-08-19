import { format, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { DateSchedule } from 'pages/api';

type StatusType = 'default' | 'selected' | 'disabled';

interface DateCalendarProps {
	dateSchedule: DateSchedule;
	onClick?: (date: Date) => void;
}

const DateCalendar = ({ dateSchedule, onClick }: DateCalendarProps) => {
	const classes = useStyles();
	const [dayText, setDayText] = useState<string | null>(null);
	const [dateMonthText, setDateMonthText] = useState<string | null>(null);
	const [status, setStatus] = useState<StatusType>('disabled');

	const clickDateCalendar = () => {
		if (onClick) {
			onClick(dateSchedule.date);
		}
	};

	useEffect(() => {
		const { date, isEmpty } = dateSchedule;
		if (isToday(date)) {
			setDayText('Hoy');
		} else if (isTomorrow(date)) {
			setDayText('Mañana');
		} else {
			const day = format(date, 'eee', { locale: es });
			setDayText(_.upperFirst(day));
		}
		setDateMonthText(format(date, 'dd MMMM', { locale: es }));
		setStatus(() => {
			return isEmpty ? 'disabled' : 'default';
		});
	}, [dateSchedule]);

	return (
		<div className={clsx(classes.container, classes.pointer)} onClick={clickDateCalendar}>
			<div className={classes.div}>
				<div className={classes.dayDiv}>{dayText}</div>
				<div className={classes.dateDiv}>{dateMonthText}</div>
				<div>{status}</div>
			</div>
		</div>
	);
};

export default DateCalendar;
