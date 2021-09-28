import Typography from '@material-ui/core/Typography';
import { DoctorAvailabilityUseCase } from 'pages/api';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DoctorAvailable from '../DoctorAvaiable/DoctorAvailable';
import useStyles from './styles';

interface DoctorListFilterProps {
	doctors: DoctorAvailabilityUseCase[];
}

export interface ActiveDoctorTime {
	doctorID: string;
	scheduleID: string;
	doctorIndex: number;
	scheduleIndex: number;
}

export enum TimereFrameOptionsEnum {
	morning = 'morning',
	afternoon = 'afternoon',
	evening = 'evening',
}

const DoctorListFilter = ({ doctors }: DoctorListFilterProps) => {
	const classes = useStyles();
	const { t } = useTranslation('selectDoctor');

	return (
		<div className={classes.container}>
			<div className={classes.timeFilterContainer}>
				<div className={classes.counter}>
					{doctors.length === 0 ? (
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
									doctors: doctors.length < 10 ? `0${doctors.length}` : doctors.length,
									plural: doctors.length === 1 ? '' : 's',
								})}{' '}
							</Typography>
							<Typography className={classes.counterFirstPartMobile} component="span">
								{t('right.foundDoctors.available', {
									plural: doctors.length === 1 ? '' : 's',
								})}{' '}
							</Typography>
							<Typography className={classes.counterSecondPart} component="span">
								en {t('right.specialityName', { speciality: doctors[0].specialityName })}{' '}
							</Typography>
						</div>
					)}
				</div>
			</div>
			<div className={classes.doctorList}>
				{doctors
					.filter((doctor: DoctorAvailabilityUseCase) => doctor.hasSchedules)
					.map((doctor: DoctorAvailabilityUseCase, doctorIndex: number) => (
						<DoctorAvailable key={doctorIndex} doctor={doctor} />
					))}
				{doctors
					.filter((doctor: DoctorAvailabilityUseCase) => !doctor.hasSchedules)
					.map((doctor: DoctorAvailabilityUseCase, doctorIndex: number) => (
						<DoctorAvailable key={doctorIndex} doctor={doctor} />
					))}
			</div>
		</div>
	);
};

export default DoctorListFilter;
