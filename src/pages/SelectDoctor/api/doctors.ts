import aliviaAxios from 'utils/customAxios';
import { transformToSnakeCase } from 'utils';
import { parseUTCDate } from 'utils';

// API Types

interface SnakeRequestProps {
	date: number;
	use_case: string;
}

interface ScheduleAPI {
	id: string;
	start_time: number;
	end_time: number;
}

interface DoctorAvailabilityAPI {
	name: string;
	cmp: string;
	photo: string;
	title: string;
	description: string;
	schedules: ScheduleAPI[];
}

interface DoctorResponseAPI {
	data: DoctorAvailabilityAPI[];
	pagination: Record<string, any>;
}

// UI Types

export interface Schedule {
	id: string;
	startTime: Date;
	endTime: Date;
}

export interface Doctor {
	name: string;
	cmp: string;
	profilePicture: string;
	speciality: string;
}

export interface DoctorAvailability extends Doctor {
	comment: string;
	schedules: Schedule[];
}

interface RequestProps {
	useCase: string;
	from: number;
	to: number;
}

// const mockResponse: DoctorAvailabilityAPI[] = [
// 	{
// 		id: 1,
// 		name: 'Jose Luis Perez Cuellar',
// 		cmp: '938943',
// 		profile_picture: 'https://picsum.photos/200/184',
// 		// comment: 'El doctor se preocupa por entender bien lo que tengo. Me dejó explicarle mis síntomas con calma',
// 		schedules: [
// 			{ id: '142', start_time: 1591434000, end_time: 1591435800 },
// 			{ id: '143', start_time: 1591435800, end_time: 1591437600 },
// 			{ id: '144', start_time: 1591437600, end_time: 1591439400 },
// 			{ id: '145', start_time: 1591439400, end_time: 1591441200 },
// 			{ id: '146', start_time: 1591441200, end_time: 1591443000 },
// 			{ id: '147', start_time: 1591443000, end_time: 1591444800 },
// 			{ id: '148', start_time: 1591444800, end_time: 1591446600 },
// 			{ id: '149', start_time: 1591446600, end_time: 1591448400 },
// 			{ id: '150', start_time: 1591448400, end_time: 1591450200 },
// 			{ id: '151', start_time: 1591450200, end_time: 1591452000 },
// 			{ id: '152', start_time: 1591452000, end_time: 1591453800 },
// 			{ id: '153', start_time: 1591453800, end_time: 1591455600 },
// 		],
// 	},
// 	{
// 		id: 2,
// 		name: 'Sandra Ramirez',
// 		cmp: '938943',
// 		profile_picture: 'https://picsum.photos/200/184',
// 		// comment: 'Cuando conversé con la doctora Riveros, parecía que me conocía desde antes. Entendió mi preocupación',
// 		schedules: [
// 			{ id: '155', start_time: 1591434000, end_time: 1591435800 },
// 			{ id: '156', start_time: 1591435800, end_time: 1591437600 },
// 			{ id: '157', start_time: 1591437600, end_time: 1591439400 },
// 			{ id: '158', start_time: 1591439400, end_time: 1591441200 },
// 			{ id: '159', start_time: 1591441200, end_time: 1591443000 },
// 			{ id: '160', start_time: 1591443000, end_time: 1591444800 },
// 		],
// 	},
// ];

const parseResponseData = (doctors: DoctorAvailabilityAPI[] = []): DoctorAvailability[] =>
	doctors.map(({ schedules, photo, title, description, ...rest }: DoctorAvailabilityAPI) => ({
		...rest,
		comment: description,
		speciality: title,
		profilePicture: photo,
		schedules: schedules.map(({ id, start_time, end_time }: ScheduleAPI) => ({
			id,
			startTime: parseUTCDate(start_time),
			endTime: parseUTCDate(end_time),
		})),
	}));

const createMedicalSpecialityQuery = (data: RequestProps): SnakeRequestProps =>
	transformToSnakeCase<RequestProps, SnakeRequestProps>(data);

export const getMedicalSpecialities = async (data: RequestProps): Promise<DoctorAvailability[]> => {
	const requestParams = createMedicalSpecialityQuery(data);
	const response = await aliviaAxios.get<DoctorResponseAPI>('/doctors/schedules', {
		params: { ...requestParams },
	});
	const parsedData = parseResponseData(response.data.data);

	return parsedData;
};
