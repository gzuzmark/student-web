import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';
import { RightLayout } from 'pages/common';
import { getMedicalSpecialities, DoctorAvailability } from '../../api';
import { DoctorList } from '../DoctorList';
import { DoctorsHeader } from '../DoctorsHeader';
import useStyles from './styles';

const getDoctors = async (selectedDate: Date | null, useCase: string, setDoctors: Function) => {
	if (selectedDate) {
		const response = await getMedicalSpecialities({ date: selectedDate, useCase });
		const { doctors = [] } = response[0] || {};

		setDoctors(doctors);
	}
};

const RightSide = () => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	const useCase = 'Problemas de Piel';
	useEffect(() => {
		getDoctors(selectedDate, useCase, setDoctors);
	}, [selectedDate, useCase]);

	return (
		<RightLayout className={classes.container}>
			<div className={classes.titleContainer}>
				<Typography component="span" className={classes.title}>
					{t('right.title')}
				</Typography>
			</div>
			<DoctorsHeader date={selectedDate} updateDate={setSelectedDate} />
			<Divider className={classes.divider} />
			{doctors.length > 0 ? (
				<DoctorList doctors={doctors} />
			) : (
				<div className={classes.emptyMessageWrapper}>
					<Typography component="div" className={classes.emptyMessage}>
						{t('right.notFoundDoctors')}
					</Typography>
				</div>
			)}
		</RightLayout>
	);
};

export default RightSide;
