import {
	DoctorAvailableSchedules,
	getAvailableSchedulesByDoctorId,
	NextAvailableSchedules,
	validWeek,
} from 'pages/api';
import { useEffect, useState } from 'react';

const filterDataByDoctorId = (
	data: NextAvailableSchedules,
	doctorId: string,
	startDate: Date,
): DoctorAvailableSchedules => {
	const { doctors, isNextDays } = data;
	const doctorsFilter = doctors.filter((doctor) => doctor.id === doctorId);
	const dates = validWeek(doctorsFilter, startDate);
	return {
		doctor: doctorsFilter.length > 0 ? doctorsFilter[0] : null,
		dates: dates,
		isNextDays: isNextDays,
	};
};

const useScheduleWeek = (
	doctorId: string | undefined,
	startDate: Date | null,
): [boolean, DoctorAvailableSchedules | null] => {
	const [data, setData] = useState<DoctorAvailableSchedules | null>(null);
	const [isLoad, setIsLoad] = useState<boolean>(false);

	useEffect(() => {
		if (doctorId && startDate != null) {
			setIsLoad(true);
			getAvailableSchedulesByDoctorId(doctorId, startDate).then((response: NextAvailableSchedules) => {
				if (response) {
					setData(filterDataByDoctorId(response, doctorId, startDate));
					setIsLoad(false);
				}
			});
		}
	}, [doctorId, startDate]);

	return [isLoad, data];
};

export default useScheduleWeek;
