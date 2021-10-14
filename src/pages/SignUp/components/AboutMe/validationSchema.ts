import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';
import { boolean } from 'yup';

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
	},
	gender: {
		required: i18next.t('signUp:aboutme.validation.gender.required'),
	},
	documentIssueDate: {
		required: i18next.t('signUp:aboutme.validation.documentIssueDate.required'),
	},
	haveAllergies: {
		required: i18next.t('signUp:medicalData.validation.haveAllergy.required'),
	},
	condition: {
		required: i18next.t('signUp:medicalData.validation.condition.required'),
	},
};

const validationSchema = object().shape({
	identificationType: string().required(messages.identificationType.required),
	identification: string()
		.min(8, messages.identification.digits)
		.max(12, messages.identification.digits)
		.required(messages.identification.required)
		.when('identificationType', {
			is: `1`,
			then: string().matches(/^[0-9]{8}$/g, 'DNI inválido'),
		})
		.when('identificationType', {
			is: `2`,
			then: string().matches(/\b[a-zA-Z0-9]{12}\b/, 'CE inválido'),
		}),
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
		.min(new Date('1900-01-01'), messages.birthDate.required)
		.max(new Date('2100-01-01'), messages.birthDate.required)
		.typeError(messages.birthDate.required)
		.nullable(),
	gender: number().required(messages.gender.required),
	haveAllergies: boolean().required(messages.haveAllergies.required).nullable(),
	condition: boolean().required(messages.condition.required).nullable(),
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
