import { AboutPatientValues, ContactPatientValues, PatientPasswordValues } from './types';

export const initialAboutPatientValues: AboutPatientValues = {
	name: '',
	lastName: '',
	secondSurname: '',
	birthDate: null,
	gender: undefined,
};

export const initialContactPatientValues: ContactPatientValues = {
	identification: '',
	phoneNumber: '',
	email: '',
	address: '',
	ubigeo: '',
};

export const initialPatientPassword: PatientPasswordValues = {
	password: '',
	confirmPassword: '',
};
