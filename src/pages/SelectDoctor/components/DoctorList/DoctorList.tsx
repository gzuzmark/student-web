import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { PRE_SIGNUP_STEP, PAYMENT_STEP } from 'AppContext';
import { DoctorAvailability, Doctor, Schedule } from 'pages/api';

import AvailableTimes from '../AvailableTimes';
import useStyles from './styles';

interface DoctorListProps {
	doctors: DoctorAvailability[];
	updateContextState: Function | undefined;
	isUserLoggedIn: boolean;
}

export interface ActiveDoctorTime {
	doctorCmp: string;
	scheduleID: string;
}

const formatDoctor = (doctor: DoctorAvailability | null): Doctor | null =>
	doctor
		? {
				id: doctor.id,
				name: doctor.name,
				lastName: doctor.lastName,
				cmp: doctor.cmp,
				profilePicture: doctor.profilePicture,
				speciality: doctor.speciality,
				totalCost: doctor.totalCost,
		  }
		: null;

const DoctorList = ({ doctors, updateContextState, isUserLoggedIn }: DoctorListProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const history = useHistory();
	const [doctor, setDoctor] = useState<DoctorAvailability | null>(null);
	const [schedule, setSchedule] = useState<Schedule | null>(null);
	const [activeDoctorTime, setActiveDoctorTime] = useState<ActiveDoctorTime>({ doctorCmp: '', scheduleID: '' });
	const selectDoctor = (doctorCmp: string, doctorIndex: number) => (scheduleID: string, scheduleIndex: number) => {
		if (scheduleID !== '') {
			setActiveDoctorTime({ doctorCmp, scheduleID });
			setDoctor(doctors[doctorIndex]);
			setSchedule(doctors[doctorIndex].schedules[scheduleIndex]);
		} else {
			setActiveDoctorTime({ doctorCmp: '', scheduleID });
			setDoctor(null);
			setSchedule(null);
		}
	};
	const continueToPreRegister = () => {
		if (updateContextState) {
			updateContextState({
				appointmentCreationStep: isUserLoggedIn ? PAYMENT_STEP : PRE_SIGNUP_STEP,
				schedule,
				doctor: formatDoctor(doctor),
			});
			if (isUserLoggedIn) {
				history.push('/pago');
			} else {
				history.push('/pre_registro');
			}
		}
	};

	return (
		<>
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
						{ name, lastName, cmp, comment, profilePicture, speciality, schedules }: DoctorAvailability,
						doctorIndex: number,
					) => (
						<div className={classes.doctorWrapper} key={cmp}>
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
									<div className={classes.flexWrapper}>
										<div className={classes.specialityWrapper}>
											<Typography className={classes.speciality}>{speciality}</Typography>
										</div>
										<div>
											<Typography className={classes.cmp}>CMP: {cmp}</Typography>
										</div>
									</div>
									{null ? (
										<div className={classes.commentWrapper}>
											<Typography className={classes.comment}>&ldquo;{comment}&rdquo;</Typography>
										</div>
									) : null}
								</div>
							</div>
							<div className={classes.availableTitleWrapper}>
								<Typography className={classes.availableTitle} component="span">
									{t('right.availableDoctors.title')}
								</Typography>
							</div>
							<div className={classes.timesWrapper}>
								<AvailableTimes
									doctorCmp={cmp}
									availableDates={schedules}
									name={name}
									selectTime={selectDoctor(cmp, doctorIndex)}
									activeDoctorTime={activeDoctorTime}
								/>
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
			</div>
		</>
	);
};

export default DoctorList;
