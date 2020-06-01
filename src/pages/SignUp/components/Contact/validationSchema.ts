import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object } = Yup;

const messages = {
	phoneNumber: {
		required: i18next.t('signUp:contact.validation.phoneNumber.required'),
	},
	email: {
		validEmail: i18next.t('signUp:contact.validation.email.validEmail'),
	},
	password: {
		required: i18next.t('signUp:contact.validation.password.required'),
	},
	repeatPassword: {
		required: i18next.t('signUp:contact.validation.repeatPassword.required'),
		notEqual: i18next.t('signUp:contact.validation.repeatPassword.notEqual'),
	},
};

const validationSchema = object().shape({
	phoneNumber: string()
		.max(9, messages.phoneNumber.required)
		// eslint-disable-next-line
		// @ts-ignore
		.digits(messages.phoneNumber.required)
		.required(messages.phoneNumber.required),
	// eslint-disable-next-line
	// @ts-ignore
	email: string().validEmail(messages.email.validEmail),
	password: string().required(messages.password.required),
	repeatPassword: string()
		.required(messages.repeatPassword.required)
		// eslint-disable-next-line
		// @ts-ignore
		.toEqual('password', messages.repeatPassword.notEqual),
});

export default validationSchema;
