import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AppContext, { SelectDoctorSchedule } from 'AppContext';
import { isSameDay } from 'date-fns/esm';
import { DateSchedule, DoctorAvailability, Schedule } from 'pages/api';
import { Loading, RightLayout } from 'pages/common';
import useDoctorSchedules from 'pages/SelectDoctor/hooks/useDoctorShedules';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Carrousel from '../Carrousel/Carrousel';
import { DoctorList } from '../DoctorList';
import FilterDateDoctor, { FilterType } from '../FilterDateDoctor/FilterDateDoctor';
import useStyles from './styles';
import DoctorListFilter from '../DoctorList/DoctorListFilter';
import useAllDoctorsForUseCase from 'pages/SelectDoctor/hooks/useAllDoctorsForUseCase';
interface RightSideProps {
	useCaseId: string | null | undefined;
	isUserLoggedIn?: boolean;
	selectDoctorCallback?: () => void;
	setDoctor?: Function;
	setSchedule?: Function;
}

const RightSide = ({ useCaseId }: RightSideProps) => {
	const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const { updateState } = useContext(AppContext);
	const history = useHistory();

	const [startDateWeek, setStartDateWeek] = useState<Date>(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [doctors, setDoctors] = useState<DoctorAvailability[]>([]);
	const [listDates, setListDates] = useState<DateSchedule[]>([]);
	const [doctorsForDay, setDoctorsForDay] = useState<DoctorAvailability[]>([]);
	const [isNextWeek, setIsNextWeek] = useState<boolean>(false);
	const [isLoad, schedules] = useDoctorSchedules(useCaseId || '', startDateWeek);
	const [allDoctors] = useAllDoctorsForUseCase(useCaseId || '');
	const [valueFilter, setValueFilter] = useState<FilterType>('date');

	const onSeeMore = (doctor: DoctorAvailability) => {
		const doctorSelected = doctors.find((doc) => doc.id === doctor.id);
		if (doctorSelected) {
			const data: SelectDoctorSchedule = {
				doctorId: undefined,
				useCase: useCaseId || '',
				doctor: doctorSelected,
				listDates: listDates,
				isNextDays: isNextWeek,
				selectDate: selectedDate || new Date(),
			};
			if (updateState) {
				updateState({
					selectDoctorSchedule: data,
				});
				history.push({
					pathname: '/seleccionar_doctor_ver_mas',
					search: `doctor=${doctorSelected.id}`,
				});
			}
		}
	};

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
		} else {
			setDoctorsForDay([]);
		}
	}, [selectedDate, doctors]);

	useEffect(() => {
		if (schedules != null) {
			setDoctors(schedules.doctors);
			setIsNextWeek(schedules.isNextDays);
			setListDates(schedules.dates);
		}
	}, [schedules]);

	const sectionWithSpecialty = () => {
		if (valueFilter === 'doctor') {
			return (
				<>
					{allDoctors.length > 0 ? (
						<DoctorListFilter doctors={allDoctors} />
					) : (
						<div className={classes.emptyMessageWrapper}>
							<Typography component="div" className={classes.emptyMessage}>
								{t('right.notFoundDoctors')}
							</Typography>
						</div>
					)}
				</>
			);
		}
		return (
			<>
				{doctorsForDay.length > 0 ? (
					<DoctorList doctors={doctorsForDay} shouldShowMoreDoctorInfo={true} onSeeMore={onSeeMore} />
				) : (
					<div className={classes.emptyMessageWrapper}>
						<Typography component="div" className={classes.emptyMessage}>
							{t('right.notFoundDoctors')}
						</Typography>
					</div>
				)}
			</>
		);
	};

	const onChangeFilterDateDoctor = (value: FilterType) => {
		setValueFilter(value);
	};

	return (
		<RightLayout className={classes.rightLayout}>
			<div className={classes.wrapper}>
				<FilterDateDoctor value={valueFilter} onChangeFilter={onChangeFilterDateDoctor} />
				{valueFilter === 'date' && (
					<Carrousel
						dates={isLoad ? null : listDates}
						selectedDate={selectedDate}
						isNextAvailableDate={isNextWeek}
						onSelectDate={(date: Date | null) => setSelectedDate(date)}
						onBackWeek={(date: Date) => setStartDateWeek(date)}
						onNextWeek={(date: Date) => setStartDateWeek(date)}
					/>
				)}
				<Divider className={classes.divider} />
				{isLoad ? <Loading loadingMessage="Buscando disponibilidad..." /> : sectionWithSpecialty()}
			</div>
		</RightLayout>
	);
};

export default RightSide;
