import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object, date, number } = Yup;

const messages = {
	identificationType: {
		required: i18next.t('signUp:contact.validation.idType.required'),
	},
	identification: {
		required: i18next.t('signUp:contact.validation.id.required'),
		digits: i18next.t('signUp:contact.validation.id.digits'),
	},
	name: {
		required: i18next.t('signUp:aboutme.validation.name.required'),
	},
	lastName: {
		required: i18next.t('signUp:aboutme.validation.lastName.required'),
	},
	secondSurname: {
		required: i18next.t('signUp:aboutme.validation.secondSurname.required'),
	},
	birthDate: {
		required: i18next.t('signUp:aboutme.validation.birthDate.required'),
		valid: i18next.t('signUp:aboutme.validation.birthDate.valid'),
	},
	gender: {
		required: i18next.t('signUp:aboutme.validation.gender.required'),
	},
	documentIssueDate: {
		required: i18next.t('signUp:aboutme.validation.documentIssueDate.required'),
	},
};

const validationSchema = object().shape({
	name: string()
		.required(messages.name.required)
		.matches(/^[aA-zZ-ZÀ-ÿ\s]+$/, 'Ingrese solo letras'),
	lastName: string()
		.required(messages.lastName.required)
		.matches(/^[aA-zZ-ZÀ-ÿ\s]+$/, 'Ingrese solo letras'),
	secondSurname: string()
		.required(messages.secondSurname.required)
		.matches(/^[aA-zZ-ZÀ-ÿ\s]+$/, 'Ingrese solo letras'),
	birthDate: date()
		.required(messages.birthDate.required)
		.min(new Date('1910-01-01'), messages.birthDate.required)
		.max(new Date('2090-12-01'), messages.birthDate.valid)
		.typeError(messages.birthDate.required)
		.nullable(),
	gender: number().required(messages.gender.required),
});

export const minorValidationSchema = object().shape({
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
	identification: string().required(messages.identification.required),
	documentIssueDate: date()
		.required(messages.documentIssueDate.required)
		.min(new Date('1900-01-01'), messages.documentIssueDate.required)
		.max(new Date('2100-01-01'), messages.documentIssueDate.required)
		.typeError(messages.documentIssueDate.required)
		.nullable(),
});

export default validationSchema;
