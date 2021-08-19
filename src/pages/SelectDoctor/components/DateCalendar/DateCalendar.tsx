import clsx from 'clsx';
import { format, isSameDay, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';
import _ from 'lodash';
import { DateSchedule } from 'pages/api';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';

type StatusType = 'default' | 'selected' | 'disabled';

interface DateCalendarProps {
	dateSchedule: DateSchedule;
	selectedDate: Date | null;
	onClick?: (date: Date) => void;
}

const DateCalendar = ({ dateSchedule, selectedDate, onClick }: DateCalendarProps) => {
	const classes = useStyles();
	const [dayText, setDayText] = useState<string | null>(null);
	const [dateMonthText, setDateMonthText] = useState<string | null>(null);
	const [status, setStatus] = useState<StatusType>('disabled');

	const clickDateCalendar = () => {
		if (onClick && status != 'disabled') {
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
			return isEmpty
				? 'disabled'
				: selectedDate == null
				? 'default'
				: isSameDay(selectedDate, date)
				? 'selected'
				: 'default';
		});
	}, [dateSchedule, selectedDate]);

	return (
		<div
			className={clsx(
				classes.container,
				status === 'disabled'
					? [classes.containerDisabled]
					: status === 'selected'
					? [classes.containerSelected, classes.pointer]
					: [classes.pointer],
			)}
			onClick={clickDateCalendar}
		>
			<div className={classes.div}>
				<div className={classes.dayDiv}>{dayText}</div>
				<div className={classes.dateDiv}>{dateMonthText}</div>
			</div>
		</div>
	);
};

export default DateCalendar;
