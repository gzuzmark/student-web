// import aliviaAxios from 'utils/customAxios';

export interface Position {
	lat: number;
	lng: number;
}

export interface Laboratory {
	name: string;
	address: string;
	imgUrl: string;
	// open-close times
	phoneNumber: string;
	pos: Position;
}

interface LaboratoryAPI {
	name: string;
	address: string;
	phone: string;
	photo: string;
	pos: {
		latitude: number;
		longitude: number;
	};
}

const testMarkers: LaboratoryAPI[] = [
	{
		name: 'Reo PRO',
		address:
			'Av. Alfredo Mendiola F-25, cuadra 77 Urb. Pro, Los Olivos Auxiliar Panamericana Norte, frente al Real Plaza, Lima 15307',
		phone: '+5115364530',
		photo: 'https://picsum.photos/200/300',
		pos: { latitude: -11.9399519, longitude: -77.0720781 },
	},
	{
		name: 'SG Labo',
		address: 'J Manuel Corbacho 450, Comas 15311',
		phone: '+5115364530',
		photo: 'https://picsum.photos/200/300',
		pos: { latitude: -11.9406503, longitude: -77.0603249 },
	},
	{
		name: 'Laboratorio Geotécnico Anddes',
		address: 'Psje. Antonio Raimondi Pj 41, Pj 42 Mz D lote 12-A Urb, Comas 15011',
		phone: '',
		photo: 'https://picsum.photos/200/300',
		pos: { latitude: -11.9361834, longitude: -77.0588008 },
	},
	{
		name: 'Laboratorio Clinico LAB MEDIC',
		address: 'ZZ2, Los Olivos 15307',
		phone: '+51969999231',
		photo: 'https://picsum.photos/200/300',
		pos: { latitude: -11.9385533, longitude: -77.0785191 },
	},
];

const parseLaboratories = (data: LaboratoryAPI[]): Laboratory[] =>
	data.map(({ name, address, phone, photo, pos: { latitude, longitude } }: LaboratoryAPI) => ({
		name,
		address,
		phoneNumber: phone,
		imgUrl: photo,
		pos: {
			lat: latitude,
			lng: longitude,
		},
	}));

export const getLaboratories = async (): Promise<Laboratory[]> => {
	try {
		// const resp = await aliviaAxios.get<LaboratoryAPI[]>('/laboratories');
		const laboratories = parseLaboratories(testMarkers);

		return laboratories;
	} catch (e) {
		throw Error(e);
	}
};
