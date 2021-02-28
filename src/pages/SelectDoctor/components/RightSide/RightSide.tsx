import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Trans, useTranslation } from 'react-i18next';

import { RightLayout } from 'pages/common';
import { dateToUTCUnixTimestamp, getEndOfDay, getStartOfDay } from 'utils';
import isToday from 'date-fns/isToday';

import { DoctorList } from '../DoctorList';
import { DoctorsHeader } from '../DoctorsHeader';
import useStyles from './styles';
import { UseCase, getMedicalSpecialities, DoctorAvailability, getNextAvailableSchedules, Schedule } from 'pages/api';

export const FAKE_SESSION_ID = 'fake';
const DERMA_ID = 'fake';
const GINE_ID = 'fake';
const SESSION_STEP = 900;
const SESSION_EXTRA_TIME = 300;
const FAKE_SESSION_BODY = {
	base_cost: '25.00',
	id: FAKE_SESSION_ID,
	specialty_cost: '10.00',
	total_cost: '35.00',
};

const limitSchedules = (numSessions: string) => (_: Schedule, i: number) => {
	const limit = numSessions && !isNaN(+numSessions) && +numSessions;

	return limit ? i < limit : true;
};

const buildFirstDate = (): Date => {
	const now = new Date();
	const hour = now.getHours();
	const min = now.getMinutes();
	if (min > 0 && min <= 20) {
		now.setMinutes(20);
	} else if (min > 20 && min <= 40) {
		now.setMinutes(40);
	} else if (min > 40 && min < 60) {
		now.setHours(hour + 1);
		now.setMinutes(0);
	}
	now.setSeconds(0);
	return now;
};

const dateIsToday = (time: Date) => {
	const today = new Date();
	return (
		time.getDate() === today.getDate() &&
		time.getMonth() === today.getMonth() &&
		time.getFullYear() === today.getFullYear()
	);
};

const buildFakeSessions = (schedules: Schedule[]): Schedule[] => {
	if (schedules.length > 0) {
		const firstScheduleTime = schedules[0].startTime;
		const isToday = dateIsToday(firstScheduleTime);
		const lastIndex = schedules.length - 1;
		const firstSchedule = new Date(firstScheduleTime);
		firstSchedule.setHours(6);
		firstSchedule.setMinutes(0);
		firstSchedule.setSeconds(0);
		const lastSchedule = schedules[lastIndex];
		const newSchedules = [] as Schedule[];
		let currentStartTime = isToday ? buildFirstDate() : firstSchedule;
		for (let i = 0; i < 1000; i++) {
			// Set the end time by adding 15min to the first start time. i.e: 8:00 + 15min => endTime = 8:15
			const endTime = new Date(currentStartTime);
			endTime.setSeconds(endTime.getSeconds() + SESSION_STEP);
			// Preparing the fake schedule body
			const schedule = {
				...FAKE_SESSION_BODY,
				id: `${FAKE_SESSION_ID}-${i}`,
				startTime: currentStartTime,
				endTime: endTime,
			} as Schedule;
			newSchedules.push(schedule);
			// updating the next schedule startTime as the previous schedule endTime
			currentStartTime = new Date(endTime);
			currentStartTime.setSeconds(currentStartTime.getSeconds() + SESSION_EXTRA_TIME);
			// Comparing if the currentEndTime is the same as the endTime of the last schedule to stop
			if (dateToUTCUnixTimestamp(endTime) === dateToUTCUnixTimestamp(lastSchedule.endTime)) {
				break;
			}
		}
		return newSchedules;
	}
	return schedules;
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

		const filteredDoctors = doctors.map((doc) => ({
			...doc,
			schedules: doc.schedules.filter(limitSchedules(numSessions)),
		}));
		const isTargetUseCase = useCase.id === DERMA_ID || useCase.id === GINE_ID;
		const newDoctors = isTargetUseCase
			? filteredDoctors.map((doc: DoctorAvailability) => {
					const realSchedules = doc.schedules;
					const fakeSchedules = buildFakeSessions(realSchedules);
					const newSchedules = fakeSchedules.map((fake: Schedule, i: number) => {
						const searchSession = realSchedules.find(
							(real: Schedule) => dateToUTCUnixTimestamp(real.startTime) === dateToUTCUnixTimestamp(fake.startTime),
						);
						return i === fakeSchedules.length - 1 ? fake : searchSession || fake;
					});
					if (newSchedules.length > 0) {
						const lastInd = newSchedules.length - 1;
						newSchedules[0] = { ...newSchedules[0], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-first` };
						newSchedules[lastInd] = { ...newSchedules[lastInd], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-last` };
					}
					return {
						...doc,
						schedules: newSchedules,
					};
			  })
			: filteredDoctors;

		setDoctors(newDoctors);
	}
};

