/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import qs from 'query-string';
import AppContext, { SelectDoctorSchedule } from 'AppContext';
import { stringify } from 'querystring';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { DEV_IMAGES, isDevelopment, PROD_IMAGES } from 'utils/skillImages';

const ga = '2.23451262.537881002.1630940323-204450824.1629911523';

const useSelectDoctorHourParams = (): [string, SelectDoctorSchedule | undefined | null] => {
	const history = useHistory();
	const location = useLocation();
	const { selectDoctorSchedule } = useContext(AppContext);
	const [dataSelectDoctor, setDataSelectDoctor] = useState<SelectDoctorSchedule | undefined | null>(undefined);
	const [doctorId, setDoctorId] = useState<string>('');

	const redirectoToBack = () => {
		const images = isDevelopment() ? DEV_IMAGES : PROD_IMAGES;
		const useCase = images[0].id;
		history.push({
			pathname: '/seleccionar_doctor',
			search: stringify({
				malestar: useCase,
				show: 1,
				_ga: ga,
			}),
		});
	};

	useEffect(() => {
		const parse = qs.parse(location.search);
		const doctorId = parse.doctor;

		if (selectDoctorSchedule !== null && selectDoctorSchedule !== undefined) {
			setDataSelectDoctor(selectDoctorSchedule);
		} else {
			setDataSelectDoctor(null);
		}

		if (doctorId !== undefined && (doctorId as string).length > 20) {
			setDoctorId(String(doctorId));
		} else {
			redirectoToBack();
			return;
		}
	}, []);

	return [doctorId, dataSelectDoctor];
};

export default useSelectDoctorHourParams;
