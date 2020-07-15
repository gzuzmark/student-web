import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { dateToUTCUnixTimestamp, getEndOfDay, getStartOfDay } from 'utils';
import isToday from 'date-fns/isToday';

import { DoctorList } from '../DoctorList';
import { DoctorsHeader } from '../DoctorsHeader';
import useStyles from './styles';
import { UseCase, getMedicalSpecialities, DoctorAvailability } from 'pages/api';

const limitDoctors = (numSessions: string) => (_: any, i: number) => {
	const limit = numSessions && !isNaN(+numSessions) && +numSessions;
	return limit ? i < limit : true;
};

const getDoctors = async (
	selectedDate: Date | null,
	useCase: UseCase | null | undefined,
	setDoctors: Function,
	minutes: string,
	numSessions: string,
) => {
	if (!!selectedDate && !!useCase) {
		const minAmount = minutes && !isNaN(+minutes) ? +minutes : null;
		const window = minAmount ? minAmount * 60 : undefined;
		const doctors = await getMedicalSpecialities({
			useCase: useCase.id,
			from: isToday(selectedDate)
				? dateToUTCUnixTimestamp(selectedDate)
				: dateToUTCUnixTimestamp(getStartOfDay(selectedDate)),
			to: dateToUTCUnixTimestamp(getEndOfDay(selectedDate)),
			window,
		});

		setDoctors(doctors.filter(limitDoctors(numSessions)));
	}
};

interface RightSideProps {
	useCase: UseCase | null | undefined;
	updateContextState: Function | undefined;
	isUserLoggedIn: boolean;
	comeFromTriage: boolean;
	minutes: string;
	numSessions: string;
}

const RightSide = ({
	useCase,
	updateContextState,
	isUserLoggedIn,
	comeFromTriage,
	minutes,
	numSessions,
}: RightSideProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	useEffect(() => {
		getDoctors(selectedDate, useCase, setDoctors, minutes, numSessions);
	}, [selectedDate, useCase, minutes, numSessions]);

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleContainer}>
					<Typography component="span" className={classes.title}>
						{t('right.title')}
					</Typography>
				</div>
				<DoctorsHeader useCase={useCase} date={selectedDate} updateDate={setSelectedDate} />
				<Divider className={classes.divider} />
				{doctors.length > 0 ? (
					<DoctorList
						isUserLoggedIn={isUserLoggedIn}
						updateContextState={updateContextState}
						doctors={doctors}
						comeFromTriage={comeFromTriage}
					/>
				) : (
					<div className={classes.emptyMessageWrapper}>
						<Typography component="div" className={classes.emptyMessage}>
							{t('right.notFoundDoctors')}
						</Typography>
					</div>
				)}
			</div>
		</RightLayout>
	);
};

export default RightSide;
