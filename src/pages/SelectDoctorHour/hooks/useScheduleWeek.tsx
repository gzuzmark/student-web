import { DoctorAvailableSchedules, getAvailableSchedulesByDoctorId, NextAvailableSchedules } from 'pages/api';
import { useEffect, useState } from 'react';

const filterDataByDoctorId = (data: NextAvailableSchedules, doctorId: string): DoctorAvailableSchedules => {
	const { doctors, isNextDays, dates } = data;
	const doctorsFilter = doctors.filter((doctor) => doctor.id === doctorId);

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
					setData(filterDataByDoctorId(response, doctorId));
					setIsLoad(false);
				}
			});
		}
	}, [doctorId, startDate]);

	return [isLoad, data];
};

export default useScheduleWeek;
