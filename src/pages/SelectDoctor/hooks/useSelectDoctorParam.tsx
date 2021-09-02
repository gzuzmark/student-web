import qs from 'query-string';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface SelectDoctorParams {
	malestar: string;
	show: string;
	ga: string;
	isUbigeoEnabled: boolean;
	minutes: string;
	numSessions: string;
	utmSource: string;
	utmMedium: string;
	utmCampaign: string;
	showSmallSignUp: boolean;
}

const defaultSelectDoctorParams: SelectDoctorParams = {
	malestar: '',
	show: '1',
	ga: '',
	isUbigeoEnabled: false,
	minutes: '',
	numSessions: '',
	utmSource: '',
	utmMedium: '',
	utmCampaign: '',
	showSmallSignUp: false,
};

const parseParams = (location: { search: string }): SelectDoctorParams => {
	const parse = qs.parse(location.search);
	const params: SelectDoctorParams = { ...defaultSelectDoctorParams };
	if (parse.malestar != undefined) {
		params.malestar = String(parse.malestar);
	}
	if (parse._ga != undefined) {
		params.ga = String(parse._ga);
	}
	return params;
};

const useSelectDoctorParam = (): [SelectDoctorParams] => {
	const location = useLocation();
	const [params, setParams] = useState<SelectDoctorParams>(parseParams(location));

	useEffect(() => {
		setParams(parseParams(location));
	}, [location]);

	return [params];
};

export default useSelectDoctorParam;
