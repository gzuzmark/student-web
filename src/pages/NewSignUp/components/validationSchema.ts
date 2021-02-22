import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object, date, number } = Yup;

const messages = {
	name: {
		required: i18next.t('newSignUp:aboutPatient.validation.name.required'),
	},
	lastName: {
		required: i18next.t('newSignUp:aboutPatient.validation.lastName.required'),
	},
	secondSurname: {
		required: i18next.t('newSignUp:aboutPatient.validation.secondSurname.required'),
	},
	birthDate: {
		required: i18next.t('newSignUp:aboutPatient.validation.birthDate.required'),
	},
	gender: {
		required: i18next.t('newSignUp:aboutPatient.validation.gender.required'),
	},
	identification: {
		required: i18next.t('newSignUp:contactPatient.validation.id.required'),
		digits: i18next.t('newSignUp:contactPatient.validation.id.digits'),
	},
	phoneNumber: {
		required: i18next.t('newSignUp:contactPatient.validation.phoneNumber.required'),
	},
	email: {
		required: i18next.t('newSignUp:contactPatient.validation.email.required'),
		validEmail: i18next.t('newSignUp:contactPatient.validation.email.validEmail'),
	},
	password: {
		required: i18next.t('global:createPassword.validation.password.required'),
		minLength: i18next.t('global:createPassword.validation.password.incorrectFormat'),
	},
	repeatPassword: {
		required: i18next.t('global:createPassword.validation.repeatPassword.required'),
		notEqual: i18next.t('global:createPassword.validation.repeatPassword.notEqual'),
	},
};

export const aboutPatientValidationSchema = object().shape({
	name: string().required(messages.name.required),
	lastName: string().required(messages.lastName.required),
	secondSurname: string().required(messages.secondSurname.required),
	birthDate: date()
		.required(messages.birthDate.required)
		.min(new Date('1900-01-01'), messages.birthDate.required)
		.max(new Date('2100-01-01'), messages.birthDate.required)
		.typeError(messages.birthDate.required)
		.nullable(),
	gender: number().required(messages.gender.required),
});

export const contactPatientValidationSchema = object().shape({
	identification: string()
		.min(8, messages.identification.digits)
		.max(12, messages.identification.digits)
		.required(messages.identification.required),
	phoneNumber: string()
		.min(9, messages.phoneNumber.required)
		.max(9, messages.phoneNumber.required)
		// eslint-disable-next-line
		// @ts-ignore
		.digits(messages.phoneNumber.required)
		.required(messages.phoneNumber.required),
	// eslint-disable-next-line
	// @ts-ignore
	email: string().required(messages.email.required).validEmail(messages.email.validEmail),
	identificationtype: string().required(messages.gender.required),
});

export const patientPasswordValidationSchema = object().shape({
	password: string().required(messages.password.required).min(6, messages.password.minLength),
	repeatPassword: string()
		.required(messages.repeatPassword.required)
		// eslint-disable-next-line
		// @ts-ignore
		.toEqual('password', messages.repeatPassword.notEqual),
});
