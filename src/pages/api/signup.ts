import aliviaAxios from 'utils/customAxios';
import format from 'date-fns/format';

import { ContactValues } from 'pages/SignUp/components';

import { TokenResponse } from './types';
import { getLocalValue } from 'utils';
import { User } from 'AppContext';
import parse from 'date-fns/parse';
import { es } from 'date-fns/locale';

const parseExpirationDate = (expirationDate: string) =>
	parse(expirationDate.slice(0, expirationDate.indexOf('T')), 'yyyy-MM-dd', new Date());

interface NewUser {
	name: string;
	lastName: string; // last_name
	secondSurname: string; // second_last_name
	identification: string; // document_number
	identificationType: string; // document_type
	birthDate: Date | null; // birth_date
	gender: number | undefined;
	medicineList?: string; // meds
	allergies?: string;
	moreInfo?: string; // extra_info
	phoneNumber: string;
	email?: string;
	address?: string;
	ubigeo?: string;
	isTerm?: boolean | null;
	isClub?: boolean | null;
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

export interface Benefit {
	id: string;
	name: string;
	description: string;
	discount: number;
	expirationDate: string;
	companyName: string;
}

interface BenefitResponse {
	data: {
		benefit: BenefitAPI;
	};
}

interface FileResponse {
	data: {
		id: string;
	};
}

interface BenefitAPI {
	id: string;
	name: string;
	description: string;
	discount: number;
	expiration_date: string;
	company_name: string;
}

const parseBenefit = (apiBenefit: BenefitAPI): Benefit => ({
	id: apiBenefit.id,
	name: apiBenefit.name,
	description: apiBenefit.description,
	discount: apiBenefit.discount,
	expirationDate: apiBenefit.expiration_date
		? format(parseExpirationDate(apiBenefit.expiration_date), "eeee d 'de' MMMMMM ", { locale: es })
		: '',
	companyName: apiBenefit.company_name,
});

export const createGuestPatient = async (user: NewUser): Promise<string> => {
	const resp = await aliviaAxios.post<CreatePatientResponse>('/patients-guest', {
		name: user.name,
		last_name: user.lastName,
		second_last_name: user.secondSurname,
		document_type: user.identificationType,
		document_number: user.identification,
		gender: Number(user.gender),
		birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
		allergies: user.allergies || '',
		meds: user.medicineList || '',
		extra_info: user.moreInfo || '',
		contact_email: user.email || '',
		contact_phone: user.phoneNumber,
		address: user.address || 'Sin dirección',
		ubigeo: user.ubigeo || '',
		privacy_policies: user.isTerm ? 1 : 0,
		terms_conditions: user.isClub ? 1 : 0,
	});
	const data = resp.data.data;

	return data.id;
};

export const createGuestPatient1 = async (user: NewUser): Promise<string> => {
	const resp = await aliviaAxios.post<CreatePatientResponse>('/patients-guest', {
		name: user.name,
		last_name: user.lastName,
		second_last_name: user.secondSurname,
		document_type: user.identificationType,
		document_number: user.identification,
		gender: Number(user.gender),
		birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
		allergies: user.allergies || '',
		meds: user.medicineList || '',
		extra_info: user.moreInfo || '',
		contact_email: user.email || '',
		contact_phone: user.phoneNumber,
		address: user.address || 'Sin dirección',
		ubigeo: user.ubigeo || '',
		privacy_policies: user.isTerm ? 1 : 0,
		terms_conditions: user.isClub ? 1 : 0,
	});
	const data = resp.data.data;

	return data.id;
};

export const createPatient = async (user: NewUser, authToken: string): Promise<string> => {
	try {
		const headers = { Authorization: `Bearer ${authToken}` };
		const resp = await aliviaAxios.post<CreatePatientResponse>(
			'/patients',
			{
				name: user.name,
				last_name: user.lastName,
				second_last_name: user.secondSurname,
				gender: user.gender,
				document_number: user.identification,
				document_type: user.identificationType,
				birth_date: user.birthDate ? format(new Date(user.birthDate), 'dd/MM/yyyy') : '',
				allergies: user.allergies || '',
				meds: user.medicineList || '',
				extra_info: user.moreInfo || '',
				contact_email: user.email || '',
				contact_phone: user.phoneNumber,
				address: user.address || '',
				ubigeo: user.ubigeo || '',
				is_main: true,
				privacy_policies: user.isTerm ? 1 : 0,
				terms_conditions: user.isClub ? 1 : 0, //DATA ANALYTICS
			},
			{
				headers,
			},
		);
		const data = resp.data.data;

		return data.id;
	} catch (e) {
		throw Error(e);
	}
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
	try {
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
	} catch (e) {
		throw Error(e);
	}
};

export const getLocations = async (query: string): Promise<UbigeoResponse> => {
	const response = await aliviaAxios.get<UbigeoResponse>(`/ubigeo?keywords=${query}`);
	return response.data;
};

export const getBenefit = async (document_number: string): Promise<Benefit> => {
	const data = new FormData();

	data.append('patient_document', document_number);

	const response = await aliviaAxios.post<BenefitResponse>('/benefits/validate', { patient_document: document_number });

	return parseBenefit(response.data.data.benefit);
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
