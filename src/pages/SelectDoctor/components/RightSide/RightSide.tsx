import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { isSameDay } from 'date-fns/esm';
import isToday from 'date-fns/isToday';
import {
	DateSchedule,
	DoctorAvailability,
	getMedicalSpecialities,
	getNextAvailableSchedules,
	Schedule,
	UseCase,
} from 'pages/api';
import { Loading, RightLayout } from 'pages/common';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { dateToUTCUnixTimestamp, getEndOfDay, getStartOfDay } from 'utils';
import Carrousel from '../Carrousel/Carrousel';
import { DoctorList } from '../DoctorList';
import useStyles from './styles';

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
				isDisabled: true,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	selectedDate: Date,
	setSelectedDate: Function,
	setDoctors: Function,
	setMinDate: Function,
	setListDates: Function,
	setIsNextWeek: Function,
) => {
	const { nextAvailableDate, doctors, dates, isNextDays } = await getNextAvailableSchedules(useCase, selectedDate);
	// const isTargetUseCase = useCase === DERMA_ID || useCase === GINE_ID;
	// const newDoctors = isTargetUseCase
	// 	? doctors.map((doc: DoctorAvailability) => {
	// 			const realSchedules = doc.schedules;
	// 			const fakeSchedules = buildFakeSessions(realSchedules);
	// 			const newSchedules = fakeSchedules.map((fake: Schedule, i: number) => {
	// 				const searchSession = realSchedules.find(
	// 					(real: Schedule) => dateToUTCUnixTimestamp(real.startTime) === dateToUTCUnixTimestamp(fake.startTime),
	// 				);
	// 				return i === fakeSchedules.length - 1 ? fake : searchSession || fake;
	// 			});
	// 			if (newSchedules.length > 0) {
	// 				const lastInd = newSchedules.length - 1;
	// 				newSchedules[0] = { ...newSchedules[0], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-first` };
	// 				newSchedules[lastInd] = { ...newSchedules[lastInd], ...FAKE_SESSION_BODY, id: `${FAKE_SESSION_ID}-last` };
	// 			}
	// 			return {
	// 				...doc,
	// 				schedules: newSchedules,
	// 			};
	// 	  })
	// 	: doctors;

	console.log(dates);
	setDoctors(doctors);
	setSelectedDate(selectedDate);
	setMinDate(nextAvailableDate);
	setListDates(dates);
	setIsNextWeek(isNextDays);
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
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [, setMinDate] = useState<Date | null>(new Date());
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	const [isLoadData, setIsLoadData] = useState<boolean>(true);
	const [listDates, setListDates] = useState<DateSchedule[]>([]);
	const [doctorsForDay, setDoctorsForDay] = useState<DoctorAvailability[]>([]);
	const [isNextWeek, setIsNextWeek] = useState<boolean>(false);

	// const updateDate = useCallback(
	// 	(newDate: Date) => {
	// 		setSelectedDate(newDate);
	// 		setIsLoadData(true);
	// 		getDoctors(newDate, useCase, setDoctors, minutes, numSessions).finally(() => setIsLoadData(false));
	// 	},
	// 	[minutes, numSessions, useCase],
	// );
	useEffect(() => {
		if (selectedDate != null) {
			setDoctorsForDay(
				doctors
					.map((doctor: DoctorAvailability) => {
						const schedulesSelectedDay = [...doctor.schedules].filter((schedule: Schedule) => {
							const { startTime } = schedule;
							return isSameDay(selectedDate, startTime);
						});
						const doctorCopy = { ...doctor };
						doctorCopy.schedules = schedulesSelectedDay;
						return doctorCopy;
					})
					.filter((doctor) => doctor.schedules.length > 0),
			);
		}
	}, [selectedDate, doctors]);

	useEffect(() => {
		if (useCase) {
			setIsLoadData(true);
			getClosestSchedules(
				useCase.id,
				new Date(),
				setSelectedDate,
				setDoctors,
				setMinDate,
				setListDates,
				setIsNextWeek,
			).finally(() => setIsLoadData(false));
		}
	}, [useCase]);

	const sectionWithSpecialty = () => (
		<>
			{doctorsForDay.length > 0 ? (
				<DoctorList
					doctors={doctorsForDay}
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
		<RightLayout className={classes.rightLayout}>
			<div className={classes.wrapper}>
				<div className={classes.titleContainer}>
					<Typography component="span" className={classes.title}>
						<Trans i18nKey={`selectDoctor:${'right.title'}`} />
					</Typography>
				</div>
				{/* <DoctorsHeader useCase={useCase} date={selectedDate} updateDate={updateDate} minDate={minDate} /> */}
				<Carrousel
					dates={isLoadData ? null : listDates}
					selectedDate={selectedDate}
					isNextAvailableDate={isNextWeek}
					onSelectDate={(date: Date) => setSelectedDate(date)}
				/>
				<Divider className={classes.divider} />
				{isLoadData ? <Loading loadingMessage="Buscando disponibilidad..." /> : sectionWithSpecialty()}
			</div>
		</RightLayout>
	);
};

export default RightSide;
