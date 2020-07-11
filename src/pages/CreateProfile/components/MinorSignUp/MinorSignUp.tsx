import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { AboutMeValues, MedicalDataValues } from 'pages/SignUp/components';
import { createNewProfile } from 'pages/api';

interface MinorSignUpProps {
	familyRelationship: string;
}

const MinorSignUp = ({ familyRelationship }: MinorSignUpProps) => {
	const [step, setStep] = useState<number>(0);
	const nextStep = () => {
		setStep(step + 1);
	};
	const history = useHistory();
	const onSubmit = useCallback(
		async (newProfile: AboutMeValues & MedicalDataValues, onError: Function | undefined) => {
			try {
				await createNewProfile(
					{ ...newProfile, identification: newProfile.identification || '', familyRelationship },
					'token',
				);
				history.push('/seleccionar_perfil');
			} catch (e) {
				if (onError) {
					onError(e);
				}
			}
		},
		[familyRelationship, history],
	);

	return (
		<>
			<LeftSide step={step} />
			<RightSide step={step} nextStep={nextStep} onSubmit={onSubmit} />
		</>
	);
};

export default MinorSignUp;
