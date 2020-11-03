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

interface DiseaseAPI {
	name: string;
}

interface PatientOpinionsAPI {
	rating: number;
	comment: string;
	created_at: number;
}

export interface DoctorAPI {
	id: string;
	name: string;
	last_name: string;
	cmp: string;
	photo: string;
	title: string; // speciality
	rating: number;
	about_me: string;
	formation: string;
	diseases: DiseaseAPI[];
	ratings: PatientOpinionsAPI[];
	specialty_name: string;
}

interface DoctorAvailabilityAPI extends DoctorAPI {
	schedules: ScheduleAPI[];
}

interface DoctorResponseAPI {
	data: DoctorAvailabilityAPI[];
	pagination: Record<string, any>;
}

interface NextAvailableSchedulesAPI {
	data: {
		next_available_date: number;
		doctors: DoctorAvailabilityAPI[];
	};
}

// UI Types

export interface Schedule {
	id: string;
	startTime: Date;
	endTime: Date;
}

export interface PatientOpinion {
	comment: string;
	score: number;
	datePublished: number;
}

export interface Disease {
	name: string;
}

export interface Doctor {
	id: string;
	name: string;
	lastName: string;
	cmp: string;
	profilePicture: string;
	speciality: string;
	specialityName: string;
	// New fields
	rating: number;
	aboutMe: string;
	education: string; // formation
	diseases: Disease[];
	patientOpinions: PatientOpinion[];
}

export interface DoctorAvailability extends Doctor {
	schedules: Schedule[];
}

interface RequestProps {
	useCase: string;
	from: number;
	to: number;
	window?: number;
}

interface NextAvailableSchedules {
	nextAvailableDate: Date;
	doctors: DoctorAvailability[];
}

const parseResponseData = (doctors: DoctorAvailabilityAPI[] = []): DoctorAvailability[] =>
	doctors.map(
		({
			id,
			name,
			cmp,
			rating,
			about_me,
			formation,
			diseases,
			ratings,
			schedules,
			photo,
			title,
			last_name,
			specialty_name,
		}: DoctorAvailabilityAPI) => ({
			id,
			name,
			cmp,
			lastName: last_name,
			speciality: title,
			specialityName: specialty_name,
			profilePicture: photo,
			schedules: schedules.map(({ id, start_time, end_time }: ScheduleAPI) => ({
				id,
				startTime: parseUTCDate(start_time),
				endTime: parseUTCDate(end_time),
			})),
			rating,
			aboutMe: about_me,
			education: formation,
			diseases,
			patientOpinions: ratings.map(({ rating, comment, created_at }) => ({
				comment,
				score: rating,
				datePublished: created_at,
			})),
		}),
	);

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

export const getNextAvailableSchedules = async (useCaseID: string): Promise<NextAvailableSchedules> => {
	const response = await aliviaAxios.get<NextAvailableSchedulesAPI>('/doctors/next-available-schedule', {
		params: { use_case: useCaseID },
	});
	const { data } = response;
	const parsedDoctorsData = parseResponseData(data.data.doctors);

	return {
		nextAvailableDate: parseUTCDate(data.data.next_available_date),
		doctors: parsedDoctorsData,
	};
};
