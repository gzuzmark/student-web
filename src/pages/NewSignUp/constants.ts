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
	identificationType: '',
	phoneNumber: '',
	email: '',
	address: '',
};

export const initialPatientPassword: PatientPasswordValues = {
	password: '',
	confirmPassword: '',
	isTerm: false,
	isClub: false,
};
