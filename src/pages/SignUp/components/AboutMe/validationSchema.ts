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
	secondSurname: {
		required: i18next.t('signUp:aboutme.validation.secondSurname.required'),
	},
	identification: {
		required: i18next.t('signUp:aboutme.validation.id.required'),
		digits: i18next.t('signUp:aboutme.validation.id.digits'),
	},
	birthDate: {
		required: i18next.t('signUp:aboutme.validation.birthDate.required'),
	},
	gender: {
		required: i18next.t('signUp:aboutme.validation.gender.required'),
	},
};

const validationSchema = object().shape({
	name: string().required(messages.name.required),
	lastName: string().required(messages.lastName.required),
	secondSurname: string().required(messages.secondSurname.required),
	identification: string()
		// eslint-disable-next-line
		// @ts-ignore
		.digits(messages.identification.digits)
		.required(messages.identification.required),
	birthDate: date()
		.required(messages.birthDate.required)
		.min(new Date('1900-01-01'), messages.birthDate.required)
		.max(new Date('2100-01-01'), messages.birthDate.required)
		.typeError(messages.birthDate.required)
		.nullable(),
	gender: string().required(messages.gender.required),
});

export default validationSchema;
