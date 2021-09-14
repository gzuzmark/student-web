import { isSameDay } from 'date-fns';
import { Loading } from 'pages';
import { DateSchedule, DoctorAvailability, Schedule } from 'pages/api';
import Carrousel from 'pages/SelectDoctor/components/Carrousel/Carrousel';
import { DoctorHeader } from 'pages/SelectDoctor/components/DoctorHeader';
import React, { useEffect, useState } from 'react';
import DayShift from './components/DayShift/DayShift';
import useScheduleWeek from './hooks/useScheduleWeek';
import useSelectDoctorHourParams from './hooks/useSelectDoctorHourParams';
import useStyles from './useStyles';

const SelectDoctorHour = () => {
	const classes = useStyles();
	const [params] = useSelectDoctorHourParams();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [isLoad, dataDoctor] = useScheduleWeek(params?.useCase, params?.doctor.id, startDate);
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(params?.doctor || null);

	const [listDates, setListDates] = useState<DateSchedule[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isNextWeek, setIsNextWeek] = useState<boolean>(false);
	const [schedulesForDay, setSchedulesForDay] = useState<Schedule[]>([]);

	useEffect(() => {
		if (params) {
			const { doctor, listDates, isNextDays, selectDate } = params;
			setDoctor(doctor);
			setListDates(listDates);
			setSelectedDate(selectDate);
			setIsNextWeek(isNextDays);
		}
	}, [params]);

	useEffect(() => {
		if (selectedDate == null) {
			setSchedulesForDay([]);
		} else {
			const filterSchedules = doctor?.schedules.filter(({ startTime }: Schedule) => {
				return isSameDay(startTime, selectedDate);
			});
			setSchedulesForDay(filterSchedules || []);
		}
	}, [doctor, selectedDate]);

	useEffect(() => {
		if (dataDoctor != null) {
			const { doctor, dates, isNextDays } = dataDoctor;
			setListDates(dates);
			setIsNextWeek(isNextDays);
			setDoctor(doctor);
		}
	}, [dataDoctor]);

	if (!doctor) {
		return <></>;
	}

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
					onBackWeek={(date) => setStartDate(date)}
					onNextWeek={(date) => setStartDate(date)}
				/>
				{isLoad ? <Loading loadingMessage="Buscando disponibilidad..." /> : <DayShift schedules={schedulesForDay} />}
			</div>
		</div>
	);
};

export default SelectDoctorHour;
