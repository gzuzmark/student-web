import AppContext, { GUEST, MYSELF, PAYMENT_STEP } from 'AppContext';
import { isSameDay } from 'date-fns';
import { Loading } from 'pages';
import { DateSchedule, DoctorAvailability, Schedule } from 'pages/api';
import Carrousel from 'pages/SelectDoctor/components/Carrousel/Carrousel';
import { DoctorHeader } from 'pages/SelectDoctor/components/DoctorHeader';
import { ModalErrorTime } from 'pages/SelectDoctor/components/ModalErrorTime';
import { SelectAppointmentOwner } from 'pages/SelectDoctor/components/SelectAppointmentOwner';
import { formatDoctor } from 'pages/SelectDoctor/utils';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useContext } from 'react';
import DayShift from './components/DayShift/DayShift';
import GoBack from './components/GoBack/GoBack';
import useScheduleWeek from './hooks/useScheduleWeek';
import useSelectDoctorHourParams from './hooks/useSelectDoctorHourParams';
import useStyles from './useStyles';
import { addGAEvent, getHour, getHumanDay } from 'utils';
import { validSelectTimeWithNow } from 'pages/SelectDoctor/components/FunctionsHelper';

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
				history.push('/informacion_paciente');
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
						{[0].map((i) => (
							<DayShift
								key={i}
								schedules={schedulesForDay}
								showButtonContinue={activeShift === i}
								onActiveScheduleButton={() => setActiveShift(i)}
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
