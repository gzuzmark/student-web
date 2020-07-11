import { AppointmentCreationStep, TRIAGE_STEP, SELECT_DOCTOR_STEP, PRE_SIGNUP_STEP, PAYMENT_STEP } from 'AppContext';

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
		case PRE_SIGNUP_STEP:
			return '/seleccionar_perfil';
		case PAYMENT_STEP:
			return '/pago';
		default:
			return defaultRedirectPath || '/seleccionar_perfil';
	}
};
