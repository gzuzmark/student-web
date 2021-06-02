import aliviaAxios from 'utils/customAxios';
import { Laboratory as LaboratoryItem } from 'types';
import { format } from 'date-fns';

export interface Position {
	lat: number;
	lng: number;
}

export interface Laboratory {
	name: string;
	address: string;
	imgUrl: string;
	openHours: string;
	phoneNumber: string;
	pos: Position;
}

interface LaboratoryAPI {
	name: string;
	image_url: string;
	phone: string;
	open_hours: string;
	address: string;
	lat: number;
	lng: number;
}

interface LaboratoryRequest {
	date: Date;
	modalityId: number;
	laboratoryExamIds: number[];
}

const parseLaboratories = (data: LaboratoryAPI[]): Laboratory[] =>
	data.map(({ name, address, phone, image_url, open_hours, lat, lng }: LaboratoryAPI) => ({
		name,
		address,
		phoneNumber: phone,
		imgUrl: image_url,
		openHours: open_hours,
		pos: {
			lat,
			lng,
		},
	}));

export const getLaboratories = async (): Promise<Laboratory[]> => {
	try {
		const resp = await aliviaAxios.get<{ data: LaboratoryAPI[] }>('/locations');
		const laboratories = parseLaboratories(resp.data.data);

		return laboratories;
	} catch (e) {
		throw Error(e);
	}
};

export const getLaboratoriesList = async (params: LaboratoryRequest): Promise<LaboratoryItem[]> => {
	const body = {
		reservation_date: format(params.date, 'yyyy-MM-dd'),
		exam_modality_id: params.modalityId,
		laboratory_exams: params.laboratoryExamIds.map((x) => ({
			laboratory_exam_id: x,
		})),
	};
	try {
		const response = await aliviaAxios.post('/laboratories', body);
		return response.data;
	} catch (error) {
		throw error;
	}
};
