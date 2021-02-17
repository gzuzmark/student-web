import aliviaAxios from 'utils/customAxios';
import { redirectToBaseAlivia } from 'utils';

export interface UseCase {
	id: string;
	name: string;
	description: string;
	totalCost: string;
	averageDuration: string;
}

export interface Skill {
	id: string;
	name: string;
}

interface UseCaseAPI {
	id: string;
	title: string;
	description: string;
	total_cost: string;
	duration: string;
}

interface GetUseCaseResponse {
	data: UseCaseAPI;
}

interface GetUseCasesResponse {
	data: UseCaseAPI[];
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
			averageDuration: data.duration,
		};
	} catch (e) {
		redirectToBaseAlivia();
	}
};

export const getUseCases = async (): Promise<UseCaseAPI[] | undefined> => {
	try {
		const resp = await aliviaAxios.get<GetUseCasesResponse>(`/use-cases`);
		const data = resp.data.data;

		return data;
	} catch (e) {
		redirectToBaseAlivia();
	}
};
