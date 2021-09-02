import AppContext from 'AppContext';
import { useContext, useEffect } from 'react';
import useSelectDoctorParam from './useSelectDoctorParam';
import useUseCase from './useUseCase';

const useSelectDoctorInitContext = () => {
	const [params] = useSelectDoctorParam();
	const [useCase] = useUseCase(params.malestar);
	const { updateState } = useContext(AppContext);

	useEffect(() => {
		if (updateState && useCase) {
			updateState({
				useCase: useCase,
			});
		}
	}, [updateState, useCase]);

	return [params, useCase];
};

export default useSelectDoctorInitContext;