const getClosestSchedules = async (
	useCase: string,
	setSelectedDate: Function,
	setDoctors: Function,
	setMinDate: Function,
) => {
	const { nextAvailableDate, doctors } = await getNextAvailableSchedules(useCase);
	const isTargetUseCase = useCase === DERMA_ID || useCase === GINE_ID;
	const newDoctors = isTargetUseCase
		? doctors.map((doc: DoctorAvailability) => {
				const realSchedules = doc.schedules;
				const fakeSchedules = buildFakeSessions(realSchedules);
				const newSchedules = fakeSchedules.map((fake: Schedule, i: number) => {
					const searchSession = realSchedules.find(
						(real: Schedule) => dateToUTCUnixTimestamp(real.startTime) === dateToUTCUnixTimestamp(fake.startTime),
					);
					return i === fakeSchedules.length - 1 ? fake : searchSession || fake;
				});
				if (newSchedules.length > 0) {
					const lastInd = newSchedules.length - 1;
					newSchedules[0] = { ...newSchedules[0], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-first` };
					newSchedules[lastInd] = { ...newSchedules[lastInd], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-last` };
				}
				return {
					...doc,
					schedules: newSchedules,
				};
		  })
		: doctors;

	setDoctors(newDoctors);
	setSelectedDate(nextAvailableDate);
	setMinDate(nextAvailableDate);
};

interface RightSideProps {
	useCase: UseCase | null | undefined;
	isUserLoggedIn: boolean;
	minutes: string;
	numSessions: string;
	selectDoctorCallback: () => void;
	setDoctor: Function;
	setSchedule: Function;
	shouldShowMoreDoctorInfo: boolean;
}

const RightSide = ({
	useCase,
	minutes,
	numSessions,
	selectDoctorCallback,
	setDoctor,
	setSchedule,
	shouldShowMoreDoctorInfo,
}: RightSideProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [minDate, setMinDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	const updateDate = useCallback(
		(newDate: Date | null) => {
			setSelectedDate(newDate);
			getDoctors(newDate, useCase, setDoctors, minutes, numSessions);
		},
		[minutes, numSessions, useCase],
	);

	useEffect(() => {
		if (useCase) {
			getClosestSchedules(useCase.id, setSelectedDate, setDoctors, setMinDate);
		}
	}, [useCase]);

	const sectionWithSpecialty = () => (
		<>
			<DoctorsHeader useCase={useCase} date={selectedDate} updateDate={updateDate} minDate={minDate} />
			<Divider className={classes.divider} />
			{doctors.length > 0 ? (
				<DoctorList
					doctors={doctors}
					selectDoctorCallback={selectDoctorCallback}
					setDoctor={setDoctor}
					setSchedule={setSchedule}
					shouldShowMoreDoctorInfo={shouldShowMoreDoctorInfo}
				/>
			) : (
				<div className={classes.emptyMessageWrapper}>
					<Typography component="div" className={classes.emptyMessage}>
						{t('right.notFoundDoctors')}
					</Typography>
				</div>
			)}
		</>
	);

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				<div className={classes.titleContainer}>
					<Typography component="span" className={classes.title}>
						<Trans i18nKey={`selectDoctor:${'right.title'}`} />
					</Typography>
				</div>
				{sectionWithSpecialty()}
			</div>
		</RightLayout>
	);
};

export default RightSide;
