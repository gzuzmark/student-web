import aliviaAxios from 'utils/customAxios';
import { redirectToBaseAlivia } from 'utils';

export interface UseCase {
	id: string;
	name: string;
	description: string;
	totalCost: string;
}

interface UseCaseAPI {
	id: string;
	title: string;
	description: string;
	total_cost: string;
}

interface GetUseCaseResponse {
	data: UseCaseAPI;
}

export const getUseCase = async (useCaseID: string): Promise<UseCase | undefined> => {
	try {
		const resp = await aliviaAxios.get<GetUseCaseResponse>(`/use-cases/${useCaseID}`);
		const data = resp.data.data;

		return {
			id: data.id,
			name: data.title,
			description: data.description,
			totalCost: data.total_cost,
		};
	} catch (e) {
		redirectToBaseAlivia();
	}
};
