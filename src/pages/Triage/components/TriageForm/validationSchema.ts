import { object, string } from 'yup';
import i18next from 'l18n/index';

const messages = {
	appointmentOwner: {
		required: i18next.t('triage:triage.validations.appointmentOwner.required'),
	},
	discomfortLvl: {
		required: i18next.t('triage:triage.validations.discomfortLvl.required'),
	},
	discomfortDescription: {
		required: i18next.t('triage:triage.validations.discomfortDescription.required'),
	},
	discomfortDuration: {
		required: i18next.t('triage:triage.validations.discomfortDuration.required'),
	},
};

const validationSchema = object().shape({
	appointmentOwner: string().required(messages.appointmentOwner.required),
	discomfortLvl: string().required(messages.discomfortLvl.required),
	discomfortDescription: string().required(messages.discomfortDescription.required),
	discomfortDuration: string().required(messages.discomfortDuration.required),
});

export default validationSchema;
