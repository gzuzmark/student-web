import { string, object } from 'yup';
import i18next from 'l18n/index';

const messages = {
	identification: {
		required: i18next.t('forgotPassword:forgotPassword.validation.id.required'),
		digits: i18next.t('forgotPassword:forgotPassword.validation.id.digits'),
	},
};

export const validationSchema = object().shape({
	documentValue: string()
		.min(8, messages.identification.digits)
		.max(12, messages.identification.digits)
		.required(messages.identification.required),
});

export default validationSchema;
