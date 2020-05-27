import { object, string } from 'yup';
import i18next from 'l18n/index';

const messages = {
	phoneNumber: {
		required: i18next.t('login:login.phoneNumber.required'),
		digits: i18next.t('login:login.phoneNumber.digits'),
	},
	password: {
		required: i18next.t('login:login.password.required'),
	},
};

const validationSchema = object().shape({
	phoneNumber: string()
		.matches(/^\d+$/, { message: messages.phoneNumber.digits, excludeEmptyString: true })
		.required(messages.phoneNumber.required),
	password: string().required(messages.password.required),
});

export default validationSchema;
