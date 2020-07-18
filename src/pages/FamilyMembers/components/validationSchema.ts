import * as Yup from 'yup';
import i18next from 'l18n/index';

import { registerCustomValidators } from 'utils/addCustomValidations';

registerCustomValidators(Yup);

const { string, object, date, number, boolean } = Yup;

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
	birthDate: {
		required: i18next.t('signUp:aboutme.validation.birthDate.required'),
	},
	gender: {
		required: i18next.t('signUp:aboutme.validation.gender.required'),
	},
	identification: {
		required: i18next.t('signUp:aboutme.validation.document.required'),
	},
	documentIssueDate: {
		required: i18next.t('signUp:aboutme.validation.documentIssueDate.required'),
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
	name: string().required(messages.name.required),
	lastName: string().required(messages.lastName.required),
	secondSurname: string().required(messages.secondSurname.required),
	birthDate: date()
		.required(messages.birthDate.required)
		.min(new Date('1900-01-01'), messages.birthDate.required)
		.max(new Date('2100-01-01'), messages.birthDate.required)
		.typeError(messages.birthDate.required)
		.nullable(),
	gender: number().required(messages.gender.required),
	takeMedicines: boolean().required(messages.takeMedicines.required).nullable(),
	medicineList: string().when('takeMedicines', { is: true, then: string().required(messages.medicineList.required) }),
	haveAllergies: boolean().required(messages.haveAllergies.required).nullable(),
	allergies: string().when('haveAllergies', { is: true, then: string().required(messages.allergy.required) }),
	moreMedicalInformation: string(),
});

export default validationSchema;
