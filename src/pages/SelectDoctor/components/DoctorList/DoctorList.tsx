import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { PRE_SIGNUP_STEP, PAYMENT_STEP } from 'AppContext';

import { DoctorAvailability } from '../../api';
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

const DoctorList = ({ doctors, updateContextState, isUserLoggedIn }: DoctorListProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const history = useHistory();
	const [activeDoctorTime, setActiveDoctorTime] = useState<ActiveDoctorTime>({ doctorCmp: '', scheduleID: '' });
	const selectDoctor = (doctorCmp: string) => (scheduleID: string) => {
		setActiveDoctorTime({ doctorCmp: scheduleID === '' ? '' : doctorCmp, scheduleID });
	};
	const continueToPreRegister = () => {
		if (updateContextState) {
			updateContextState({
				appointmentCreationStep: isUserLoggedIn ? PAYMENT_STEP : PRE_SIGNUP_STEP,
				scheduleID: activeDoctorTime.scheduleID,
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
				{doctors.map(({ name, cmp, comment, profilePicture, speciality, schedules }: DoctorAvailability) => (
					<div className={classes.doctorWrapper} key={cmp}>
						<div className={classes.doctor}>
							<div className={classes.photoWrapper}>
								<img className={classes.photo} src={profilePicture} alt="doctor" />
							</div>
							<div className={classes.info}>
								<div className={classes.nameWrapper}>
									<Typography className={classes.name}>{name}</Typography>
								</div>
								<div className={classes.flexWrapper}>
									<div className={classes.specialityWrapper}>
										<Typography className={classes.speciality}>{speciality}</Typography>
									</div>
									<div>
										<Typography className={classes.cmp}>CMP: {cmp}</Typography>
									</div>
								</div>
								{comment ? (
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
								selectTime={selectDoctor(cmp)}
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
				))}
			</div>
		</>
	);
};

export default DoctorList;
