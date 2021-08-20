import { addDays, addMinutes, isSameDay } from 'date-fns';
import { parseUTCDate, transformToSnakeCase } from 'utils';
import aliviaAxios from 'utils/customAxios';

// API Types

interface SnakeRequestProps {
	date: number;
	use_case: string;
}

interface ScheduleAPI {
	id: string;
	start_time: number;
	end_time: number;
	student_id: string | null;
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
		dates: string[];
		status: boolean;
	};
}

// UI Types

export interface Schedule {
	id: string;
	startTime: Date;
	endTime: Date;
	isDisabled: boolean;
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

export interface DateSchedule {
	date: Date;
	isEmpty: boolean;
}

interface NextAvailableSchedules {
	nextAvailableDate: Date;
	doctors: DoctorAvailability[];
	dates: DateSchedule[];
	isNextDays: boolean;
}

const isDisabled = (studentId: string | null): boolean => {
	if (studentId === null) {
		return false;
	}
	if (studentId.length === 0) {
		return false;
	}
	return true;
};

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
			schedules: schedules.map(({ id, start_time, end_time, student_id }: ScheduleAPI) => ({
				id,
				startTime: parseUTCDate(start_time),
				endTime: parseUTCDate(end_time),
				isDisabled: isDisabled(student_id),
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

export const getNextAvailableSchedules = async (
	useCaseID: string,
	startDate: Date,
): Promise<NextAvailableSchedules> => {
	startDate.setHours(0, 0, 0, 0);
	const response = await aliviaAxios.get<NextAvailableSchedulesAPI>('/doctors/next-available-schedule', {
		params: { use_case: useCaseID, from: startDate.getTime() },
	});
	const { data } = response;
	const parsedDoctorsData = parseResponseData(data.data.doctors);
	const dates = validWeek(data.data.dates, startDate);
	const { status } = data.data;

	return {
		nextAvailableDate: parseUTCDate(data.data.next_available_date),
		doctors: parsedDoctorsData,
		dates: dates,
		isNextDays: status,
	};
};

const validWeek = (dates: string[], startDate: Date) => {
	const listDates: Date[] = parseToDates(dates);
	const listWeek = completeWeek(startDate);
	return listWeek.map<DateSchedule>((dateWeek: Date) => {
		const hasSessions = listDates.filter((date: Date) => isSameDay(dateWeek, date));
		return {
			date: dateWeek,
			isEmpty: hasSessions.length === 0,
		};
	});
};

const completeWeek = (startDate: Date) => {
	return [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(startDate, i));
};

const parseToDates = (dates: string[]): Date[] => {
	const offset = new Date().getTimezoneOffset();
	const datesToDatesObjects: Date[] = dates.map((date: string) => {
		return addMinutes(new Date(date), offset);
	});
	return datesToDatesObjects;
};
