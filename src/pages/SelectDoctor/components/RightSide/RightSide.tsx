import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { dateToUTCUnixTimestamp, getEndOfDay, getStartOfDay } from 'utils';
import isToday from 'date-fns/isToday';

import { getMedicalSpecialities, DoctorAvailability } from 'pages/api/selectDoctor';
import { DoctorList } from '../DoctorList';
import { DoctorsHeader } from '../DoctorsHeader';
import useStyles from './styles';
import { UseCase } from 'pages/api';

const getDoctors = async (selectedDate: Date | null, useCase: UseCase | null | undefined, setDoctors: Function) => {
	if (!!selectedDate && !!useCase) {
		const doctors = await getMedicalSpecialities({
			useCase: useCase.id,
			from: isToday(selectedDate)
				? dateToUTCUnixTimestamp(selectedDate)
				: dateToUTCUnixTimestamp(getStartOfDay(selectedDate)),
			to: dateToUTCUnixTimestamp(getEndOfDay(selectedDate)),
		});

		setDoctors(doctors);
	}
};

interface RightSideProps {
	useCase: UseCase | null | undefined;
	updateContextState: Function | undefined;
	isUserLoggedIn: boolean;
}

const RightSide = ({ useCase, updateContextState, isUserLoggedIn }: RightSideProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
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
			<DoctorsHeader useCase={useCase} date={selectedDate} updateDate={setSelectedDate} />
			<Divider className={classes.divider} />
			{doctors.length > 0 ? (
				<DoctorList isUserLoggedIn={isUserLoggedIn} updateContextState={updateContextState} doctors={doctors} />
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
