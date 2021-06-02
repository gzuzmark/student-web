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

export interface Laboratorys {
	id: number;
	name: string;
	business_name: string;
	ruc: string;
	description: string;
	email: string;
	phone: string;
	mobile_phone: string;
	address: string;
	latitude: string;
	longitude: string;
	is_main: string;
	district_id: number;
	total_cost: number;
	available_times: Schedules[];
	selected_time: Schedules | undefined;
	logo: string;
	laboratory_exams: LaboratoryExamen[];
	delivery_cost: number;
}

export interface LaboratoryExamen {
	exam_modality_id: string;
	laboratory_id: number;
	id: number;
	name: string;
	price: number;
	types_laboratory_exam_id: number;
}

export interface Schedules {
	id: number;
	start_time: string;
	final_time: string;
	status: boolean;
	laboratory_id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
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
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};
