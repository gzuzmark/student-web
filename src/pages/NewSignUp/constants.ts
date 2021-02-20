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
};

export const initialPatientPassword: PatientPasswordValues = {
	password: '',
	confirmPassword: '',
};
