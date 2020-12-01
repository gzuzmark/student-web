import { ugoConsoleAxios } from 'utils/customAxios';

interface DataAddress {
	address: string;
	reference: string;
	latitude: string;
	longitude: string;
}

export const postAddress = async (sessionId: string, data: DataAddress) => {
	try {
		await ugoConsoleAxios.post(`/alivia/sessions/${sessionId}/address`, data);
	} catch (e) {
		throw Error(e);
	}
};
