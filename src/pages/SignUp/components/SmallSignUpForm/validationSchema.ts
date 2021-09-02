import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object, date } = Yup;

const messages = {
	name: {
		required: i18next.t('signUp:aboutme.validation.name.required'),
	},
	lastName: {
		required: i18next.t('signUp:aboutme.validation.lastName.required'),
	},
	birthDate: {
		required: i18next.t('signUp:aboutme.validation.birthDate.required'),
	},
	identification: {
		required: i18next.t('signUp:aboutme.validation.document.required'),
	},
	identificationType: {
		required: i18next.t('newSignUp:contactPatient.validation.idType.required'),
	},
	phoneNumber: {
		required: i18next.t('signUp:contact.validation.phoneNumber.required'),
	},
	email: {
		required: i18next.t('signUp:contact.validation.email.required'),
		validEmail: i18next.t('signUp:contact.validation.email.validEmail'),
	},
};

const validationSchema = object().shape({
	identificationType: string().required(messages.identificationType.required),
	name: string().required(messages.name.required),
	lastName: string().required(messages.lastName.required),
	birthDate: date()
		.required(messages.birthDate.required)
		.min(new Date('1900-01-01'), messages.birthDate.required)
		.max(new Date('2100-01-01'), messages.birthDate.required)
		.typeError(messages.birthDate.required)
		.nullable(),
	identification: string().required(messages.identification.required),
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

export default validationSchema;
