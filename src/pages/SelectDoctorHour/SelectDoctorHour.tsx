import AppContext, {
	getTimeFrameIntervals,
	GroupedSchedules,
	GUEST,
	MYSELF,
	PAYMENT_STEP,
	TimeFrame,
	timeFrames,
	TimereFrameOptionsEnum,
} from 'AppContext';
import { isSameDay } from 'date-fns';
import { isWithinInterval } from 'date-fns/esm';
import { Loading } from 'pages';
import { DateSchedule, DoctorAvailability, Schedule } from 'pages/api';
import Carrousel from 'pages/SelectDoctor/components/Carrousel/Carrousel';
import { DoctorHeader } from 'pages/SelectDoctor/components/DoctorHeader';
import { validSelectTimeWithNow } from 'pages/SelectDoctor/components/FunctionsHelper';
import { ModalErrorTime } from 'pages/SelectDoctor/components/ModalErrorTime';
import { SelectAppointmentOwner } from 'pages/SelectDoctor/components/SelectAppointmentOwner';
import { formatDoctor } from 'pages/SelectDoctor/utils';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { addGAEvent, getHour, getHumanDay } from 'utils';
import DayShift from './components/DayShift/DayShift';
import GoBack from './components/GoBack/GoBack';
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
	const [groupedSchedulesForDay, setGroupedSchedulesForDay] = useState<GroupedSchedules>({});
	const [activeShift, setActiveShift] = useState<number | null>(null);

	const [isSelectOwnerOpen, setSelectOwnerOpen] = useState<boolean>(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [messageError, setMessageError] = useState('');
	const { userToken, user, updateState } = useContext(AppContext);
	const [scheduleSelected, setScheduleSelected] = useState<Schedule | null>(null);
	const isUserLoggedIn = !!userToken && user ? user.id !== '' : false;
	const history = useHistory();

	const selectAppointmentOwner = (owner: string) => () => {
		const isForSomeoneElse = owner === GUEST;
		const ownerToLabel = {
			[GUEST]: 'Para alguien más',
			[MYSELF]: 'Para mi',
		};

		if (updateState) {
			addGAEvent({
				category: 'Agendar cita - Paso 1 - Popup',
				// eslint-disable-next-line
				// @ts-ignore
				action: ownerToLabel[owner],
				label: '(not available)',
			});
			updateState({
				appointmentOwner: owner,
				appointmentCreationStep: PAYMENT_STEP,
				schedule: scheduleSelected,
				doctor: formatDoctor(doctor),
			});
			setSelectOwnerOpen(false);

			// params.showSmallSignUp
			if (false) {
			} else if (isForSomeoneElse || !isUserLoggedIn) {
				history.push('/registro/sobre_ti');
			} else if (!isForSomeoneElse && isUserLoggedIn) {
				history.push('/registro/datos_medicos');
			}
		}
	};

	const closeSelectOwnerModal = () => {
		setSelectOwnerOpen(false);
	};

	const selectDoctorCallback = (schedule: Schedule) => {
		if (updateState) {
			updateState({
				appointmentCreationStep: PAYMENT_STEP,
				schedule,
				doctor: formatDoctor(doctor),
			});
		}

		if (!isUserLoggedIn) {
			setSelectOwnerOpen(true);
		} else {
			history.push('/seleccionar_paciente');
		}
	};

	const continueToPreRegister = (schedule: Schedule) => {
		setScheduleSelected(schedule);
		try {
			validSelectTimeWithNow(schedule);
			if (doctor) {
				addGAEvent({
					category: 'Agendar cita - Paso 1',
					action: 'Avance satisfactorio',
					label: doctor.cmp,
					dia: getHumanDay(schedule.startTime),
					hora: getHour(schedule.startTime),
					especialidad: doctor.specialityName,
				});
				selectDoctorCallback(schedule);
			}
		} catch (error) {
			if (error instanceof Error) {
				setMessageError(error.message);
				setIsOpenModal(true);
			}
		}
	};

	// const filterArray = (array, filters) => {
	// 	const filterKeys = Object.keys(filters);
	// 	return array.filter((item) => {
	// 		// validates all filter criteria
	// 		return filterKeys.every((key) => {
	// 			// ignores non-function predicates
	// 			if (typeof filters[key] !== 'function') return true;
	// 			return filters[key](item[key]);
	// 		});
	// 	});
	// };
	const isInsideIntervalRange = (day: Date, startTime: Date, endTime: Date) => {
		return isWithinInterval(day, {
			start: startTime,
			end: endTime,
		});
	};

	const getTimeFrame = useCallback(
		(startTime: Date): TimeFrame => {
			const intervals = getTimeFrameIntervals(selectedDate || new Date());
			return isInsideIntervalRange(startTime, intervals.morning.start, intervals.morning.end)
				? TimereFrameOptionsEnum.morning
				: isInsideIntervalRange(startTime, intervals.afternoon.start, intervals.afternoon.end)
				? TimereFrameOptionsEnum.afternoon
				: TimereFrameOptionsEnum.evening;
		},
		[selectedDate],
	);

	const groupByTimeFrame = useCallback(
		(schedules: Schedule[] = []) => {
			const groupedSchedules: GroupedSchedules = {};
			schedules.forEach((schedule: Schedule) => {
				const { startTime } = schedule;
				const time = getTimeFrame(startTime);
				if (groupedSchedules[time]) {
					groupedSchedules[time]?.push(schedule);
				} else {
					groupedSchedules[time] = [schedule];
				}
			});

			return groupedSchedules;
		},
		[getTimeFrame],
	);

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
			setGroupedSchedulesForDay({});
		} else {
			const filterSchedules = doctor?.schedules.filter(({ startTime }: Schedule) => {
				return isSameDay(startTime, selectedDate);
			});
			const groupedSchedules = groupByTimeFrame(filterSchedules);
			setGroupedSchedulesForDay(groupedSchedules);
		}
	}, [doctor, groupByTimeFrame, selectedDate]);

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
				<GoBack />
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
				{isLoad ? (
					<Loading loadingMessage="Buscando disponibilidad..." />
				) : (
					<>
						{Object.entries(groupedSchedulesForDay).map(([key, schedules], index) => (
							<DayShift
								key={key}
								title={timeFrames[key as keyof GroupedSchedules].value}
								icon={timeFrames[key as keyof GroupedSchedules].icon}
								schedules={schedules || []}
								showButtonContinue={activeShift === index}
								onActiveScheduleButton={() => setActiveShift(index)}
								onClickContinueButton={continueToPreRegister}
							/>
						))}
					</>
				)}
			</div>
			<ModalErrorTime isOpen={isOpenModal} setIsOpen={setIsOpenModal} message={messageError} />
			<SelectAppointmentOwner
				isOpen={isSelectOwnerOpen}
				selectAppointmentForMe={selectAppointmentOwner(MYSELF)}
				selectAppointmentForSomeoneElse={selectAppointmentOwner(GUEST)}
				onClose={closeSelectOwnerModal}
			/>
		</div>
	);
};

export default SelectDoctorHour;
