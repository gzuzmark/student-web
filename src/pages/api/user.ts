import aliviaAxios from 'utils/customAxios';
import { SimpleUser } from 'AppContext';

interface SimpleUseAPI {
	id: string;
	name: string;
	last_name: string;
	second_last_name: string;
	dni: string;
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
			{ id: data.id, name: data.name, lastName: data.last_name, secondSurname: data.second_last_name, dni: data.dni },
		];
	} catch (e) {
		console.log(e);

		return ['', { id: '', name: '', lastName: '', secondSurname: '', dni: '' }];
	}
};
