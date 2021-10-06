import AppContext from 'AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { redirectToBaseAlivia, usePageTitle } from 'utils';
import { Container } from '../common';
import DropdownSpecialties from './components/DropdownSpecialties/DropdownSpecialties';
import { RightSide } from './components/RightSide';
import WarningModal from './components/WarningModal/WarningModal';
import useSelectDoctorInitContext from './hooks/useSelectDoctorInitContext';

const SelectDoctor = () => {
	usePageTitle('Seleccion doctor');

	const { userToken } = useContext(AppContext);
	const [params, useCase] = useSelectDoctorInitContext();
	const [showWarningModal, toggleWarningModal] = useState<boolean>(false);
	const [specialityId, setEspecialityId] = useState<string | null>(null);
	const { malestar } = params;

	const onRejectWarning = () => {
		toggleWarningModal(false);
		redirectToBaseAlivia();
	};

	const onAcceptWarning = () => toggleWarningModal(false);

	useEffect(() => {
		if (useCase && window.nutritionistUseCaseId === useCase.id) {
			//toggleWarningModal(true);
		}
		if (malestar) {
			setEspecialityId(malestar);
		}
		if (useCase) {
			const { id } = useCase;
			setEspecialityId(id);
		}
	}, [useCase, malestar]);

	return (
		<>
			<DropdownSpecialties specialityId={specialityId} />
			<Container>
				<RightSide isUserLoggedIn={!!userToken} useCaseId={malestar} />
				<WarningModal isOpen={showWarningModal} onCancel={onRejectWarning} onAccept={onAcceptWarning} />
			</Container>
		</>
	);
};

export default SelectDoctor;
