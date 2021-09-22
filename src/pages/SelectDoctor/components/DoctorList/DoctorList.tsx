import Typography from '@material-ui/core/Typography';
import AppContext, { GUEST, MYSELF, PAYMENT_STEP, TimereFrameOptionsEnum } from 'AppContext';
import { isWithinInterval } from 'date-fns/esm';
import { DoctorAvailability, Schedule } from 'pages/api';
import useSelectDoctorParam from 'pages/SelectDoctor/hooks/useSelectDoctorParam';
import { formatDoctor } from 'pages/SelectDoctor/utils';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { addGAEvent, getHour, getHumanDay } from 'utils';
import DoctorSessions from '../DoctorSessions/DoctorSessions';
import { validSelectTimeWithNow } from '../FunctionsHelper';
import { ModalErrorTime } from '../ModalErrorTime';
import { SelectAppointmentOwner } from '../SelectAppointmentOwner';
import TimeFrameFilter from '../TimeFilter/TimeFilter';
import DetailedDoctorModal from './DetailedDoctorModal';
import useStyles from './styles';
import { getTimeFrameIntervals } from './utils';

interface DoctorListProps {
	doctors: DoctorAvailability[];
	selectDoctorCallback?: () => void;
	setDoctor?: Function;
	setSchedule?: Function;
	shouldShowMoreDoctorInfo: boolean;
	onSeeMore?: (doctor: DoctorAvailability) => void;
}

export interface ActiveDoctorTime {
	doctorID: string;
	scheduleID: string;
	doctorIndex: number;
	scheduleIndex: number;
}

const isIntervalSelected = (timeFrameFilter: string[], interval: string) =>
	timeFrameFilter.some((filter) => filter === interval);

const isInsideIntervalRange = (day: Date, startTime: Date, endTime: Date) => {
	return isWithinInterval(day, {
		start: startTime,
		end: endTime,
	});
};

