import { AppointmentCreationStep, TRIAGE_STEP, SELECT_DOCTOR_STEP, PAYMENT_STEP } from 'AppContext';

export const redirectToURL = (url: string, openInNewTab = false) => {
	if (openInNewTab) {
		window.open(url, '_blank');
	} else {
		window.location.href = url;
	}
};

export const redirectToBaseAlivia = () => {
	redirectToURL('https://alivia.pe');
};

export const getAppointmentRedirectPath = (
	appointmentCreationStep: AppointmentCreationStep | undefined,
	defaultRedirectPath?: string,
): string => {
	switch (appointmentCreationStep) {
		case TRIAGE_STEP:
		case SELECT_DOCTOR_STEP:
			return 'back';
		case PAYMENT_STEP:
			return '/registro/datos_medicos';
		default:
			return defaultRedirectPath || '/seleccionar_paciente';
	}
};
