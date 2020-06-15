import { useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext, { SELECT_DOCTOR_STEP, PRE_SIGNUP_STEP, PAYMENT_STEP, CONFIRMATION_STEP } from 'AppContext';
import { UseCase } from 'pages/api';
import {
	CreateAppointmentRoute,
	SELECT_DOCTOR_ROUTE,
	PRE_SIGN_UP_ROUTE,
	PAYMENT_ROUTE,
	CONFIRMATION_ROUTE,
} from 'routes';

import { redirectToBaseAlivia } from './redirects';

export const usePageTitle = (title: string) => {
	useLayoutEffect(() => {
		document.title = `Alivia - ${title}`;
	}, [title]);
};

export const useCurrentUserRediction = (currentUser: string | null | undefined, redictedPath: string) => {
	const history = useHistory();

	useLayoutEffect(() => {
		if (currentUser) {
			history.push(redictedPath);
		}
		// eslint-disable-next-line
	}, []);
};

const redirectIfUseCaseIsEmpty = (useCase: UseCase | null | undefined) => {
	if (!useCase) {
		redirectToBaseAlivia();
	}
};

// Only use this hook once at the top of the component for data validation
// if you use it more than once then it will likely cause unexpected
// re-renders
export const useAppointmentStepValidation = (route: CreateAppointmentRoute) => {
	const { appointmentCreationStep, useCase, ...rest } = useContext(AppContext);

	useLayoutEffect(() => {
		switch (route) {
			case SELECT_DOCTOR_ROUTE:
				redirectIfUseCaseIsEmpty(useCase);
				if (appointmentCreationStep !== SELECT_DOCTOR_STEP) {
					redirectToBaseAlivia();
				}

				break;
			case PRE_SIGN_UP_ROUTE:
				redirectIfUseCaseIsEmpty(useCase);
				if (appointmentCreationStep !== PRE_SIGNUP_STEP) {
					redirectToBaseAlivia();
				}

				break;
			case PAYMENT_ROUTE:
				redirectIfUseCaseIsEmpty(useCase);
				if (appointmentCreationStep !== PAYMENT_STEP) {
					redirectToBaseAlivia();
				}
				break;
			case CONFIRMATION_ROUTE:
				redirectIfUseCaseIsEmpty(useCase);
				if (appointmentCreationStep !== CONFIRMATION_STEP) {
					redirectToBaseAlivia();
				}
				break;
			default:
				break;
		}
		//eslint-disable-next-line
	}, []);

	return { appointmentCreationStep, useCase, ...rest };
};