const DoctorList = ({ doctors, shouldShowMoreDoctorInfo, onSeeMore }: DoctorListProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const [activeDoctorTime, setActiveDoctorTime] = useState<ActiveDoctorTime>({
		doctorID: '',
		scheduleID: '',
		scheduleIndex: -1,
		doctorIndex: -1,
	});
	const [selectedDoctor, setSelectedDoctor] = useState<DoctorAvailability | null>(null);
	const [isDetailDoctorModalOpen, setIsDetailDoctorModalOpen] = useState<boolean>(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [messageError, setMessageError] = useState('');
	const [filteredDoctors, setFilteredDoctors] = useState<DoctorAvailability[]>(doctors);
	const [timeFrameFilter, setTimeFrameFilter] = useState<string[]>([]);

	const history = useHistory();
	const [params] = useSelectDoctorParam();
	const { userToken, user, updateState } = useContext(AppContext);
	const isUserLoggedIn = !!userToken && user ? user.id !== '' : false;
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(null);
	const [isSelectOwnerOpen, setSelectOwnerOpen] = useState<boolean>(false);

	const selectDoctorForModal = (index: number) => {
		setSelectedDoctor(doctors[index]);
	};
	const closeDetailDoctorModal = () => {
		setIsDetailDoctorModalOpen(false);
	};
	const openDetailedDoctorModal = () => {
		setIsDetailDoctorModalOpen(true);
	};

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
				schedule,
				doctor: formatDoctor(doctor),
			});
			setSelectOwnerOpen(false);

			if (params.showSmallSignUp) {
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

	const selectDoctor = (doctorID: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => {
		if (scheduleID !== '') {
			setActiveDoctorTime({ doctorID, scheduleID, scheduleIndex, doctorIndex });
			setDoctor(doctors[doctorIndex]);
			setSchedule(doctors[doctorIndex].schedules[scheduleIndex]);
		} else {
			setActiveDoctorTime({ doctorID: '', scheduleID, scheduleIndex: -1, doctorIndex: -1 });
			setDoctor(null);
			setSchedule(null);
		}
	};

	const selectDoctorCallback = () => {
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

	const continueToPreRegister = () => {
		try {
			const doctor = doctors[activeDoctorTime.doctorIndex];
			const schedule: Schedule = doctor.schedules[activeDoctorTime.scheduleIndex];
			validSelectTimeWithNow(schedule);

			addGAEvent({
				category: 'Agendar cita - Paso 1',
				action: 'Avance satisfactorio',
				label: doctor.cmp,
				dia: getHumanDay(doctor.schedules[activeDoctorTime.scheduleIndex].startTime),
				hora: getHour(doctor.schedules[activeDoctorTime.scheduleIndex].startTime),
				especialidad: doctor.specialityName,
			});
			selectDoctorCallback();
		} catch (error) {
			if (error instanceof Error) {
				setMessageError(error.message);
				setIsOpenModal(true);
			}
		}
	};

	const filterDoctors = useCallback(
		(medics: DoctorAvailability[]) => {
			if (timeFrameFilter.length === 0) {
				setFilteredDoctors(doctors);
				return;
			}
			const filteredDoctors = medics
				.map((current: DoctorAvailability) => {
					const currentCopy = { ...current };
					const filterSchedules = currentCopy.schedules.filter((schedule) => {
						const { startTime } = schedule;
						const intervals = getTimeFrameIntervals(startTime);

						return (
							(isIntervalSelected(timeFrameFilter, TimereFrameOptionsEnum.morning) &&
								isInsideIntervalRange(startTime, intervals.morning.start, intervals.morning.end)) ||
							(isIntervalSelected(timeFrameFilter, TimereFrameOptionsEnum.afternoon) &&
								isInsideIntervalRange(startTime, intervals.afternoon.start, intervals.afternoon.end)) ||
							(isIntervalSelected(timeFrameFilter, TimereFrameOptionsEnum.evening) &&
								isInsideIntervalRange(startTime, intervals.evening.start, intervals.evening.end))
						);
					});
					currentCopy.schedules = filterSchedules;
					return currentCopy;
				})
				.filter((current) => current.schedules.length > 0);
			setFilteredDoctors(filteredDoctors);
		},
		[doctors, timeFrameFilter],
	);

	const onTimeFitlerChange = (filters: string[]) => {
		console.group('filters');
		console.log(filters);
		console.groupEnd();
		if (filters.length === 0) {
			setTimeFrameFilter([]);
			setFilteredDoctors(doctors);
			return;
		}
		setTimeFrameFilter(filters);
		filterDoctors(doctors);
	};

	useEffect(() => {
		setActiveDoctorTime({ doctorID: '', scheduleID: '', scheduleIndex: -1, doctorIndex: -1 });
		setDoctor(null);
		setSchedule(null);
		filterDoctors(doctors);
	}, [doctors, filterDoctors]);

	return (
		<div className={classes.container}>
			<div className={classes.timeFilterContainer}>
				<div className={classes.counter}>
					{filteredDoctors.length === 0 ? (
						<div className={classes.counterContent}>
							<Typography className={classes.counterFirstPartMobile} component="span">
								No hay especialistas disponibles{' '}
							</Typography>
							<Typography className={classes.counterFirstPart} component="span">
								Resultados:{' '}
							</Typography>
							<Typography className={classes.counterSecondPart} component="span">
								No hay especialistas disponibles{' '}
							</Typography>
						</div>
					) : (
						<div className={classes.counterContent}>
							<Typography className={classes.counterFirstPart} component="span">
								Resultados:{' '}
							</Typography>
							<Typography className={classes.counterFirstPartMobile} component="span">
								Tenemos{' '}
							</Typography>
							<Typography className={classes.counterFirstPartBold} component="span">
								{t('right.foundDoctors', {
									doctors: filteredDoctors.length < 10 ? `0${filteredDoctors.length}` : filteredDoctors.length,
									plural: filteredDoctors.length === 1 ? '' : 's',
								})}{' '}
							</Typography>
							<Typography className={classes.counterFirstPartMobile} component="span">
								{t('right.foundDoctors.available', {
									plural: filteredDoctors.length === 1 ? '' : 's',
								})}{' '}
							</Typography>
							<Typography className={classes.counterSecondPart} component="span">
								en {t('right.specialityName', { speciality: doctors[0].specialityName })}{' '}
							</Typography>
						</div>
					)}
				</div>
				<div className={classes.timeFilterList}>
					<TimeFrameFilter onChange={onTimeFitlerChange} />
				</div>
			</div>
			<div className={classes.doctorList}>
				{filteredDoctors.map((doctor: DoctorAvailability, doctorIndex: number) => (
					<DoctorSessions
						key={doctorIndex}
						doctor={doctor}
						doctorIndex={doctorIndex}
						activeDoctorTime={activeDoctorTime}
						selectDoctor={selectDoctor}
						selectDoctorForModal={selectDoctorForModal}
						openDetailedDoctorModal={openDetailedDoctorModal}
						continueToPreRegister={continueToPreRegister}
						onSeeMore={() => onSeeMore && onSeeMore(doctor)}
					/>
				))}
				{shouldShowMoreDoctorInfo ? (
					<DetailedDoctorModal
						isOpen={isDetailDoctorModalOpen}
						doctor={selectedDoctor}
						closeModal={closeDetailDoctorModal}
					/>
				) : null}
				<ModalErrorTime isOpen={isOpenModal} setIsOpen={setIsOpenModal} message={messageError} />
			</div>
			<SelectAppointmentOwner
				isOpen={isSelectOwnerOpen}
				selectAppointmentForMe={selectAppointmentOwner(MYSELF)}
				selectAppointmentForSomeoneElse={selectAppointmentOwner(GUEST)}
				onClose={closeSelectOwnerModal}
			/>
		</div>
	);
};

export default DoctorList;
