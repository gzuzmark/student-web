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
	phoneNumber: {
		required: i18next.t('signUp:contact.validation.phoneNumber.required'),
	},
	email: {
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
	email: string().validEmail(messages.email.validEmail),
	password: string().required(messages.password.required).min(6, messages.password.minLength),
	repeatPassword: string()
		.required(messages.repeatPassword.required)
		// eslint-disable-next-line
		// @ts-ignore
		.toEqual('password', messages.repeatPassword.notEqual),
});

export const guestValidationSchema = object().shape({
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
	email: string().validEmail(messages.email.validEmail),
});
