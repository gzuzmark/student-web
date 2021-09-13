import { DoctorAvailability } from 'pages/api';
import { DoctorHeader } from 'pages/SelectDoctor/components/DoctorHeader';
import React, { useEffect, useState } from 'react';
import useSelectDoctorHourParams, { defaultDoctor } from './hooks/useSelectDoctorHourParams';

const SelectDoctorHour = () => {
	const [params] = useSelectDoctorHourParams();
	const [doctor, setDoctor] = useState<DoctorAvailability>(defaultDoctor);

	useEffect(() => {
		if (params) {
			const { doctor } = params;
			setDoctor(doctor);
		}
	}, [params]);

	return (
		<div>
			<DoctorHeader doctor={doctor} />
		</div>
	);
};

export default SelectDoctorHour;
