import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import { DoctorAvailability } from 'pages/api';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AvailableTimes from '../AvailableTimes';
import { ActiveDoctorTime } from '../DoctorList/DoctorList';
import useStyles from '../DoctorList/styles';

interface DoctorSessionsProps {
	doctor: DoctorAvailability;
	doctorIndex: number;
	activeDoctorTime: ActiveDoctorTime;
	selectDoctor: (doctorCmp: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => void;
	selectDoctorForModal: (index: number) => void;
	openDetailedDoctorModal: () => void;
	continueToPreRegister: () => void;
}

const DoctorSessions = ({
	doctor,
	doctorIndex,
	activeDoctorTime,
	selectDoctor,
	selectDoctorForModal,
	openDetailedDoctorModal,
	continueToPreRegister,
}: DoctorSessionsProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const { name, lastName, cmp, profilePicture, rating, schedules, patientOpinions } = doctor;

	// useEffect(() => {
	// 	console.log(doctor);
	// }, [doctor]);

	return (
		<div className={classes.doctorWrapper}>
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
						{patientOpinions.length >= 1 && (
							<div className={classes.ratingWrapper}>
								<Rating className={classes.doctorRating} value={rating} precision={0.5} readOnly size={'small'} />
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
					mode={'extended'}
					name={name}
					selectTime={selectDoctor(cmp, doctorIndex)}
					activeDoctorTime={activeDoctorTime}
				/>
			</div>
			<div>
				{activeDoctorTime.doctorCmp === cmp ? (
					<Button fullWidth className={classes.continueButton} variant="contained" onClick={continueToPreRegister}>
						{t('left.button.seleccionar')}
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default DoctorSessions;
