import { object, string, boolean, array } from 'yup';
import i18next from 'l18n/index';

const messages = {
	takeMedicines: {
		required: i18next.t('signUp:medicalData.validation.takeMedicines.required'),
	},
	medicineList: {
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
};

const validationSchema = object().shape({
	takeMedicines: boolean().required(messages.takeMedicines.required).nullable(),
	medicineList: string().when('takeMedicines', { is: true, then: string().required(messages.medicineList.required) }),
	haveAllergies: boolean().required(messages.haveAllergies.required).nullable(),
	filesDerman: array().ensure().required('Adjuntar mínimo dos fotos').min(2, 'Adjuntar mínimo dos fotos'),
	allergies: string().when('haveAllergies', { is: true, then: string().required(messages.allergy.required) }),
	moreInfo: string(),
});

export default validationSchema;
