import aliviaAxios from 'utils/customAxios';
import format from 'date-fns/format';

import { ContactValues } from 'pages/SignUp/components';

import { TokenResponse } from './types';
import { getLocalValue } from 'utils';
import { User } from 'AppContext';

interface NewUser {
	name: string;
	lastName: string; // last_name
	secondSurname: string; // second_last_name
	identification: string; // document_number
	birthDate: Date | null; // birth_date
	gender: number | undefined;
	medicineList?: string; // meds
	allergies?: string;
	moreInfo?: string; // extra_info
	phoneNumber: string;
	email?: string;
	address?: string;
	ubigeo?: string;
}

interface NewPatient extends NewUser {
	id: string;
}

interface CreatePatientResponse {
	data: NewPatient;
}

type ContactValuesRequest = Omit<ContactValues, 'repeatPassword'>;

export interface Ubigeo {
	description: string;
}

interface UbigeoResponse {
	data: Ubigeo[];
}

interface FileResponse {
	data: {
		id: string;
	};
}

export const createGuestPatient = async (user: NewUser): Promise<string> => {
	const resp = await aliviaAxios.post<CreatePatientResponse>('/patients-guest', {
		name: user.name,
		last_name: user.lastName,
		second_last_name: user.secondSurname,
		document_number: user.identification,
		gender: user.gender,
		birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
		allergies: user.allergies || '',
		meds: user.medicineList || '',
		extra_info: user.moreInfo || '',
		contact_email: user.email || '',
		contact_phone: user.phoneNumber,
		address: user.address || 'Sin dirección',
		ubigeo: user.ubigeo,
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
			gender: user.gender,
			document_number: user.identification,
			birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
			allergies: user.allergies || '',
			meds: user.medicineList || '',
			extra_info: user.moreInfo || '',
			contact_email: user.email || '',
			contact_phone: user.phoneNumber,
			is_main: true,
		},
		{
			headers,
		},
	);
	const data = resp.data.data;

	return data.id;
};

export const createNewProfile = async (newProfile: User): Promise<string> => {
	const authToken = getLocalValue('userToken');
	const headers = { Authorization: `Bearer ${authToken}` };
	const resp = await aliviaAxios.post<CreatePatientResponse>(
		'/patients',
		{
			name: newProfile.name,
			last_name: newProfile.lastName,
			second_last_name: newProfile.secondSurname,
			gender: parseInt(newProfile.gender, 10),
			document_number: newProfile.identification,
			document_validation_date: '',
			contact_phone: newProfile.phoneNumber || '',
			contact_email: newProfile.email || '',
			birth_date: newProfile.birthDate ? format(new Date(newProfile.birthDate), 'dd/MM/yyyy') : '',
			allergies: '',
			meds: '',
			extra_info: '',
			family_relationship: '',
			is_main: false,
		},
		{
			headers,
		},
	);
	const data = resp.data.data;

	return data.id;
};

export const createAccount = async ({
	email,
	phoneNumber,
	password = '',
	identification,
	address = '',
	ubigeo = '',
}: ContactValuesRequest): Promise<string> => {
	const resp = await aliviaAxios.post<TokenResponse>('/users', {
		username: email,
		phone: phoneNumber,
		password,
		document_number: identification,
		address,
		ubigeo,
	});
	const data = resp.data;

	return data.token;
};

export const getLocations = async (query: string): Promise<UbigeoResponse> => {
	const response = await aliviaAxios.get<UbigeoResponse>(`/ubigeo?keywords=${query}`);
	return response.data;
};

export const uploadFile = async (file: File) => {
	try {
		const data = new FormData();

		data.append('image', file);
		const response = await aliviaAxios.post<FileResponse>('/media', data);

		return response.data.data.id;
	} catch (e) {
		throw Error(e);
	}
};
