import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { DoctorAvailabilityUseCase } from 'pages/api';
import React from 'react';
import { useHistory } from 'react-router';
import { DoctorHeader } from '../DoctorHeader';
import useStyles from './styles';

interface DoctorAvailableProps {
	className?: string;
	doctor: DoctorAvailabilityUseCase;
}

const DoctorAvailable = ({ className, doctor }: DoctorAvailableProps) => {
	const classes = useStyles();
	const history = useHistory();

	const { id } = doctor;

	const redirectToVerMas = () => {
		history.push({
			pathname: '/seleccionar_doctor_ver_mas',
			search: `doctor=${id}`,
		});
	};

	return (
		<div className={clsx(classes.doctorWrapper, className)}>
			<DoctorHeader doctor={doctor} />
			<Button
				fullWidth
				className={doctor.hasSchedules ? classes.continueButton : classes.buttonDisabled}
				variant="contained"
				disabled={!doctor.hasSchedules}
				onClick={redirectToVerMas}
			>
				{doctor.hasSchedules ? 'Ver horarios' : 'No hay horarios horarios disponibles'}
			</Button>
		</div>
	);
};

export default DoctorAvailable;
