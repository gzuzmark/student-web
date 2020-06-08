import aliviaAxios from 'utils/customAxios';
import format from 'date-fns/format';
import i18next from 'l18n/index';

import { ContactValues } from 'pages/SignUp/components';

import { TokenResponse } from './types';

const errorMessages = {
	contactPhoneNumber: i18next.t('signUp:contact.phoneNumber.error'),
	contactEmail: i18next.t('signUp:contact.email.error'),
};

const patientErrorMessages = {
	identification: i18next.t('signUp:aboutMe.fields.identification.error'),
};

interface NewUser {
	name: string;
	lastName: string; // last_name
	secondSurname: string; // second_last_name
	identification: string; // document_number
	birthDate: Date | null; // birth_date
	gender: number | undefined;
	medicines?: string; // meds
	allergies?: string;
	moreMedicalInformation?: string; // extra_info
}

interface NewPatient extends NewUser {
	id: string;
}

interface CreatePatientResponse {
	data: NewPatient;
}

type ContactValuesRequest = Omit<ContactValues, 'repeatPassword'>;

export const createPatient = async (user: NewUser, setFieldError: Function): Promise<string | undefined> => {
	try {
		const resp = await aliviaAxios.post<CreatePatientResponse>('/patients', {
			name: user.name,
			last_name: user.lastName,
			second_last_name: user.secondSurname,
			document_number: user.identification,
			birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
			allergies: user.allergies,
			meds: user.medicines,
			extra_info: user.moreMedicalInformation,
		});
		const data = resp.data.data;

		return data.id;
	} catch (e) {
		console.log(e);
		setFieldError('identification', patientErrorMessages.identification);
	}
};

export const createAccount = async (
	{ email, phoneNumber, password = '' }: ContactValuesRequest,
	setFieldError: Function,
): Promise<string | void> => {
	try {
		const resp = await aliviaAxios.post<TokenResponse>('/users', {
			username: email,
			phone: phoneNumber,
			password,
		});
		const data = resp.data;

		return data.token;
	} catch (e) {
		console.log(e);

		setFieldError('phoneNumber', errorMessages.contactPhoneNumber);
		if (email) {
			setFieldError('email', errorMessages.contactEmail);
		}
	}
};
