import { getUseCase, UseCase } from 'pages/api';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';

// const requestUseCaseID = async (useCaseID: string, updateState: Function | undefined, toggleWarningModal: Function) => {
// 	if (updateState) {
// 		const useCase = await getUseCase(useCaseID);
// 		if (useCase && window.nutritionistUseCaseId === useCase.id) {
// 			toggleWarningModal(true);
// 		}
// 		updateState({
// 			useCase,
// 			appointmentCreationStep: SELECT_DOCTOR_STEP,
// 			triage: DEFAULT_TRIAGE_VALUES,
// 			appointmentOwner: GUEST,
// 		});
// 	}
// };

const useUseCase = (id: string): [UseCase | null] => {
	const [useCase, setUseCase] = useState<UseCase | null>(null);

	const requestUseCaseID = useCallback((id: string) => {
		getUseCase(id).then((useCase: UseCase | undefined) => {
			if (useCase) {
				setUseCase(useCase);
			}
		});
	}, []);

	useEffect(() => {
		if (id && id.length > 8) {
			requestUseCaseID(id);
		}
	}, [id, requestUseCaseID]);

	return [useCase];
};

export default useUseCase;
