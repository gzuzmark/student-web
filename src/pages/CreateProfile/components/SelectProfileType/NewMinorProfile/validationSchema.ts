import { string, object } from 'yup';
import i18next from 'l18n/index';

const messages = {
	familyRelationship: {
		required: i18next.t('createProfile:createProfile.relationshipToTheMinor.validation.required'),
	},
};

const validationSchema = object().shape({
	familyRelationship: string().required(messages.familyRelationship.required),
});

export default validationSchema;
