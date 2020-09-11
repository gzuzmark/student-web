import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { User } from 'AppContext';
import { getLocalValue } from 'utils';
import aliviaAxios from 'utils/customAxios';

interface UserAPI {
	id: string;
	name: string;
	last_name: string;
	second_last_name: string;
	dni: string;
	is_main: boolean;
	birth_date: string;
	gender: string;
	meds: string;
	allergies: string;
	extra_info: string;
	contact_phone: string;
	contact_email: string;
}

interface ProfilesAPIResponse {
	data: UserAPI[];
}

interface CurrentUserDataResponse {
	user: UserAPI;
}

interface CurrentUserResponse {
	data: CurrentUserDataResponse;
}

interface PasswordFields {
	userId?: string;
	password?: string;
}

const parseBirthDate = (birthDate: string) =>
	parse(birthDate.slice(0, birthDate.indexOf('T')), 'yyyy-MM-dd', new Date());

const parseUser = (apiUser: UserAPI): User => ({
	id: apiUser.id,
	name: apiUser.name,
	lastName: apiUser.last_name,
	secondSurname: apiUser.second_last_name,
	identification: apiUser.dni,
	isMain: apiUser.is_main,
	birthDate: parseBirthDate(apiUser.birth_date),
	gender: apiUser.gender,
	medicines: apiUser.meds || '',
	takeMedicines: !!apiUser.meds,
	allergies: apiUser.allergies || '',
	haveAllergies: !!apiUser.allergies,
	moreMedicalInformation: apiUser.extra_info,
	phoneNumber: apiUser.contact_phone,
	email: apiUser.contact_email,
});

const parseAPIUser = (user: User): Omit<UserAPI, 'contact_phone' | 'contact_email' | 'is_main'> => ({
	id: user.id,
	name: user.name,
	last_name: user.lastName,
	second_last_name: user.secondSurname,
	dni: user.identification,
	birth_date: format(new Date(user.birthDate), 'dd/MM/yyyy'),
	gender: user.gender,
	meds: user.medicines || '',
	allergies: user.allergies || '',
	extra_info: user.moreMedicalInformation || '',
});

export const getCurrentUser = async (token?: string): Promise<[string, User]> => {
	try {
		const headers = token ? { Authorization: `Bearer ${token}` } : {};
		const resp = await aliviaAxios.get<CurrentUserResponse>('/users/me', { headers });
		const data = resp.data.data.user;

		return [data.id, parseUser(data)];
	} catch (e) {
		console.log(e);

		return [
			'',
			{
				id: '',
				name: '',
				lastName: '',
				secondSurname: '',
				identification: '',
				isMain: false,
				birthDate: new Date(),
				gender: '',
				medicines: '',
				takeMedicines: false,
				allergies: '',
				haveAllergies: false,
				moreMedicalInformation: '',
				phoneNumber: '',
				email: '',
			},
		];
	}
};

export const getProfiles = async () => {
	const token = getLocalValue('userToken');
	const headers = token ? { Authorization: `Bearer ${token}` } : {};
	const response = await aliviaAxios.get<ProfilesAPIResponse>('/accounts/profiles', { headers });
	const data = response.data.data;

	return data.map(parseUser);
};

export const updateProfile = async (newProfile: User) => {
	try {
		const token = getLocalValue('userToken');
		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		await aliviaAxios.patch(`/accounts/profiles/${newProfile.id}`, parseAPIUser(newProfile), { headers });
	} catch (e) {
		console.log(e);

		throw Error(e);
	}
};

export const sendPassword = async (values: PasswordFields): Promise<void> => {
	try {
		await aliviaAxios.post('/users/update', values);
	} catch (e) {
		throw Error(e);
	}
};

export const getUserId = async (queryId: string): Promise<string> => {
	try {
		const result = await aliviaAxios.get<string>('/users', { data: { queryId } });

		return result.data;
	} catch (e) {
		throw Error(e);
	}
};
