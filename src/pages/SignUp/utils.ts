import { AboutMeValues, MedicalDataValues, ContactValues } from './components';
import { Location } from 'history';

export const SUB_ROUTES = ['sobre_ti', 'datos_medicos', 'contacto'];

export const findStep = (location: Location) =>
	SUB_ROUTES.findIndex((route: string) => location && location.pathname === `/registro/${route}`);

export const checkStep = (
	location: Location,
	aboutMeData: AboutMeValues | undefined,
	push: Function,
	medicalData: MedicalDataValues | undefined,
) => {
	const index = findStep(location);
	if (index === 1 && !aboutMeData) {
		push('registro/sobre_ti');
	} else if (index === 2 && aboutMeData && !medicalData) {
		push('registro/datos_medicos');
	} else if (index === 2 && !aboutMeData && !medicalData) {
		push('registro/sobre_ti');
	}
};

export const formatNewUser = (user: AboutMeValues & MedicalDataValues & ContactValues) => {
	const newUser = { ...user };

	delete newUser.password;
	delete newUser.repeatPassword;

	return newUser;
};
