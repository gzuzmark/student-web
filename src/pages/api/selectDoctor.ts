import { addDays, addHours, addMinutes, isAfter, isSameDay } from 'date-fns';
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
interface ExperiencesAPI {
	type: string;
	title: string;
	company: string;
	from: string;
	to: string;
	location: string;
}
interface EducationAPI {
	city: string;
	degree: string;
	education_type: string;
	school: string;
	year: number;
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
	experience: ExperiencesAPI[]; // experiencias
	education: EducationAPI[];
	awards: Awards[];
	diagnostics: Diagnostics[];
	age_from: string;
	age_to: string;
}

interface AllDoctorUseCaseAPI {
	data: DoctorAvailability2API[];
}

interface DoctorAvailabilityAPI extends DoctorAPI {
	schedules: ScheduleAPI[];
}

interface DoctorAvailability2API extends DoctorAPI {
	schedules: number;
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

export interface Diagnostics {
	name: string;
}
export interface DoctorExperiences {
	type: string;
	title: string;
	company: string;
	yearStart: string;
	yearEnd: string;
	city: string;
}
export interface Studies {
	city: string;
	title: string;
	type: string;
	school: string;
	year: number;
}
export interface Awards {
	description: string;
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
	diseases: DiseaseAPI[];
	experiences: DoctorExperiences[]; // experiencias
	education: Studies[];
	awards: Awards[];
	diagnostics: Diagnostics[];
	ageFrom: string;
	ageTo: string;
	patientOpinions: PatientOpinion[];
}

export interface DoctorAvailability extends Doctor {
	schedules: Schedule[];
}

export interface DoctorAvailabilityUseCase extends DoctorAvailability {
	hasSchedules: boolean;
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

export interface NextAvailableSchedules {
	// nextAvailableDate: Date;
	doctors: DoctorAvailability[];
	dates: DateSchedule[];
	isNextDays: boolean;
}

export interface DoctorAvailableSchedules {
	doctor: DoctorAvailability | null;
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

const parseResponseData = (doctors: DoctorAvailabilityAPI[] = []): DoctorAvailability[] => {
	const minHourDate = addHours(new Date(), 1);
	return doctors
		.map(
			({
				id,
				name,
				cmp,
				rating,
				about_me,
				diseases,
				ratings,
				schedules,
				photo,
				title,
				last_name,
				specialty_name,
				experience,
				education,
				awards,
				diagnostics,
				age_from,
				age_to,
			}: DoctorAvailabilityAPI) => ({
				id,
				name,
				cmp,
				lastName: last_name,
				speciality: title,
				specialityName: specialty_name,
				profilePicture: photo,
				schedules: schedules
					.map(({ id, start_time, end_time, student_id }: ScheduleAPI) => ({
						id,
						startTime: parseUTCDate(start_time),
						endTime: parseUTCDate(end_time),
						isDisabled: isDisabled(student_id),
					}))
					.filter(({ startTime }) => isAfter(startTime, minHourDate)),
				rating,
				aboutMe: about_me,
				diseases,
				experiences: experience.map(({ type, title, company, from, to, location }) => ({
					type,
					title,
					company,
					yearStart: from.substring(0, 4),
					yearEnd: to.substring(0, 4),
					city: location,
				})), // experiencias
				education: education.map(({ city, degree, education_type, school, year }) => ({
					city,
					title: degree,
					type: education_type,
					school,
					year,
				})),
				awards: awards,
				diagnostics: diagnostics,
				ageFrom: age_from,
				ageTo: age_to,
				patientOpinions: ratings.map(({ rating, comment, created_at }) => ({
					comment,
					score: rating,
					datePublished: created_at,
				})),
			}),
		)
		.filter((doctor) => doctor.schedules.length > 0);
};

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

export const getAllDoctorsBySpecialty = async (useCaseId: string): Promise<DoctorAvailabilityUseCase[]> => {
	try {
		const response = await aliviaAxios.get<AllDoctorUseCaseAPI>('/doctors/doctors-by-usecaseid', {
			params: {
				use_case_id: useCaseId,
			},
		});
		return response.data.data.map((item) => {
			console.log(item);
			return {
				...item,
				speciality: item.title,
				specialityName: item.specialty_name,
				lastName: item.last_name,
				schedules: [],
				hasSchedules: item.schedules > 0,
				profilePicture: item.photo,
				patientOpinions: item.ratings.map(({ rating, comment, created_at }) => ({
					comment,
					score: rating,
					datePublished: created_at,
				})),
				aboutMe: item.about_me,
				experiences: item.experience.map(({ type, title, company, from, to, location }) => ({
					type,
					title,
					company,
					yearStart: from.substring(0, 4),
					yearEnd: to.substring(0, 4),
					city: location,
				})), // experiencias
				education: item.education.map(({ city, degree, education_type, school, year }) => ({
					city,
					title: degree,
					type: education_type,
					school,
					year,
				})),
				ageFrom: item.age_from,
				ageTo: item.age_to,
			};
		});
	} catch (error) {
		return [];
	}
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
	const dates = validWeek(parsedDoctorsData, startDate);

	return {
		doctors: parsedDoctorsData,
		dates: dates,
		isNextDays: data.data.status,
	};
};

export const getAvailableSchedulesByDoctorId = async (doctorId: string, startDate: Date) => {
	// startDate.setHours(0, 0, 0, 0);

	const utcDate = new Date(startDate).toUTCString();
	const parseDateToUtc = Date.parse(utcDate);
	const response = await aliviaAxios.get<NextAvailableSchedulesAPI>('/doctors/schedules-by-doctorid', {
		params: { doctor_id: doctorId, from: parseDateToUtc },
	});
	const {
		data: {
			data: { doctors, dates, status },
		},
	} = response;
	const parsedDoctorsData = parseResponseData(doctors);
	const dateInit = new Date(dates[0]);
	const offsetTimeZone = dateInit.getTimezoneOffset();
	const datesWeeks = validWeek(parsedDoctorsData, addMinutes(dateInit, offsetTimeZone));

	return {
		doctors: parsedDoctorsData,
		dates: datesWeeks,
		isNextDays: status,
	};
};

export const validWeek = (doctors: DoctorAvailability[], startDate: Date) => {
	const listWeek = completeWeek(startDate);
	return listWeek.map<DateSchedule>((dateWeek: Date) => {
		const hasSessions = doctors.filter((doctor: DoctorAvailability) => {
			const days = doctor.schedules.filter((schedule) => isSameDay(schedule.startTime, dateWeek));
			return days.length > 0;
		});
		return {
			date: dateWeek,
			isEmpty: hasSessions.length === 0,
		};
	});
};

const completeWeek = (startDate: Date) => {
	console.log(startDate, 'startdate');
	return [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(startDate, i));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseToDates = (dates: string[]): Date[] => {
	const offset = new Date().getTimezoneOffset();
	const datesToDatesObjects: Date[] = dates.map((date: string) => {
		return addMinutes(new Date(date), offset);
	});
	return datesToDatesObjects;
};
