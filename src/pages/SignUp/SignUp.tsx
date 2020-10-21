import React, { useContext } from 'react';

import AppContext, { MYSELF, PAYMENT_STEP } from 'AppContext';

import NewUser from './NewUser';
import GetMedicalInformation from './GetMedicalInformation';
import SmallSignUp from './SmallSignUp';

const SignUp = () => {
	const {
		user,
		useCase,
		triage,
		userToken,
		appointmentOwner,
		appointmentCreationStep,
		updateState,
		showSmallSignUp,
	} = useContext(AppContext);
	const isForMyself = appointmentOwner === MYSELF;
	const commingFromAppointmentCreation = appointmentCreationStep === PAYMENT_STEP;
	const isUserLoggedIn = !!userToken;

	if ((!isUserLoggedIn && showSmallSignUp) || (isUserLoggedIn && !isForMyself && showSmallSignUp)) {
		return <SmallSignUp updateContextState={updateState} userToken={user?.id} />;
	}

	return commingFromAppointmentCreation && isForMyself && isUserLoggedIn ? (
		<GetMedicalInformation updateState={updateState} appointmentOwner={appointmentOwner} />
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
