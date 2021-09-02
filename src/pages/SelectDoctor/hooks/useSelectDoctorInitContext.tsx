import AppContext, { GUEST, SELECT_DOCTOR_STEP } from 'AppContext';
import { UseCase } from 'pages/api';
import { useContext, useEffect } from 'react';
import { DEFAULT_TRIAGE_VALUES } from '../services/contants';
import useSelectDoctorParam, { SelectDoctorParams } from './useSelectDoctorParam';
import useUseCase from './useUseCase';

const useSelectDoctorInitContext = (): [SelectDoctorParams, UseCase | null] => {
	const [params] = useSelectDoctorParam();
	const [useCase] = useUseCase(params.malestar);
	const { updateState } = useContext(AppContext);
	const { isUbigeoEnabled, utmSource, utmMedium, utmCampaign, showSmallSignUp } = params;

	useEffect(() => {
		if (updateState && useCase) {
			updateState({
				useCase: useCase,
				appointmentCreationStep: SELECT_DOCTOR_STEP,
				triage: DEFAULT_TRIAGE_VALUES,
				appointmentOwner: GUEST,
				isUbigeoEnabled,
				trackParams: {
					utmSource,
					utmMedium,
					utmCampaign,
				},
				showSmallSignUp,
			});
		}
	}, [isUbigeoEnabled, showSmallSignUp, updateState, useCase, utmCampaign, utmMedium, utmSource]);

	return [params, useCase];
};

export default useSelectDoctorInitContext;
