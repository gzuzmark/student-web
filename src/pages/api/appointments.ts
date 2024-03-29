import aliviaAxios from 'utils/customAxios';
// import isAfter from 'date-fns/isAfter';
// import isEqual from 'date-fns/isEqual';

// import { formatUTCDate, parseUTCDate } from 'utils';
import { formatUTCDate } from 'utils';
import { TriagePair } from 'AppContext';

import { Doctor, DoctorAPI } from './selectDoctor';
import ApiAppoitmentError from 'pages/Payment/exceptions/ApiAppoitmentError';
import { format } from 'date-fns-tz/esm';
import parse from 'date-fns/parse';
import { es } from 'date-fns/locale';

export const INCOMING = 'incoming';
export const PREVIOUS = 'previous';

type AppointmentType = 'incoming' | 'previous';

export interface Medicine {
	frequency: string;
	name: string;
	notes: string;
}

export interface Recomendation {
	description: string;
}

interface ApiSmallAppointment {
	id: string;
	channel: string;
	disease: string;
	date: number;
}

export interface SmallAppointment {
	id: string;
	channel: string;
	disease: string;
	date: string;
	time: string;
}

export interface AppointmentList {
	old: SmallAppointment[];
	current: SmallAppointment[];
}

export interface ApiAppointmentDetail {
	id: string;
	final_cost: string;
	doctor: DoctorAPI;
	date: number;
	schedule_id: string;
	appointment_type: {
		id: string;
		name: string;
		cost: string;
	};
	patient: {
		id: string;
		name: string;
		last_name: string;
		second_last_name: string;
	};
	use_case: {
		id: string;
		title: string;
	};
	prescribed_medicines: Medicine[];
	recomendations: Recomendation[];
}
export interface ApiControlAppointDetail {
	date: string;
	speciality: string;
	use_case_id: string;
}

export interface AppointDetail {
	id: string;
	doctor: Doctor;
	date: string;
	time: string;
	channel: string;
	disease: string;
	scheduleID: string;
	appointmentType: AppointmentType;
	paidAmount: string;
	patient: string;
	medicines: Medicine[];
	recomendations: Recomendation[];
	timer: number;
	minLeft: number;
}
export interface ControlAppointmentDetail {
	date: string;
	specialityName: string;
	specialityId: string;
}

interface AppointmentListResponse {
	data: ApiAppointmentDetail[];
	reschedule_date: ApiControlAppointDetail[];
}

interface AppointmentListParams {
	user_id: string;
	closed: number;
}

export interface NewAppointmentBody {
	reservationAccountID: string;
	useCaseID: string;
	scheduleID: string;
	appointmentTypeID: string;
	triage: TriagePair[];
	media: string[];
	isGuest: boolean;
}

const formatAppointmentList = (rawList: ApiAppointmentDetail[], appointmentType: AppointmentType): AppointDetail[] =>
	rawList.map(
		({
			id,
			final_cost,
			doctor,
			date,
			appointment_type,
			patient,
			use_case,
			schedule_id,
			prescribed_medicines,
			recomendations,
		}: ApiAppointmentDetail) => ({
			id: id || 'asdasd-erugitoer-asddff',
			doctor: {
				id: doctor.id,
				name: doctor.name || 'Kris',
				lastName: doctor.last_name,
				cmp: doctor.cmp,
				profilePicture: doctor.photo,
				speciality: doctor.title,
				rating: -1,
				aboutMe: '',
				diseases: [],
				patientOpinions: [],
				specialityName: doctor.specialty_name,
				experiences: [], // experiencias
				education: [],
				awards: doctor.awards,
				diagnostics: doctor.diagnostics,
				ageFrom: doctor.age_from,
				ageTo: doctor.age_to,
				gender: doctor.gender,
			},
			appointmentType,
			date: formatUTCDate(date, "EEEE dd 'de' MMMM"),
			time: formatUTCDate(date, 'hh:mm aaa'),
			disease: use_case.title,
			channel: appointment_type.name,
			paidAmount: final_cost,
			patient: `${patient.name} ${patient.last_name}`,
			scheduleID: schedule_id,
			medicines: prescribed_medicines,
			recomendations,
			timer: getTimer(formatUTCDate(date, 'yyyy-dd-MMMM hh:mm aaa')),
			minLeft: getTimeLeft(date),
		}),
	);

