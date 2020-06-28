import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object } = Yup;

const messages = {
	otpCode: {
		required: i18next.t('forgotPassword:forgotPassword.validation.otpCode.required'),
		digits: i18next.t('forgotPassword:forgotPassword.validation.otpCode.digits'),
	},
};

const validationSchema = object().shape({
	otpCode: string()
		.required(messages.otpCode.required)
		.min(4, messages.otpCode.required)
		.max(4, messages.otpCode.required)
		// eslint-disable-next-line
		// @ts-ignore
		.digits(messages.otpCode.digits),
});

export default validationSchema;
