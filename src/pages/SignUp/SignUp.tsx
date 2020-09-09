import React, { useContext } from 'react';

import AppContext, { MYSELF, PAYMENT_STEP } from 'AppContext';

import NewUser from './NewUser';
import GetMedicalInformation from './GetMedicalInformation';

const SignUp = () => {
	const { user, useCase, triage, userToken, appointmentOwner, appointmentCreationStep, updateState } = useContext(
		AppContext,
	);
	const isForMyself = appointmentOwner === MYSELF;
	const commingFromAppointmentCreation = appointmentCreationStep === PAYMENT_STEP;
	const isUserLoggedIn = !!userToken;

	return commingFromAppointmentCreation && isForMyself && isUserLoggedIn ? (
		<GetMedicalInformation updateState={updateState} />
	) : (
		<NewUser
			useCase={useCase}
			triage={triage}
			isUserLoggedIn={isUserLoggedIn}
			updateState={updateState}
			appointmentOwner={appointmentOwner}
			commingFromAppointmentCreation={commingFromAppointmentCreation}
			currentUser={user}
		/>
	);
};

export default SignUp;
