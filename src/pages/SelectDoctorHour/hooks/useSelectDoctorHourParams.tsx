/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import AppContext, { SelectDoctorSchedule } from 'AppContext';
import { stringify } from 'querystring';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DEV_IMAGES, isDevelopment, PROD_IMAGES } from 'utils/skillImages';

const ga = '2.23451262.537881002.1630940323-204450824.1629911523';

// export const defaultDoctor: DoctorAvailability = {
// 	id: '',
// 	name: '',
// 	lastName: '',
// 	cmp: '',
// 	aboutMe: '',
// 	diseases: [],
// 	education: '',
// 	rating: 0,
// 	schedules: [],
// 	speciality: '',
// 	specialityName: '',
// 	patientOpinions: [],
// 	profilePicture: '',
// };

const useSelectDoctorHourParams = () => {
	const history = useHistory();
	const { selectDoctorSchedule } = useContext(AppContext);
	const [dataSelectDoctor, setDataSelectDoctor] = useState<SelectDoctorSchedule | null>(null);

	useEffect(() => {
		if (selectDoctorSchedule === null || selectDoctorSchedule === undefined) {
			const images = isDevelopment() ? DEV_IMAGES : PROD_IMAGES;
			const useCase = images[0].id;
			console.log(images, useCase);
			history.push({
				pathname: '/seleccionar_doctor',
				search: stringify({
					malestar: useCase,
					show: 1,
					_ga: ga,
				}),
			});
		} else {
			setDataSelectDoctor(selectDoctorSchedule);
		}
	}, []);

	return [dataSelectDoctor];
};

export default useSelectDoctorHourParams;