// const formatAppointmentDetail = ({ date, ...rest }: ApiAppointmentDetail): AppointDetail => ({
// 	...rest,
// 	appointmentType: getAppointmentType(date),
// 	date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
// 	time: formatUTCDate(date, 'h:mm aaa'),
// });
//
const getTimer = (date: any) => {
	const today = new Date();
	const now = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	const day1 = new Date(date);
	const day1Format = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
	let diferencia = (day1Format - now) / (1000 * 60 * 60 * 24);
	diferencia = Math.floor(diferencia);
	const daysLeft = diferencia > 0 ? diferencia : 0;
	return daysLeft;
};
const getTimeLeft = (date: number) => {
	const today = new Date();
	const currentTime = Math.round(today.getTime() / 1000);
	const dif = date - currentTime;
	const minLeft = Math.round(dif / 60);
	return minLeft;
};
const formatCreateParams = (params: NewAppointmentBody) => ({
	reservation_account_id: params.reservationAccountID,
	use_case_id: params.useCaseID,
	schedule_id: params.scheduleID,
	appointment_type_id: params.appointmentTypeID || '',
	questions: params.triage,
	media: params.media || [],
	is_guest: !!params.isGuest,
});
const parseADate = (appDate: string) => parse(appDate.slice(0, appDate.indexOf('T')), 'yyyy-MM-dd', new Date());
const formatControlAppointmentList = (list: ApiControlAppointDetail[]): ControlAppointmentDetail[] =>
	list.map(({ date, speciality, use_case_id }: ApiControlAppointDetail) => ({
		date: format(parseADate(date), "eeee d 'de' MMMMMM ", { locale: es }),
		specialityName: speciality,
		specialityId: use_case_id,
	}));
// TODO Update how we get the appointments
export const getAppointmentList = async (
	params: AppointmentListParams,
	userToken: string,
): Promise<AppointDetail[] | undefined> => {
	try {
		const resp = await aliviaAxios.get<AppointmentListResponse>('/appointments', {
			params,
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		const list = resp.data.data;

		return formatAppointmentList(list, params.closed === 1 ? PREVIOUS : INCOMING);
	} catch (e) {
		console.log(e);
	}
};
export const getControlAppoinmentList = async (
	params: AppointmentListParams,
	userToken: string,
): Promise<ControlAppointmentDetail[] | undefined> => {
	try {
		const resp = await aliviaAxios.get<AppointmentListResponse>('/appointments', {
			params,
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		return formatControlAppointmentList(resp.data.reschedule_date);
	} catch (e) {
		console.log(e);
	}
};
export const getAppoinmentDetails = async (): Promise<AppointDetail | undefined> => {
	try {
		// const resp = await aliviaAxios.get<ApiAppointmentDetail>(`/citas/${id}`);
		// const data = resp.data;
		// const data = mockAppointmentDetail;
		// return formatAppointmentDetail(data);
		return undefined;
	} catch (e) {
		console.log(e);
	}
};

export const createAppointment = async (
	params: NewAppointmentBody,
	token: string | null | undefined,
): Promise<void> => {
	const body = { ...formatCreateParams(params) };
	try {
		const headers = token ? { Authorization: `Bearer ${token}` } : {};
		await aliviaAxios.post('/appointments', body, { headers });
	} catch (e) {
		if (e instanceof Error) {
			throw new ApiAppoitmentError(e.message, 'http', body);
		}
	}
};
