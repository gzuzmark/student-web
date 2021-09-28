import clsx from 'clsx';
import { DoctorAvailabilityUseCase } from 'pages/api';
import React from 'react';
import { DoctorHeader } from '../DoctorHeader';
import useStyles from './styles';
import Button from '@material-ui/core/Button';

interface DoctorAvailableProps {
	className?: string;
	doctor: DoctorAvailabilityUseCase;
}

const DoctorAvailable = ({ className, doctor }: DoctorAvailableProps) => {
	const classes = useStyles();
	// const { t } = useTranslation('selectDoctor');
	// const { id, schedules } = doctor;

	return (
		<div className={clsx(classes.doctorWrapper, className)}>
			<DoctorHeader doctor={doctor} />
			{/*<span>{doctor.hasSchedules ? 'tiene horarios' : 'no tiene horarios'}</span>*/}

			<Button
				fullWidth
				className={doctor.hasSchedules ? classes.continueButton : classes.buttonDisabled}
				variant="contained"
				disabled={!doctor.hasSchedules}
			>
				{doctor.hasSchedules ? 'Ver horarios' : 'No hay horarios horarios disponibles'}
			</Button>
		</div>
	);
};

export default DoctorAvailable;
