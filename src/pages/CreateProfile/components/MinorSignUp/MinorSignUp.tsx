import React, { useState, useCallback, FC } from 'react';
import { useHistory } from 'react-router';

import LeftSide from './LeftSide';
import RightSide from './RightSide';
// import { AboutMeValues, MedicalDataValues } from 'pages/SignUp/components';
// import { createNewProfile } from 'pages/api';

interface MinorSignUpProps {
	familyRelationship: string;
}

const MinorSignUp: FC<MinorSignUpProps> = () => {
	const [step, setStep] = useState<number>(0);
	const nextStep = () => {
		setStep(step + 1);
	};
	const history = useHistory();
	const onSubmit = useCallback(
		async (_, onError: Function | undefined) => {
			try {
				// await createNewProfile({ ...newProfile, identification: newProfile.identification || '', familyRelationship });
				history.push('/seleccionar_perfil');
			} catch (e) {
				if (onError) {
					onError(e);
				}
			}
		},
		[history],
	);

	return (
		<>
			<LeftSide step={step} />
			<RightSide step={step} nextStep={nextStep} onSubmit={onSubmit} />
		</>
	);
};

export default MinorSignUp;
