import Typography from '@material-ui/core/Typography';
import AppContext, { PAYMENT_STEP } from 'AppContext';
import { addHours, endOfDay, isWithinInterval, startOfDay } from 'date-fns/esm';
import { DoctorAvailability, Schedule } from 'pages/api';
import { formatDoctor } from 'pages/SelectDoctor/utils';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { addGAEvent, getHour, getHumanDay } from 'utils';
import DoctorSessions from '../DoctorSessions/DoctorSessions';
import { validSelectTimeWithNow } from '../FunctionsHelper';
import { ModalErrorTime } from '../ModalErrorTime';
import TimeFrameFilter from '../TimeFilter/TimeFilter';
import DetailedDoctorModal from './DetailedDoctorModal';
import useStyles from './styles';

interface DoctorListProps {
	doctors: DoctorAvailability[];
	selectDoctorCallback?: () => void;
	setDoctor?: Function;
	setSchedule?: Function;
	shouldShowMoreDoctorInfo: boolean;
}

export interface ActiveDoctorTime {
	doctorCmp: string;
	scheduleID: string;
	doctorIndex: number;
	scheduleIndex: number;
}

const DoctorList = ({
	doctors,
	// selectDoctorCallback,
	// setDoctor,
	// setSchedule,
	shouldShowMoreDoctorInfo,
}: DoctorListProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const [activeDoctorTime, setActiveDoctorTime] = useState<ActiveDoctorTime>({
		doctorCmp: '',
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

	// new for David
	const history = useHistory();
	const { userToken, user, updateState } = useContext(AppContext);
	const isUserLoggedIn = !!userToken && user ? user.id !== '' : false;
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(null);

	const selectDoctorForModal = (index: number) => {
		setSelectedDoctor(doctors[index]);
	};
	const closeDetailDoctorModal = () => {
		setIsDetailDoctorModalOpen(false);
	};
	const openDetailedDoctorModal = () => {
		setIsDetailDoctorModalOpen(true);
	};
	const selectDoctor = (doctorCmp: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => {
		if (scheduleID !== '') {
			setActiveDoctorTime({ doctorCmp, scheduleID, scheduleIndex, doctorIndex });
			setDoctor(doctors[doctorIndex]);
			setSchedule(doctors[doctorIndex].schedules[scheduleIndex]);
		} else {
			setActiveDoctorTime({ doctorCmp: '', scheduleID, scheduleIndex: -1, doctorIndex: -1 });
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
			// setSelectOwnerOpen(true);
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
			const filteredDoctors = medics.reduce((acc: DoctorAvailability[], current) => {
				const { schedules } = current;
				const somechedules = schedules.some((schedule) => {
					const { startTime } = schedule;
					const dayStart = startOfDay(startTime);
					const dayEnd = endOfDay(startTime);

					const isMorningInterval = isWithinInterval(startTime, { start: dayStart, end: addHours(dayStart, 12.59) });
					const isAfternoonInterval = isWithinInterval(startTime, {
						start: addHours(dayStart, 13),
						end: addHours(dayStart, 16.59),
					});
					const isEveningInterval = isWithinInterval(startTime, {
						start: addHours(dayStart, 17),
						end: dayEnd,
					});
					const evening = timeFrameFilter.some((filter) => filter === 'evening') && isEveningInterval;
					return (
						(timeFrameFilter.some((filter) => filter === 'morning') && isMorningInterval) ||
						(timeFrameFilter.some((filter) => filter === 'afternoon') && isAfternoonInterval) ||
						evening
					);
				});

				if (somechedules) {
					return [...acc, current];
				}
				return acc;
			}, []);
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
		// console.log({ filteredDocs });
		// const filteredDoctors = doctors.filter(({ schedules }) => {
		// 	const somechedules = schedules.some((schedule) => {
		// 		const { startTime } = schedule;
		// 		const dayStart = startOfDay(new Date());
		// 		const dayEnd = endOfDay(new Date());
		// 		if (
		// 			filters.find((filter) => filter === 'morning') &&
		// 			isWithinInterval(startTime, { start: dayStart, end: dayEnd })
		// 		) {
		// 			return true;
		// 		}
		// 	});
		// });
	};

	useEffect(() => {
		setActiveDoctorTime({ doctorCmp: '', scheduleID: '', scheduleIndex: -1, doctorIndex: -1 });
		setDoctor(null);
		setSchedule(null);
		filterDoctors(doctors);
	}, [doctors, filterDoctors]);

	return (
		<div className={classes.container}>
			<div className={classes.timeFilterContainer}>
				<div className={classes.counter}>
					{filteredDoctors.length === 0 ? (
						<>
							<Typography className={classes.counterFirstPartMobile} component="span">
								No hay especialistas disponobiles{' '}
							</Typography>
							<Typography className={classes.counterFirstPart} component="span">
								Resultados:{' '}
							</Typography>
							<Typography className={classes.counterSecondPart} component="span">
								No hay especialistas disponibles{' '}
							</Typography>
						</>
					) : (
						<>
							<Typography className={classes.counterFirstPart} component="span">
								Resultados:{' '}
							</Typography>
							<Typography className={classes.counterFirstPartMobile} component="span">
								Tenemos{' '}
							</Typography>
							<Typography className={classes.counterFirstPartBold} component="span">
								{t('right.foundDoctors', { doctors: doctors.length })}{' '}
							</Typography>
							<Typography className={classes.counterFirstPartMobile} component="span">
								disponibles{' '}
							</Typography>
							<Typography className={classes.counterSecondPart} component="span">
								en {t('right.specialityName', { speciality: doctors[0].specialityName })}{' '}
							</Typography>
						</>
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
		</div>
	);
};

export default DoctorList;
