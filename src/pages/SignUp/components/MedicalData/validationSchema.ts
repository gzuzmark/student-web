import { object, string, boolean } from 'yup';
import i18next from 'l18n/index';

const messages = {
	consultReason: {
		required: i18next.t('signUp:medicalData.validation.consultReason.required'),
	},
	takeMedicines: {
		required: i18next.t('signUp:medicalData.validation.takeMedicines.required'),
	},
	medicineList: {
		required: i18next.t('signUp:medicalData.validation.medicineList.required'),
	},
	haveAllergies: {
		required: i18next.t('signUp:medicalData.validation.haveAllergy.required'),
	},
	allergy: {
		required: i18next.t('signUp:medicalData.validation.allergy.required'),
	},
};

const validationSchema = object().shape({
	consultReason: string().required(messages.consultReason.required),
	takeMedicines: boolean().required(messages.takeMedicines.required).nullable(),
	medicineList: string().when('takeMedicines', { is: true, then: string().required(messages.medicineList.required) }),
	haveAllergies: boolean().required(messages.haveAllergies.required).nullable(),
	allergies: string().when('haveAllergies', { is: true, then: string().required(messages.allergy.required) }),
	moreInfo: string(),
});

export default validationSchema;
