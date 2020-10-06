import aliviaAxios from 'utils/customAxios';

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
