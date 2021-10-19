import { DoctorAvailabilityUseCase, getAllDoctorsBySpecialty } from 'pages/api';
import { useEffect, useState } from 'react';

const useAllDoctorsForUseCase = (useCaseId: string) => {
	const [doctors, setDoctors] = useState<DoctorAvailabilityUseCase[]>([]);

	useEffect(() => {
		if (useCaseId !== '') {
			getAllDoctorsBySpecialty(useCaseId).then((data) => {
				setDoctors(data);
			});
		}
	}, [useCaseId]);

	return [doctors];
};

export default useAllDoctorsForUseCase;
