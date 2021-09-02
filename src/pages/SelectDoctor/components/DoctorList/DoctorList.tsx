import Typography from '@material-ui/core/Typography';
import { DoctorAvailability, Schedule } from 'pages/api';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addGAEvent, getHour, getHumanDay } from 'utils';
import DoctorSessions from '../DoctorSessions/DoctorSessions';
import { validSelectTimeWithNow } from '../FunctionsHelper';
import { ModalErrorTime } from '../ModalErrorTime';
import TimeFrameFilter from '../TimeFilter/TimeFilter';
import DetailedDoctorModal from './DetailedDoctorModal';
import useStyles from './styles';

interface DoctorListProps {
	doctors: DoctorAvailability[];
	selectDoctorCallback: () => void;
	setDoctor: Function;
	setSchedule: Function;
	shouldShowMoreDoctorInfo: boolean;
	doctorViewSessionExtended: DoctorAvailability | null;
	selectedDate: Date;
}

export interface ActiveDoctorTime {
	doctorCmp: string;
	scheduleID: string;
	doctorIndex: number;
	scheduleIndex: number;
}

const DoctorList = ({
	doctors,
	selectDoctorCallback,
	setDoctor,
	setSchedule,
	shouldShowMoreDoctorInfo,
	doctorViewSessionExtended = null,
	selectedDate,
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
			setMessageError(error.message);
			setIsOpenModal(true);
		}
	};

	useEffect(() => {
		setActiveDoctorTime({ doctorCmp: '', scheduleID: '', scheduleIndex: -1, doctorIndex: -1 });
		setDoctor(null);
		setSchedule(null);
	}, [selectedDate, setDoctor, setSchedule]);

	if (doctorViewSessionExtended != null) {
		return <div>Doctor extendido</div>;
	}

	return (
		<div className={classes.container}>
			<div className={classes.timeFilterContainer}>
				<div className={classes.counter}>
					<Typography className={classes.counterFirstPart} component="span">
						Resultados:{' '}
					</Typography>
					<Typography className={classes.counterFirstPart} component="span">
						{t('right.foundDoctors', { doctors: doctors.length })}{' '}
					</Typography>
					<Typography className={classes.counterFirstPart} component="span">
						en{' '}
					</Typography>
					<Typography className={classes.counterSecondPart} component="span">
						{t('right.specialityName', { speciality: doctors[0].specialityName })}{' '}
					</Typography>
				</div>
				<div className={classes.timeFilterList}>
					<TimeFrameFilter />
				</div>
			</div>
			<div className={classes.doctorList}>
				{doctors.map((doctor: DoctorAvailability, doctorIndex: number) => (
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
