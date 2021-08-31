import { AboutPatientValues, PatientPasswordValues } from './types';

export const initialAboutPatientValues: AboutPatientValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
};

export const initialPatientPassword: PatientPasswordValues = {
	password: '',
	confirmPassword: '',
};

export const modalityOptions = [
	// { label: 'A Domicilio', value: 1 },
	{ label: 'Presencial', value: 2 },
];
