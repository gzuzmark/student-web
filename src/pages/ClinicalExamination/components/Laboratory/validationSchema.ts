import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object } = Yup;

const messages = {
	identification: {
		required: i18next.t('signUp:contact.validation.id.required'),
		digits: i18next.t('signUp:contact.validation.id.digits'),
	},
	identificationType: {
		required: i18next.t('signUp:contact.validation.idType.required'),
	},
	phoneNumber: {
		required: i18next.t('signUp:contact.validation.phoneNumber.required'),
	},
	email: {
		required: i18next.t('signUp:contact.validation.email.required'),
		validEmail: i18next.t('signUp:contact.validation.email.validEmail'),
	},
	password: {
		required: i18next.t('signUp:contact.validation.password.required'),
		minLength: i18next.t('signUp:contact.validation.password.incorrectFormat'),
	},
	repeatPassword: {
		required: i18next.t('signUp:contact.validation.repeatPassword.required'),
		notEqual: i18next.t('signUp:contact.validation.repeatPassword.notEqual'),
	},
};

export const newUservalidationSchema = object().shape({
	identificationType: string().required(messages.identificationType.required),
	identification: string()
		.min(8, messages.identification.digits)
		.max(12, messages.identification.digits)
		.required(messages.identification.required)
		.when('identificationType', {
			is: 1,
			then: string().matches(/^[0-9]{8}$/g, 'DNI inválido'),
		})
		.when('identificationType', {
			is: 2,
			then: string().matches(/^[a-zA-Z0-9]{9,12}$/, 'CE inválido'),
		}),
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
});

export const defaultNewUserValidationSchema = object().shape({
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
	password: string().required(messages.password.required).min(6, messages.password.minLength),
	repeatPassword: string()
		.required(messages.repeatPassword.required)
		// eslint-disable-next-line
		// @ts-ignore
		.toEqual('password', messages.repeatPassword.notEqual),
});

export const guestValidationSchema = object().shape({
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
			then: string().matches(/^[a-zA-Z0-9]{9,12}$/, 'CE inválido'),
		}),
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
});
