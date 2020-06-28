import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object } = Yup;

const messages = {
	password: {
		required: i18next.t('signUp:contact.validation.password.required'),
		minLength: i18next.t('signUp:contact.validation.password.incorrectFormat'),
	},
	repeatPassword: {
		required: i18next.t('signUp:contact.validation.repeatPassword.required'),
		notEqual: i18next.t('signUp:contact.validation.repeatPassword.notEqual'),
	},
};

const validationSchema = object().shape({
	password: string().required(messages.password.required).min(6, messages.password.minLength),
	repeatPassword: string()
		.required(messages.repeatPassword.required)
		// eslint-disable-next-line
		// @ts-ignore
		.toEqual('password', messages.repeatPassword.notEqual),
});

export default validationSchema;
