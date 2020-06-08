import aliviaAxios from 'utils/customAxios';
import { SimpleUser } from 'AppContext';

interface SimpleUseAPI {
	id: string;
	name: string;
	last_name: string;
	second_last_name: string;
}

interface CurrentUserDataResponse {
	user: SimpleUseAPI;
}

interface CurrentUserResponse {
	data: CurrentUserDataResponse;
}

// TODO: This will most likely change to support multiple profiles, update it when needed
export const getCurrentUser = async (): Promise<[string, SimpleUser]> => {
	try {
		const resp = await aliviaAxios.get<CurrentUserResponse>('/users/me');
		const data = resp.data.data.user;

		return [data.id, { id: data.id, name: data.name, lastName: data.last_name, secondSurname: data.second_last_name }];
	} catch (e) {
		console.log(e);

		return ['', { id: '', name: '', lastName: '', secondSurname: '' }];
	}
};
