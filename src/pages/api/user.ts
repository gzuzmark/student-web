import aliviaAxios from 'utils/customAxios';
import { SimpleUser } from 'AppContext';
import { getLocalValue } from 'utils';

interface SimpleUseAPI {
	id: string;
	name: string;
	last_name: string;
	second_last_name: string;
	dni: string;
	is_main: boolean;
}

interface ProfilesAPIResponse {
	data: SimpleUseAPI[];
}

interface CurrentUserDataResponse {
	user: SimpleUseAPI;
}

interface CurrentUserResponse {
	data: CurrentUserDataResponse;
}

// TODO: This will most likely change to support multiple profiles, update it when needed
export const getCurrentUser = async (token?: string): Promise<[string, SimpleUser]> => {
	try {
		const headers = token ? { Authorization: `Bearer ${token}` } : {};
		const resp = await aliviaAxios.get<CurrentUserResponse>('/users/me', { headers });
		const data = resp.data.data.user;

		return [
			data.id,
			{
				id: data.id,
				name: data.name,
				lastName: data.last_name,
				secondSurname: data.second_last_name,
				identification: data.dni,
				isMain: data.is_main,
			},
		];
	} catch (e) {
		console.log(e);

		return ['', { id: '', name: '', lastName: '', secondSurname: '', identification: '', isMain: false }];
	}
};

export const getProfiles = async () => {
	const token = getLocalValue('userToken');
	const headers = token ? { Authorization: `Bearer ${token}` } : {};
	const response = await aliviaAxios.get<ProfilesAPIResponse>('/accounts/profiles', { headers });
	const data = response.data.data;

	return data.map((user) => ({
		id: user.id,
		name: user.name,
		lastName: user.last_name,
		secondSurname: user.second_last_name,
		identification: user.dni,
		isMain: user.is_main,
	}));
};
