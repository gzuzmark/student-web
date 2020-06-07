import { useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext, { User, SELECT_DOCTOR, PRE_SIGNUP } from 'AppContext';

export const usePageTitle = (title: string) => {
	useLayoutEffect(() => {
		document.title = `Alivia - ${title}`;
	}, [title]);
};

export const useCurrentUserRediction = (currentUser: User | null | undefined, redictedPath: string) => {
	const history = useHistory();

	useLayoutEffect(() => {
		if (currentUser) {
			history.push(redictedPath);
		}
	}, [currentUser, history, redictedPath]);
};

// Only use this hook once at the top of the component for data validation
// if you use it more than once then it will likely cause unexpected
// re-renders
export const useAppointmentStepValidation = (step: string) => {
	const { appointmentCreationStep, ...rest } = useContext(AppContext);
	const history = useHistory();

	useLayoutEffect(() => {
		switch (step) {
			case 'seleccionar-doctor':
				if (appointmentCreationStep !== SELECT_DOCTOR) {
					history.push('/triaje');
				}

				break;
			case 'pre-registro':
				if (appointmentCreationStep !== PRE_SIGNUP) {
					history.push('/triaje');
				}

				break;
			default:
				break;
		}
	}, [appointmentCreationStep, history, step]);

	return { appointmentCreationStep, ...rest };
};
