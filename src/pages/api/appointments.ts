// import aliviaAxios from 'utils/customAxios';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

import { formatUTCDate, parseUTCDate } from 'utils';
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

interface ApiAppointmentList {
	old: ApiSmallAppointment[];
	current: ApiSmallAppointment[];
}

export interface AppointmentList {
	old: SmallAppointment[];
	current: SmallAppointment[];
}

interface ApiAppointmentDetail {
	id: string;
	channel: string;
	disease: string;
	date: number;
	paidAmount: string;
	patient: string;
	speciality: string;
	doctor: Doctor;
	treatment: Record<string, any>;
	recomendations: Record<string, any>;
}

export interface AppointDetail {
	id: string;
	channel: string;
	disease: string;
	appointmentType: AppointmentType;
	date: string;
	time: string;
	paidAmount: string;
	patient: string;
	speciality: string;
	doctor: Doctor;
	treatment: Record<string, any>;
	recomendations: Record<string, any>;
}

const mockSmallAppointmentList: ApiAppointmentList = {
	current: [
		{ id: '123', channel: 'videollamada', disease: 'gripe', date: 1592238600 },
		{ id: '124', channel: 'chat', disease: 'covid', date: 1592683200 },
		{ id: '125', channel: 'videollamada', disease: 'pulmonia', date: 1592683200 },
		{ id: '126', channel: 'chat', disease: 'dolor muscular', date: 1593507600 },
	],
	old: [
		{ id: '110', channel: 'videollamada', disease: 'gripe', date: 1592238600 },
		{ id: '111', channel: 'chat', disease: 'covid', date: 1592683200 },
		{ id: '112', channel: 'videollamada', disease: 'pulmonia', date: 1592683200 },
	],
};

const mockAppointmentDetail: ApiAppointmentDetail = {
	id: '123',
	channel: 'videollamada',
	disease: 'resfrio',
	patient: 'Joaquín Salinas',
	speciality: 'MEDICINA GENERAL',
	doctor: {
		id: 333,
		name: 'Jose Luis Perez Cuellar',
		cmp: '948252',
		profilePicture: 'https://picsum.photos/200/184',
	},
	// date: 1592238600, // June 15th - incoming date
	date: 1590836400, // May 30th - previous date
	paidAmount: '20',
	treatment: { test: 'string' },
	recomendations: { str: 'test' },
};

const formatAppointmentList = (rawList: ApiSmallAppointment[]): SmallAppointment[] =>
	rawList.map(({ date, ...rest }: ApiSmallAppointment) => ({
		...rest,
		date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
		time: formatUTCDate(date, 'hh:mm aaa'),
	}));

const getAppointmentType = (date: number): AppointmentType => {
	const parsedDate = parseUTCDate(date);
	const currentDate = new Date();
	const appointmentType =
		isEqual(parsedDate, currentDate) || isAfter(parsedDate, currentDate) ? 'incoming' : 'previous';

	return appointmentType;
};

const formatAppointmentDetail = ({ date, ...rest }: ApiAppointmentDetail): AppointDetail => ({
	...rest,
	appointmentType: getAppointmentType(date),
	date: formatUTCDate(date, "EEEE dd 'de' MMMM 'del' yyyy"),
	time: formatUTCDate(date, 'h:mm aaa'),
});

export const getAppointmentList = async (): Promise<AppointmentList | undefined> => {
	try {
		// const resp = await aliviaAxios.get<ApiAppointmentList>('/citas');
		// const list = resp.data;
		const { current, old } = mockSmallAppointmentList;

		return { current: formatAppointmentList(current), old: formatAppointmentList(old) };
	} catch (e) {
		console.log(e);
	}
};

export const getAppoinmentDetails = async ({ id }: { id: string }): Promise<AppointDetail | undefined> => {
	try {
		// const resp = await aliviaAxios.get<ApiAppointmentDetail>(`/citas/${id}`);
		// const data = resp.data;
		const data = mockAppointmentDetail;

		return formatAppointmentDetail(data);
	} catch (e) {
		console.log(e);
	}
};
