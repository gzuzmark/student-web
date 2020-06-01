import * as Yup from 'yup';

const DIGIT_REGEX = /^\d+$/;
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

export function registerCustomValidators(YupInstance = Yup) {
	YupInstance.addMethod(YupInstance.string, 'digits', function digits(this: Yup.StringSchema, message) {
		return this.matches(DIGIT_REGEX, {
			message: message || 'Ingresa solo digitos',
			excludeEmptyString: true,
		});
	});
	YupInstance.addMethod(YupInstance.string, 'validEmail', function validEmail(this: Yup.StringSchema, message) {
		return this.matches(EMAIL_REGEX, {
			message: message || 'Ingresa solo digitos',
			excludeEmptyString: true,
		});
	});
	YupInstance.addMethod(YupInstance.string, 'toEqual', function validEmail(this: Yup.StringSchema, key, message) {
		const ref = YupInstance.ref(key);
		return this.test({
			name: 'toEqual',
			exclusive: false,
			message: message || 'Los campos no coinciden',
			// eslint-disable-next-line
			// @ts-ignore
			params: { reference: ref.path },
			test(value) {
				const fieldValue = this.resolve(ref);
				// if (value && fieldValue && caseInsensitive) {
				// return value.toLowerCase() !== fieldValue.toLowerCase();
				// }
				return value === fieldValue;
			},
		});
	});
}
