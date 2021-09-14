import { DateSchedule, DoctorAvailability } from 'pages/api';
import Carrousel from 'pages/SelectDoctor/components/Carrousel/Carrousel';
import { DoctorHeader } from 'pages/SelectDoctor/components/DoctorHeader';
import React, { useEffect, useState } from 'react';
import DayShift from './components/DayShift/DayShift';
import useSelectDoctorHourParams, { defaultDoctor } from './hooks/useSelectDoctorHourParams';
import useStyles from './useStyles';

const SelectDoctorHour = () => {
	const classes = useStyles();
	const [params] = useSelectDoctorHourParams();
	const [doctor, setDoctor] = useState<DoctorAvailability>(defaultDoctor);
	const [listDates, setListDates] = useState<DateSchedule[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isNextWeek, setIsNextWeek] = useState<boolean>(false);

	useEffect(() => {
		if (params) {
			const { doctor, listDates, isNextDays, selectDate } = params;
			setDoctor(doctor);
			setListDates(listDates);
			setSelectedDate(selectDate);
			setIsNextWeek(isNextDays);
		}
	}, [params]);

	return (
		<div className={classes.container}>
			<div className={classes.div}>
				<DoctorHeader className={classes.header} doctor={doctor} />
				<Carrousel
					dates={listDates}
					isNextAvailableDate={isNextWeek}
					selectedDate={selectedDate}
					onSelectDate={(date) => setSelectedDate(date)}
					mode={'short'}
				/>
				<DayShift schedules={doctor.schedules} />
			</div>
		</div>
	);
};

export default SelectDoctorHour;
