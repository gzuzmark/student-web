import aliviaAxios from 'utils/customAxios';
// import isAfter from 'date-fns/isAfter';
// import isEqual from 'date-fns/isEqual';

// import { formatUTCDate, parseUTCDate } from 'utils';
import { formatUTCDate } from 'utils';
import { TriagePair } from 'AppContext';

import { Doctor, DoctorAPI } from './selectDoctor';

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
}

interface AppointmentListResponse {
	data: ApiAppointmentDetail[];
}

interface AppointmentListParams {
	user_id: string;
	closed: number;
}

interface NewAppointmentBody {
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
				education: '',
				diseases: [],
				patientOpinions: [],
				specialityName: doctor.specialty_name,
			},
			appointmentType,
			date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
			time: formatUTCDate(date, 'hh:mm aaa'),
			disease: use_case.title,
			channel: appointment_type.name,
			paidAmount: final_cost,
			patient: `${patient.name} ${patient.last_name}`,
			scheduleID: schedule_id,
			medicines: prescribed_medicines,
			recomendations,
		}),
	);

// const formatAppointmentDetail = ({ date, ...rest }: ApiAppointmentDetail): AppointDetail => ({
// 	...rest,
// 	appointmentType: getAppointmentType(date),
// 	date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
// 	time: formatUTCDate(date, 'h:mm aaa'),
// });
//
const formatCreateParams = (params: NewAppointmentBody) => ({
	reservation_account_id: params.reservationAccountID,
	use_case_id: params.useCaseID,
	schedule_id: params.scheduleID,
	appointment_type_id: params.appointmentTypeID || '',
	questions: params.triage,
	media: params.media || [],
	is_guest: !!params.isGuest,
});

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

export const getAppoinmentDetails = async ({ id }: { id: string }): Promise<AppointDetail | undefined> => {
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
	try {
		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		await aliviaAxios.post('/appointments', { ...formatCreateParams(params) }, { headers });
	} catch (e) {
		throw Error(e);
	}
};
