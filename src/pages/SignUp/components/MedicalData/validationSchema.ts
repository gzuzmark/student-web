import { object, string, boolean, array } from 'yup';
import i18next from 'l18n/index';

const messages = {
	takeMedicines: {
		required: i18next.t('signUp:medicalData.validation.takeMedicines.required'),
	},
	medicineList: {
		required: i18next.t('signUp:medicalData.validation.medicineList.required'),
	},
	files: {
		required: i18next.t('signUp:medicalData.validation.medicineList.required'),
	},
	haveAllergies: {
		required: i18next.t('signUp:medicalData.validation.haveAllergy.required'),
	},
	filesDerman: {
		required: i18next.t('signUp:medicalData.validation.filesDerman.required'),
	},
	allergy: {
		required: i18next.t('signUp:medicalData.validation.allergy.required'),
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
	takeMedicines: boolean().required(messages.takeMedicines.required).nullable(),
	medicineList: string().when('takeMedicines', { is: true, then: string().required(messages.medicineList.required) }),
	haveAllergies: boolean().required(messages.haveAllergies.required).nullable(),
	isDermatology: boolean().required('mensaje').nullable(),
	files: array().when('isDermatology', { is: true, then: array().ensure().min(2, 'Adjuntar mínimo dos fotos') }),
	allergies: string().when('haveAllergies', { is: true, then: string().required(messages.allergy.required) }),
	moreInfo: string(),
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
