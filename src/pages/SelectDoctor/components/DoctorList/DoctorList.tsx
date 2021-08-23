import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { DoctorAvailability, Schedule } from 'pages/api';
import { addGAEvent, getHumanDay, getHour } from 'utils';

import AvailableTimes from '../AvailableTimes';
import useStyles from './styles';
import DetailedDoctorModal from './DetailedDoctorModal';
import { validSelectTimeWithNow } from '../FunctionsHelper';
import { ModalErrorTime } from '../ModalErrorTime';

interface DoctorListProps {
	doctors: DoctorAvailability[];
	selectDoctorCallback: () => void;
	setDoctor: Function;
	setSchedule: Function;
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
	selectDoctorCallback,
	setDoctor,
	setSchedule,
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

	return (
		<div className={classes.container}>
			<div className={classes.counter}>
				<Typography className={classes.counterFirstPart} component="span">
					{t('right.foundDoctors', { doctors: doctors.length })}{' '}
				</Typography>
				<Typography className={classes.counterSecondPart} component="span">
					{t('right.availableDoctors', { count: doctors.length })}
				</Typography>
			</div>
			<div className={classes.doctorList}>
				{doctors.map(
					(
						{ name, lastName, cmp, profilePicture, speciality, rating, schedules, patientOpinions }: DoctorAvailability,
						doctorIndex: number,
					) => (
						<div className={classes.doctorWrapper} key={doctorIndex}>
							<div className={classes.doctor}>
								<div className={classes.photoWrapper}>
									<img className={classes.photo} src={profilePicture} alt="doctor" />
								</div>
								<div className={classes.info}>
									<div className={classes.nameWrapper}>
										<Typography component="span" className={clsx(classes.name, 'no-caps')}>
											{t('right.doctor.prefix')}{' '}
										</Typography>
										<Typography component="span" className={classes.name}>
											{name} {lastName}
										</Typography>
									</div>
									{/* <div className={classes.flexWrapper}>
										<div className={classes.specialityWrapper}>
											<Typography className={classes.speciality}>{speciality}</Typography>
										</div>
										<div>
											<Typography className={classes.cmp}>CMP: {cmp}</Typography>
										</div>
									</div> */}
									<div className={classes.doctorInfoWrapper}>
										<div>
											<Button
												className={classes.doctorMoreInfo}
												onClick={() => {
													selectDoctorForModal(doctorIndex);
													openDetailedDoctorModal();
												}}
											>
												{t('right.doctor.moreInformation')}
											</Button>
										</div>
										{true && patientOpinions.length >= 1 && (
											<div className={classes.ratingWrapper}>
												<Rating
													className={classes.doctorRating}
													value={rating}
													precision={0.5}
													readOnly
													size={'small'}
												/>
												<Typography className={classes.ratingNumber}>({patientOpinions.length})</Typography>
											</div>
										)}
									</div>
								</div>
							</div>
							{/* <div className={classes.availableTitleWrapper}>
								<Typography className={classes.availableTitle} component="span">
									{t('right.availableDoctors.title')}
								</Typography>
							</div> */}
							<div className={classes.timesWrapper}>
								<AvailableTimes
									doctorCmp={cmp}
									availableDates={schedules}
									name={name}
									selectTime={selectDoctor(cmp, doctorIndex)}
									activeDoctorTime={activeDoctorTime}
								/>
							</div>
							<div>
								{activeDoctorTime.doctorCmp === cmp ? (
									<Button
										fullWidth
										className={classes.continueButton}
										variant="contained"
										onClick={continueToPreRegister}
									>
										{t('left.button.continue')}
									</Button>
								) : null}
							</div>
						</div>
					),
				)}
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
