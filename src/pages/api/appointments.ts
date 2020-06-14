import aliviaAxios from 'utils/customAxios';
// import isAfter from 'date-fns/isAfter';
// import isEqual from 'date-fns/isEqual';

// import { formatUTCDate, parseUTCDate } from 'utils';
import { formatUTCDate } from 'utils';
import { Doctor } from './selectDoctor';

export const INCOMING = 'incoming';
export const PREVIOUS = 'previous';

type AppointmentType = 'incoming' | 'previous';

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

interface ApiAppointmentDetail {
	id: string;
	doctor: {
		id: string;
		name: string;
		last_name: string;
		title: string;
		cmp: string;
		photo: string;
	};
	date: number;
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
}

export interface AppointDetail {
	id: string;
	doctor: Doctor;
	date: string;
	time: string;
	channel: string;
	disease: string;
	appointmentType: AppointmentType;
	paidAmount: string;
	patient: string;
	// treatment: Record<string, any>;
	// recomendations: Record<string, any>;
}

interface AppointmentListResponse {
	data: ApiAppointmentDetail[];
}

interface AppointmentListParams {
	user_id: string;
	closed: number;
}

// const mockSmallAppointmentList: ApiAppointmentList = {
// 	current: [
// 		{ id: '123', channel: 'videollamada', disease: 'gripe', date: 1592238600 },
// 		{ id: '124', channel: 'chat', disease: 'covid', date: 1592683200 },
// 		{ id: '125', channel: 'videollamada', disease: 'pulmonia', date: 1592683200 },
// 		{ id: '126', channel: 'chat', disease: 'dolor muscular', date: 1593507600 },
// 	],
// 	old: [
// 		{ id: '110', channel: 'videollamada', disease: 'gripe', date: 1592238600 },
// 		{ id: '111', channel: 'chat', disease: 'covid', date: 1592683200 },
// 		{ id: '112', channel: 'videollamada', disease: 'pulmonia', date: 1592683200 },
// 	],
// };

// const mockAppointmentDetail: ApiAppointmentDetail = {
// 	id: '123',
// 	channel: 'videollamada',
// 	disease: 'resfrio',
// 	patient: 'Joaquín Salinas',
// 	speciality: 'MEDICINA GENERAL',
// 	doctor: {
// 		id: 333,
// 		name: 'Jose Luis Perez Cuellar',
// 		cmp: '948252',
// 		profilePicture: 'https://picsum.photos/200/184',
// 	},
// 	// date: 1592238600, // June 15th - incoming date
// 	date: 1590836400, // May 30th - previous date
// 	paidAmount: '20',
// 	treatment: { test: 'string' },
// 	recomendations: { str: 'test' },
// };

const formatAppointmentList = (rawList: ApiAppointmentDetail[], appointmentType: AppointmentType): AppointDetail[] =>
	rawList.map(({ id, doctor, date, appointment_type, patient, use_case }: ApiAppointmentDetail) => ({
		id: id || 'asdasd-erugitoer-asddff',
		doctor: {
			name: doctor.name || 'Kris',
			cmp: doctor.cmp,
			profilePicture: doctor.photo,
			speciality: doctor.title,
			lastName: doctor.last_name,
		},
		appointmentType,
		date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
		time: formatUTCDate(date, 'hh:mm aaa'),
		disease: use_case.title,
		channel: appointment_type.name,
		paidAmount: appointment_type.cost,
		patient: `${patient.name} ${patient.last_name}`,
	}));

// const formatAppointmentDetail = ({ date, ...rest }: ApiAppointmentDetail): AppointDetail => ({
// 	...rest,
// 	appointmentType: getAppointmentType(date),
// 	date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
// 	time: formatUTCDate(date, 'h:mm aaa'),
// });

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
		// const { current, old } = mockSmallAppointmentList;

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
