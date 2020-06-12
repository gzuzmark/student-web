import aliviaAxios from 'utils/customAxios';
import format from 'date-fns/format';

import { ContactValues } from 'pages/SignUp/components';

import { TokenResponse } from './types';

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
	phoneNumber: string;
	email?: string;
}

interface NewPatient extends NewUser {
	id: string;
}

interface CreatePatientResponse {
	data: NewPatient;
}

type ContactValuesRequest = Omit<ContactValues, 'repeatPassword'>;

export const createGuestPatient = async (user: NewUser): Promise<string> => {
	const resp = await aliviaAxios.post<CreatePatientResponse>('/patients-guest', {
		name: user.name,
		last_name: user.lastName,
		second_last_name: user.secondSurname,
		document_number: user.identification,
		birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
		allergies: user.allergies,
		meds: user.medicines,
		extra_info: user.moreMedicalInformation,
		contact_email: user.email,
		contact_phone: user.phoneNumber,
	});
	const data = resp.data.data;

	return data.id;
};

export const createPatient = async (user: NewUser, authToken: string): Promise<string> => {
	const headers = { Authorization: `Bearer ${authToken}` };
	const resp = await aliviaAxios.post<CreatePatientResponse>(
		'/patients',
		{
			name: user.name,
			last_name: user.lastName,
			second_last_name: user.secondSurname,
			document_number: user.identification,
			birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
			allergies: user.allergies,
			meds: user.medicines,
			extra_info: user.moreMedicalInformation,
			contact_email: user.email,
			contact_phone: user.phoneNumber,
		},
		{
			headers,
		},
	);
	const data = resp.data.data;

	return data.id;
};

export const createAccount = async ({ email, phoneNumber, password = '' }: ContactValuesRequest): Promise<string> => {
	const resp = await aliviaAxios.post<TokenResponse>('/users', {
		username: email,
		phone: phoneNumber,
		password,
	});
	const data = resp.data;

	return data.token;
};
