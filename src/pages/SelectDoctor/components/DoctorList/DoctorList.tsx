import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { DoctorAvailability } from '../../api';
import AvailableTimes from '../AvailableTimes';
import useStyles from './styles';

interface DoctorListProps {
	doctors: DoctorAvailability[];
}

export interface ActiveDoctorTime {
	doctorID: number;
	time: string;
}

const DoctorList = ({ doctors }: DoctorListProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');
	const history = useHistory();
	const [activeDoctorTime, setActiveDoctorTime] = useState<ActiveDoctorTime>({ doctorID: -1, time: '' });
	const selectDoctor = (doctorID: number) => (selectedTime: string) => {
		setActiveDoctorTime({ doctorID: selectedTime === '' ? -1 : doctorID, time: selectedTime });
	};
	const continueToPreRegister = () => {
		history.push('/pre_registro');
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
				{doctors.map(({ id, name, cmp, comment, profilePicture, availableDates }: DoctorAvailability) => (
					<div className={classes.doctorWrapper} key={id}>
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
										<Typography className={classes.speciality}>Especialidad</Typography>
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
								availableDates={availableDates}
								name={name}
								doctorID={id}
								selectTime={selectDoctor(id)}
								activeDoctorTime={activeDoctorTime}
							/>
							{activeDoctorTime.doctorID === id ? (
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
