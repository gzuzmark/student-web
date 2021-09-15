import { getNextAvailableSchedules, NextAvailableSchedules } from 'pages/api';
import { useEffect, useState } from 'react';

const useDoctorSchedules = (
	useCaseId: string | null,
	startDate: Date | null,
): [boolean, NextAvailableSchedules | null] => {
	const [data, setData] = useState<NextAvailableSchedules | null>(null);
	const [isLoad, setIsLoad] = useState<boolean>(false);

	useEffect(() => {
		if (useCaseId != null) {
			setIsLoad(true);
			getNextAvailableSchedules(useCaseId, startDate || new Date()).then((response: NextAvailableSchedules) => {
				if (response) {
					setData(response);
					setIsLoad(false);
				}
			});
		}
	}, [useCaseId, startDate]);

	return [isLoad, data];
};

export default useDoctorSchedules;
